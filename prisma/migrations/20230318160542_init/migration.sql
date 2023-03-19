/*
  Warnings:

  - You are about to drop the column `userId` on the `Event` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "startDatetime" TEXT NOT NULL,
    "endDatetime" TEXT NOT NULL
);
INSERT INTO "new_Event" ("createdAt", "endDatetime", "id", "name", "startDatetime", "updatedAt") SELECT "createdAt", "endDatetime", "id", "name", "startDatetime", "updatedAt" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
