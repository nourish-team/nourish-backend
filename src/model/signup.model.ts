// import { PrismaClient} from '@prisma/client';
// const prisma = new PrismaClient();

import { prisma } from '../utils/db.server';

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
  },
};
