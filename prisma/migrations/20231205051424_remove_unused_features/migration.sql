/*
  Warnings:

  - You are about to drop the column `img_url` on the `journals` table. All the data in the column will be lost.
  - You are about to drop the column `weather_type` on the `routines` table. All the data in the column will be lost.
  - You are about to drop the `likes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_routines_id_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_users_id_fkey";

-- AlterTable
ALTER TABLE "journals" DROP COLUMN "img_url";

-- AlterTable
ALTER TABLE "routines" DROP COLUMN "weather_type";

-- DropTable
DROP TABLE "likes";
