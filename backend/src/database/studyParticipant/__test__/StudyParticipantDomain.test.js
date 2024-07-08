import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import StudyParticipant from '../domain/StudyParticipantDomain'; // Replace with the correct path

// Testing data
const studyParticipant1 = {
    studyId: new mongoose.Types.ObjectId('000000000000000000000001'),
    serialNum: 101,
    participantId: new mongoose.Types.ObjectId('000000000000000000000002'),
    isActive: true,
    isComplete: false,
    isGift: true,
    isSentGift: false,
    isWIllReceiveReport: true,
    isSentReport: false,
    note: "Test Note 1"
};

const studyParticipant2 = {
    studyId: new mongoose.Types.ObjectId('000000000000000000000003'),
    serialNum: 102,
    participantId: new mongoose.Types.ObjectId('000000000000000000000004'),
    isActive: false,
    isComplete: true,
    isGift: false,
    isSentGift: true,
    isWIllReceiveReport: false,
    isSentReport: true,
    note: "Test Note 2"
};

const studyParticipants = [studyParticipant1, studyParticipant2];

let mongod;

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri(), { useNewUrlParser: true, useUnifiedTopology: true });
});

beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await StudyParticipant.insertMany(studyParticipants);
});



afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

describe ('Check StudyParticipant schema', () => {
    it('get study participants', async () => {    
        const participantsFromDb = await StudyParticipant.find();
        expect(participantsFromDb).toBeTruthy();
        expect(participantsFromDb.length).toBe(2);

        // Assertions for the first StudyParticipant
        expect(participantsFromDb[0].studyId).toEqual(studyParticipant1.studyId);
        expect(participantsFromDb[0].serialNum).toBe(studyParticipant1.serialNum);
        expect(participantsFromDb[0].participantId).toEqual(studyParticipant1.participantId);
        expect(participantsFromDb[0].isActive).toBe(studyParticipant1.isActive);
        expect(participantsFromDb[0].isComplete).toBe(studyParticipant1.isComplete);
        expect(participantsFromDb[0].isGift).toBe(studyParticipant1.isGift);
        expect(participantsFromDb[0].isSentGift).toBe(studyParticipant1.isSentGift);
        expect(participantsFromDb[0].isWIllReceiveReport).toBe(studyParticipant1.isWIllReceiveReport);
        expect(participantsFromDb[0].isSentReport).toBe(studyParticipant1.isSentReport);
        expect(participantsFromDb[0].note).toBe(studyParticipant1.note);

        // Assertions for the second StudyParticipant
        expect(participantsFromDb[1].studyId).toEqual(studyParticipant2.studyId);
        expect(participantsFromDb[1].serialNum).toBe(studyParticipant2.serialNum);
        expect(participantsFromDb[1].participantId).toEqual(studyParticipant2.participantId);
        expect(participantsFromDb[1].isActive).toBe(studyParticipant2.isActive);
        expect(participantsFromDb[1].isComplete).toBe(studyParticipant2.isComplete);
        expect(participantsFromDb[1].isGift).toBe(studyParticipant2.isGift);
        expect(participantsFromDb[1].isSentGift).toBe(studyParticipant2.isSentGift);
        expect(participantsFromDb[1].isWIllReceiveReport).toBe(studyParticipant2.isWIllReceiveReport);
        expect(participantsFromDb[1].isSentReport).toBe(studyParticipant2.isSentReport);
        expect(participantsFromDb[1].note).toBe(studyParticipant2.note);
    });

    it('find a specific study participant by studyId', async () => {
        const participantFromDb = await StudyParticipant.findOne({ studyId: studyParticipant1.studyId });
        expect(participantFromDb).toBeTruthy();
        expect(participantFromDb.studyId).toEqual(studyParticipant1.studyId);
    });

    // Add more tests for other operations
});
