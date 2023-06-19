import express, { Request, Response } from "express";
import likesService from "../service/likes.service";

export default {
  async createLike(req: Request, res: Response) {
    try {
      const newLikeData = await likesService.createLike(req.body);
      res.status(201).send(newLikeData);
    } catch (error) {
      console.error(error);
      res.status(400).send("Can't create like in database");
    }
  },

  async getTotalLikes(req: Request, res: Response) {
    try {
      const routineId = req.params.routineid;
      const totalLikes = await likesService.getTotalLikes(routineId);
      res.status(200).send(totalLikes);
    } catch (error) {
      console.error(error);
      res.status(400).send("Not found");
    }
  },

  async getHistoryLikes(req: Request, res: Response) {
    try {
      const userIdParam = req.params.id;
      const likesHistory = await likesService.getHistoryLike(userIdParam);
      res.status(200).send(likesHistory);
      
    } catch (error) {
      res.status(400).send("Not found")
    }
  },

  async deleteLike(req: Request, res: Response) {
    try {
      const useridQuery = req.query.userid as string;
      const routineIdQuery = req.query.routineid as string;
      const idLikes: any= await likesService.getIdLike(useridQuery, routineIdQuery);
      const {id} = idLikes;

      const deltedPost = await likesService.deleteLike(id);
      res.status(200).send(deltedPost);
    } catch (error) {
      console.error(error);
      res.status(400).send("could not delete")
    }
  }
};
