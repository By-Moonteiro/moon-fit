/*
  Warnings:

  - You are about to drop the column `category_id` on the `exercises` table. All the data in the column will be lost.
  - You are about to drop the column `is_completed` on the `exercises` table. All the data in the column will be lost.
  - You are about to drop the column `repetitions` on the `exercises` table. All the data in the column will be lost.
  - You are about to drop the column `rest_time` on the `exercises` table. All the data in the column will be lost.
  - You are about to drop the column `series` on the `exercises` table. All the data in the column will be lost.
  - You are about to drop the `training_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `training_sheets` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `execution_media_url` to the `exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `muscle_group` to the `exercises` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "exercises" DROP CONSTRAINT "exercises_category_id_fkey";

-- DropForeignKey
ALTER TABLE "training_categories" DROP CONSTRAINT "training_categories_sheet_id_fkey";

-- DropForeignKey
ALTER TABLE "training_sheets" DROP CONSTRAINT "training_sheets_userId_fkey";

-- AlterTable
ALTER TABLE "exercises" DROP COLUMN "category_id",
DROP COLUMN "is_completed",
DROP COLUMN "repetitions",
DROP COLUMN "rest_time",
DROP COLUMN "series",
ADD COLUMN     "execution_media_url" TEXT NOT NULL,
ADD COLUMN     "muscle_group" TEXT NOT NULL;

-- DropTable
DROP TABLE "training_categories";

-- DropTable
DROP TABLE "training_sheets";

-- CreateTable
CREATE TABLE "workout_plans" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workout_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "training_days" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "workout_plan_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "training_days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_sets" (
    "id" TEXT NOT NULL,
    "exercise_id" TEXT NOT NULL,
    "training_day_id" TEXT NOT NULL,
    "repetitions" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "rest_time" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workout_sets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "workout_plans" ADD CONSTRAINT "workout_plans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_days" ADD CONSTRAINT "training_days_workout_plan_id_fkey" FOREIGN KEY ("workout_plan_id") REFERENCES "workout_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_sets" ADD CONSTRAINT "workout_sets_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_sets" ADD CONSTRAINT "workout_sets_training_day_id_fkey" FOREIGN KEY ("training_day_id") REFERENCES "training_days"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
