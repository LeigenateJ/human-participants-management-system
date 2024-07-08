import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import request from 'supertest';
import routes from '../tag';
import Tag from '../../database/tag/domain/TagDomain';

const app = express();
app.use(express.json());
app.use('/tag', routes);

const tag1 = {
    _id: new mongoose.Types.ObjectId('111111111111111111111111'),
    tagName: 'Tag1'
};

const tag2 = {
    _id: new mongoose.Types.ObjectId('222222222222222222222222'),
    tagName: 'Tag2'
};

const tags = [tag1, tag2];

let mongod;

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri(), { useNewUrlParser: true });
});

beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await Tag.insertMany(tags);
});

afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
    await mongod.stop();
});

describe('Tag Router', () => {

    // test GET /tag/all
    it('should retrieve all tags', async () => {
        const res = await request(app).get('/tag/all').expect(200);
        const tagsFromApi = res.body;
        expect(tagsFromApi.length).toBe(2);
        expect(tagsFromApi[0].tagName).toBe('Tag1');
        expect(tagsFromApi[1].tagName).toBe('Tag2');
    });

    // test GET /tag/:tagId
    it('should retrieve a tag by tagId', async () => {
        const res = await request(app).get(`/tag/${tag1._id}`).expect(200);
        const tagFromApi = res.body;
        expect(tagFromApi.tagName).toBe('Tag1');
    });

    // test POST /tag/add
    it('should add new tags', async () => {
        const newTags = [
            { tagName: 'Tag3' },
            { tagName: 'Tag4' }
        ];
        const res = await request(app).post('/tag/add').send({ tags: newTags }).expect(201);
        const tagsFromApi = res.body.success;
        expect(tagsFromApi.length).toBe(2);
        expect(tagsFromApi[0].tagName).toBe('Tag3');
        expect(tagsFromApi[1].tagName).toBe('Tag4');
    });

});
