-- AlterTable
ALTER TABLE "users" ADD COLUMN     "employee" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "owner" BOOLEAN NOT NULL DEFAULT false;
