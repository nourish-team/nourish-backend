import journalModel from '../model/journal.model';

interface Journal {
  routines_id: number;
  users_id: number;
  comments: string | undefined;
  date: string;
}

export default {
  createJournalRoutine(journalData: Journal) {
    const {
      routines_id: routineId,
      users_id: usersId,
      comments,
      date,
    } = journalData;
    return journalModel.createJournalRoutine(
      routineId,
      usersId,
      comments,
      date,
    );
  },

  getJournalData(userId: string, routineId: string) {
    const parsedUserId: number = parseInt(userId, 10);
    const parsedRoutineId: number = parseInt(routineId, 10);
    return journalModel.getJournalData(parsedUserId, parsedRoutineId);
  },
};
