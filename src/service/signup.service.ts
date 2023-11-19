import modelSignup from '../model/signup.model';
import validation from '../utils/validation';

interface SignupData {
  username: string;
  email: string;
  uid: string;
}

interface CustomError extends Error {
  code?: string;
  target?: string;
}

export default {
  async createUser(userdata: SignupData) {
    const {
      username,
      email,
      uid,
    }: { username: string; email: string; uid: string } = userdata;

    try {
      // Validate username
      if (!validation.isSafeInput(username) || !validation.isValidUsername(username)) {
        throw new Error('Invalid username. Please check your input.');
      }

      // Validate email
      if (!validation.isNotEmptyInput(email) || !validation.isValidEmail(email)) {
        throw new Error('Invalid email. Please check your input.');
      }

      // Validate UID
      if (!validation.isNotEmptyInput(uid) || !validation.isValidUID(uid)) {
        throw new Error('Something went wrong. Please check your inputs.');
      }

      return await modelSignup.createUser(username, email, uid);
    } catch (error) {
      const helper = error as CustomError;
      // Prisma error
      if (helper.code === 'P2002') {
        throw new Error('User with this username or email already exists.');
      }
      // General error
      throw error;
    }
  },
};
