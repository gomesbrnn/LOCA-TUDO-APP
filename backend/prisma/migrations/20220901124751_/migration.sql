/*
  Warnings:

  - The primary key for the `movie_rent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `movie_rent` table. All the data in the column will be lost.
  - Added the required column `idRelacao` to the `movie_rent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `movie_rent` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `idRelacao` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`idRelacao`);
