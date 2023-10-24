import express, { Request, Response } from 'express';

const router = express.Router();

import signupController from '../controller/signup.controller';
import loginController from '../controller/login.controller';
import productController from '../controller/product.controller';
import routineController from '../controller/routine.controller';
import journalController from '../controller/journal.controller';
import likesController from '../controller/likes.controller';

// DEPLOYMENt
router.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hello World!</h1>');
});

// SIGNUP
router.post('/signup', signupController.createUser);

// LOGIN
router.patch('/login/session/:id', loginController.updateAccessTokenLogin);
router.post('/login/user', loginController.getUserData);

//PRODUCTS
router.get('/product/:brand', productController.getProductByName);
router.get('/product/id/:id', productController.getProductById);

// ROUTINE
router.post('/routine/create', routineController.createRoutine);
router.get('/routine/top10', routineController.getAllRoutine);
router.get('/routine/skintype/:type', routineController.getRoutineBySkintype);
router.get('/routine/weather/:type', routineController.getRoutineByWeatherType);
router.get('/routine/user/:id', routineController.getRoutineByUserId);
router.patch('/routine/update', routineController.updateRoutineUser);
router.delete('/routine/delete/:id', routineController.deleteRoutineUser);
router.patch(
  '/routine/update/description',
  routineController.updateDescription,
);

// JOURNAL
router.post('/journal/routine', journalController.createJournalRoutine);
// /journal/routine/user/?userid=1&routineid=1
router.get('/journal/routine/user/', journalController.getJournalData);

// LIKES
router.post('/like/routine', likesController.createLike);
router.get('/like/total/:routineid', likesController.getTotalLikes);
router.get('/like/user/:id', likesController.getHistoryLikes);
// /like/?userid=1&routineid=1
// router.get("/like/", likesController.getLike)
router.delete('/like/unlike/', likesController.deleteLike);

export default router;
