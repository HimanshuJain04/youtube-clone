/*
  Warnings:

  - You are about to drop the column `description` on the `Playlist` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `Playlist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Playlist" DROP COLUMN "description",
DROP COLUMN "thumbnail";
