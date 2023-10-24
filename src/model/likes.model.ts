import { prisma } from '../utils/db.server';

export default {
  async createLike(
    parsedId: number,
    parsedRoutineId: number,
    likeBoolean: boolean,
  ) {
    const japanTime = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Tokyo',
    });

    const checkAlreadyLiked = await prisma.likes.findFirst({
      where: {
        users_id: parsedId,
        routines_id: parsedRoutineId,
      },
      select: {
        users_id: true,
        routines_id: true,
      },
    });

    if (checkAlreadyLiked) {
      return 'User already liked this post';
    }

    const newLikeData = await prisma.likes.create({
      data: {
        user_id: {
          connect: { id: parsedId },
        },
        routine_id: {
          connect: { id: parsedRoutineId },
        },
        like: likeBoolean,
        updated_at: japanTime,
        created_at: japanTime,
      },
      select: {
        users_id: true,
        routines_id: true,
        like: true,
      },
    });

    return newLikeData;
  },

  async getTotalLikes(parsedRoutineId: number) {
    const totalLikes = await prisma.likes.count({
      where: {
        routines_id: parsedRoutineId,
      },
      select: {
        like: true,
      },
    });
    return totalLikes;
  },

  async getHistoryLike(userId: number) {
    const likesHistory = await prisma.likes.findMany({
      where: {
        users_id: userId,
        like: true,
      },
      select: {
        users_id: true,
        routine_id: {
          select: {
            id: true,
            routine_name: true,
            routine_product: true,
            skin_type: true,
            description: true,
          },
        },
      },
    });

    return likesHistory;
  },

  async getIdLike(userId: number, routineId: number) {
    const idLike = await prisma.likes.findFirst({
      where: {
        users_id: userId,
        routines_id: routineId,
      },
      select: {
        id: true,
      },
    });
    return idLike;
  },

  async deleteLike(id: number) {
    const deletLike = await prisma.likes.delete({
      where: {
        id: id,
      },
    });
    return deletLike;
    // only possible with id
  },
};
