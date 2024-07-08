import getEmailIds from '../getEmailIds';

describe('getEmailIds', () => {
    const rows = [
        { _id: '1', participantInfo: { email: 'test1@example.com' } },
        { _id: '2', participantInfo: { email: 'test2@example.com' } },
        { _id: '3', participantInfo: { email: 'test3@example.com' } },
    ];

    it('should return an empty array if input is not provided', () => {
        const result = getEmailIds(rows, '');
        expect(result).toEqual([]);
    });

    it('should return an empty array if rows are not provided', () => {
        const result = getEmailIds([], 'test1@example.com');
        expect(result).toEqual([]);
    });

    it('should return an empty array if rows are empty', () => {
        const result = getEmailIds([], 'test1@example.com');
        expect(result).toEqual([]);
    });

    it('should return matched ids for given emails', () => {
        const input = 'test1@example.com, test2@example.com';
        const result = getEmailIds(rows, input);
        expect(result).toEqual(['1', '2']);
    });

    it('should handle spaces and commas as separators', () => {
        const input = 'test1@example.com test2@example.com';
        const result = getEmailIds(rows, input);
        expect(result).toEqual(['1', '2']);
    });

    it('should handle multiple spaces and commas as separators', () => {
        const input = 'test1@example.com,  test2@example.com';
        const result = getEmailIds(rows, input);
        expect(result).toEqual(['1', '2']);
    });

    it('should return an empty array if no emails match', () => {
        const input = 'test4@example.com, test5@example.com';
        const result = getEmailIds(rows, input);
        expect(result).toEqual([]);
    });
});
