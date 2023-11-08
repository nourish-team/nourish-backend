import { Prisma } from '@prisma/client';

const logPrismaError = (e: unknown) => {
  if (e instanceof Prisma.PrismaClientValidationError) {
    console.log(
      'Prisma client validation error. A field is missing or of the incorrect type.',
    );
  }

  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    console.log('Prisma error code: ', e.code);
    if (e.code === 'P2002') {
      console.log(
        `There is a unique constraint violation, a new user cannot be created with this ${e.meta?.target}`,
      );
    }
  }

  if (e instanceof Prisma.PrismaClientUnknownRequestError) {
    console.log(
      'Prisma client unknown request error. Request has missing error code.',
    );
  }

  if (e instanceof Prisma.PrismaClientRustPanicError) {
    console.log(
      'Prisma client Rust panic error. A low-level database error occurred.',
    );
  }

  if (e instanceof Prisma.PrismaClientInitializationError) {
    console.log(
      'Prisma client initialization error. Could not connect to the database.',
    );
    console.log('Prisma error: ', e.errorCode);
  }
};

export { logPrismaError };
