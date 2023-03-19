/*
  Warnings:

  - You are about to drop the `Reminder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `reminderId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Event` table. All the data in the column will be lost.
  - Added the required column `endDatetime` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDatetime` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Reminder";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "startDatetime" DATETIME NOT NULL,
    "endDatetime" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
