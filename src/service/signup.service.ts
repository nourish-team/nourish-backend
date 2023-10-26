import modelSignup from '../model/signup.model';

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
    return modelSignup.createUser(username, email, uid);
  },
};
