-- AlterTable
ALTER TABLE "Departments" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "committees" ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "siteConfigs" ADD COLUMN     "logoPublicId" TEXT;

-- AlterTable
ALTER TABLE "staffs" ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "teachers" ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';
