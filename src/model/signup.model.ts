import { prisma } from '../utils/db.server';
import { logPrismaError } from '../utils/prisma.error';

type User = {
  id: number;
};

export default {
  async createUser(
    username: string,
    email: string,
    uid: string,
  ): Promise<User> {
    const japanTime = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Tokyo',
    });
    try {
      const userInfo = await prisma.users.create({
        data: {
          username,
          email,
          uid,
          updated_at: japanTime,
          created_at: japanTime,
        },
        select: {
          id: true,
          username: true,
        },
      });
      return userInfo;
    } catch (e) {
      logPrismaError(e);
      throw e;
    }
  },
};
