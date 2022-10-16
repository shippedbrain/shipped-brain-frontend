export class Validation {
    /**
     * Validates if string is empty
     *
     * @param text Text to validate
     * @returns true if string is empty text, null, undefined or if text length equals 0
     */
    static isStringEmpty(text: string): boolean {
        return text === '' || text === null || text === undefined || text.length <= 0;
    }

    /**
     * Validates if whitespaces are found somewhere in string, besides start or end
     *
     * @param text Text to validate
     * @returns true if string has whitespaces, otherwise false
     */
    static hasWhiteSpaces(text: string): boolean {
        return text.trim().includes(' ');
    }

    /**
     * Validates if password has at least 6 characters
     *
     * @param password Password to validate
     * @returns true if password length is greater or equal to 6, otherwise false
     */
    static isPasswordLengthValid(password: string): boolean {
        return password.length >= 6;
    }

    /**
     * Validates if email is valid using RegEx
     *
     * @param email Email to validate
     * @returns true if email is valid, otherwise false
     */
    static isEmailValid(email: string): boolean {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gi.test(
            email
        );
    }
}
