import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Researcher from "../domain/ResearcherDomain";


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

    // Drop existing collections
    await mongoose.connection.db.dropDatabase();
    // Create new collections
    // const collection = await mongoose.connection.db.createCollection('Researcher');
    await Researcher.insertMany(researchers);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});


describe ('Check session schema', () => {
    it('get sessions', async () => {

        const researchersFromDb = await Researcher.find();
        expect(researchersFromDb).toBeTruthy();
        expect(researchersFromDb.length).toBe(3);

        expect(researchersFromDb[0].firstName).toBe('Test1');
        expect(researchersFromDb[0].lastName).toBe('User1');
        expect(researchersFromDb[0].email).toBe('test1@example.com');
        expect(researchersFromDb[0].username).toBe('testuser1');
        expect(researchersFromDb[0].password).toBe('testpassword1');
        expect(researchersFromDb[0].studyList.length).toBe(4);
        expect(researchersFromDb[0].isActive).toBe(true);

        expect(researchersFromDb[1].firstName).toBe('Test2');
        expect(researchersFromDb[1].lastName).toBe('User2');
        expect(researchersFromDb[1].email).toBe('test2@example.com');
        expect(researchersFromDb[1].username).toBe('testuser2');
        expect(researchersFromDb[1].password).toBe('testpassword2');
        expect(researchersFromDb[1].studyList.length).toBe(4);
        expect(researchersFromDb[1].isActive).toBe(true);

        expect(researchersFromDb[2].firstName).toBe('Test3');
        expect(researchersFromDb[2].lastName).toBe('User3');
        expect(researchersFromDb[2].email).toBe('test3@example.com');
        expect(researchersFromDb[2].username).toBe('testuser3');
        expect(researchersFromDb[2].password).toBe('testpassword3');
        expect(researchersFromDb[2].studyList.length).toBe(4);
        expect(researchersFromDb[2].isActive).toBe(false);

    });
});