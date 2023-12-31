import { Request, Response } from 'express';
import routineService from '../service/routine.service';
import productService from '../service/product.service';

export default {
  async createRoutine(req: Request, res: Response) {
    try {
      const routineData = await routineService.createRoutine(req.body);
      console.log(routineData);
      res.status(200).send(routineData);
    } catch (error) {
      console.log(error);
      res.status(400);
    }
  },

  async getAllRoutine(req: Request, res: Response) {
    try {
      const routines = await routineService.getAllRoutine();
      res.status(200).send(routines);
    } catch (error) {
      console.log(error);
      res.status(400).send('Not found');
    }
  },

  async getRoutineBySkintype(req: Request, res: Response) {
    try {
      const skinType: string = req.params.type;
      const routinesBySkintype = await routineService.getRoutineBySkintype(skinType);
      res.status(200).send(routinesBySkintype);
    } catch (error) {
      console.error(error);
      res.status(400);
    }
  },

  async getRoutineByUserId(req: Request<{ id: string }>, res: Response) {
    try {
      const userId = req.params.id;

      const routinesByUser = await routineService.getRoutineByUserId(userId);

      const productsOfRoutines = await Promise.all(
        routinesByUser.map(async (routine) => {
          const routineProduct = await Promise.all(routine.routine_product);
          const products = await Promise.all(
            routineProduct.map((product) => {
              const skincareRoutine = productService.getProductById(product);
              return skincareRoutine;
            }),
          );
          return products;
        }),
      );

      res.status(200).send({ routinesByUser, productsOfRoutines });
    } catch (error) {
      console.error(error);
      res.status(400).send('user doesn\'t have any routines');
    }
  },

  async updateRoutineUser(req: Request, res: Response) {
    try {
      const updateData = await routineService.updateRoutineUser(req.body);
      res.status(200).send(updateData);
    } catch (error) {
      console.error(error);
      res.status(400).send('Could not update');
    }
  },

  async deleteRoutineUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleteData = await routineService.deleteRoutineUser(id);
      res.status(200).send(deleteData);
    } catch (error) {
      res.status(500).send('Not able to delete');
    }
  },

  async updateDescription(req: Request, res: Response) {
    try {
      const description = await routineService.updateDescription(req.body);
      res.status(200).send(description);
    } catch (error) {
      console.error(error);
      res.status(400).send('Could not update');
    }
  },
};
