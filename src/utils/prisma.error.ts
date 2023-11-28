import { Prisma } from '@prisma/client';

const logPrismaError = (e: unknown) => {
  switch (true) {
    case e instanceof Prisma.PrismaClientValidationError:
      console.log(
        'Prisma client validation error. A field is missing or of the incorrect type.',
      );
      break;
    case e instanceof Prisma.PrismaClientKnownRequestError: {
      const { code } = (<Prisma.PrismaClientKnownRequestError>e);
      console.log('Prisma error code: ', code);
      if (code === 'P2002') {
        const target = (<Prisma.PrismaClientKnownRequestError>e).meta?.target;
        console.log(
          `There is a unique constraint violation, a new user cannot be created with this ${target}`,
        );
      }
      break;
    }
    case e instanceof Prisma.PrismaClientUnknownRequestError: {
      console.log(
        'Prisma client unknown request error. Request has missing error code.',
      );
      break;
    }
    case e instanceof Prisma.PrismaClientRustPanicError: {
      console.log(
        'Prisma client Rust panic error. A low-level database error occurred.',
      );
      break;
    }
    case e instanceof Prisma.PrismaClientInitializationError: {
      const { errorCode } = (<Prisma.PrismaClientInitializationError>e);
      console.log(
        'Prisma client initialization error. Could not connect to the database.',
      );
      console.log('Prisma error: ', errorCode);
      break;
    }
    default:
      console.log('An error occured attempting to access the database');
  }
};

export default logPrismaError;
