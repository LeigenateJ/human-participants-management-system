import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import {ResearcherDao} from "../dao/ResearcherDao";
import Researcher from "../domain/ResearcherDomain";
import e from "express";



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
        mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b1"),
        mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b2"),
        mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b3"),
        mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b4")
    ],
    isActive: false,
}

const researchers = [researcher1, researcher2, researcher3]


let mongod;

beforeAll(async () => {

    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri(), { useNewUrlParser: true });

});

beforeEach(async () => {

    await Researcher.insertMany(researchers);
});

afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
})


afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});


describe( 'Check researcher dao', () => {
        it ('Check the return value of retrieveResearcherList function', async () => {
            const result = await ResearcherDao.retrieveResearcherList();
            expect(result).toBeDefined;
            expect(result.length).toBe(3);
            expect(result[0]).toEqual(expect.objectContaining({
                _id: expect.any(Object),
                firstName: expect.any(String),
                lastName: expect.any(String),
                email: expect.any(String),
                username: expect.any(String),
                password: expect.any(String),
                studyList: expect.any(Array),
                isActive: expect.any(Boolean),
            }))
        });

        it ('Check the return value of getResearcherById function', async () => {
            const result = await ResearcherDao.getResearcherById('000000000000000000000001');
            expect(result.firstName).toBe('Test1');
            expect(result.lastName).toBe('User1');
            expect(result.email).toBe('test1@example.com');
            expect(result.username).toBe('testuser1');
            expect(result.password).toBe('testpassword1');
            expect(result.studyList.length).toBe(4);
            expect(result.isActive).toBe(true);
        });

        it ('Check the return value of getResearcherByEmail function', async () => {
            const result = await ResearcherDao.getResearcherByEmail('test2@example.com');
            expect(result.firstName).toBe('Test2');
            expect(result.lastName).toBe('User2');
            expect(result.email).toBe('test2@example.com');
            expect(result.username).toBe('testuser2');
            expect(result.password).toBe('testpassword2');
            expect(result.studyList.length).toBe(4);
            expect(result.isActive).toBe(true);
        });


        it ('Check the return value of createResearcher function', async () => {
            const newResearcher = {
                firstName: 'Test4',
                lastName: 'User4',
                email: 'test4@example.com',
                username: 'testuser4',
                password: 'testpassword4',
                studyList: [
                    mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b1"),
                    mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b2"),
                    mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b3"),
                    mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b4")
                ],
                isActive: true,
            }

            const result = await ResearcherDao.createResearcher(newResearcher);

            expect(result.firstName).toBe('Test4');
            expect(result.lastName).toBe('User4');
            expect(result.email).toBe('test4@example.com');
            expect(result.username).toBe('testuser4');
            expect(typeof result.password).toBe('string');
            expect(result.studyList.length).toBe(4);
            expect(result.isActive).toBe(true);
        })


        it ('Check the return value of updateResearcher function', async () => {
            const objectResearcher = {
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

            const result = await ResearcherDao.updateResearcher(objectResearcher,
                'newTest1', 'newUser1', 'newTest1@example.com');
            expect(result).toBe(false);
        })

        it ('Check the return value of updateResearcherByResearcherId function', async () => {
            const objectResearcherId = '000000000000000000000002';
            const objectStudyId = '615cdd2f3d4f7e0016b4a6b1';


            const result = await ResearcherDao.updateResearcherByResearcherId(objectResearcherId, objectStudyId);
            expect(result).toBe(true);
        })


        it ('Check the return value of login function', async () => {
            const objectUsername = 'testuser1';


            const result = await ResearcherDao.login(objectUsername);
            expect(result.firstName).toBe('Test1');
            expect(result.lastName).toBe('User1');
            expect(result.email).toBe('test1@example.com');
            expect(result.username).toBe('testuser1');
            expect(typeof result.password).toBe('string');
            expect(result.studyList.length).toBe(4);
            expect(result.isActive).toBe(true);
        })


        it ('Check the return value of resetResearcherPwd function', async () => {
            const objectResearcher = {
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

            const newPassword = 'newTestpassword1';


            const result = await ResearcherDao.resetResearcherPwd(objectResearcher, newPassword);
            expect(result).toBeDefined;
        })



        it ('Check the return value of removeStudyfromResearcher function', async () => {
            const objectResearcherId = '000000000000000000000002';
            const objectStudyId = '615cdd2f3d4f7e0016b4a6b1';


            const result = await ResearcherDao.removeStudyfromResearcher(objectStudyId, objectResearcherId);

            expect(result.success).toBe(true);
            expect(result.message).toBe('study removed from researcher');
        })








    }

)