import prisma from "../utils/db.server";

export default {
  async createRoutine(
    id: number,
    routineName: string,
    skinType: string,
    routineProduct: number[],
    routinePublic: boolean,
    weatherTag: string,
    description: string
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
        weather_type: weatherTag,
        description: description,
        updated_at: japanTime,
        created_at: japanTime,
      },
      select: {
        routine_name: true,
        skin_type: true,
        routine_product: true,
        public: true,
        weather_type: true,
        description: true
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
        weather_type: true,
        description: true,
        _count: {
          select: {
            likes: true
          }
        }
      },
      orderBy: {
        likes: {
          _count: "desc",
        }
      },
      take: 10
    });
    return allRoutines;
  },

  async getRoutineBySkintype(skintype: string) {
    const routinesBySkintype = await prisma.routines.findMany({
      orderBy: [
        {created_at: "desc"}
      ],
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
        weather_type: true,
        description: true,
        _count: {
          select: {
            likes: true
          }
        }
      },
    });
    return routinesBySkintype;
  },

  async getRoutineByWeatherType(weatherType: string) {
    const routineWeatherType = prisma.routines.findMany({
      orderBy: [
        {created_at: "desc"}
      ],
      where: {
        weather_type: weatherType
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
        weather_type: true,
        description: true,
        _count: {
          select: {
            likes: true
          }
        }
      }
    });
    return routineWeatherType;
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
            username: true
          }
        },
        routine_name: true,
        routine_product: true,
        created_at: true,
        description: true
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

  async updateDescription(id: number, description: string) {
    const newDescription = await prisma.routines.update({
      where: {
        id: id,
      },
      data: {
        description: description
      },
      select: {
        id: true,
        user_id: {
          select: {
            id: true
          }
        },
        description: true
      }
    });

    return newDescription;
  },

  async deleteRoutineUser(userId: number) {
    const deleteData = await prisma.routines.delete({
      where: {
        id: userId
      },
      select: {
        id: true,
      }
    });
    return deleteData;
  }
};
