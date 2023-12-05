import { prisma } from '../utils/db.server';

export default {
  async createRoutine(
    id: number,
    routineName: string,
    skinType: string,
    routineProduct: number[],
    routinePublic: boolean,
    description: string,
  ) {
    const japanTime = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Tokyo',
    });
    const routineData = await prisma.routines.create({
      data: {
        user_id: {
          connect: { id },
        },
        routine_name: routineName,
        skin_type: skinType,
        routine_product: routineProduct,
        public: routinePublic,
        description,
        updated_at: japanTime,
        created_at: japanTime,
      },
      select: {
        routine_name: true,
        skin_type: true,
        routine_product: true,
        public: true,
        description: true,
      },
    });
    return routineData;
  },

  async getAllRoutine() {
    const allRoutines = await prisma.routines.findMany({
      select: {
        id: true,
        user_id: {
          select: {
            id: true,
            username: true,
          },
        },
        routine_name: true,
        routine_product: true,
        created_at: true,
        description: true,
      },
    });
    return allRoutines;
  },

  async getRoutineBySkintype(skintype: string) {
    const routinesBySkintype = await prisma.routines.findMany({
      orderBy: [{ created_at: 'desc' }],
      where: {
        skin_type: skintype,
        public: true,
      },
      select: {
        id: true,
        user_id: {
          select: {
            id: true,
            username: true,
          },
        },
        routine_name: true,
        routine_product: true,
        created_at: true,
        description: true,
      },
    });
    return routinesBySkintype;
  },

  async getRoutineByUserId(userId: number) {
    const routinesByUser = await prisma.routines.findMany({
      where: {
        users_id: userId,
      },
      select: {
        id: true,
        user_id: {
          select: {
            username: true,
          },
        },
        routine_name: true,
        routine_product: true,
        created_at: true,
        description: true,
      },
    });

    return routinesByUser;
  },
  async updateRoutineUser(
    parsedRoutineId: number,
    parsedRoutine: number[] | undefined,
    routinePublicBoolean: boolean | undefined,
  ) {
    const newData = await prisma.routines.update({
      where: {
        id: parsedRoutineId,
      },
      data: {
        routine_product: parsedRoutine,
        public: routinePublicBoolean,
      },
      select: {
        routine_name: true,
        routine_product: true,
        public: true,
      },
    });

    return newData;
  },

  async updateDescription(id: number, description: string) {
    const newDescription = await prisma.routines.update({
      where: {
        id,
      },
      data: {
        description,
      },
      select: {
        id: true,
        user_id: {
          select: {
            id: true,
          },
        },
        description: true,
      },
    });

    return newDescription;
  },

  async deleteRoutineUser(userId: number) {
    const deleteData = await prisma.routines.delete({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    });
    return deleteData;
  },
};
