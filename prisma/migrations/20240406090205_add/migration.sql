-- AlterTable
ALTER TABLE "User" ADD COLUMN     "interest" TEXT[] DEFAULT ARRAY[]::TEXT[];
