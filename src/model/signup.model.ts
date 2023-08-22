import prisma from "../utils/db.server";
import { Prisma } from "@prisma/client";

type User = {
  id: number,
  username: string
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
          username: true
        },
      })

     
      return userInfo as User;
      
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
          console.error({
            code: error.code,
            meta: error.meta,
            message: error.message
          })
      }

      return new Error('new user cannot be created with this data');
      
    }
    
  },
};
