import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import StudyParticipantDao from '../dao/StudyParticipantDao';
import StudyParticipant from '../domain/StudyParticipantDomain';
import Participant from '../../participant/domain/ParticipantDomain';
import Study from '../../study/domain/StudyDomain'
import Tag from '../../tag/domain/TagDomain';
//mongoose.model('Participant', Participant);

// Testing data
const studyParticipant1 = {
    _id: new mongoose.Types.ObjectId('000000000000000000000001'),
    studyId: mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6a1"),
    participantId: mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b1"),
    serialNum: 1,
    isActive: true,
    isComplete: false,
    isGift: false,
    isSentGift: false,
    isWillReceiveReport: false,
    isSentReport: false,
    note: "Note for participant 1"
};

const studyParticipant2 = {
    _id: new mongoose.Types.ObjectId('000000000000000000000002'),
    studyId: mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6a2"),
    participantId: mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b2"),
    serialNum: 2,
    isActive: true,
    isComplete: false,
    isGift: false,
    isSentGift: false,
    isWillReceiveReport: false,
    isSentReport: false,
    note: "Note for participant 2"
};

const studyParticipants = [studyParticipant1, studyParticipant2];

const participant1 = {
    _id: mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b1"),
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    isWillContact: false,
    tag: [mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a9b8")]
};

const participant2 = {
    _id: mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b2"),
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    isWillContact: false,
    tag: [mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a9b9")]
};

const tag1 = {
    _id: mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a9b8"),
    tagName: "tag001"
};

const tag2 = {
    _id: mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a9b9"),
    tagName: "tag002"
};


// Testing data for Study
const study1 = {
    _id: new mongoose.Types.ObjectId('615cdd2f3d4f7e0016b4a6a1'),
    studyCode: "STUDY001",
    studyName: "Cognitive Behavior Study",
    description: "A study on the cognitive behaviors of individuals in urban environments.",
    creator: new mongoose.Types.ObjectId('601234567890123456789012'),
    researcherList: [
        new mongoose.Types.ObjectId('601234567890123456789013'),
        new mongoose.Types.ObjectId('601234567890123456789014')
    ],
    studyType: "Behavioral",
    isAnonymous: false,
    anonymousParticipantNum: 0,
    participantNum: 100,
    recruitmentStartDate: new Date('2023-10-01'),
    recruitmentCloseDate: new Date('2023-12-01'),
    location: ["New York", "Los Angeles"],
    isClosed: true,
    surveyLink: "https://survey.example.com/study001",
    driveLink: "https://drive.example.com/study001"
};

const study2 = {
    _id: new mongoose.Types.ObjectId('615cdd2f3d4f7e0016b4a6a2'),
    studyCode: "STUDY002",
    studyName: "Dietary Habits Study",
    description: "A study on the dietary habits of individuals and its impact on health.",
    creator: new mongoose.Types.ObjectId('601234567890123456789015'),
    researcherList: [
        new mongoose.Types.ObjectId('601234567890123456789016')
    ],
    studyType: "Nutritional",
    isAnonymous: true,
    anonymousParticipantNum: 50,
    participantNum: 200,
    recruitmentStartDate: new Date('2023-11-01'),
    recruitmentCloseDate: new Date('2024-01-01'),
    location: ["San Francisco", "Chicago"],
    isClosed: true,
    surveyLink: "https://survey.example.com/study002",
    driveLink: "https://drive.example.com/study002"
};

let mongod;

/**
 * Before all tests, create an in-memory MongoDB instance so we don't have to test on a real database,
 * then establish a mongoose connection to it.
 */
beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri(), { useNewUrlParser: true });
});

beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();

    await Tag.insertMany([tag1, tag2]);
    await Study.insertMany([study1, study2]);
    await Participant.insertMany([participant1, participant2]);
    await StudyParticipant.insertMany(studyParticipants);
});

afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});


