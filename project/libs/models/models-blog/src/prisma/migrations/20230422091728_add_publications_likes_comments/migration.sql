-- CreateEnum
CREATE TYPE "PublicationKind" AS ENUM ('Link', 'Photo', 'Quote', 'Text', 'Video');

-- CreateEnum
CREATE TYPE "PublicationStatus" AS ENUM ('Draft', 'Published');

-- CreateTable
CREATE TABLE "publications" (
    "id" SERIAL NOT NULL,
    "announcement" TEXT,
    "author_quote" TEXT,
    "content" TEXT,
    "description" TEXT,
    "type" "PublicationKind" NOT NULL,
    "link" TEXT,
    "name" TEXT,
    "photo" TEXT,
    "status" "PublicationStatus" NOT NULL,
    "tags" TEXT[],
    "author_id" TEXT,
    "published_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "publications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "id" SERIAL NOT NULL,
    "author_id" TEXT NOT NULL,
    "publication_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "author_id" TEXT,
    "text" TEXT NOT NULL,
    "publication_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "publications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "publications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
