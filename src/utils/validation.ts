export default {
  isSafeInput(input: string): boolean {
    const maliciousPatterns = /[[]{}()'"<>\n;]/;
    if (maliciousPatterns.test(input)) {
      return false;
    }
    return true;
  },
};
