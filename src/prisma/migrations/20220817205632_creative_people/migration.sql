/*
  Warnings:

  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `MediaObject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MusicComposition` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstName",
DROP COLUMN "lastName";

-- DropTable
DROP TABLE "MediaObject";

-- DropTable
DROP TABLE "MusicComposition";

-- CreateTable
CREATE TABLE "CreativePeople" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creativeWorkId" INTEGER NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "CreativePeople_pkey" PRIMARY KEY ("creativeWorkId","personId")
);

-- AddForeignKey
ALTER TABLE "CreativePeople" ADD CONSTRAINT "CreativePeople_creativeWorkId_fkey" FOREIGN KEY ("creativeWorkId") REFERENCES "CreativeWork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreativePeople" ADD CONSTRAINT "CreativePeople_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
