-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "category" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Public';
