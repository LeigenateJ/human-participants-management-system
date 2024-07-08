import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import StudyDao from '../dao/StudyDao';
import Study from '../domain/StudyDomain';
import Researcher from '../../researcher/domain/ResearcherDomain';


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

describe('StudyDao', () => {

    // Test creation of a new study
    it('should create a new study', async () => {
        const studyData = {
            studyCode: "S78910",
            studyName: "Test Study3",
            description: "A description of the test study",
            creator: mongoose.Types.ObjectId('64fe98fdae1ff28bdcd455a7'),
            researcherList: [mongoose.Types.ObjectId('64fe98fdae1ff28bdcd455a7')],
            studyType: "interview",
            isAnonymous: true,
            anonymousParticipantNum: 15,
            participantNum: 100,
            recruitmentStartDate: new Date(),
            recruitmentCloseDate: new Date(),
            location: ["Auckland", "Wellington"],
            surveyLink: "http://example.com/survey",
            driveLink: "http://example.com/drive"
        };
        const createdStudy = await StudyDao.createStudy(studyData);

        expect(createdStudy).toHaveProperty('_id');
        expect(createdStudy.studyCode).toBe(studyData.studyCode);
        expect(createdStudy.studyName).toBe(studyData.studyName);
    });

    // Test retrieval of all studies
    it('should retrieve all studies', async () => {
        const retrievedStudies = await StudyDao.retrieveAllStudyList();

        expect(retrievedStudies.length).toBe(2);
        expect(retrievedStudies[0].studyCode).toBe(study1.studyCode);
        expect(retrievedStudies[1].studyCode).toBe(study2.studyCode);
    });

    // Test retrieval of a single study by ID
    it('should retrieve a single study by ID', async () => {
        const retrievedStudy = await StudyDao.retrieveStudy(studyId1);

        expect(retrievedStudy.studyName).toBe(study1.studyName);
        expect(retrievedStudy.studyCode).toBe(study1.studyCode);
    });

    // Test retrieval of a study report
    it('should retrieve a study report by ID', async () => {
        const researcherId1 = new mongoose.Types.ObjectId('64fe98fdae1ff28bdcd455a7');
        const researcherId2 = new mongoose.Types.ObjectId('64fe98fdae1ff28bdcd455a8');

        const researcher1 = new Researcher({
            _id: researcherId1,
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            username: "johndoe",
            password:"123456",
            studyList: [studyId1, studyId2],
            isActive: true
        });

        await researcher1.save();

        const researcher2 = new Researcher({
            _id: researcherId2,
            firstName: "Jane",
            lastName: "Doe",
            email: "jane.doe@example.com",
            username: "janedoe",
            password:"123456",
            studyList: [],
            isActive: true
        });
        await researcher2.save();
        const studyReport = await StudyDao.retrieveStudyReport(studyId1);

        expect(studyReport.studyName).toBe(study1.studyName);
        expect(studyReport.studyCode).toBe(study1.studyCode);
        expect(studyReport.creator).toBeDefined(); // Assuming the creator is populated
    });



    // Test find study and populate creator and researcherList
    it('should find studies by IDs and populate', async () => {
        const researcherId1 = new mongoose.Types.ObjectId('64fe98fdae1ff28bdcd455a7');
        const researcherId2 = new mongoose.Types.ObjectId('64fe98fdae1ff28bdcd455a8');

        const researcher1 = new Researcher({
            _id: researcherId1,
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            username: "johndoe",
            password:"123456",
            studyList: [studyId1, studyId2],
            isActive: true
        });

        await researcher1.save();

        const researcher2 = new Researcher({
            _id: researcherId2,
            firstName: "Jane",
            lastName: "Doe",
            email: "jane.doe@example.com",
            username: "janedoe",
            password:"123456",
            studyList: [],
            isActive: true
        });
        await researcher2.save();
        const studyIds = [studyId1, studyId2];
        const studiesFound = await StudyDao.findStudiesByIdsAndPopulate(studyIds);

        expect(studiesFound.length).toBe(2);
        expect(studiesFound[0].creator).toBeDefined(); // Assuming the creator is populated
        expect(studiesFound[0].researcherList).toBeDefined(); // Assuming the researcherList is populated
    });


    // Test retrieval of a list of studies by IDs
    it('should retrieve a list of studies by IDs', async () => {
        const idList = [studyId1, studyId2];
        const studiesList = await StudyDao.retrieveStudyList(idList);

        expect(studiesList.length).toBe(2);
        expect(studiesList[0]._id).toEqual(studyId1);
    });

    // Test update of a study
    it('should update a study', async () => {
        const newStudyName = "Updated Study Name";
        const updatedStudy = await StudyDao.updateStudy(studyId1, { studyName: newStudyName });

        expect(updatedStudy.studyName).toBe(newStudyName);
    });
    
    // Test retrieving researcher list by study Id
    it('should retrieve researcher list by study ID', async () => {
        const researcherId1 = new mongoose.Types.ObjectId('64fe98fdae1ff28bdcd455a7');
        const researcherId2 = new mongoose.Types.ObjectId('64fe98fdae1ff28bdcd455a8');

        const researcher1 = new Researcher({
            _id: researcherId1,
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            username: "johndoe",
            password:"123456",
            studyList: [studyId1, studyId2],
            isActive: true
        });

        await researcher1.save();

        const researcher2 = new Researcher({
            _id: researcherId2,
            firstName: "Jane",
            lastName: "Doe",
            email: "jane.doe@example.com",
            username: "janedoe",
            password:"123456",
            studyList: [],
            isActive: true
        });
        await researcher2.save();

        const researchers = await StudyDao.retrieveResearcherListByStudyId(studyId1);

        expect(researchers.length).toBe(1); // Based on your initial data
    });

    // Test remove a researcher fro a study
    it('should remove a researcher from a study', async () => {
        const researcherIdToRemove = '64fe98fdae1ff28bdcd455a7';
        const response = await StudyDao.removeResearherfromStudy(studyId1, researcherIdToRemove);

        expect(response.success).toBe(true);
        expect(response.message).toBe('Researcher removed from study');
    });

    // Test adding a researcher to a study
    it('should add a researcher to a study', async () => {
        const researcherIdToAdd = '64fe98fdae1ff28bdcd455a8'; // Assuming this ID exists in your DB
        const updatedStudy = await StudyDao.updateStudyByStudyId(studyId1, researcherIdToAdd);

        expect(updatedStudy).toBe(true);
    });

    // Test finding the creator of a study
    it('should find the creator of a study', async () => {
        const creatorId = await StudyDao.findCreator(studyId1);

        expect(creatorId.toString()).toBe('64fe98fdae1ff28bdcd455a7');
    });


    //Test find a study by the study code
    it('should find a study by its code', async () => {
        const studyCode = "S12345";
        const foundStudy = await StudyDao.findStudyByCode(studyCode);

        expect(foundStudy._id).toEqual(studyId1);
    });


});

