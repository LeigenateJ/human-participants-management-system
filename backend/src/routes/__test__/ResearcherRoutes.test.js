
import routes from '../researcher';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import request from 'supertest';
import Researcher from "../../database/researcher/domain/ResearcherDomain";
import bcrypt from "bcrypt";
import Study from "../../database/study/domain/StudyDomain";

let mongod;

// Create Express server. We don't need to start or stop it ourselves - we'll use the supertest package to manage this for us.
const app = express();
app.use(express.json())
app.use('/researcher', routes);


const studyId1 = new mongoose.Types.ObjectId('615cdd2f3d4f7e0016b4a6b1');
const studyId2 = new mongoose.Types.ObjectId('615cdd2f3d4f7e0016b4a6b2');
const studyId3 = new mongoose.Types.ObjectId('615cdd2f3d4f7e0016b4a6b3');

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



const researcher1 = {
    _id: new mongoose.Types.ObjectId('000000000000000000000001'),
    firstName: 'Test1',
    lastName: 'User1',
    email: 'test1@example.com',
    username: 'testuser1',
    password: 'testpassword1',
    studyList: [
        mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b1"),
        mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b2"),
        mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b3"),
        mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b4")
    ],
    isActive: true,
}

bcrypt.hash('testpassword1', 10, (err, hash) => {
        researcher1.password = hash;
});

const researcher2 = {
    _id: new mongoose.Types.ObjectId('000000000000000000000002'),
    firstName: 'Test2',
    lastName: 'User2',
    email: 'test2@example.com',
    username: 'testuser2',
    password: 'testpassword2',
    studyList: [
        mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b1"),
        mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b2"),
        mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b3"),
        mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b4")
    ],
    isActive: true,
}

const researcher3 = {
    _id: new mongoose.Types.ObjectId('000000000000000000000003'),
    firstName: 'Test3',
    lastName: 'User3',
    email: 'test3@example.com',
    username: 'testuser3',
    password: 'testpassword3',
    studyList: [
        study1._id, study2._id
    ],
    isActive: false,
}

const researchers = [researcher1, researcher2, researcher3]



beforeAll(async () => {

    mongod = await MongoMemoryServer.create();

    const connectionString = mongod.getUri();
    await mongoose.connect(connectionString, { useNewUrlParser: true });
});


beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await Study.insertMany(studies);
    await Researcher.insertMany(researchers);
});

afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
})

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
    await mongod.stop();
});


describe('Researcher Router', () => {

    it('log in ',  async () => {

          const  username = 'testuser1';
          const  password = 'testpassword1';

        const res = await request(app).post('/researcher/login').send({username, password}).expect(200);

        expect(res.body.message).toBe('Login Success');
        expect(res.body.result._id).toBe('000000000000000000000001');
        expect(typeof res.body.result.token).toBe('string');
    });

    it('log out ',  async () => {

        const res = await request(app).get('/researcher/logout').expect(200);

        expect(res.body.message).toBe('Logout Success');
    });


    it('should retrieve researcher info by id', async () => {

        const researcherId = '000000000000000000000003';

        const res = await request(app).get(`/researcher/info/${researcherId}`).expect(200);


        const researcherInfoFromApi = res.body.result;
        expect(researcherInfoFromApi).toBeTruthy();
        expect(researcherInfoFromApi.firstName).toBe('Test3');
        expect(researcherInfoFromApi.lastName).toBe('User3');
        expect(researcherInfoFromApi.email).toBe('test3@example.com');
        expect(researcherInfoFromApi.studyList.length).toBe(2);


    });

    it('should update info by id',  async () => {
        const req = {
            firstName: 'newTest3',
            lastName: 'newUser3',
            email: 'newtest3@example.com',
            id: '000000000000000000000003'
        }

       const res = await request(app).put(`/researcher/update/info`).send(req).expect(200);

        expect(res.body.message).toBe('Update success');
            })


    it('should reset user password', async () => {
        const req = {
            currentPwd: 'testpassword1',
            newPwd: 'newtestpassword1',
            id: '000000000000000000000001'
        }

        const res = await request(app).put(`/researcher/resetPwd`).send(req).expect(200);

        expect(res.body.message).toBe('Reset password success');

    });

    it('should retrieve researcher\'s study list',  async () => {
        const researcherId = '000000000000000000000003';

        const res = await request(app).get(`/researcher/list/${researcherId}`).expect(200);

        const studyListInfoFromApi = res.body;
        expect(studyListInfoFromApi).toBeTruthy();
        expect(studyListInfoFromApi.length).toBe(2);
        expect(studyListInfoFromApi[0]._id).toBe('615cdd2f3d4f7e0016b4a6b1');
        expect(studyListInfoFromApi[0].studyCode).toBe('S12345');
        expect(studyListInfoFromApi[0].studyName).toBe('Test Study1');
        expect(studyListInfoFromApi[0].description).toBe('A description of the test study');
        expect(studyListInfoFromApi[0].creator).toBe('64fe98fdae1ff28bdcd455a7');
        expect(studyListInfoFromApi[0].researcherList.length).toBe(1);
        expect(studyListInfoFromApi[0].studyType).toBe('interview');
        expect(studyListInfoFromApi[0].anonymousParticipantNum).toBe(5);
        expect(studyListInfoFromApi[0].participantNum).toBe(100);
        expect(typeof studyListInfoFromApi[0].recruitmentStartDate).toBe('string');
        expect(typeof studyListInfoFromApi[0].recruitmentCloseDate).toBe('string');
        expect(studyListInfoFromApi[0].location.length).toBe(2);
        expect(studyListInfoFromApi[0].isClosed).toBe(false);
        expect(studyListInfoFromApi[0].surveyLink).toBe('http://example.com/survey');
        expect(studyListInfoFromApi[0].driveLink).toBe('http://example.com/drive');


    });

    it('should retrieve researcher by email',  async () => {
        const researcherEmail = 'test2@example.com';
        const res = await request(app).get(`/researcher/email/${researcherEmail}`).expect(200);
        const researcherInfoFromApi = res.body;
        expect(researcherInfoFromApi.firstName).toBe('Test2');
        expect(researcherInfoFromApi.lastName).toBe('User2');
        expect(researcherInfoFromApi.email).toBe('test2@example.com');
        expect(researcherInfoFromApi.studyList.length).toBe(4);
    });

    it('should create new researcher',  async () => {

       const firstName = 'newFirstName';
       const lastName =  'newLastName';
       const  email = 'newEmail1234@gmail.com';
       const  username ='newUsername';

        const res = await request(app).post(`/researcher/add`).send({firstName, lastName, email, username}).expect(200);
        expect(res.body.message).toBe('Create new researcher success');
    });


    it('should retrieve studyList by researcherId',  async () => {
        const researcherId = '000000000000000000000001';

        const res = await request(app).get(`/researcher/studyList/${researcherId}`).expect(200);

                const studyListInfo = res.body;

                expect(studyListInfo.length).toBe(3);

    });


    it('should get all researcher',  async () =>  {

        const res = await request(app).get(`/researcher/allResearchers`).expect(200);

                const researcherListInfoFromApi = res.body;
                expect(researcherListInfoFromApi.length).toBe(3);

                expect(researcherListInfoFromApi[0].firstName).toBe('Test1');
                expect(researcherListInfoFromApi[0].lastName).toBe('User1');
                expect(researcherListInfoFromApi[0].email).toBe('test1@example.com');
                expect(researcherListInfoFromApi[0].studyList.length).toBe(4);

    });


})

