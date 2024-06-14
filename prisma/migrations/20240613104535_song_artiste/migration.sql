/*
  Warnings:

  - The primary key for the `SongArtists` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "SongArtists" DROP CONSTRAINT "SongArtists_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "SongArtists_pkey" PRIMARY KEY ("id");
