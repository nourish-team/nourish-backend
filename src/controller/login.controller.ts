import { Request, Response } from 'express';

import loginService from '../service/login.service';

export default {

  async getUserData(req: Request, res: Response) {
    try {
      const userData = await loginService.getUserData(req.body);
      if (userData) {
        res.status(200).send(userData);
      } else {
        res.status(400).send('User does not exist');
      }
    } catch (error) {
      console.error(error);
    }
  },
};
