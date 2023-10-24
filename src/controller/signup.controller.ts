import { Request, Response } from 'express';

import serviceSignup from '../service/signup.service';

export default {
  async createUser(req: Request, res: Response) {
    try {
      const id = await serviceSignup.createUser(req.body);
      res.status(201).send(id);
    } catch (error) {
      res.status(400);
    }
  },
};
