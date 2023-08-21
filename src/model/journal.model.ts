import  prisma from "../utils/db.server";

export default {
  async createJournalRoutine(
    routineId: number,
    usersId: number,
    comments: string | undefined,
    date: string,
    img_url: string | undefined
  ) {
    const japanTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Tokyo",
    });
    const newJournalEntrie = await prisma.journals.create({
      data: {
        user_id: {
          connect: { id: usersId },
        },
        routine_id: {
          connect: { id: routineId },
        },
        comments: comments,
        img_url: img_url,
        date: date,
        created_at: japanTime,
        updated_at: japanTime,
      },
      select: {
        users_id: true,
        routines_id: true,
        comments: true,
        date: true,
        img_url: true,
      },
    });

    return newJournalEntrie;
  },

  async getJournalData(parsedUserId: number, parsedRoutineId: number) {
    const journalData = await prisma.journals.findMany({
      where: {
        users_id: parsedUserId,
        routines_id: parsedRoutineId,
      },
      select: {
        comments: true,
        routine_id: {
          select: {
            routine_name: true,
            skin_type: true,
            routine_product: true,
          },
        },
        date: true,
        img_url: true,
      },
    });
    return journalData;
  },
};
