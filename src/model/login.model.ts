import { prisma } from '../utils/db.server';

export default {

  async getUserData(email: string) {
    const userData = await prisma.users.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        username: true,
      },
    });
    return userData;
  },
};
