import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoServerError } from 'mongodb';
import Tag from '../domain/TagDomain';

let mongod;

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri(), { useNewUrlParser: true, useUnifiedTopology: true });
});

beforeEach(async () => {
    await Tag.deleteMany({});
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongod.stop();
});

describe('Tag Model Test', () => {

    it('should create & save tag successfully', async () => {
        const validTag = new Tag({ tagName: 'TestTag' });
        const savedTag = await validTag.save();

        expect(savedTag._id).toBeDefined();
        expect(savedTag.tagName).toBe('TestTag');
    });

    it('should not save tag without tagName field', async () => {
        const tagWithoutRequiredField = new Tag();
        let err;
        try {
            await tagWithoutRequiredField.save();
        } catch (error) {
            err = error;
        }

        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.tagName).toBeDefined();
    });

    it('should not save tag with duplicate tagName', async () => {
        const validTag1 = new Tag({ tagName: 'DuplicateTag' });
        await validTag1.save();

        const validTag2 = new Tag({ tagName: 'DuplicateTag' });
        let err;
        try {
            await validTag2.save();
        } catch (error) {
            err = error;
        }

        expect(err.constructor.name).toBe('MongoServerError');
        expect(err.message).toContain('duplicate key error');
    });

});

