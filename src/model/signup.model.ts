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
    if (username.length < 1) {
      throw new Error('Invalid username');
    }
    if (email.length < 5 || !email.includes('@') || !email.includes('.')) {
      throw new Error('Invalid email');
    }
    if (uid.split('-').length !== 5) {
      throw new Error('Invalid UID');
    }
    for (const char of uid) {
      if (!/^[a-z0-9-]+$/.test(uid)) {
        throw new Error('Invalid UID');
      }
    }
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
    if (!userInfo) {
      throw new Error('Unable to create new user');
    }
    return userInfo;
  },
};
