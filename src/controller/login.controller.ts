// import express, { Request, Response } from "express";

// import loginService from "../service/login.service";

// export default {
//   async updateAccessTokenLogin(req: Request, res: Response) {
//     try {
//       const paramsId = req.params.id;
//       const userId = parseInt(paramsId);
//       const newAccessToken = await loginService.updateAccessTokenLogin(
//         userId,
//         req.body
//       );
//       res.status(200).send(newAccessToken);
//     } catch (error) {
//       res.status(304).send("NOT MODEFIED");
//     }
//   },

//   async getUserData(req: Request, res: Response) {
//     try {
//       const userData = await loginService.getUserData(req.body);
//       if (userData) {
//         res.status(200).send(userData);
//       } else {
//         res.status(400).send("User does not exist");
//       }
//     } catch (error: any) {
//       console.error(error);
//     }
//   },
// };
