export default {
  isSafeInput(input: string): boolean {
    const maliciousPatterns = /[[]{}()'"<>\n;]/;
    return !(maliciousPatterns.test(input));
  },

  isNotEmptyInput(input: string): boolean {
    const emptyPattern = /^$/;
    return !(emptyPattern.test(input));
  },

  isValidUID(input: string): boolean {
    const validUIDPattern = /^[a-zA-Z0-9-]{28}$/;
    return (validUIDPattern.test(input));
  },

  isValidEmail(input: string): boolean {
    const validEmailPattern = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    return (validEmailPattern.test(input));
  },

  isValidUsername(input: string): boolean {
    const validUsernamePattern = /^[a-zA-Z0-9_-]{3,16}$/;
    return (validUsernamePattern.test(input));
  },
};
