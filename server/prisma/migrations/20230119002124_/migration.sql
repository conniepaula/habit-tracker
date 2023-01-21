/*
  Warnings:

  - You are about to drop the column `day` on the `habit_frequency` table. All the data in the column will be lost.
  - Added the required column `day_freq` to the `habit_frequency` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_habit_frequency" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "habit_id" TEXT NOT NULL,
    "day_freq" INTEGER NOT NULL,
    CONSTRAINT "habit_frequency_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habits" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_habit_frequency" ("habit_id", "id") SELECT "habit_id", "id" FROM "habit_frequency";
DROP TABLE "habit_frequency";
ALTER TABLE "new_habit_frequency" RENAME TO "habit_frequency";
CREATE UNIQUE INDEX "habit_frequency_habit_id_day_freq_key" ON "habit_frequency"("habit_id", "day_freq");
CREATE TABLE "new_habit_days" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "habit_id" TEXT NOT NULL,
    "day_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    CONSTRAINT "habit_days_day_id_fkey" FOREIGN KEY ("day_id") REFERENCES "days" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "habit_days_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habits" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_habit_days" ("created_at", "day_id", "habit_id", "id") SELECT "created_at", "day_id", "habit_id", "id" FROM "habit_days";
DROP TABLE "habit_days";
ALTER TABLE "new_habit_days" RENAME TO "habit_days";
CREATE UNIQUE INDEX "habit_days_day_id_habit_id_key" ON "habit_days"("day_id", "habit_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
