import { checkEmailValidation } from '../checkEmailValidation';

describe('checkEmailValidation', () => {
    it('should return true for valid email addresses', () => {
        const validEmails = [
            'test@example.com',
            'john.doe123@my-domain.net',
            'a.b-c_d@sub.domain.co.uk'
        ];

        validEmails.forEach(email => {
            expect(checkEmailValidation(email)).toBe(true);
        });
    });

    it('should return false for invalid email addresses', () => {
        const invalidEmails = [
            'test',
            'test@.com',
            'test@domain',
            'test@domain.',
            '.test@domain.com',
            'test@domain..com',
            'test@domain.c',
            'test@domain..c.com'
        ];

        invalidEmails.forEach(email => {
            if (checkEmailValidation(email)) {
                console.error(`Failed for email: ${email}`);
            }
            expect(checkEmailValidation(email)).toBe(false);
        });
    });

    it('should return false for empty or null or undefined email', () => {
        const emptyValues = ['', null, undefined];

        emptyValues.forEach(email => {
            expect(checkEmailValidation(email)).toBe(false);
        });
    });
});
