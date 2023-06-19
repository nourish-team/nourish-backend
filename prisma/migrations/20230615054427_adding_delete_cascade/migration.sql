-- DropForeignKey
ALTER TABLE "journals" DROP CONSTRAINT "journals_users_id_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_routines_id_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_users_id_fkey";

-- DropForeignKey
ALTER TABLE "routines" DROP CONSTRAINT "routines_users_id_fkey";

-- AddForeignKey
ALTER TABLE "routines" ADD CONSTRAINT "routines_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journals" ADD CONSTRAINT "journals_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_routines_id_fkey" FOREIGN KEY ("routines_id") REFERENCES "routines"("id") ON DELETE CASCADE ON UPDATE CASCADE;
