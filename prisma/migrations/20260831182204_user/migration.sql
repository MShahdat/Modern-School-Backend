/*
  Warnings:

  - The `presentAddress` column on the `committees` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `permanentAddress` column on the `committees` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `interest` on the `staffs` table. All the data in the column will be lost.
  - The `presentAddress` column on the `staffs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `permanemtAddress` column on the `staffs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `departmentId` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `startingDate` on the `teachers` table. All the data in the column will be lost.
  - The `presentAddress` column on the `teachers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `permanentAddress` column on the `teachers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Departments` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `joiningDate` on table `teachers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "CommitteeDesignation" ADD VALUE 'OWNER';

-- AlterEnum
ALTER TYPE "Group" ADD VALUE 'NONE';

-- DropForeignKey
ALTER TABLE "teachers" DROP CONSTRAINT "teachers_departmentId_fkey";

-- AlterTable
ALTER TABLE "committees" ADD COLUMN     "message" TEXT,
DROP COLUMN "presentAddress",
ADD COLUMN     "presentAddress" JSONB,
DROP COLUMN "permanentAddress",
ADD COLUMN     "permanentAddress" JSONB;

-- AlterTable
ALTER TABLE "staffs" DROP COLUMN "interest",
DROP COLUMN "presentAddress",
ADD COLUMN     "presentAddress" JSONB,
DROP COLUMN "permanemtAddress",
ADD COLUMN     "permanemtAddress" JSONB;

-- AlterTable
ALTER TABLE "teachers" DROP COLUMN "departmentId",
DROP COLUMN "startingDate",
ADD COLUMN     "department" "Group" NOT NULL DEFAULT 'NONE',
ADD COLUMN     "fatherName" TEXT,
ADD COLUMN     "motherName" TEXT,
ADD COLUMN     "subject" JSONB[],
ALTER COLUMN "joiningDate" SET NOT NULL,
DROP COLUMN "presentAddress",
ADD COLUMN     "presentAddress" JSONB,
DROP COLUMN "permanentAddress",
ADD COLUMN     "permanentAddress" JSONB;

-- DropTable
DROP TABLE "Departments";
