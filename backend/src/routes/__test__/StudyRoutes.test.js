import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import routes from '../study';
import Study from '../../database/study/domain/StudyDomain';
import Researcher from '../../database/researcher/domain/ResearcherDomain';

let server;
let mongod;

const app = express();
app.use(express.json());
app.use('/study', routes);

const studyId1 = new mongoose.Types.ObjectId('000000000000000000000001');
const studyId2 = new mongoose.Types.ObjectId('000000000000000000000002');
const studyId3 = new mongoose.Types.ObjectId('000000000000000000000003');

const study1 = {
    _id: studyId1,
    studyCode: "S12345",
    studyName: "Test Study1",
    description: "A description of the test study",
    creator: mongoose.Types.ObjectId('64fe98fdae1ff28bdcd455a7'),
    researcherList: [mongoose.Types.ObjectId('64fe98fdae1ff28bdcd455a7')],
    studyType: "interview",
    isAnonymous: true,
    anonymousParticipantNum: 5,
    participantNum: 100,
    recruitmentStartDate: new Date(),
    recruitmentCloseDate: new Date(),
    location: ["New York", "London"],
    surveyLink: "http://example.com/survey",
    driveLink: "http://example.com/drive"
};

const study2={
    _id: studyId2,
    studyCode: "Study123456",
    studyName: "Test Study2",
    description: "A description of the test study",
    creator: mongoose.Types.ObjectId('64fe98fdae1ff28bdcd455a7'),
    researcherList: [mongoose.Types.ObjectId('64fe98fdae1ff28bdcd455a7')],
    studyType: "interview",
    isAnonymous: true,
    anonymousParticipantNum: 10,
    participantNum: 110,
    recruitmentStartDate: new Date(),
    recruitmentCloseDate: new Date(),
    location: ["Auckland", "Wellington"],
    surveyLink: "http://example.com/survey",
    driveLink: "http://example.com/drive"
}

const study3={
    _id: studyId3,
    studyCode: "Study123456789",
    studyName: "Test Study3",
    description: "A description of the test study",
    creator: mongoose.Types.ObjectId('64fe98fdae1ff28bdcd455a7'),
    researcherList: [mongoose.Types.ObjectId('64fe98fdae1ff28bdcd455a7'),
                    mongoose.Types.ObjectId('64fe98fdae1ff28bdcd455a8')],
    studyType: "interview",
    isAnonymous: true,
    anonymousParticipantNum: 10,
    participantNum: 110,
    recruitmentStartDate: new Date(),
    recruitmentCloseDate: new Date(),
    location: ["Christchurch", "Wellington"],
    surveyLink: "http://example.com/survey",
    driveLink: "http://example.com/drive"
}
const studies=[study1, study2, study3];

const researcher1 = new Researcher({
    _id:  new mongoose.Types.ObjectId('64fe98fdae1ff28bdcd455a7'),
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    username: "johndoe",
    password:"123456",
    studyList: [study1._id, study2._id],
    isActive: true
});

const researcher2 = new Researcher({
    _id: new mongoose.Types.ObjectId('64fe98fdae1ff28bdcd455a8'),
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    username: "janedoe",
    password:"123456",
    studyList: [],
    isActive: true
});

const researchers= [researcher1, researcher2];


beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

});


beforeEach(async() => {
    await mongoose.connection.db.dropDatabase();
    await Study.insertMany(studies);
    await Researcher.insertMany(researchers);
    
});


afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.disconnect();
        await mongod.stop();
});





