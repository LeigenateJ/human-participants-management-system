import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import ParticipantDao from '../dao/ParticipantDao';
import Participant from '../domain/ParticipantDomain';
import Tag from '../../tag/domain/TagDomain';

let mongod;

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri(), { useNewUrlParser: true, useUnifiedTopology: true });
});

beforeEach(async () => {
    await Participant.deleteMany({});
    await Tag.deleteMany({});
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongod.stop();
});

describe('ParticipantDao Tests', () => {

    it('should create multiple participants', async () => {
        const participantsData = [
            { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
            { firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com' }
        ];
        const savedParticipants = await ParticipantDao.createMultipleParticipants(participantsData);
        expect(savedParticipants.length).toBe(2);
    });

    it('should get all participants', async () => {
        const participant = new Participant({ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' });
        await participant.save();
        const participants = await ParticipantDao.getAllParticipants();
        expect(participants.length).toBe(1);
    });

    it('should get participant by ID', async () => {
        const participant = new Participant({ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' });
        const savedParticipant = await participant.save();
        const retrievedParticipant = await ParticipantDao.getParticipantById(savedParticipant._id);
        expect(retrievedParticipant.email).toBe('john.doe@example.com');
    });

    it('should find participants by emails', async () => {
        const participant = new Participant({ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' });
        await participant.save();
        const participants = await ParticipantDao.findParticipantsByEmails(['john.doe@example.com']);
        expect(participants.length).toBe(1);
    });

    it('should retrieve participants that will be contacted with their associated tags', async () => {
        // Create a tag
        const tag1 = new Tag({ tagName: 'SampleTag1' });
        await tag1.save();

        const tag2 = new Tag({ tagName: 'SampleTag2' });
        await tag2.save();

        // Create participants
        const participant1 = new Participant({ 
            firstName: 'John', 
            lastName: 'Doe', 
            email: 'john.doe@example.com', 
            isWillContact: true,
            tag: [tag1._id]
        });
        await participant1.save();

        const participant2 = new Participant({ 
            firstName: 'Jane', 
            lastName: 'Doe', 
            email: 'jane.doe@example.com', 
            isWillContact: true,
            tag: [tag2._id]
        });
        await participant2.save();

        const participant3 = new Participant({ 
            firstName: 'Mike', 
            lastName: 'Smith', 
            email: 'mike.smith@example.com', 
            isWillContact: false  // This participant should not be retrieved
        });
        await participant3.save();

        // Call the method
        const participantsToContact = await ParticipantDao.getParticipantsToContact();

        // Check the results
        expect(participantsToContact.length).toBe(2);
        expect(participantsToContact.some(p => p.email === 'john.doe@example.com' && p.tag.includes('SampleTag1'))).toBe(true);
        expect(participantsToContact.some(p => p.email === 'jane.doe@example.com' && p.tag.includes('SampleTag2'))).toBe(true);
    });

    it('should add tag to participants by IDs', async () => {
        const tag = new Tag({ tagName: 'TestTag' });
        const savedTag = await tag.save();

        const participant = new Participant({ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' });
        const savedParticipant = await participant.save();

        const modifiedCount = await ParticipantDao.addTagByIds([savedParticipant._id], savedTag._id);
        expect(modifiedCount).toBe(1);

        const updatedParticipant = await Participant.findById(savedParticipant._id);
        expect(updatedParticipant.tag).toContainEqual(savedTag._id);
    });

    it('should update participant by ID', async () => {
        const participant = new Participant({ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' });
        const savedParticipant = await participant.save();

        const updated = await ParticipantDao.updateParticipantById(savedParticipant._id, { firstName: 'Jane' });
        expect(updated).toBe(true);

        const updatedParticipant = await Participant.findById(savedParticipant._id);
        expect(updatedParticipant.firstName).toBe('Jane');
    });

    it('should toggle boolean property for participants by IDs', async () => {
        const participant1 = new Participant({ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', isWillContact: true });
        const savedParticipant1 = await participant1.save();

        const participant2 = new Participant({ firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', isWillContact: false });
        const savedParticipant2 = await participant2.save();

        const count = await ParticipantDao.toggleBooleanPropertyByIds([savedParticipant1._id, savedParticipant2._id], 'isWillContact');
        expect(count).toBe(2);

        const updatedParticipant1 = await Participant.findById(savedParticipant1._id);
        expect(updatedParticipant1.isWillContact).toBe(false);

        const updatedParticipant2 = await Participant.findById(savedParticipant2._id);
        expect(updatedParticipant2.isWillContact).toBe(true);
    });

    it('should delete tag from participants by IDs', async () => {
        const tag = new Tag({ tagName: 'TestTag' });
        const savedTag = await tag.save();

        const participant = new Participant({ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', tag: [savedTag._id] });
        const savedParticipant = await participant.save();

        const modifiedCount = await ParticipantDao.deleteTagByIds([savedParticipant._id], savedTag._id);
        expect(modifiedCount).toBe(1);

        const updatedParticipant = await Participant.findById(savedParticipant._id);
        expect(updatedParticipant.tag).not.toContainEqual(savedTag._id);
    });

    it('should anonymize participants', async () => {
        const participant = new Participant({ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' });
        const savedParticipant = await participant.save();

        await ParticipantDao.anonymizeParticipants([savedParticipant._id]);

        const anonymizedParticipant = await Participant.findById(savedParticipant._id);
        expect(anonymizedParticipant.email).toContain('@deleteduser.com');
        expect(anonymizedParticipant.firstName).toBe('Deleted');
        expect(anonymizedParticipant.lastName).toBe('Participant');
    });

    it('should delete participant by ID', async () => {
        const participant = new Participant({ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' });
        const savedParticipant = await participant.save();

        await ParticipantDao.deleteParticipant(savedParticipant._id);

        const deletedParticipant = await Participant.findById(savedParticipant._id);
        expect(deletedParticipant).toBeNull();
    });

    it('should delete anonymized participants', async () => {
        // Create some anonymized participants
        const anonymizedParticipantsData = [
            { firstName: 'Deleted', lastName: 'Participant', email: '5f4e0502d1a5d6a1c2e8d1a0@deleteduser.com' },
            { firstName: 'Deleted', lastName: 'Participant', email: '5f4e0502d1a5d6a1c2e8d1a1@deleteduser.com' }
        ];
        await Participant.insertMany(anonymizedParticipantsData);
    
        // Create some non-anonymized participants as a control group
        const regularParticipantsData = [
            { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
            { firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com' }
        ];
        await Participant.insertMany(regularParticipantsData);
    
        // Call method to delete anonymized participants
        await ParticipantDao.deleteAnonymizedParticipants();
    
        // Verify that anonymized participants have been removed
        const remainingAnonymizedParticipants = await Participant.find({ email: { $regex: /@deleteduser\.com$/, $options: "i" } });
        expect(remainingAnonymizedParticipants.length).toBe(0);
    
        // Verify that non-anonymized participants still exist
        const remainingRegularParticipants = await Participant.find({ email: { $nin: [ '5f4e0502d1a5d6a1c2e8d1a0@deleteduser.com', '5f4e0502d1a5d6a1c2e8d1a1@deleteduser.com' ] } });
        expect(remainingRegularParticipants.length).toBe(2);
    });
    

});
