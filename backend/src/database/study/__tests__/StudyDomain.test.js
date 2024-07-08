import mongoose from "mongoose";
import {MongoMemoryServer} from "mongodb-memory-server";
import Study from "../domain/StudyDomain";


let mongod;

const studyId1 = new mongoose.Types.ObjectId('000000000000000000000001');
const studyId2 = new mongoose.Types.ObjectId('000000000000000000000002');

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


const studies=[study1, study2];


beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const connectionString = mongod.getUri();
    await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
});

beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await Study.insertMany(studies);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});





it('gets studies', async () => {
    expect(studies).toBeTruthy();
    expect(studies.length).toBe(2); // Expecting 2 studies
    expect(studies[0].studyName).toBe("Test Study1");
    expect(studies[0].studyCode).toBe("S12345");
    // Assertions for the second study
    expect(studies[1].studyName).toBe("Test Study2");
    expect(studies[1].studyCode).toBe("Study123456");
});




it('gets a single study', async () => {
    const study = await Study.findById(studyId1);
    expect(study.studyName).toBe("Test Study1");
    expect(study.studyCode).toBe("S12345");
    expect(study.isAnonymous).toBe(true);
    expect(study.anonymousParticipantNum).toBe(5);
});

it('adds a study without crashing', async () => {
    const newStudy = new Study({
        studyCode: "S54321",
        studyName: "Another Study",
        description: "A new study description",
        creator: mongoose.Types.ObjectId('64fe98fdae1ff28bdcd455a7'),
        researcherList: [mongoose.Types.ObjectId('64fe98fdae1ff28bdcd455a7')],
        studyType: "experiment",
        isAnonymous: false,
        anonymousParticipantNum: 0,
        participantNum: 150,
        recruitmentStartDate: new Date(),
        recruitmentCloseDate: new Date(),
        location: ["Tokyo", "Sydney"],
        surveyLink: "http://example-new.com/survey",
        driveLink: "http://example-new.com/drive"
    });

    await newStudy.save();

    const fromDb = await mongoose.connection.db.collection('Study').findOne({ _id: newStudy._id });
    expect(fromDb).toBeTruthy();
    expect(fromDb.studyName).toBe("Another Study");
    expect(fromDb.studyCode).toBe("S54321");
    expect(fromDb.description).toBe("A new study description");
});
