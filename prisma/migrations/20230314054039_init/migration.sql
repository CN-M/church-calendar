/*
  Warnings:

  - You are about to drop the column `Month` on the `Reminder` table. All the data in the column will be lost.
  - You are about to drop the column `Year` on the `Reminder` table. All the data in the column will be lost.
  - Added the required column `month` to the `Reminder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Reminder` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reminder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "day" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Reminder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reminder" ("createdAt", "day", "id", "text", "updatedAt", "userId") SELECT "createdAt", "day", "id", "text", "updatedAt", "userId" FROM "Reminder";
DROP TABLE "Reminder";
ALTER TABLE "new_Reminder" RENAME TO "Reminder";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
