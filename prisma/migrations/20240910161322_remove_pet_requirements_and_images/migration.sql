/*
  Warnings:

  - You are about to drop the `pets_pictures` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pets_requirements` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pets_pictures" DROP CONSTRAINT "pets_pictures_pt_id_fkey";

-- DropForeignKey
ALTER TABLE "pets_requirements" DROP CONSTRAINT "pets_requirements_pet_id_fkey";

-- DropTable
DROP TABLE "pets_pictures";

-- DropTable
DROP TABLE "pets_requirements";
