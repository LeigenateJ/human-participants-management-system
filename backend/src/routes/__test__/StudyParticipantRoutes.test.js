import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import request from 'supertest';
import routes from '../studyParticipant';
import Participant from '../../database/participant/domain/ParticipantDomain';
import Tag from '../../database/tag/domain/TagDomain';
import StudyParticipant from '../../database/studyParticipant/domain/StudyParticipantDomain';
import Study from '../../database/study/domain/StudyDomain';

const app = express();
app.use(express.json());
app.use('/studyParticipant', routes);

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
    isClosed: false,
    surveyLink: "https://survey.example.com/study002",
    driveLink: "https://drive.example.com/study002"
};

const study3 = {
    _id: new mongoose.Types.ObjectId('615cdd2f3d4f7e0016b4a6a3'),
    studyCode: "STUDY003",
    studyName: "AI Study",
    description: "A study about the AI.",
    creator: new mongoose.Types.ObjectId('601234567890123456789015'),
    researcherList: [
        new mongoose.Types.ObjectId('601234567890123456789016')
    ],
    studyType: "Online-survey",
    isAnonymous: true,
    anonymousParticipantNum: 50,
    participantNum: 200,
    recruitmentStartDate: new Date('2023-11-01'),
    recruitmentCloseDate: new Date('2024-01-01'),
    location: ["San Francisco", "Chicago"],
    isClosed: false,
    surveyLink: "https://survey.example.com/study002",
    driveLink: "https://drive.example.com/study002"
};

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

const studyParticipant3 = {
    _id: new mongoose.Types.ObjectId('000000000000000000000003'),
    studyId: mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6a1"),
    participantId: mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b2"),
    serialNum: 3,
    isActive: true,
    isComplete: false,
    isGift: false,
    isSentGift: false,
    isWillReceiveReport: false,
    isSentReport: false,
    note: "Note for participant 3"
};

const participant1 = {
    _id: mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b1"),
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNum: "012-345-8974",
    isWillContact: false,
    tag: [mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a9b8"), mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a9b9")]
};

const participant2 = {
    _id: mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b2"),
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    phoneNum: "012-345-8974",
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

const tag3 = {
    _id: mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a9b0"),
    tagName: "tag003"
};

let mongod;

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri(), { useNewUrlParser: true });
});

beforeEach(async () => {
    await Tag.insertMany([tag1, tag2, tag3]);
    await Participant.insertMany([participant1, participant2]);
    await Study.insertMany([study1, study2]);
    await StudyParticipant.insertMany([studyParticipant1, studyParticipant2, studyParticipant3])
});

afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

describe('StudyParticipant Router', () => {
    // Test GET /studyparticipant/count/:studyId
    it('should retrieve the count of active study participants by studyId', async () => {
        const res = await request(app).get(`/studyparticipant/count/${study1._id}`);
        expect(res.status).toBe(200);
        expect(res.body.count).toBeDefined();
        expect(res.body.count).toEqual(2);
    });

    // Test GET /studyparticipant/:studyId
    it('should retrieve all related participants by studyId', async () => {
        const res = await request(app).get(`/studyparticipant/${study1._id}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body[0].participantInfo.firstName).toBe(participant1.firstName);
        expect(res.body[1].participantInfo.firstName).toBe(participant2.firstName);
        expect(res.body[0].serialNum).toBe(1);
        expect(res.body[1].serialNum).toBe(3);
        expect(res.body[0].participantInfo.tagsInfo).toEqual([tag1.tagName, tag2.tagName]);
        expect(res.body[1].participantInfo.tagsInfo).toEqual([tag2.tagName]);
    });

    // Test POST /studyparticipant/:studyId
    it('should add participants to the study', async () => {
        const newParticipants = {
            participantIds: [participant1._id, participant2._id]
        };
        const res = await request(app).post(`/studyparticipant/${study3._id}`).send(newParticipants);
        expect(res.status).toBe(201);
        expect(res.body.length).toBe(2);
        expect(res.body[0].participantInfo.firstName).toBe(participant1.firstName);
        expect(res.body[1].participantInfo.firstName).toBe(participant2.firstName);
        expect(res.body[0].serialNum).toBe(1);
        expect(res.body[1].serialNum).toBe(2);
        expect(res.body[0].participantInfo.tagsInfo).toEqual([tag1.tagName, tag2.tagName]);
        expect(res.body[1].participantInfo.tagsInfo).toEqual([tag2.tagName]);
    });

    // Test PUT /studyparticipant/toggle-property
    it('should toggle a boolean property for multiple study-participants by their IDs', async () => {
        const data = {
            ids: [studyParticipant1._id, studyParticipant3._id],
            propertyName: 'isGift'
        };
        const res = await request(app).put('/studyparticipant/toggle-property').send(data);
        expect(res.status).toBe(200);
        expect(res.body.message).toBeDefined();
        expect(res.body.message).toMatch(/documents updated successfully/);
        const res2 = await request(app).get(`/studyparticipant/${study1._id}`);
        expect(res2.status).toBe(200);
        expect(Array.isArray(res2.body)).toBe(true);
        expect(res2.body[0].isGift).toBe(true);
        expect(res2.body[1].isGift).toBe(true);

    });

    // Test PUT /studyparticipant/:studyParticipantId
    it('should update a study participant', async () => {
        const updatedData = {
            note: "Updated note for participant 1"
        };
        const res = await request(app).put(`/studyparticipant/${studyParticipant1._id}`).send(updatedData);
        expect(res.status).toBe(204);
        const res2 = await request(app).get(`/studyparticipant/${study1._id}`);
        expect(res2.status).toBe(200);
        expect(Array.isArray(res2.body)).toBe(true);
        expect(res2.body[0].note).toBe('Updated note for participant 1');
    });

    // Test DELETE /studyparticipant/:studyParticipantId
    it('should delete a study participant', async () => {
        const res = await request(app).delete(`/studyparticipant/${studyParticipant1._id}`);
        expect(res.status).toBe(204);
        const foundParticipant = await StudyParticipant.findById(studyParticipant1._id);
        expect(foundParticipant).toBeNull();
    });

});

