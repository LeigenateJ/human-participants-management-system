import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import TagDao from '../dao/TagDao';
import Tag from '../domain/TagDomain';

let mongod;

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri(), { useNewUrlParser: true, useUnifiedTopology: true });
});

beforeEach(async () => {
    await Tag.deleteMany({});
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

describe('TagDao Tests', () => {

    it('should create multiple tags', async () => {
        const tags = [{ tagName: 'tag1' }, { tagName: 'tag2' }];
        const result = await TagDao.createMultipleTags(tags);
        expect(result.length).toBe(2);
    });

    it('should get all tags', async () => {
        const tags = [{ tagName: 'tag1' }, { tagName: 'tag2' }];
        await TagDao.createMultipleTags(tags);
        const result = await TagDao.getAllTags();
        expect(result.length).toBe(2);
    });

    it('should get tag by id', async () => {
        const tag = new Tag({ tagName: 'tag1' });
        await tag.save();
        const result = await TagDao.getTagById(tag._id);
        expect(result.tagName).toBe('tag1');
    });

    it('should get tags by tag names', async () => {
        const tags = [{ tagName: 'tag1' }, { tagName: 'tag2' }];
        await TagDao.createMultipleTags(tags);
        const result = await TagDao.getTagByTagNames(['tag1', 'tag2']);
        expect(result.length).toBe(2);
    });

    it('should update tag', async () => {
        const tag = new Tag({ tagName: 'tag1' });
        await tag.save();
        const isSuccess = await TagDao.updateTag(tag._id, { tagName: 'updatedTag' });
        expect(isSuccess).toBe(true);
        const updatedTag = await Tag.findById(tag._id);
        expect(updatedTag.tagName).toBe('updatedTag');
    });

    it('should delete tag', async () => {
        const tag = new Tag({ tagName: 'tag1' });
        await tag.save();
        await TagDao.deleteTag(tag._id);
        const deletedTag = await Tag.findById(tag._id);
        expect(deletedTag).toBeNull();
    });

});

