/*
  Warnings:

  - You are about to drop the column `landLordId` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the column `landLordId` on the `rentalRequests` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `landlordId` to the `properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `landlordId` to the `rentalRequests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "properties" DROP CONSTRAINT "properties_landLordId_fkey";

-- DropForeignKey
ALTER TABLE "rentalRequests" DROP CONSTRAINT "rentalRequests_landLordId_fkey";

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "properties" DROP COLUMN "landLordId",
ADD COLUMN     "landlordId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "rentalRequests" DROP COLUMN "landLordId",
ADD COLUMN     "landlordId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_landlordId_fkey" FOREIGN KEY ("landlordId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rentalRequests" ADD CONSTRAINT "rentalRequests_landlordId_fkey" FOREIGN KEY ("landlordId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
