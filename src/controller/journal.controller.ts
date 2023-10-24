import { Request, Response } from 'express';
import journalService from '../service/journal.service';

export default {
  async createJournalRoutine(req: Request, res: Response) {
    try {
      const newJournalEntrie = await journalService.createJournalRoutine(
        req.body,
      );
      res.status(201).send(newJournalEntrie);
    } catch (error) {
      console.error(error);
      res.status(400).send('Not able to make post');
    }
  },

  async getJournalData(req: Request, res: Response) {
    try {
      const userId = req.query.userid as string;
      const routineId = req.query.routineid as string;
      const journalData = await journalService.getJournalData(
        userId,
        routineId,
      );
      if (journalData) {
        res.status(200).send(journalData);
      } else {
        res.status(400).send(journalData);
      }
    } catch (error) {
      console.error(error);
    }
  },
};
