/*
  Warnings:

  - Made the column `userId` on table `Tithe` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Tithe" ALTER COLUMN "userId" SET NOT NULL;