describe('StudyParticipantDao test', () => {
    it('check createMultipleStudyParticipants function', async () => {
        const result = await StudyParticipantDao.createMultipleStudyParticipants(studyParticipant1.studyId, [studyParticipant1.participantId, studyParticipant2.participantId]);
        expect(result).toBeDefined();
        expect(result.length).toBeGreaterThan(0);
        result.forEach(participant => {
            expect(participant.studyId).toBeDefined();
            expect(participant.participantId).toBeDefined();
            expect(participant.serialNum).toBeDefined();
        });
    });

    it('check checkExistingStudyParticipants function', async () => {
        const existingParticipants = await StudyParticipantDao.checkExistingStudyParticipants(studyParticipant1.studyId, [studyParticipant1.participantId]);
        expect(existingParticipants).toBeDefined();
        existingParticipants.forEach(participant => {
            expect(participant.studyId).toBeDefined();
            expect(participant.participantId).toBeDefined();
        });
    });

    it('check getActiveStudyParticipantsCountByStudyId function', async () => {
        const count = await StudyParticipantDao.getActiveStudyParticipantsCountByStudyId(studyParticipant1.studyId);
        expect(count).toBeGreaterThan(0);
    });

    it('check findStudyParticipantById function', async () => {
        const participant = await StudyParticipantDao.findStudyParticipantById(studyParticipant1._id);
        expect(participant).toBeDefined();
        expect(participant._id).toBeDefined();
    });

    it('check findMultipleStudyParticipantsByIds function', async () => {
        const participants = await StudyParticipantDao.findMultipleStudyParticipantsByIds([studyParticipant1._id, studyParticipant2._id]);
        expect(participants).toBeDefined();
        expect(participants.length).toBeGreaterThan(0);
        participants.forEach(participant => {
            expect(participant.participantId).toBeDefined();
            expect(participant.participantId.firstName).toBeDefined();
            expect(participant.participantId.lastName).toBeDefined();
        });
    });

    it('check findStudyParticipantsByStudyId function', async () => {
        const participants = await StudyParticipantDao.findStudyParticipantsByStudyId(studyParticipant1.studyId);
        expect(participants).toBeDefined();
        expect(participants.length).toBeGreaterThan(0);
        participants.forEach(participant => {
            expect(participant.studyId).toBeDefined();
            expect(participant.participantId).toBeDefined();
        });
    });

    it('check activateExistingParticipants function', async () => {
        const activatedParticipants = await StudyParticipantDao.activateExistingParticipants([studyParticipant1]);
        expect(activatedParticipants).toBeDefined();
        activatedParticipants.forEach(participant => {
            expect(participant.isActive).toBe(true);
        });
    });

    it('check updateStudyParticipantById function', async () => {
        const isSuccess = await StudyParticipantDao.updateStudyParticipantById(studyParticipant1._id, { note: "Updated note" });
        expect(isSuccess).toBe(true);
    });

    it('check toggleBooleanPropertyByIds function', async () => {
        const count = await StudyParticipantDao.toggleBooleanPropertyByIds([studyParticipant1._id, studyParticipant2._id], "isComplete");
        expect(count).toBeGreaterThan(0);
    });

    it('check getParticipantsByStudy function', async () => {
        const participants = await StudyParticipantDao.getParticipantsByStudy(studyParticipant1.studyId);
        expect(participants).toBeDefined();
        expect(participants[0].participantIds.length).toBeGreaterThan(0);
    });

    it('check deleteStudyParticipantById function', async () => {
        const deletedParticipant = await StudyParticipantDao.deleteStudyParticipantById(studyParticipant1._id);
        expect(deletedParticipant).toBeDefined();
        expect(deletedParticipant._id).toBeDefined();
    });

    it('should delete all StudyParticipants with the given studyId', async () => {
        // create test tudyParticipants
        const studyIdToDelete = studyParticipant1.studyId;

        // Make sure there are studyParticipants to be deleted in the database
        const initialParticipants = await StudyParticipant.find({ studyId: studyIdToDelete });
        expect(initialParticipants.length).toBeGreaterThan(0);

        // Call method to delete studyParticipants
        await StudyParticipantDao.deleteStudyParticipantsByStudyId(studyIdToDelete);

        // Verify that studyParticipants have been successfully deleted
        const remainingParticipants = await StudyParticipant.find({ studyId: studyIdToDelete });
        expect(remainingParticipants.length).toBe(0);
    });
});

