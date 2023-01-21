/*
  Warnings:

  - You are about to drop the `days` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "days_date_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "days";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "day" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_habit_days" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "habit_id" TEXT NOT NULL,
    "day_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    CONSTRAINT "habit_days_day_id_fkey" FOREIGN KEY ("day_id") REFERENCES "day" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "habit_days_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habits" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_habit_days" ("created_at", "day_id", "habit_id", "id") SELECT "created_at", "day_id", "habit_id", "id" FROM "habit_days";
DROP TABLE "habit_days";
ALTER TABLE "new_habit_days" RENAME TO "habit_days";
CREATE UNIQUE INDEX "habit_days_day_id_habit_id_key" ON "habit_days"("day_id", "habit_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "day_date_key" ON "day"("date");
