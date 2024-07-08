import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import request from 'supertest';
import routes from '../participant';
import Participant from '../../database/participant/domain/ParticipantDomain';
import Tag from '../../database/tag/domain/TagDomain';
import StudyParticipant from '../../database/studyParticipant/domain/StudyParticipantDomain';
import Study from '../../database/study/domain/StudyDomain';

const app = express();
app.use(express.json());
app.use('/participant', routes);

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

describe('Participant Router', () => {
    // Test GET /participant/:participantId
    it('should retrieve a participant by participantId', async () => {
        const res = await request(app).get(`/participant/${participant1._id}`);
        expect(res.status).toBe(200);
        expect(res.body.firstName).toBe('John');
        expect(res.body.lastName).toBe('Doe');
        expect(res.body.email).toBe('john.doe@example.com');
        expect(res.body.phoneNum).toBe('012-345-8974');
        expect(res.body.isWillContact).toBe(false);
        expect(res.body.tag).toEqual([mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a9b8").toString(), 
            mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a9b9").toString()]
        );
    });

    // Test GET /all
    it('should retrieve all participant ids', async () => {
        const res = await request(app).get('/participant/all');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(2);
    });

    // Test POST /participant
    it('should create a new participant', async () => {
        const newParticipant = [{
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane@example.com',
            phoneNum: '012-345-6789',
            isWillContact: false,
            tag: [
                mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a9b8"),
                mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a9b9")
            ]
        }];
        const res = await request(app).post('/participant/add').send({ participants: newParticipant });
        expect(res.status).toBe(201);
        expect(res.body.success[0].firstName).toBe('Jane');
        expect(res.body.success[0].lastName).toBe('Smith');
        expect(res.body.success[0].email).toBe('jane@example.com');
        expect(res.body.success[0].phoneNum).toBe('012-345-6789');
        expect(res.body.success[0].isWillContact).toBe(false);
        expect(res.body.success[0].tag).toEqual(
            [mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a9b8").toString(),
            mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a9b9").toString()]
        );
    });

    // Test PUT /participant/:participantId
    it('should update a participant', async () => {
        const updatedParticipant = {
            firstName: 'Johnny',
            lastName: 'Doe',
            email: 'johnny@example.com',
            phoneNum: '012-345-8974',
            isWillContact: false,
            tag: [
                mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a9b8"),
                mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a9b9")
            ]
        };
        const res = await request(app).put(`/participant/${participant1._id}`).send(updatedParticipant);
        expect(res.status).toBe(204);
        const res2 = await request(app).get(`/participant/${participant1._id}`);
        expect(res2.body.firstName).toBe('Johnny');
        expect(res2.body.lastName).toBe('Doe');
        expect(res2.body.email).toBe('johnny@example.com');
        expect(res2.body.phoneNum).toBe('012-345-8974');
        expect(res2.body.isWillContact).toBe(false);
        expect(res2.body.tag).toEqual([mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a9b8").toString(),mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a9b9").toString()]);
    });

    // Test PUT /update-tag
    it('should update tag for multiple participants', async () => {
        const res = await request(app).put('/participant/update-tag').send({
            updateIds: [participant1._id, participant2._id],
            tagId: '615cdd2f3d4f7e0016b4a9b0'
        });
        expect(res.status).toBe(200);
        expect(res.body.message).toMatch(/documents updated successfully/);
        const res2 = await request(app).get(`/participant/${participant1._id}`);
        const res3 = await request(app).get(`/participant/${participant2._id}`);
        expect(res2.body.tag).toEqual([mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a9b8").toString(),
            mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a9b9").toString(),
            mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a9b0").toString()]
        );
        expect(res3.body.tag).toEqual([mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a9b9").toString(),mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a9b0").toString()]);
    });

    // Test PUT /delete-tag
    it('should delete tag for multiple participants', async () => {
        const res = await request(app).put('/participant/delete-tag').send({
            deleteIds: [participant1._id, participant2._id],
            tagId: '615cdd2f3d4f7e0016b4a9b9'
        });
        expect(res.status).toBe(200);
        expect(res.body.message).toMatch(/documents updated successfully/);
        const res2 = await request(app).get(`/participant/${participant1._id}`);
        const res3 = await request(app).get(`/participant/${participant2._id}`);
        expect(res2.body.tag).toEqual([mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a9b8").toString()]);
        expect(res3.body.tag).toEqual([]);
    });

    // Test PUT /toggle-property
    it('should toggle a boolean property for multiple participants', async () => {
        const res = await request(app).put('/participant/toggle-property').send({
            ids: [participant1._id, participant2._id],
            propertyName: 'isWillContact'
        });
        expect(res.status).toBe(200);
        expect(res.body.message).toMatch(/documents updated successfully/);
        const res2 = await request(app).get(`/participant/${participant1._id}`);
        const res3 = await request(app).get(`/participant/${participant2._id}`);
        expect(res2.body.isWillContact).toBe(true);
        expect(res3.body.isWillContact).toBe(true);
    });

    // Test DELETE /anonymize-participants/:studyId
    it('should delete participants in a closed study', async () => {
        const studyId = '615cdd2f3d4f7e0016b4a6a1';
        const res = await request(app).delete(`/participant/anonymize-participants/${studyId}`);
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.updatedCount).toBe(1);
        const foundParticipant = await Participant.findById(participant1._id);
        expect(foundParticipant).toBeNull();
    });

    // Test DELETE /participant/:participantId
    it('should delete a participant', async () => {
        const res = await request(app).delete(`/participant/${participant1._id}`);
        expect(res.status).toBe(204);
        const foundParticipant = await Participant.findById(participant1._id);
        expect(foundParticipant).toBeNull();
    });
});
