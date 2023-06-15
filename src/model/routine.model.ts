import { prisma } from "../utils/db.server";

export default {
  async createRoutine(
    id: number,
    routineName: string,
    skinType: string,
    routineProduct: number[],
    routinePublic: boolean
  ) {
    const japanTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Tokyo",
    });
    const routineData = await prisma.routines.create({
      data: {
        user_id: {
          connect: { id: id },
        },
        routine_name: routineName,
        skin_type: skinType,
        routine_product: routineProduct,
        public: routinePublic,
        updated_at: japanTime,
        created_at: japanTime,
      },
      select: {
        routine_name: true,
        skin_type: true,
        routine_product: true,
        public: true,
      },
    });
    return routineData;
  },

  async getRoutineBySkintype(skintype: string) {
    const routinesBySkintype = await prisma.routines.findMany({
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
        _count: {
          select: {
            likes: true
          }
        }
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
        routine_name: true,
        routine_product: true,
        created_at: true,
      },
    });

    return routinesByUser;
  },
  async updateRoutineUser(
    parsedRoutineId: number,
    parsedRoutine: number[] | undefined,
    routinePublicBoolean: boolean | undefined
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
};
