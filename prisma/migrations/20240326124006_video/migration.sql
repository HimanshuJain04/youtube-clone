-- AlterTable
ALTER TABLE "User" ADD COLUMN     "forgotPasswordToken" TEXT,
ADD COLUMN     "forgotPasswordTokenExpiry" TIMESTAMP(3),
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verifyToken" TEXT,
ADD COLUMN     "verifyTokenExpiry" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "dislikesCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "likesCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "viewsCount" INTEGER NOT NULL DEFAULT 0;
