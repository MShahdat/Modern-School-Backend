-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT', 'COMMITTEE', 'STAFF');

-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('CREADENTIAL', 'GOOGLE', 'FACEBOOK');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'BLOCKED', 'DELETED');

-- CreateEnum
CREATE TYPE "Shift" AS ENUM ('DAY', 'MORNING', 'NIGHT');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Group" AS ENUM ('SCIENCE', 'COMMERCE', 'ARTS');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT');

-- CreateEnum
CREATE TYPE "TeacherDesignation" AS ENUM ('HEADMASTER', 'ASSISTANT_HEADMASTER', 'TEACHER', 'ASSISTANT_TEACHER');

-- CreateEnum
CREATE TYPE "StaffDesignation" AS ENUM ('ACCOUNTANT', 'OFFICE_ASSISTANT', 'CLEANER', 'NIGHT_GUARD', 'AYAH');

-- CreateEnum
CREATE TYPE "CommitteeDesignation" AS ENUM ('CHAIRMAN', 'MAMBER');

-- CreateTable
CREATE TABLE "committees" (
    "id" TEXT NOT NULL,
    "committeeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "designation" "CommitteeDesignation" NOT NULL DEFAULT 'MAMBER',
    "fatherName" TEXT,
    "motherName" TEXT,
    "nationalId" TEXT,
    "bio" TEXT,
    "phone" TEXT,
    "qualification" TEXT,
    "experience" TEXT,
    "presentAddress" TEXT,
    "permanentAddress" TEXT,
    "startingDate" TIMESTAMP(3),
    "endingDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "siteConfigId" TEXT NOT NULL,

    CONSTRAINT "committees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "siteConfigs" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "schoolName" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "eiin" TEXT NOT NULL,
    "estdYear" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "facebookUrl" TEXT,
    "youtubeUrl" TEXT,
    "linkdinUrl" TEXT,
    "twitterUrl" TEXT,
    "instagramUrl" TEXT,
    "theme" JSONB,
    "darkTheme" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "siteConfigs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staffs" (
    "id" TEXT NOT NULL,
    "staff_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fatherName" TEXT,
    "motherName" TEXT,
    "nationalId" TEXT,
    "phone" TEXT,
    "bio" TEXT,
    "designation" "StaffDesignation",
    "qualification" TEXT,
    "experience" TEXT,
    "interest" TEXT,
    "startingDate" TIMESTAMP(3),
    "endingDate" TIMESTAMP(3),
    "presentAddress" TEXT,
    "permanemtAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "siteConfigId" TEXT NOT NULL,

    CONSTRAINT "staffs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "admissionDate" TIMESTAMP(3),
    "academicYear" TEXT,
    "class" TEXT,
    "section" TEXT,
    "role" INTEGER,
    "group" "Group",
    "shift" "Shift",
    "dateOfBirth" TIMESTAMP(3),
    "gender" "Gender",
    "bloodGroup" TEXT,
    "religion" TEXT,
    "nationality" TEXT NOT NULL DEFAULT 'Bangladeshi',
    "phone" TEXT,
    "presentAddress" TEXT,
    "permanentAddress" TEXT,
    "fatherName" TEXT,
    "fatherPhone" TEXT,
    "motherName" TEXT,
    "motherPhone" TEXT,
    "guardianName" TEXT,
    "guardianRelation" TEXT,
    "guardianPhone" TEXT,
    "emergencyContact" TEXT,
    "previousSchool" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "udpatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "siteConfigId" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teachers" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "designation" "TeacherDesignation",
    "joiningDate" TIMESTAMP(3),
    "employmentType" "EmploymentType" NOT NULL DEFAULT 'FULL_TIME',
    "salary" DECIMAL(10,2),
    "highestDegree" TEXT,
    "specialization" TEXT,
    "experienceYears" INTEGER DEFAULT 0,
    "dateOfBirth" TIMESTAMP(3),
    "gender" "Gender",
    "bloodGroup" TEXT,
    "religion" TEXT,
    "nationality" TEXT DEFAULT 'Bangladeshi',
    "phone" TEXT,
    "presentAddress" TEXT,
    "permanentAddress" TEXT,
    "bankName" TEXT,
    "bankAccount" TEXT,
    "startingDate" TIMESTAMP(3),
    "endingDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "departmentId" TEXT,
    "siteConfigId" TEXT NOT NULL,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profileImage" TEXT,
    "imagePublicId" TEXT,
    "googleId" TEXT,
    "authProvider" "AuthProvider" NOT NULL DEFAULT 'CREADENTIAL',
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "needPasswordChange" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "siteConfigId" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "committees_committeeId_key" ON "committees"("committeeId");

-- CreateIndex
CREATE UNIQUE INDEX "committees_email_key" ON "committees"("email");

-- CreateIndex
CREATE UNIQUE INDEX "committees_userId_key" ON "committees"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "siteConfigs_email_key" ON "siteConfigs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "siteConfigs_schoolName_key" ON "siteConfigs"("schoolName");

-- CreateIndex
CREATE UNIQUE INDEX "siteConfigs_eiin_key" ON "siteConfigs"("eiin");

-- CreateIndex
CREATE UNIQUE INDEX "staffs_staff_id_key" ON "staffs"("staff_id");

-- CreateIndex
CREATE UNIQUE INDEX "staffs_email_key" ON "staffs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "staffs_userId_key" ON "staffs"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_studentId_key" ON "Student"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_teacherId_key" ON "teachers"("teacherId");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_email_key" ON "teachers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_userId_key" ON "teachers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "committees" ADD CONSTRAINT "committees_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "committees" ADD CONSTRAINT "committees_siteConfigId_fkey" FOREIGN KEY ("siteConfigId") REFERENCES "siteConfigs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staffs" ADD CONSTRAINT "staffs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staffs" ADD CONSTRAINT "staffs_siteConfigId_fkey" FOREIGN KEY ("siteConfigId") REFERENCES "siteConfigs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_siteConfigId_fkey" FOREIGN KEY ("siteConfigId") REFERENCES "siteConfigs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_siteConfigId_fkey" FOREIGN KEY ("siteConfigId") REFERENCES "siteConfigs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_siteConfigId_fkey" FOREIGN KEY ("siteConfigId") REFERENCES "siteConfigs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
