/*
  Warnings:

  - You are about to drop the column `likedAt` on the `dislikesOnVideo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "dislikesOnVideo" DROP COLUMN "likedAt",
ADD COLUMN     "dislikedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
