/*
  Warnings:

  - Made the column `author_id` on table `publications` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "publications" ADD COLUMN     "is_reposted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "original_author_id" TEXT,
ADD COLUMN     "original_publication_id" INTEGER,
ALTER COLUMN "author_id" SET NOT NULL;
