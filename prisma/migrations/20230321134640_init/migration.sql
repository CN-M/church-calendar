/*
  Warnings:

  - Changed the type of `amount` on the `GeneralTithe` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `amount` on the `Tithe` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "GeneralTithe" ALTER COLUMN "name" DROP NOT NULL,
DROP COLUMN "amount",
ADD COLUMN     "amount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Tithe" DROP COLUMN "amount",
ADD COLUMN     "amount" INTEGER NOT NULL;
