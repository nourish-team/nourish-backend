import modelSignup from '../model/signup.model';
import validation from '../utils/validation';

interface SignupData {
  username: string;
  email: string;
  uid: string;
}

export default {
  createUser(userdata: SignupData) {
    const {
      username,
      email,
      uid,
    }: { username: string; email: string; uid: string } = userdata;

    // Validate username using the isSafeInput function
    if (!validation.isSafeInput(username)) {
      throw new Error(
        'Invalid input. Please check your inputs.',
      );
    }

    return modelSignup.createUser(username, email, uid);
  },
};
