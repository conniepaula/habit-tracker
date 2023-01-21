-- CreateTable
CREATE TABLE "habit_frequency" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "habit_id" TEXT NOT NULL,
    "day" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "days" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "habit_days" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "habit_id" TEXT NOT NULL,
    "day_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "habit_frequency_habit_id_day_key" ON "habit_frequency"("habit_id", "day");

-- CreateIndex
CREATE UNIQUE INDEX "days_date_key" ON "days"("date");

-- CreateIndex
CREATE UNIQUE INDEX "habit_days_day_id_habit_id_key" ON "habit_days"("day_id", "habit_id");
