/*
  Warnings:

  - The primary key for the `Playlist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Video` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `comments` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `dislike` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `like` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `views` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Dislikers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Likers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Videos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Viewers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_videoId_fkey";

-- DropForeignKey
ALTER TABLE "Playlist" DROP CONSTRAINT "Playlist_userId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_userId_fkey";

-- DropForeignKey
ALTER TABLE "_Dislikers" DROP CONSTRAINT "_Dislikers_A_fkey";

-- DropForeignKey
ALTER TABLE "_Dislikers" DROP CONSTRAINT "_Dislikers_B_fkey";

-- DropForeignKey
ALTER TABLE "_Likers" DROP CONSTRAINT "_Likers_A_fkey";

-- DropForeignKey
ALTER TABLE "_Likers" DROP CONSTRAINT "_Likers_B_fkey";

-- DropForeignKey
ALTER TABLE "_Videos" DROP CONSTRAINT "_Videos_A_fkey";

-- DropForeignKey
ALTER TABLE "_Videos" DROP CONSTRAINT "_Videos_B_fkey";

-- DropForeignKey
ALTER TABLE "_Viewers" DROP CONSTRAINT "_Viewers_A_fkey";

-- DropForeignKey
ALTER TABLE "_Viewers" DROP CONSTRAINT "_Viewers_B_fkey";

-- AlterTable
ALTER TABLE "Playlist" DROP CONSTRAINT "Playlist_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ADD CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Playlist_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "Video" DROP CONSTRAINT "Video_pkey",
DROP COLUMN "comments",
DROP COLUMN "dislike",
DROP COLUMN "like",
DROP COLUMN "views",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ADD CONSTRAINT "Video_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Video_id_seq";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "_Dislikers";

-- DropTable
DROP TABLE "_Likers";

-- DropTable
DROP TABLE "_Videos";

-- DropTable
DROP TABLE "_Viewers";

-- CreateTable
CREATE TABLE "PlaylistVideo" (
    "videoId" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,

    CONSTRAINT "PlaylistVideo_pkey" PRIMARY KEY ("videoId","playlistId")
);

-- CreateTable
CREATE TABLE "viewsOnVideo" (
    "videoId" TEXT NOT NULL,
    "viewdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "viewsOnVideo_pkey" PRIMARY KEY ("videoId","userId")
);

-- CreateTable
CREATE TABLE "likesOnVideo" (
    "videoId" TEXT NOT NULL,
    "likedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "likesOnVideo_pkey" PRIMARY KEY ("videoId","userId")
);

-- CreateTable
CREATE TABLE "dislikesOnVideo" (
    "videoId" TEXT NOT NULL,
    "likedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "dislikesOnVideo_pkey" PRIMARY KEY ("videoId","userId")
);

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistVideo" ADD CONSTRAINT "PlaylistVideo_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistVideo" ADD CONSTRAINT "PlaylistVideo_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viewsOnVideo" ADD CONSTRAINT "viewsOnVideo_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viewsOnVideo" ADD CONSTRAINT "viewsOnVideo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likesOnVideo" ADD CONSTRAINT "likesOnVideo_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likesOnVideo" ADD CONSTRAINT "likesOnVideo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dislikesOnVideo" ADD CONSTRAINT "dislikesOnVideo_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dislikesOnVideo" ADD CONSTRAINT "dislikesOnVideo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
