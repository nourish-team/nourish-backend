import express, { Request, Response } from "express";
import routineService from "../service/routine.service";
import productService from "../service/product.service";

export default {
  async createRoutine(req: Request, res: Response) {
    try {
      const routineData = await routineService.createRoutine(req.body);
      console.log(routineData);
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

      let routinesByUser = await routineService.getRoutineByUserId(userId);

      const productsOfRoutines = await Promise.all(routinesByUser.map(async routine => {
        const routineProduct = await Promise.all(routine["routine_product"]);
          const product = await Promise.all(routineProduct.map(product => {
              const routine = productService.getProductById(product);
                return routine;
              }))
          return product;
      }))

      res.status(200).send({routinesByUser, productsOfRoutines});
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
