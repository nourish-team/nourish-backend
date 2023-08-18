import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import serviceSignup from "../service/signup.service";

export default {
  async createUser(req: Request, res: Response) {
    try {
      const userData = await serviceSignup.createUser(req.body);
      console.log(userData)
      if (userData instanceof Error) {
        throw new Error()
      }
      const test = {id: 1}
      res.status(201).send(test);
    } catch (error: any) {
      res.status(400).send(error)
    }
  },
};
