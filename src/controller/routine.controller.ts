import express, { Request, Response } from "express";
import routineService from "../service/routine.service";

export default {
  async createRoutine(req: Request, res: Response) {
    try {
      const routineData = await routineService.createRoutine(req.body);
      res.status(200).send(routineData);
    } catch (error: any) {
      console.log(error);
      res.status(400);
    }
  },

  async getRoutineBySkintype(req: Request, res: Response) {
    try {
      const skinType: string = req.params.type;
      const routinesBySkintype = await routineService.getRoutineBySkintype(
        skinType
      );
      res.status(200).send(routinesBySkintype);
    } catch (error: any) {
      console.error(error);
      res.status(400);
    }
  },

  async getRoutineByUserId(req: Request<{ id: string }>, res: Response) {
    try {
      const userId = req.params.id;
      const routinesByUser = await routineService.getRoutineByUserId(userId);
      res.status(200).send(routinesByUser);
    } catch (error: any) {
      console.error(error);
      res.status(400).send("user doesn't have any routines");
    }
  },

  async updateRoutineUser(req: Request, res: Response) {
    try {
      const updateData = await routineService.updateRoutineUser(req.body);
      res.status(200).send(updateData);
    } catch (error) {
      console.error(error);
      res.status(400).send("Could not update");
    }
  },
};
