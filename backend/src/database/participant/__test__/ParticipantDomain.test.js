import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Participant from '../domain/ParticipantDomain';
import Tag from '../../tag/domain/TagDomain';

let mongod;

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri(), { useNewUrlParser: true, useUnifiedTopology: true });
});

beforeEach(async () => {
    await Participant.deleteMany({});
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongod.stop();
});

describe('Participant Model Test', () => {

    it('should create & save participant successfully', async () => {
        const validParticipant = new Participant({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phoneNum: '1234567890',
            isWillContact: false
        });
        const savedParticipant = await validParticipant.save();

        expect(savedParticipant._id).toBeDefined();
        expect(savedParticipant.firstName).toBe('John');
        expect(savedParticipant.lastName).toBe('Doe');
        expect(savedParticipant.email).toBe('john.doe@example.com');
        expect(savedParticipant.phoneNum).toBe('1234567890');
        expect(savedParticipant.isWillContact).toBe(false);
    });

    it('should create & save participant with tag associations successfully', async () => {
        const tag1 = new Tag({ tagName: 'TestTag1' });
        const savedTag1 = await tag1.save();

        const tag2 = new Tag({ tagName: 'TestTag2' });
        const savedTag2 = await tag2.save();

        const validParticipant = new Participant({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phoneNum: '1234567890',
            tag: [savedTag1._id, savedTag2._id],
            isWillContact: false
        });
        const savedParticipant = await validParticipant.save();

        expect(savedParticipant._id).toBeDefined();
        expect(savedParticipant.firstName).toBe('John');
        expect(savedParticipant.lastName).toBe('Doe');
        expect(savedParticipant.email).toBe('john.doe@example.com');
        expect(savedParticipant.phoneNum).toBe('1234567890');
        expect(savedParticipant.isWillContact).toBe(false);
        expect(savedParticipant.tag.length).toBe(2);
        expect(savedParticipant.tag).toEqual(expect.arrayContaining([savedTag1._id, savedTag2._id]));
    });

    it('should retrieve participant with tag details', async () => {
        const tag = new Tag({ tagName: 'TestTag' });
        const savedTag = await tag.save();

        const validParticipant = new Participant({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            tag: [savedTag._id]
        });
        const savedParticipant = await validParticipant.save();

        const retrievedParticipant = await Participant.findById(savedParticipant._id).populate('tag');
        expect(retrievedParticipant.tag[0].tagName).toBe('TestTag');
    });

    it('should not save participant without email field', async () => {
        const participantWithoutRequiredField = new Participant({
            firstName: 'John',
            lastName: 'Doe'
        });
        let err;
        try {
            await participantWithoutRequiredField.save();
        } catch (error) {
            err = error;
        }

        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.email).toBeDefined();
    });

    it('should not save participant with duplicate email', async () => {
        const validParticipant1 = new Participant({
            firstName: 'John',
            lastName: 'Doe',
            email: 'duplicate.email@example.com'
        });
        await validParticipant1.save();

        const validParticipant2 = new Participant({
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'duplicate.email@example.com'
        });
        let err;
        try {
            await validParticipant2.save();
        } catch (error) {
            err = error;
        }

        expect(err.constructor.name).toBe('MongoServerError');
        expect(err.message).toContain('duplicate key error');
    });

});
