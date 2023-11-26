import loginModel from '../model/login.model';

type Email = {
  email: string;
};

export default {
  getUserData(userEmail: Email) {
    const { email } = userEmail;
    return loginModel.getUserData(email);
  },
};
