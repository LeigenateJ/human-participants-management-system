import { combineCodeSerialNum } from '../combineCodeSerialNum';

describe('combineCodeSerialNum', () => {
    it('should correctly combine studyCode and serialNum with a hyphen', () => {
        const studyCode = 'STUDY123';
        const serialNum = '4567';
        const expectedOutput = 'STUDY123-4567';

        const result = combineCodeSerialNum(studyCode, serialNum);

        expect(result).toBe(expectedOutput);
    });

    it('should handle empty studyCode', () => {
        const studyCode = '';
        const serialNum = '4567';
        const expectedOutput = '-4567';

        const result = combineCodeSerialNum(studyCode, serialNum);

        expect(result).toBe(expectedOutput);
    });

    it('should handle empty serialNum', () => {
        const studyCode = 'STUDY123';
        const serialNum = '';
        const expectedOutput = 'STUDY123-';

        const result = combineCodeSerialNum(studyCode, serialNum);

        expect(result).toBe(expectedOutput);
    });

    it('should handle both empty studyCode and serialNum', () => {
        const studyCode = '';
        const serialNum = '';
        const expectedOutput = '-';

        const result = combineCodeSerialNum(studyCode, serialNum);

        expect(result).toBe(expectedOutput);
    });
});
