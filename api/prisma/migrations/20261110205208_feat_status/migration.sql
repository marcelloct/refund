-- CreateEnum
CREATE TYPE "RefundStatus" AS ENUM ('pending', 'approved', 'rejected');

-- AlterTable
ALTER TABLE "refunds" ADD COLUMN     "status" "RefundStatus" NOT NULL DEFAULT 'pending';
