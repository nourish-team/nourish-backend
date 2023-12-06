import modelSignup from '../model/signup.model';
import validation from '../utils/stringValidations';

interface SignupData {
  username: string;
  email: string;
  uid: string;
}

interface CustomError extends Error {
  code?: string;
  target?: string;
  errorCode?: string;
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
        throw new Error('Invalid email or username. Please check your inputs.');
      }

      // Validate email
      if (!validation.isNotEmptyInput(email) || !validation.isValidEmail(email)) {
        throw new Error('Invalid email or username. Please check your inputs.');
      }

      // Validate UID
      if (!validation.isNotEmptyInput(uid) || !validation.isValidUID(uid)) {
        throw new Error('Oops, something went wrong. Please try again.');
      }

      return await modelSignup.createUser(username, email, uid);
    } catch (error) {
      const helper = error as CustomError;
      console.error('Error during user creation: ', helper);
      // Prisma error
      if (helper.code === 'P2002') {
        throw new Error('User with this username or email already exists.');
      }
      // General error
      throw new Error('Oops, something went wrong. Please try again.');
    }
  },
};
