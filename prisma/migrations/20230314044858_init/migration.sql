/*
  Warnings:

  - You are about to drop the column `complete` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Event` table. All the data in the column will be lost.
  - Added the required column `ReminderId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Reminder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "day" INTEGER NOT NULL,
    "Month" INTEGER NOT NULL,
    "Year" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Reminder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "text" TEXT NOT NULL,
    "ReminderId" TEXT NOT NULL,
    CONSTRAINT "Event_ReminderId_fkey" FOREIGN KEY ("ReminderId") REFERENCES "Reminder" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("createdAt", "id", "text", "updatedAt") SELECT "createdAt", "id", "text", "updatedAt" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
