import { checkPhoneNumValidation } from '../checkPhoneNumValidation';

describe('checkPhoneNumValidation', () => {
    it('should return true for valid phone numbers', () => {
        const validPhoneNumbers = [
            '+1234567890',
            '123-456-7890',
            '123 456 7890',
            '1234567890',
            '123 456-7890'
        ];

        validPhoneNumbers.forEach(phoneNum => {
            expect(checkPhoneNumValidation(phoneNum)).toBe(true);
        });
    });

    it('should return false for invalid phone numbers', () => {
        const invalidPhoneNumbers = [
            '123-456-789O', // use letter 'O' rather than num '0'
            '123 456 789!', // include invalid '!'
            'phone123456',  // include chars
            '123 456 7890+', // '+' symbol at the wrong position
            '-1234567890'   // start with '-'
        ];

        invalidPhoneNumbers.forEach(phoneNum => {
            if (checkPhoneNumValidation(phoneNum)) {
                console.error(`Failed for phone number: ${phoneNum}`);
            }
            expect(checkPhoneNumValidation(phoneNum)).toBe(false);
        });
    });

    it('should handle empty strings', () => {
        const phoneNum = '';
        expect(checkPhoneNumValidation(phoneNum)).toBe(false);
    });
});
