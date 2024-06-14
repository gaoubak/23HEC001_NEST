-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_playListId_fkey";

-- AlterTable
ALTER TABLE "Song" ALTER COLUMN "playListId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_playListId_fkey" FOREIGN KEY ("playListId") REFERENCES "Playlist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
