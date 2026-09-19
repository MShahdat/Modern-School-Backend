/*
  Warnings:

  - The primary key for the `missionVisions` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "missionVisions" DROP CONSTRAINT "missionVisions_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "missionVisions_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "missionVisions_id_seq";