describe('Study Router', () => {

    it('should retrieve study details by studyId', async () => {

      // Making a request to retrieve the study by ID
    const res = await request(app).get(`/study/${study1._id}`);

    // Expectations:
    expect(res.status).toBe(200); // Expecting a HTTP 200 status code
    expect(res.body.studyCode).toBe("S12345");
    expect(res.body.studyName).toBe("Test Study1");
    expect(res.body.description).toBe("A description of the test study");
    });


    it('should edit study details by studyId', async () => {

        const updatedData = {
            studyCode: "S123457",
            studyName: "Updated Study Name",
            description: "Updated description"
        };
        const res = await request(app).put(`/study/${study1._id}`).send(updatedData);
            expect(res.status).toBe(200);
            expect(res.body.studyCode).toBe(updatedData.studyCode);
            expect(res.body.studyName).toBe(updatedData.studyName);
            expect(res.body.description).toBe(updatedData.description);
    });


    //Test creating study and associating with a researcher
    it('should create a new study and associate it with a researcher', async () => {
        const newStudyData = {
            studyCode: "createStudy003",
            studyName: "Test Study Create",
            description: "A description of the created study",
            creator: mongoose.Types.ObjectId('64fe98fdae1ff28bdcd455a7'),
            researcherList: [mongoose.Types.ObjectId('64fe98fdae1ff28bdcd455a7')],
            studyType: "interview",
            isAnonymous: true,
            anonymousParticipantNum: 10,
            participantNum: 110,
            recruitmentStartDate: new Date(),
            recruitmentCloseDate: new Date(),
            location: ["Auckland", "Wellington"],
            surveyLink: "http://example.com/survey",
            driveLink: "http://example.com/drive"
        };

        const res = await request(app)
            .post(`/study/${researcher1._id}`)
            .send(newStudyData);

        expect(res.status).toBe(201); // Expecting a HTTP 201 status code (Created)
        expect(res.body.study.studyCode).toBe(newStudyData.studyCode);
        expect(res.body.study.studyName).toBe(newStudyData.studyName);

    });


    //test cannot create study with duplicate code
    it('should fail creating a new study with duplicate study code', async () => {
        const duplicateStudyData = {
            studyCode: "S12345",  // same code as study1
            studyName: "Duplicate Study",
            description: "A description of the created study",
            creator: mongoose.Types.ObjectId('64fe98fdae1ff28bdcd455a7'),
            researcherList: [mongoose.Types.ObjectId('64fe98fdae1ff28bdcd455a7')],
            studyType: "interview",
            isAnonymous: true,
            anonymousParticipantNum: 10,
            participantNum: 110,
            recruitmentStartDate: new Date(),
            recruitmentCloseDate: new Date(),
            location: ["Auckland", "Wellington"],
            surveyLink: "http://example.com/survey",
            driveLink: "http://example.com/drive"
        };

        const res = await request(app)
            .post(`/study/${researcher1._id}`)
            .send(duplicateStudyData);

        expect(res.status).toBe(400); // Expecting a HTTP 400 status code (Bad Request)
        expect(res.body.message).toBe('Study code already exists');
    });

    //Test querying existing researchers in a study by studyId;
    it('should query existing researchers in a study by studyId', async () => {
        const res = await request(app).get(`/study/researcher/list/${study1._id}`);
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBe(1); 
        expect(res.body[0]._id).toBe(researcher1._id.toString());
    });

    //Test remove existing researchers in a study by studyId;
    it('should remove a researcher from study and vice versa', async () => {
        const res = await request(app).put(`/study/removeResearcher/${study3._id}/${researcher2._id}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Researcher removed from study and study removed from researcher');
    });

    //Test not removing the creator from the study
    it('should not remove the creator from the study', async () => {
        const res = await request(app).put(`/study/removeResearcher/${study1._id}/${researcher1._id}`);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Can not delete creator');
    });


    //Test associating a researcher with a study
    it('should associate a researcher with a study', async () => {
        const res = await request(app).put(`/study/associateResearcher/${study3._id}/${researcher2._id}`);
        
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Researcher associated with study');
    });

    //Test adding a new researcher and associating with an existing study
    it('should add a new researcher and associate with an existing study', async () => {
        const newResearcherData = {
                firstName: "Alice",
                lastName: "Smith",
                email: "alice.smith@example.com"
        };

        const res = await request(app).post(`/study/addResearcher/${study1._id}`).send(newResearcherData);
        
        expect(res.status).toBe(200);
        expect(res.body.username).toBe('alice.smith');
        expect(res.body.message).toBe('New researcher added & study updated successfully');
    });


    //Retriving study report by studyId
    it('should retrieve a study report by studyId', async () => {
        const res = await request(app).get(`/study/studyReport/${study1._id}`);
        expect(res.status).toBe(200);
        expect(res.body.studyId).toBe(study1._id.toString());
        expect(res.body.studyCode).toBe(study1.studyCode);
        expect(res.body.name).toBe(study1.studyName);
        expect(res.body.description).toBe(study1.description);
    });
});