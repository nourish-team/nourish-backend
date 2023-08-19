// import { PrismaClient} from '@prisma/client';
// const prisma = new PrismaClient();

import prisma  from "../utils/db.server";
// import  prisma from './client'

type User = {
  id: number;
};

interface Error {
  message: string
}

export default {
  async createUser(
    username: string,
    email: string,
    uid: string
  ): Promise<User | any> {

    const japanTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Tokyo",
    });

    try {

      const userInfo = await prisma.users.create({
        data: {
          username: username,
          email: email,
          uid: uid,
          updated_at: japanTime,
          created_at: japanTime,
        },
        select: {
          id: true,
          username: true,
        },
      });

     
      return userInfo;
      
    } catch (error: any) {
      return new Error("Something went wrong");
    }
    
  },
};
