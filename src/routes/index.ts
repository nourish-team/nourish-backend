import express, { Request, Response } from 'express';

import signupController from '../controller/signup.controller';
import loginController from '../controller/login.controller';
import productController from '../controller/product.controller';
import routineController from '../controller/routine.controller';
import journalController from '../controller/journal.controller';

const router = express.Router();

// DEPLOYMENt
router.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hello World!</h1>');
});

// SIGNUP
router.post('/signup', signupController.createUser);

// LOGIN
router.post('/login/user', loginController.getUserData);

// PRODUCTS
router.get('/product/:brand', productController.getProductByName);
router.get('/product/id/:id', productController.getProductById);

// ROUTINE
router.post('/routine/create', routineController.createRoutine);
router.get('/routine/skintype/:type', routineController.getRoutineBySkintype);
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

export default router;
