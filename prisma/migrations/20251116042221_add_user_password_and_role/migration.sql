[dotenv@17.2.3] injecting env (3) from .env.local -- tip: 👥 sync secrets across teammates & machines: https://dotenvx.com/ops
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- DropForeignKey
ALTER TABLE "public"."UserCardInteraction" DROP CONSTRAINT "UserCardInteraction_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserCardInteraction" DROP CONSTRAINT "UserCardInteraction_cardId_fkey";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "lastSeenAt";

-- DropTable
DROP TABLE "public"."UserCardInteraction";

