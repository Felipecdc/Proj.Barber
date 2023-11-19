/*
  Warnings:

  - Made the column `status` on table `services` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "services" ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT true;
