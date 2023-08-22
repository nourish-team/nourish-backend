import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import serviceSignup from "../service/signup.service";

export default {
  async createUser(req: Request, res: Response) {
    try {
      const userData = await serviceSignup.createUser(req.body);

      if (userData instanceof Error || Object.keys(userData).length < 1) {
        throw new Error()
      }
  
      res.status(201).send(userData);

    } catch (error: any) {

      console.error(error.message)

      const japanTime = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Tokyo",
      });

      const errorInfo = {
        timestamp: japanTime,
        status: 400,
        message: "Could not create user",
        path: "/signup"
      }

      res.status(400).send(errorInfo)
    }
  },
};
