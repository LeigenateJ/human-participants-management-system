import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import SessionDao from '../dao/SessionDao';
import Session from '../domain/SessionDomain';
import Participant from '../../participant/domain/ParticipantDomain';

// Testing data
const session1 = {
    _id: new mongoose.Types.ObjectId('000000000000000000000001'),
    studyId: mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6a1"),
    sessionCode: 'SE5566',
    date: new Date("2023-08-15"),
    time: "14:00",
    location: "Room A",
    note: "Testing",
    participantNum: 10,
    participantList: [
        mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b1"),
        mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b2"),
        mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b3"),
        mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b4")
    ],
    isArchive: true,
    createdAt: new Date(),
    updatedAt: new Date()
};

const session2 = {
    _id: new mongoose.Types.ObjectId('000000000000000000000002'),
    studyId: mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6a2"),
    sessionCode: 'SE45893',
    date: new Date("2023-09-05"),
    time: "10:30",
    location: "Conference Room B",
    note: "More participants needed.",
    participantNum: 20,
    participantList: [
        mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b2"),
        mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b3"),
        mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b4")
    ],
    isArchive: false,
    createdAt: new Date(),
    updatedAt: new Date()
};

const session3 = {
    _id: new mongoose.Types.ObjectId('000000000000000000000003'),
    studyId: mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6a1"),
    sessionCode: 'SE4587',
    date: new Date("2023-09-15"),
    time: "14:00",
    location: "Room 301",
    note: '',
    participantNum: 30,
    participantList: [
        mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b1"),
        mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b2"),
        mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b3")
    ],
    isArchive: false,
    createdAt: new Date(),
    updatedAt: new Date()
};


const sessions = [session1, session2, session3];

let mongod;

/**
 * Before all tests, create an in-memory MongoDB instance so we don't have to test on a real database,
 * then establish a mongoose connection to it.
 */
beforeAll(async () => {

    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri(), { useNewUrlParser: true });

});

/**
 * Before each test, initialize the database with some data
 */
beforeEach(async () => {

    await mongoose.connection.db.dropDatabase();
    await Session.insertMany(sessions);
});


/**
 * After all tests, gracefully terminate the in-memory MongoDB instance and mongoose connection.
 */
afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
    await mongod.stop();
});

describe ('Check session dao', () => {
    

    it ('Check the return value of retrieveSessionById function', async () => {
        const result = await SessionDao.retrieveSessionById('000000000000000000000002')
        expect(result.studyId).toEqual(mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6a2"));
        expect(result.sessionCode).toBe('SE45893');
        expect(result.date.toISOString().split('T')[0]).toEqual('2023-09-05');
        expect(result.time).toBe('10:30');
        expect(result.location).toBe('Conference Room B');
        expect(result.note).toBe('More participants needed.');
        expect(result.participantNum).toBe(20);
        expect(result.participantList.length).toBe(3);
        expect(result.isArchive).toBe(false);
    });

    it ('Check the return value of retrieveSessionByStudyId function', async () => {
        const result = await SessionDao.retrieveSessionByStudyId('615cdd2f3d4f7e0016b4a6a1');
        expect(result).toBeDefined();
        expect(result.length).toBe(2);
        expect(result[0]).toEqual(expect.objectContaining({
            _id: expect.any(Object),
            studyId: expect.any(Object),
            sessionCode: expect.any(String),
            date: expect.any(Date),
            time: expect.any(String),
            location: expect.any(String),
            note: expect.any(String),
            participantNum: expect.any(Number),
            participantList: expect.any(Array),
            isArchive: expect.any(Boolean),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
    });

    it ('Check the return value of createSession function', async () => {
        const newSession = {
            studyId: mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6a3"),
            sessionCode: 'SE4599',
            date: new Date("2023-10-05"),
            time: "11:30",
            location: "Conference Room A",
            note: '',
            participantNum: 20,
            participantList: [
                mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b3"),
                mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b4"),
                mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b5")
            ],
            isArchive: false 
        }
        
        const result = await SessionDao.createSession(newSession);
        expect(result).toBeDefined();

        const fromDb = await mongoose.connection.db.collection('Session').findOne({ _id: result._id });
        expect(fromDb.studyId).toEqual(mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6a3"));
        expect(fromDb.sessionCode).toBe('SE4599');
        expect(fromDb.date.toISOString().split('T')[0]).toEqual('2023-10-05');
        expect(fromDb.time).toBe('11:30');
        expect(fromDb.location).toBe('Conference Room A');
        expect(fromDb.note).toBe('');
        expect(fromDb.participantNum).toBe(20);
        expect(fromDb.participantList.length).toBe(3);
        expect(fromDb.isArchive).toBe(false);
    });

    it ('Check the return value of updateSession function', async () => {
        
        const updatedSession = {
            _id: mongoose.Types.ObjectId('000000000000000000000003'),
            studyId: mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6a3"),
            sessionCode: 'SE4599',
            date: new Date("2023-11-05"),
            time: "15:30",
            location: "Room 312",
            note: 'Arrange another time',
            participantNum: 15,
            participantList: [
                mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b3"),
                mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b4"),
                mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6b5"),
                mongoose.Types.ObjectId("615aef8f1d8e5a001f8e6b11")
            ],
            isArchive: false 
        }
        
        const result = await SessionDao.updateSession(updatedSession._id, updatedSession);
        expect(result).toBeDefined();

        const fromDb = await mongoose.connection.db.collection('Session').findOne({ _id: updatedSession._id});
        expect(fromDb.studyId).toEqual(mongoose.Types.ObjectId("615cdd2f3d4f7e0016b4a6a3"));
        expect(fromDb.sessionCode).toBe('SE4599');
        expect(fromDb.date.toISOString().split('T')[0]).toEqual('2023-11-05');
        expect(fromDb.time).toBe('15:30');
        expect(fromDb.location).toBe('Room 312');
        expect(fromDb.note).toBe('Arrange another time');
        expect(fromDb.participantNum).toBe(15);
        expect(fromDb.participantList.length).toBe(4);
        expect(fromDb.isArchive).toBe(false);
    });


});
