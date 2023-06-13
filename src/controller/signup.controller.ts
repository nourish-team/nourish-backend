import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import serviceSignup from "../service/signup.service";

export default {
  async createUser(req: Request, res: Response) {
    try {
      const id = await serviceSignup.createUser(req.body);
      res.status(201).send(id);
    } catch (error: any) {
      res.status(400);
    }
  },
};
