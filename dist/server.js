

   import { createRequire } from 'module';

   const require = createRequire(import.meta.url);

  
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express from "express";

// src/app/config/env.ts
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
var config = {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bakend_url: process.env.BACKEND_URL,
  frontend_url: process.env.FRONTEND_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  siteConfigId: process.env.SITE_CONFIG_ID,
  siteConfigEmail: process.env.SITE_CONFIG_EMAIL,
  super_admin_name: process.env.SUPER_ADMIN_NAME,
  super_admin_email: process.env.SUPER_ADMIN_EMAIL,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
  tester_admin_name: process.env.TESTER_ADMIN_NAME,
  tester_admin_email: process.env.TESTER_ADMIN_EMAIL,
  tester_admin_password: process.env.TESTER_ADMIN_PASSWORD,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET
};
var env_default = config;

// src/app.ts
import cors from "cors";
import cookieParser from "cookie-parser";

// src/app/middleware/globalErrorHandler.ts
import httpStatus from "http-status";

// generated/prisma/client.ts
import * as path2 from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config2 = {
  "previewFeatures": [],
  "clientVersion": "7.9.1",
  "engineVersion": "e922089b7d7502aff4249d5da3420f6fa55fc6ad",
  "activeProvider": "postgresql",
  "inlineSchema": 'model AcademicRules {\n  id String @id @default(uuid())\n\n  title       String\n  description String\n  isActive    Boolean @default(true)\n\n  isDeleted Boolean   @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  siteConfig   SiteConfig @relation(fields: [siteConfigId], references: [id])\n  siteConfigId String\n\n  @@map("academicRules")\n}\n\nmodel Achievement {\n  id String @id @default(uuid())\n\n  title         String\n  description   String\n  cover         String?\n  coverPublicId String?\n  isActive      Boolean @default(true)\n\n  isDeleted Boolean   @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  udpatedAt DateTime @updatedAt\n\n  siteConfigId String\n  siteConfig   SiteConfig @relation(fields: [siteConfigId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  gallery Gallery[]\n\n  @@map("achievements")\n}\n\nmodel Activity {\n  id String @id @default(uuid())\n\n  title       String\n  description String?\n  isActive    Boolean   @default(true)\n  isDeleted   Boolean   @default(false)\n  deletedAt   DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  siteConfig   SiteConfig @relation(fields: [siteConfigId], references: [id])\n  siteConfigId String\n\n  @@map("activities")\n}\n\nmodel AdmissionTest {\n  id String @id @default(uuid())\n\n  title       String\n  description String?\n  isActive    Boolean   @default(true)\n  isDeleted   Boolean   @default(false)\n  deletedAt   DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  siteConfig   SiteConfig @relation(fields: [siteConfigId], references: [id])\n  siteConfigId String\n\n  @@map("admissionTest")\n}\n\nmodel Apply {\n  id String @id @default(uuid())\n\n  title       String\n  description String?\n  isActive    Boolean   @default(true)\n  isDeleted   Boolean   @default(false)\n  deletedAt   DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  siteConfig   SiteConfig @relation(fields: [siteConfigId], references: [id])\n  siteConfigId String\n\n  @@map("apply")\n}\n\nmodel Calendar {\n  id String @id @default(uuid())\n\n  title         String\n  description   String?\n  file          String\n  filePublicId  String?\n  publishedDate DateTime @default(now())\n  isActive      Boolean  @default(true)\n\n  isDeleted Boolean   @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  siteConfig   SiteConfig @relation(fields: [siteConfigId], references: [id])\n  siteConfigId String\n\n  @@map("calendar")\n}\n\nmodel Committee {\n  id String @id @default(uuid())\n\n  committeeId String     @unique\n  name        String\n  email       String     @unique\n  status      UserStatus @default(ACTIVE)\n\n  designation CommitteeDesignation @default(MAMBER)\n\n  message    String?\n  fatherName String?\n  motherName String?\n  nationalId String?\n  bio        String?\n  phone      String?\n\n  qualification String?\n  experience    String?\n\n  presentAddress   Json?\n  permanentAddress Json?\n\n  startingDate DateTime?\n  endingDate   DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  userId       String     @unique\n  user         User       @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n  siteConfigId String\n  siteConfig   SiteConfig @relation(fields: [siteConfigId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  @@map("committees")\n}\n\nenum Role {\n  SUPER_ADMIN\n  ADMIN\n  TEACHER\n  STUDENT\n  COMMITTEE\n  STAFF\n}\n\nenum AuthProvider {\n  CREADENTIAL\n  GOOGLE\n  FACEBOOK\n}\n\nenum UserStatus {\n  ACTIVE\n  BLOCKED\n  DELETED\n}\n\nenum Shift {\n  DAY\n  MORNING\n  NIGHT\n}\n\nenum Gender {\n  MALE\n  FEMALE\n}\n\nenum Group {\n  SCIENCE\n  COMMERCE\n  ARTS\n  NONE\n}\n\nenum EmploymentType {\n  FULL_TIME\n  PART_TIME\n  CONTRACT\n}\n\nenum TeacherDesignation {\n  HEADMASTER\n  ASSISTANT_HEADMASTER\n  TEACHER\n  ASSISTANT_TEACHER\n}\n\nenum StaffDesignation {\n  ACCOUNTANT\n  OFFICE_ASSISTANT\n  CLEANER\n  NIGHT_GUARD\n  AYAH\n}\n\nenum CommitteeDesignation {\n  OWNER\n  CHAIRMAN\n  MAMBER\n}\n\nmodel Event {\n  id          String    @id @default(uuid())\n  title       String\n  description String\n  startDate   DateTime?\n  endDate     DateTime?\n  location    String?\n  isActive    Boolean   @default(true)\n\n  coverImage         String?\n  coverImagePublicId String?\n\n  isDeleted Boolean   @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  siteConfig   SiteConfig @relation(fields: [siteConfigId], references: [id])\n  siteConfigId String\n\n  gallery Gallery[]\n\n  @@map("events")\n}\n\nmodel Gallery {\n  id String @id @default(uuid())\n\n  file         String\n  filePublicId String\n  isActive     Boolean @default(true)\n\n  isDeleted Boolean   @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  eventId       String?\n  event         Event?       @relation(fields: [eventId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n  achievementId String?\n  achievement   Achievement? @relation(fields: [achievementId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  @@map("galleries")\n}\n\nmodel MissionVision {\n  id String @id @default(uuid())\n\n  mission String\n  vision  String\n\n  isActive Boolean @default(true)\n\n  isDeleted Boolean   @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n\n  siteConfig   SiteConfig @relation(fields: [siteConfigId], references: [id])\n  siteConfigId String\n\n  @@map("missionVisions")\n}\n\nmodel News {\n  id String @id @default(uuid())\n\n  title        String\n  content      String\n  file         String?\n  filePublicId String?\n\n  isActive  Boolean   @default(true)\n  isDeleted Boolean   @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  siteConfigId String\n  siteConfig   SiteConfig @relation(fields: [siteConfigId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  @@map("news")\n}\n\nmodel Notice {\n  id String @id @default(uuid())\n\n  title        String\n  content      String\n  file         String?\n  filePublicId String?\n  isActive     Boolean   @default(true)\n  isDeleted    Boolean   @default(false)\n  deletedAt    DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  siteConfigId String\n  siteConfig   SiteConfig @relation(fields: [siteConfigId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  @@map("notices")\n}\n\nmodel RegistrationSystem {\n  id String @id @default(uuid())\n\n  title       String\n  description String?\n  isActive    Boolean   @default(true)\n  isDeleted   Boolean   @default(false)\n  deletedAt   DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  siteConfig   SiteConfig @relation(fields: [siteConfigId], references: [id])\n  siteConfigId String\n\n  @@map("registrationSystem")\n}\n\nmodel Routine {\n  id String @id @default(uuid())\n\n  title        String\n  description  String?\n  file         String\n  filePublicId String?\n  isActive     Boolean @default(true)\n\n  isDeleted Boolean   @default(false)\n  deletedAt DateTime?\n\n  siteConfig   SiteConfig @relation(fields: [siteConfigId], references: [id])\n  siteConfigId String\n\n  @@map("routine")\n}\n\nmodel ExamSchedule {\n  id String @id @default(uuid())\n\n  title        String\n  description  String?\n  file         String\n  filePublicId String?\n  isActive     Boolean   @default(true)\n  isDeleted    Boolean   @default(false)\n  deletedAt    DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  siteConfig   SiteConfig @relation(fields: [siteConfigId], references: [id])\n  siteConfigId String\n\n  @@map("exampSchedule")\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel SiteConfig {\n  id String @id @default(uuid())\n\n  email        String  @unique\n  schoolName   String? @unique\n  logo         String?\n  logoPublicId String?\n  address      String?\n  eiin         String? @unique\n  estdYear     String?\n  isActive     Boolean @default(true)\n\n  facebookUrl  String?\n  youtubeUrl   String?\n  linkdinUrl   String?\n  twitterUrl   String?\n  instagramUrl String?\n\n  theme     Json?\n  darkTheme Json?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  user               User[]\n  teacher            Teacher[]\n  student            Student[]\n  staffs             Staff[]\n  committees         Committee[]\n  events             Event[]\n  notice             Notice[]\n  news               News[]\n  calendar           Calendar[]\n  achievement        Achievement[]\n  missionVision      MissionVision[]\n  routine            Routine[]\n  academicRules      AcademicRules[]\n  study              Study[]\n  apply              Apply[]\n  admissionTest      AdmissionTest[]\n  registrationSystem RegistrationSystem[]\n  activity           Activity[]\n  examSchedule       ExamSchedule[]\n  uniform            Uniform[]\n\n  @@map("siteConfigs")\n}\n\nmodel Staff {\n  id String @id @default(uuid())\n\n  staff_id String     @unique\n  name     String\n  email    String     @unique\n  status   UserStatus @default(ACTIVE)\n\n  fatherName String?\n  motherName String?\n  nationalId String?\n  phone      String?\n  bio        String?\n\n  designation   StaffDesignation?\n  qualification String?\n  experience    String?\n\n  startingDate DateTime?\n  endingDate   DateTime?\n\n  presentAddress   Json?\n  permanemtAddress Json?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  userId       String     @unique\n  user         User       @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n  siteConfigId String\n  siteConfig   SiteConfig @relation(fields: [siteConfigId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  @@map("staffs")\n}\n\nmodel Student {\n  id String @id @default(uuid())\n\n  studentId String     @unique\n  name      String\n  email     String     @unique\n  status    UserStatus @default(ACTIVE)\n\n  admissionDate DateTime?\n  academicYear  String?\n  class         String?\n  section       String?\n  role          Int?\n  group         Group?\n  shift         Shift?\n\n  dateOfBirth DateTime?\n  gender      Gender?\n  bloodGroup  String?\n  religion    String?\n  nationality String    @default("Bangladeshi")\n  phone       String?\n\n  presentAddress   String?\n  permanentAddress String?\n\n  fatherName       String?\n  fatherPhone      String?\n  motherName       String?\n  motherPhone      String?\n  guardianName     String?\n  guardianRelation String?\n  guardianPhone    String?\n  emergencyContact String?\n\n  previousSchool String?\n\n  createdAt DateTime @default(now())\n  udpatedAt DateTime @updatedAt\n\n  userId       String     @unique\n  user         User       @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n  siteConfigId String\n  siteConfig   SiteConfig @relation(fields: [siteConfigId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n}\n\nmodel Teacher {\n  id String @id @default(uuid())\n\n  teacherId      String              @unique\n  name           String\n  email          String              @unique\n  designation    TeacherDesignation?\n  joiningDate    DateTime\n  endingDate     DateTime?\n  employmentType EmploymentType      @default(FULL_TIME)\n  salary         Decimal?            @db.Decimal(10, 2)\n  status         UserStatus          @default(ACTIVE)\n\n  department      Group   @default(NONE)\n  subject         Json[]\n  highestDegree   String? // "M.Sc", "Ph.D"\n  specialization  String?\n  experienceYears Int?    @default(0)\n\n  fatherName  String?\n  motherName  String?\n  dateOfBirth DateTime?\n  gender      Gender?\n  bloodGroup  String?\n  religion    String?\n  nationality String?   @default("Bangladeshi")\n  phone       String?\n\n  presentAddress   Json?\n  permanentAddress Json?\n\n  bankName    String?\n  bankAccount String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  userId       String     @unique\n  user         User       @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n  siteConfigId String\n  siteConfig   SiteConfig @relation(fields: [siteConfigId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  @@map("teachers")\n}\n\nmodel Uniform {\n  id String @id @default(uuid())\n\n  title        String\n  description  String?\n  file         String\n  filePublicId String?\n  isActive     Boolean   @default(true)\n  isDeleted    Boolean   @default(false)\n  deletedAt    DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  siteConfig   SiteConfig @relation(fields: [siteConfigId], references: [id])\n  siteConfigId String\n\n  @@map("uniform")\n}\n\nmodel User {\n  id String @id @default(uuid())\n\n  name               String\n  email              String       @unique\n  password           String\n  profileImage       String?\n  imagePublicId      String?\n  googleId           String?\n  authProvider       AuthProvider @default(CREADENTIAL)\n  emailVerified      Boolean      @default(false)\n  role               Role         @default(STUDENT)\n  status             UserStatus   @default(ACTIVE)\n  needPasswordChange Boolean      @default(false)\n  isDeleted          Boolean      @default(false)\n  deletedAt          DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  siteConfigId String\n  siteConfig   SiteConfig @relation(fields: [siteConfigId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  student   Student?\n  teacher   Teacher?\n  staff     Staff?\n  committee Committee?\n\n  @@map("users")\n}\n\nmodel Study {\n  id String @id @default(uuid())\n\n  title       String\n  description String?\n  isActive    Boolean   @default(true)\n  isDeleted   Boolean   @default(false)\n  deletedAt   DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  siteConfig   SiteConfig @relation(fields: [siteConfigId], references: [id])\n  siteConfigId String\n\n  @@map("study")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config2.runtimeDataModel = JSON.parse('{"models":{"AcademicRules":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"siteConfig","kind":"object","type":"SiteConfig","relationName":"AcademicRulesToSiteConfig"},{"name":"siteConfigId","kind":"scalar","type":"String"}],"dbName":"academicRules"},"Achievement":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"cover","kind":"scalar","type":"String"},{"name":"coverPublicId","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"udpatedAt","kind":"scalar","type":"DateTime"},{"name":"siteConfigId","kind":"scalar","type":"String"},{"name":"siteConfig","kind":"object","type":"SiteConfig","relationName":"AchievementToSiteConfig"},{"name":"gallery","kind":"object","type":"Gallery","relationName":"AchievementToGallery"}],"dbName":"achievements"},"Activity":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"siteConfig","kind":"object","type":"SiteConfig","relationName":"ActivityToSiteConfig"},{"name":"siteConfigId","kind":"scalar","type":"String"}],"dbName":"activities"},"AdmissionTest":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"siteConfig","kind":"object","type":"SiteConfig","relationName":"AdmissionTestToSiteConfig"},{"name":"siteConfigId","kind":"scalar","type":"String"}],"dbName":"admissionTest"},"Apply":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"siteConfig","kind":"object","type":"SiteConfig","relationName":"ApplyToSiteConfig"},{"name":"siteConfigId","kind":"scalar","type":"String"}],"dbName":"apply"},"Calendar":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"file","kind":"scalar","type":"String"},{"name":"filePublicId","kind":"scalar","type":"String"},{"name":"publishedDate","kind":"scalar","type":"DateTime"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"siteConfig","kind":"object","type":"SiteConfig","relationName":"CalendarToSiteConfig"},{"name":"siteConfigId","kind":"scalar","type":"String"}],"dbName":"calendar"},"Committee":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"committeeId","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"designation","kind":"enum","type":"CommitteeDesignation"},{"name":"message","kind":"scalar","type":"String"},{"name":"fatherName","kind":"scalar","type":"String"},{"name":"motherName","kind":"scalar","type":"String"},{"name":"nationalId","kind":"scalar","type":"String"},{"name":"bio","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"qualification","kind":"scalar","type":"String"},{"name":"experience","kind":"scalar","type":"String"},{"name":"presentAddress","kind":"scalar","type":"Json"},{"name":"permanentAddress","kind":"scalar","type":"Json"},{"name":"startingDate","kind":"scalar","type":"DateTime"},{"name":"endingDate","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"CommitteeToUser"},{"name":"siteConfigId","kind":"scalar","type":"String"},{"name":"siteConfig","kind":"object","type":"SiteConfig","relationName":"CommitteeToSiteConfig"}],"dbName":"committees"},"Event":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"startDate","kind":"scalar","type":"DateTime"},{"name":"endDate","kind":"scalar","type":"DateTime"},{"name":"location","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"coverImage","kind":"scalar","type":"String"},{"name":"coverImagePublicId","kind":"scalar","type":"String"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"siteConfig","kind":"object","type":"SiteConfig","relationName":"EventToSiteConfig"},{"name":"siteConfigId","kind":"scalar","type":"String"},{"name":"gallery","kind":"object","type":"Gallery","relationName":"EventToGallery"}],"dbName":"events"},"Gallery":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"file","kind":"scalar","type":"String"},{"name":"filePublicId","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"eventId","kind":"scalar","type":"String"},{"name":"event","kind":"object","type":"Event","relationName":"EventToGallery"},{"name":"achievementId","kind":"scalar","type":"String"},{"name":"achievement","kind":"object","type":"Achievement","relationName":"AchievementToGallery"}],"dbName":"galleries"},"MissionVision":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"mission","kind":"scalar","type":"String"},{"name":"vision","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"siteConfig","kind":"object","type":"SiteConfig","relationName":"MissionVisionToSiteConfig"},{"name":"siteConfigId","kind":"scalar","type":"String"}],"dbName":"missionVisions"},"News":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"file","kind":"scalar","type":"String"},{"name":"filePublicId","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"siteConfigId","kind":"scalar","type":"String"},{"name":"siteConfig","kind":"object","type":"SiteConfig","relationName":"NewsToSiteConfig"}],"dbName":"news"},"Notice":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"file","kind":"scalar","type":"String"},{"name":"filePublicId","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"siteConfigId","kind":"scalar","type":"String"},{"name":"siteConfig","kind":"object","type":"SiteConfig","relationName":"NoticeToSiteConfig"}],"dbName":"notices"},"RegistrationSystem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"siteConfig","kind":"object","type":"SiteConfig","relationName":"RegistrationSystemToSiteConfig"},{"name":"siteConfigId","kind":"scalar","type":"String"}],"dbName":"registrationSystem"},"Routine":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"file","kind":"scalar","type":"String"},{"name":"filePublicId","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"siteConfig","kind":"object","type":"SiteConfig","relationName":"RoutineToSiteConfig"},{"name":"siteConfigId","kind":"scalar","type":"String"}],"dbName":"routine"},"ExamSchedule":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"file","kind":"scalar","type":"String"},{"name":"filePublicId","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"siteConfig","kind":"object","type":"SiteConfig","relationName":"ExamScheduleToSiteConfig"},{"name":"siteConfigId","kind":"scalar","type":"String"}],"dbName":"exampSchedule"},"SiteConfig":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"schoolName","kind":"scalar","type":"String"},{"name":"logo","kind":"scalar","type":"String"},{"name":"logoPublicId","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"eiin","kind":"scalar","type":"String"},{"name":"estdYear","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"facebookUrl","kind":"scalar","type":"String"},{"name":"youtubeUrl","kind":"scalar","type":"String"},{"name":"linkdinUrl","kind":"scalar","type":"String"},{"name":"twitterUrl","kind":"scalar","type":"String"},{"name":"instagramUrl","kind":"scalar","type":"String"},{"name":"theme","kind":"scalar","type":"Json"},{"name":"darkTheme","kind":"scalar","type":"Json"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"SiteConfigToUser"},{"name":"teacher","kind":"object","type":"Teacher","relationName":"SiteConfigToTeacher"},{"name":"student","kind":"object","type":"Student","relationName":"SiteConfigToStudent"},{"name":"staffs","kind":"object","type":"Staff","relationName":"SiteConfigToStaff"},{"name":"committees","kind":"object","type":"Committee","relationName":"CommitteeToSiteConfig"},{"name":"events","kind":"object","type":"Event","relationName":"EventToSiteConfig"},{"name":"notice","kind":"object","type":"Notice","relationName":"NoticeToSiteConfig"},{"name":"news","kind":"object","type":"News","relationName":"NewsToSiteConfig"},{"name":"calendar","kind":"object","type":"Calendar","relationName":"CalendarToSiteConfig"},{"name":"achievement","kind":"object","type":"Achievement","relationName":"AchievementToSiteConfig"},{"name":"missionVision","kind":"object","type":"MissionVision","relationName":"MissionVisionToSiteConfig"},{"name":"routine","kind":"object","type":"Routine","relationName":"RoutineToSiteConfig"},{"name":"academicRules","kind":"object","type":"AcademicRules","relationName":"AcademicRulesToSiteConfig"},{"name":"study","kind":"object","type":"Study","relationName":"SiteConfigToStudy"},{"name":"apply","kind":"object","type":"Apply","relationName":"ApplyToSiteConfig"},{"name":"admissionTest","kind":"object","type":"AdmissionTest","relationName":"AdmissionTestToSiteConfig"},{"name":"registrationSystem","kind":"object","type":"RegistrationSystem","relationName":"RegistrationSystemToSiteConfig"},{"name":"activity","kind":"object","type":"Activity","relationName":"ActivityToSiteConfig"},{"name":"examSchedule","kind":"object","type":"ExamSchedule","relationName":"ExamScheduleToSiteConfig"},{"name":"uniform","kind":"object","type":"Uniform","relationName":"SiteConfigToUniform"}],"dbName":"siteConfigs"},"Staff":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"staff_id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"fatherName","kind":"scalar","type":"String"},{"name":"motherName","kind":"scalar","type":"String"},{"name":"nationalId","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"bio","kind":"scalar","type":"String"},{"name":"designation","kind":"enum","type":"StaffDesignation"},{"name":"qualification","kind":"scalar","type":"String"},{"name":"experience","kind":"scalar","type":"String"},{"name":"startingDate","kind":"scalar","type":"DateTime"},{"name":"endingDate","kind":"scalar","type":"DateTime"},{"name":"presentAddress","kind":"scalar","type":"Json"},{"name":"permanemtAddress","kind":"scalar","type":"Json"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"StaffToUser"},{"name":"siteConfigId","kind":"scalar","type":"String"},{"name":"siteConfig","kind":"object","type":"SiteConfig","relationName":"SiteConfigToStaff"}],"dbName":"staffs"},"Student":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"studentId","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"admissionDate","kind":"scalar","type":"DateTime"},{"name":"academicYear","kind":"scalar","type":"String"},{"name":"class","kind":"scalar","type":"String"},{"name":"section","kind":"scalar","type":"String"},{"name":"role","kind":"scalar","type":"Int"},{"name":"group","kind":"enum","type":"Group"},{"name":"shift","kind":"enum","type":"Shift"},{"name":"dateOfBirth","kind":"scalar","type":"DateTime"},{"name":"gender","kind":"enum","type":"Gender"},{"name":"bloodGroup","kind":"scalar","type":"String"},{"name":"religion","kind":"scalar","type":"String"},{"name":"nationality","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"presentAddress","kind":"scalar","type":"String"},{"name":"permanentAddress","kind":"scalar","type":"String"},{"name":"fatherName","kind":"scalar","type":"String"},{"name":"fatherPhone","kind":"scalar","type":"String"},{"name":"motherName","kind":"scalar","type":"String"},{"name":"motherPhone","kind":"scalar","type":"String"},{"name":"guardianName","kind":"scalar","type":"String"},{"name":"guardianRelation","kind":"scalar","type":"String"},{"name":"guardianPhone","kind":"scalar","type":"String"},{"name":"emergencyContact","kind":"scalar","type":"String"},{"name":"previousSchool","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"udpatedAt","kind":"scalar","type":"DateTime"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"StudentToUser"},{"name":"siteConfigId","kind":"scalar","type":"String"},{"name":"siteConfig","kind":"object","type":"SiteConfig","relationName":"SiteConfigToStudent"}],"dbName":null},"Teacher":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"teacherId","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"designation","kind":"enum","type":"TeacherDesignation"},{"name":"joiningDate","kind":"scalar","type":"DateTime"},{"name":"endingDate","kind":"scalar","type":"DateTime"},{"name":"employmentType","kind":"enum","type":"EmploymentType"},{"name":"salary","kind":"scalar","type":"Decimal"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"department","kind":"enum","type":"Group"},{"name":"subject","kind":"scalar","type":"Json"},{"name":"highestDegree","kind":"scalar","type":"String"},{"name":"specialization","kind":"scalar","type":"String"},{"name":"experienceYears","kind":"scalar","type":"Int"},{"name":"fatherName","kind":"scalar","type":"String"},{"name":"motherName","kind":"scalar","type":"String"},{"name":"dateOfBirth","kind":"scalar","type":"DateTime"},{"name":"gender","kind":"enum","type":"Gender"},{"name":"bloodGroup","kind":"scalar","type":"String"},{"name":"religion","kind":"scalar","type":"String"},{"name":"nationality","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"presentAddress","kind":"scalar","type":"Json"},{"name":"permanentAddress","kind":"scalar","type":"Json"},{"name":"bankName","kind":"scalar","type":"String"},{"name":"bankAccount","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"TeacherToUser"},{"name":"siteConfigId","kind":"scalar","type":"String"},{"name":"siteConfig","kind":"object","type":"SiteConfig","relationName":"SiteConfigToTeacher"}],"dbName":"teachers"},"Uniform":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"file","kind":"scalar","type":"String"},{"name":"filePublicId","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"siteConfig","kind":"object","type":"SiteConfig","relationName":"SiteConfigToUniform"},{"name":"siteConfigId","kind":"scalar","type":"String"}],"dbName":"uniform"},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"profileImage","kind":"scalar","type":"String"},{"name":"imagePublicId","kind":"scalar","type":"String"},{"name":"googleId","kind":"scalar","type":"String"},{"name":"authProvider","kind":"enum","type":"AuthProvider"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"role","kind":"enum","type":"Role"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"needPasswordChange","kind":"scalar","type":"Boolean"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"siteConfigId","kind":"scalar","type":"String"},{"name":"siteConfig","kind":"object","type":"SiteConfig","relationName":"SiteConfigToUser"},{"name":"student","kind":"object","type":"Student","relationName":"StudentToUser"},{"name":"teacher","kind":"object","type":"Teacher","relationName":"TeacherToUser"},{"name":"staff","kind":"object","type":"Staff","relationName":"StaffToUser"},{"name":"committee","kind":"object","type":"Committee","relationName":"CommitteeToUser"}],"dbName":"users"},"Study":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"siteConfig","kind":"object","type":"SiteConfig","relationName":"SiteConfigToStudy"},{"name":"siteConfigId","kind":"scalar","type":"String"}],"dbName":"study"}},"enums":{},"types":{}}');
config2.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","siteConfig","user","student","teacher","staff","committee","staffs","committees","event","gallery","_count","achievement","events","notice","news","calendar","missionVision","routine","academicRules","study","apply","admissionTest","registrationSystem","activity","examSchedule","uniform","AcademicRules.findUnique","AcademicRules.findUniqueOrThrow","AcademicRules.findFirst","AcademicRules.findFirstOrThrow","AcademicRules.findMany","data","AcademicRules.createOne","AcademicRules.createMany","AcademicRules.createManyAndReturn","AcademicRules.updateOne","AcademicRules.updateMany","AcademicRules.updateManyAndReturn","create","update","AcademicRules.upsertOne","AcademicRules.deleteOne","AcademicRules.deleteMany","having","_min","_max","AcademicRules.groupBy","AcademicRules.aggregate","Achievement.findUnique","Achievement.findUniqueOrThrow","Achievement.findFirst","Achievement.findFirstOrThrow","Achievement.findMany","Achievement.createOne","Achievement.createMany","Achievement.createManyAndReturn","Achievement.updateOne","Achievement.updateMany","Achievement.updateManyAndReturn","Achievement.upsertOne","Achievement.deleteOne","Achievement.deleteMany","Achievement.groupBy","Achievement.aggregate","Activity.findUnique","Activity.findUniqueOrThrow","Activity.findFirst","Activity.findFirstOrThrow","Activity.findMany","Activity.createOne","Activity.createMany","Activity.createManyAndReturn","Activity.updateOne","Activity.updateMany","Activity.updateManyAndReturn","Activity.upsertOne","Activity.deleteOne","Activity.deleteMany","Activity.groupBy","Activity.aggregate","AdmissionTest.findUnique","AdmissionTest.findUniqueOrThrow","AdmissionTest.findFirst","AdmissionTest.findFirstOrThrow","AdmissionTest.findMany","AdmissionTest.createOne","AdmissionTest.createMany","AdmissionTest.createManyAndReturn","AdmissionTest.updateOne","AdmissionTest.updateMany","AdmissionTest.updateManyAndReturn","AdmissionTest.upsertOne","AdmissionTest.deleteOne","AdmissionTest.deleteMany","AdmissionTest.groupBy","AdmissionTest.aggregate","Apply.findUnique","Apply.findUniqueOrThrow","Apply.findFirst","Apply.findFirstOrThrow","Apply.findMany","Apply.createOne","Apply.createMany","Apply.createManyAndReturn","Apply.updateOne","Apply.updateMany","Apply.updateManyAndReturn","Apply.upsertOne","Apply.deleteOne","Apply.deleteMany","Apply.groupBy","Apply.aggregate","Calendar.findUnique","Calendar.findUniqueOrThrow","Calendar.findFirst","Calendar.findFirstOrThrow","Calendar.findMany","Calendar.createOne","Calendar.createMany","Calendar.createManyAndReturn","Calendar.updateOne","Calendar.updateMany","Calendar.updateManyAndReturn","Calendar.upsertOne","Calendar.deleteOne","Calendar.deleteMany","Calendar.groupBy","Calendar.aggregate","Committee.findUnique","Committee.findUniqueOrThrow","Committee.findFirst","Committee.findFirstOrThrow","Committee.findMany","Committee.createOne","Committee.createMany","Committee.createManyAndReturn","Committee.updateOne","Committee.updateMany","Committee.updateManyAndReturn","Committee.upsertOne","Committee.deleteOne","Committee.deleteMany","Committee.groupBy","Committee.aggregate","Event.findUnique","Event.findUniqueOrThrow","Event.findFirst","Event.findFirstOrThrow","Event.findMany","Event.createOne","Event.createMany","Event.createManyAndReturn","Event.updateOne","Event.updateMany","Event.updateManyAndReturn","Event.upsertOne","Event.deleteOne","Event.deleteMany","Event.groupBy","Event.aggregate","Gallery.findUnique","Gallery.findUniqueOrThrow","Gallery.findFirst","Gallery.findFirstOrThrow","Gallery.findMany","Gallery.createOne","Gallery.createMany","Gallery.createManyAndReturn","Gallery.updateOne","Gallery.updateMany","Gallery.updateManyAndReturn","Gallery.upsertOne","Gallery.deleteOne","Gallery.deleteMany","Gallery.groupBy","Gallery.aggregate","MissionVision.findUnique","MissionVision.findUniqueOrThrow","MissionVision.findFirst","MissionVision.findFirstOrThrow","MissionVision.findMany","MissionVision.createOne","MissionVision.createMany","MissionVision.createManyAndReturn","MissionVision.updateOne","MissionVision.updateMany","MissionVision.updateManyAndReturn","MissionVision.upsertOne","MissionVision.deleteOne","MissionVision.deleteMany","MissionVision.groupBy","MissionVision.aggregate","News.findUnique","News.findUniqueOrThrow","News.findFirst","News.findFirstOrThrow","News.findMany","News.createOne","News.createMany","News.createManyAndReturn","News.updateOne","News.updateMany","News.updateManyAndReturn","News.upsertOne","News.deleteOne","News.deleteMany","News.groupBy","News.aggregate","Notice.findUnique","Notice.findUniqueOrThrow","Notice.findFirst","Notice.findFirstOrThrow","Notice.findMany","Notice.createOne","Notice.createMany","Notice.createManyAndReturn","Notice.updateOne","Notice.updateMany","Notice.updateManyAndReturn","Notice.upsertOne","Notice.deleteOne","Notice.deleteMany","Notice.groupBy","Notice.aggregate","RegistrationSystem.findUnique","RegistrationSystem.findUniqueOrThrow","RegistrationSystem.findFirst","RegistrationSystem.findFirstOrThrow","RegistrationSystem.findMany","RegistrationSystem.createOne","RegistrationSystem.createMany","RegistrationSystem.createManyAndReturn","RegistrationSystem.updateOne","RegistrationSystem.updateMany","RegistrationSystem.updateManyAndReturn","RegistrationSystem.upsertOne","RegistrationSystem.deleteOne","RegistrationSystem.deleteMany","RegistrationSystem.groupBy","RegistrationSystem.aggregate","Routine.findUnique","Routine.findUniqueOrThrow","Routine.findFirst","Routine.findFirstOrThrow","Routine.findMany","Routine.createOne","Routine.createMany","Routine.createManyAndReturn","Routine.updateOne","Routine.updateMany","Routine.updateManyAndReturn","Routine.upsertOne","Routine.deleteOne","Routine.deleteMany","Routine.groupBy","Routine.aggregate","ExamSchedule.findUnique","ExamSchedule.findUniqueOrThrow","ExamSchedule.findFirst","ExamSchedule.findFirstOrThrow","ExamSchedule.findMany","ExamSchedule.createOne","ExamSchedule.createMany","ExamSchedule.createManyAndReturn","ExamSchedule.updateOne","ExamSchedule.updateMany","ExamSchedule.updateManyAndReturn","ExamSchedule.upsertOne","ExamSchedule.deleteOne","ExamSchedule.deleteMany","ExamSchedule.groupBy","ExamSchedule.aggregate","SiteConfig.findUnique","SiteConfig.findUniqueOrThrow","SiteConfig.findFirst","SiteConfig.findFirstOrThrow","SiteConfig.findMany","SiteConfig.createOne","SiteConfig.createMany","SiteConfig.createManyAndReturn","SiteConfig.updateOne","SiteConfig.updateMany","SiteConfig.updateManyAndReturn","SiteConfig.upsertOne","SiteConfig.deleteOne","SiteConfig.deleteMany","SiteConfig.groupBy","SiteConfig.aggregate","Staff.findUnique","Staff.findUniqueOrThrow","Staff.findFirst","Staff.findFirstOrThrow","Staff.findMany","Staff.createOne","Staff.createMany","Staff.createManyAndReturn","Staff.updateOne","Staff.updateMany","Staff.updateManyAndReturn","Staff.upsertOne","Staff.deleteOne","Staff.deleteMany","Staff.groupBy","Staff.aggregate","Student.findUnique","Student.findUniqueOrThrow","Student.findFirst","Student.findFirstOrThrow","Student.findMany","Student.createOne","Student.createMany","Student.createManyAndReturn","Student.updateOne","Student.updateMany","Student.updateManyAndReturn","Student.upsertOne","Student.deleteOne","Student.deleteMany","_avg","_sum","Student.groupBy","Student.aggregate","Teacher.findUnique","Teacher.findUniqueOrThrow","Teacher.findFirst","Teacher.findFirstOrThrow","Teacher.findMany","Teacher.createOne","Teacher.createMany","Teacher.createManyAndReturn","Teacher.updateOne","Teacher.updateMany","Teacher.updateManyAndReturn","Teacher.upsertOne","Teacher.deleteOne","Teacher.deleteMany","Teacher.groupBy","Teacher.aggregate","Uniform.findUnique","Uniform.findUniqueOrThrow","Uniform.findFirst","Uniform.findFirstOrThrow","Uniform.findMany","Uniform.createOne","Uniform.createMany","Uniform.createManyAndReturn","Uniform.updateOne","Uniform.updateMany","Uniform.updateManyAndReturn","Uniform.upsertOne","Uniform.deleteOne","Uniform.deleteMany","Uniform.groupBy","Uniform.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","Study.findUnique","Study.findUniqueOrThrow","Study.findFirst","Study.findFirstOrThrow","Study.findMany","Study.createOne","Study.createMany","Study.createManyAndReturn","Study.updateOne","Study.updateMany","Study.updateManyAndReturn","Study.upsertOne","Study.deleteOne","Study.deleteMany","Study.groupBy","Study.aggregate","AND","OR","NOT","id","title","description","isActive","isDeleted","deletedAt","createdAt","updatedAt","siteConfigId","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","name","email","password","profileImage","imagePublicId","googleId","AuthProvider","authProvider","emailVerified","Role","role","UserStatus","status","needPasswordChange","file","filePublicId","teacherId","TeacherDesignation","designation","joiningDate","endingDate","EmploymentType","employmentType","salary","Group","department","subject","highestDegree","specialization","experienceYears","fatherName","motherName","dateOfBirth","Gender","gender","bloodGroup","religion","nationality","phone","presentAddress","permanentAddress","bankName","bankAccount","userId","string_contains","string_starts_with","string_ends_with","array_starts_with","array_ends_with","array_contains","has","hasEvery","hasSome","studentId","admissionDate","academicYear","class","section","group","Shift","shift","fatherPhone","motherPhone","guardianName","guardianRelation","guardianPhone","emergencyContact","previousSchool","udpatedAt","staff_id","nationalId","bio","StaffDesignation","qualification","experience","startingDate","permanemtAddress","schoolName","logo","logoPublicId","address","eiin","estdYear","facebookUrl","youtubeUrl","linkdinUrl","twitterUrl","instagramUrl","theme","darkTheme","every","some","none","content","mission","vision","eventId","achievementId","startDate","endDate","location","coverImage","coverImagePublicId","committeeId","CommitteeDesignation","message","publishedDate","cover","coverPublicId","is","isNot","connectOrCreate","upsert","disconnect","delete","connect","createMany","set","updateMany","deleteMany","increment","decrement","multiply","divide","push"]'),
  graph: "hAu4AeACDQMAAMoFACCFAwAA0QUAMIYDAABAABCHAwAA0QUAMIgDAQAAAAGJAwEAnQUAIYoDAQCdBQAhiwMgAJ8FACGMAyAAnwUAIY0DQADJBQAhjgNAAKEFACGPA0AAoQUAIZADAQCdBQAhAQAAAAEAIBkDAADKBQAgBQAA8AUAIAYAAPEFACAHAADyBQAgCAAA8wUAIIUDAADtBQAwhgMAAAMAEIcDAADtBQAwiAMBAJ0FACGMAyAAnwUAIY0DQADJBQAhjgNAAKEFACGPA0AAoQUAIZADAQCdBQAhnAMBAJ0FACGdAwEAnQUAIZ4DAQCdBQAhnwMBAJ4FACGgAwEAngUAIaEDAQCeBQAhowMAAO4FowMipAMgAJ8FACGmAwAA7wWmAyKoAwAA3gWoAyKpAyAAnwUAIQkDAADkCQAgBQAA6QkAIAYAAOoJACAHAADrCQAgCAAA7AkAII0DAAD0BQAgnwMAAPQFACCgAwAA9AUAIKEDAAD0BQAgGQMAAMoFACAFAADwBQAgBgAA8QUAIAcAAPIFACAIAADzBQAghQMAAO0FADCGAwAAAwAQhwMAAO0FADCIAwEAAAABjAMgAJ8FACGNA0AAyQUAIY4DQAChBQAhjwNAAKEFACGQAwEAnQUAIZwDAQCdBQAhnQMBAAAAAZ4DAQCdBQAhnwMBAJ4FACGgAwEAngUAIaEDAQCeBQAhowMAAO4FowMipAMgAJ8FACGmAwAA7wWmAyKoAwAA3gWoAyKpAyAAnwUAIQMAAAADACABAAAEADACAAAFACAmAwAAygUAIAQAAOAFACCFAwAA4wUAMIYDAAAHABCHAwAA4wUAMIgDAQCdBQAhjgNAAKEFACGQAwEAnQUAIZwDAQCdBQAhnQMBAJ0FACGmAwIA5AUAIagDAADeBagDIroDAQCeBQAhuwMBAJ4FACG8A0AAyQUAIb4DAADnBb4DI78DAQCeBQAhwAMBAJ4FACHBAwEAnQUAIcIDAQCeBQAhwwMBAJ4FACHEAwEAngUAIccDAQCdBQAh0QMBAJ0FACHSA0AAyQUAIdMDAQCeBQAh1AMBAJ4FACHVAwEAngUAIdYDAADlBbUDI9gDAADmBdgDI9kDAQCeBQAh2gMBAJ4FACHbAwEAngUAIdwDAQCeBQAh3QMBAJ4FACHeAwEAngUAId8DAQCeBQAh4ANAAKEFACEBAAAABwAgJAMAAMoFACAEAADgBQAghQMAAOgFADCGAwAACQAQhwMAAOgFADCIAwEAnQUAIY4DQAChBQAhjwNAAKEFACGQAwEAnQUAIZwDAQCdBQAhnQMBAJ0FACGoAwAA3gWoAyKsAwEAnQUAIa4DAADpBa4DI68DQAChBQAhsANAAMkFACGyAwAA6gWyAyKzAxAA6wUAIbUDAADsBbUDIrYDAAD_BAAgtwMBAJ4FACG4AwEAngUAIbkDAgDkBQAhugMBAJ4FACG7AwEAngUAIbwDQADJBQAhvgMAAOcFvgMjvwMBAJ4FACHAAwEAngUAIcEDAQCeBQAhwgMBAJ4FACHDAwAAoAUAIMQDAACgBQAgxQMBAJ4FACHGAwEAngUAIccDAQCdBQAhAQAAAAkAIBoDAADKBQAgBAAA4AUAIIUDAADhBQAwhgMAAAsAEIcDAADhBQAwiAMBAJ0FACGOA0AAoQUAIY8DQAChBQAhkAMBAJ0FACGcAwEAnQUAIZ0DAQCdBQAhqAMAAN4FqAMirgMAAOIF5QMjsANAAMkFACG6AwEAngUAIbsDAQCeBQAhwgMBAJ4FACHDAwAAoAUAIMcDAQCdBQAh4QMBAJ0FACHiAwEAngUAIeMDAQCeBQAh5QMBAJ4FACHmAwEAngUAIecDQADJBQAh6AMAAKAFACABAAAACwAgGwMAAMoFACAEAADgBQAghQMAAN0FADCGAwAADQAQhwMAAN0FADCIAwEAnQUAIY4DQAChBQAhjwNAAKEFACGQAwEAnQUAIZwDAQCdBQAhnQMBAJ0FACGoAwAA3gWoAyKuAwAA3wWFBCKwA0AAyQUAIboDAQCeBQAhuwMBAJ4FACHCAwEAngUAIcMDAACgBQAgxAMAAKAFACDHAwEAnQUAIeIDAQCeBQAh4wMBAJ4FACHlAwEAngUAIeYDAQCeBQAh5wNAAMkFACGDBAEAnQUAIYUEAQCeBQAhAQAAAA0AIBQDAADkCQAgBAAA6AkAIK4DAAD0BQAgsAMAAPQFACCzAwAA9AUAILcDAAD0BQAguAMAAPQFACC5AwAA9AUAILoDAAD0BQAguwMAAPQFACC8AwAA9AUAIL4DAAD0BQAgvwMAAPQFACDAAwAA9AUAIMEDAAD0BQAgwgMAAPQFACDDAwAA9AUAIMQDAAD0BQAgxQMAAPQFACDGAwAA9AUAICQDAADKBQAgBAAA4AUAIIUDAADoBQAwhgMAAAkAEIcDAADoBQAwiAMBAAAAAY4DQAChBQAhjwNAAKEFACGQAwEAnQUAIZwDAQCdBQAhnQMBAAAAAagDAADeBagDIqwDAQAAAAGuAwAA6QWuAyOvA0AAoQUAIbADQADJBQAhsgMAAOoFsgMiswMQAOsFACG1AwAA7AW1AyK2AwAA_wQAILcDAQCeBQAhuAMBAJ4FACG5AwIA5AUAIboDAQCeBQAhuwMBAJ4FACG8A0AAyQUAIb4DAADnBb4DI78DAQCeBQAhwAMBAJ4FACHBAwEAngUAIcIDAQCeBQAhwwMAAKAFACDEAwAAoAUAIMUDAQCeBQAhxgMBAJ4FACHHAwEAAAABAwAAAAkAIAEAAA8AMAIAABAAIBkDAADkCQAgBAAA6AkAIKYDAAD0BQAgugMAAPQFACC7AwAA9AUAILwDAAD0BQAgvgMAAPQFACC_AwAA9AUAIMADAAD0BQAgwgMAAPQFACDDAwAA9AUAIMQDAAD0BQAg0gMAAPQFACDTAwAA9AUAINQDAAD0BQAg1QMAAPQFACDWAwAA9AUAINgDAAD0BQAg2QMAAPQFACDaAwAA9AUAINsDAAD0BQAg3AMAAPQFACDdAwAA9AUAIN4DAAD0BQAg3wMAAPQFACAmAwAAygUAIAQAAOAFACCFAwAA4wUAMIYDAAAHABCHAwAA4wUAMIgDAQAAAAGOA0AAoQUAIZADAQCdBQAhnAMBAJ0FACGdAwEAAAABpgMCAOQFACGoAwAA3gWoAyK6AwEAngUAIbsDAQCeBQAhvANAAMkFACG-AwAA5wW-AyO_AwEAngUAIcADAQCeBQAhwQMBAJ0FACHCAwEAngUAIcMDAQCeBQAhxAMBAJ4FACHHAwEAAAAB0QMBAAAAAdIDQADJBQAh0wMBAJ4FACHUAwEAngUAIdUDAQCeBQAh1gMAAOUFtQMj2AMAAOYF2AMj2QMBAJ4FACHaAwEAngUAIdsDAQCeBQAh3AMBAJ4FACHdAwEAngUAId4DAQCeBQAh3wMBAJ4FACHgA0AAoQUAIQMAAAAHACABAAASADACAAATACAOAwAA5AkAIAQAAOgJACCuAwAA9AUAILADAAD0BQAgugMAAPQFACC7AwAA9AUAIMIDAAD0BQAgwwMAAPQFACDiAwAA9AUAIOMDAAD0BQAg5QMAAPQFACDmAwAA9AUAIOcDAAD0BQAg6AMAAPQFACAaAwAAygUAIAQAAOAFACCFAwAA4QUAMIYDAAALABCHAwAA4QUAMIgDAQAAAAGOA0AAoQUAIY8DQAChBQAhkAMBAJ0FACGcAwEAnQUAIZ0DAQAAAAGoAwAA3gWoAyKuAwAA4gXlAyOwA0AAyQUAIboDAQCeBQAhuwMBAJ4FACHCAwEAngUAIcMDAACgBQAgxwMBAAAAAeEDAQAAAAHiAwEAngUAIeMDAQCeBQAh5QMBAJ4FACHmAwEAngUAIecDQADJBQAh6AMAAKAFACADAAAACwAgAQAAFQAwAgAAFgAgDgMAAOQJACAEAADoCQAgsAMAAPQFACC6AwAA9AUAILsDAAD0BQAgwgMAAPQFACDDAwAA9AUAIMQDAAD0BQAg4gMAAPQFACDjAwAA9AUAIOUDAAD0BQAg5gMAAPQFACDnAwAA9AUAIIUEAAD0BQAgGwMAAMoFACAEAADgBQAghQMAAN0FADCGAwAADQAQhwMAAN0FADCIAwEAAAABjgNAAKEFACGPA0AAoQUAIZADAQCdBQAhnAMBAJ0FACGdAwEAAAABqAMAAN4FqAMirgMAAN8FhQQisANAAMkFACG6AwEAngUAIbsDAQCeBQAhwgMBAJ4FACHDAwAAoAUAIMQDAACgBQAgxwMBAAAAAeIDAQCeBQAh4wMBAJ4FACHlAwEAngUAIeYDAQCeBQAh5wNAAMkFACGDBAEAAAABhQQBAJ4FACEDAAAADQAgAQAAGAAwAgAAGQAgEwMAAMoFACAMAADVBQAghQMAANwFADCGAwAAGwAQhwMAANwFADCIAwEAnQUAIYkDAQCdBQAhigMBAJ0FACGLAyAAnwUAIYwDIACfBQAhjQNAAMkFACGOA0AAoQUAIY8DQAChBQAhkAMBAJ0FACH-A0AAyQUAIf8DQADJBQAhgAQBAJ4FACGBBAEAngUAIYIEAQCeBQAhCAMAAOQJACAMAADlCQAgjQMAAPQFACD-AwAA9AUAIP8DAAD0BQAggAQAAPQFACCBBAAA9AUAIIIEAAD0BQAgEwMAAMoFACAMAADVBQAghQMAANwFADCGAwAAGwAQhwMAANwFADCIAwEAAAABiQMBAJ0FACGKAwEAnQUAIYsDIACfBQAhjAMgAJ8FACGNA0AAyQUAIY4DQAChBQAhjwNAAKEFACGQAwEAnQUAIf4DQADJBQAh_wNAAMkFACGABAEAngUAIYEEAQCeBQAhggQBAJ4FACEDAAAAGwAgAQAAHAAwAgAAHQAgDwsAANoFACAOAADbBQAghQMAANkFADCGAwAAHwAQhwMAANkFADCIAwEAnQUAIYsDIACfBQAhjAMgAJ8FACGNA0AAyQUAIY4DQAChBQAhjwNAAKEFACGqAwEAnQUAIasDAQCdBQAh_AMBAJ4FACH9AwEAngUAIQULAADmCQAgDgAA5wkAII0DAAD0BQAg_AMAAPQFACD9AwAA9AUAIA8LAADaBQAgDgAA2wUAIIUDAADZBQAwhgMAAB8AEIcDAADZBQAwiAMBAAAAAYsDIACfBQAhjAMgAJ8FACGNA0AAyQUAIY4DQAChBQAhjwNAAKEFACGqAwEAnQUAIasDAQCdBQAh_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-AUAIYkDAQD4BQAhigMBAPgFACGLAyAA-gUAIYwDIAD6BQAhjQNAAPsFACGOA0AA_AUAIY8DQAD8BQAhkAMBAPgFACECAAAAAQAgIgAAfAAgCYgDAQD4BQAhiQMBAPgFACGKAwEA-AUAIYsDIAD6BQAhjAMgAPoFACGNA0AA-wUAIY4DQAD8BQAhjwNAAPwFACGQAwEA-AUAIQIAAABAACAiAAB-ACACAAAAQAAgIgAAfgAgAwAAAAEAICkAAHcAICoAAHwAIAEAAAABACABAAAAQAAgBA0AAN8JACAvAADhCQAgMAAA4AkAII0DAAD0BQAgDIUDAADHBQAwhgMAAIUBABCHAwAAxwUAMIgDAQDeBAAhiQMBAN4EACGKAwEA3gQAIYsDIADgBAAhjAMgAOAEACGNA0AA4QQAIY4DQADiBAAhjwNAAOIEACGQAwEA3gQAIQMAAABAACABAACEAQAwLgAAhQEAIAMAAABAACABAABBADACAAABACABAAAANgAgAQAAADYAIAMAAAAkACABAAA1ADACAAA2ACADAAAAJAAgAQAANQAwAgAANgAgAwAAACQAIAEAADUAMAIAADYAIA0DAADeCQAgDAAA-QcAIIgDAQAAAAGJAwEAAAABigMBAAAAAYsDIAAAAAGMAyAAAAABjQNAAAAAAY4DQAAAAAGQAwEAAAAB4ANAAAAAAYcEAQAAAAGIBAEAAAABASIAAI0BACALiAMBAAAAAYkDAQAAAAGKAwEAAAABiwMgAAAAAYwDIAAAAAGNA0AAAAABjgNAAAAAAZADAQAAAAHgA0AAAAABhwQBAAAAAYgEAQAAAAEBIgAAjwEAMAEiAACPAQAwDQMAAN0JACAMAADpBwAgiAMBAPgFACGJAwEA-AUAIYoDAQD4BQAhiwMgAPoFACGMAyAA-gUAIY0DQAD7BQAhjgNAAPwFACGQAwEA-AUAIeADQAD8BQAhhwQBAPkFACGIBAEA-QUAIQIAAAA2ACAiAACSAQAgC4gDAQD4BQAhiQMBAPgFACGKAwEA-AUAIYsDIAD6BQAhjAMgAPoFACGNA0AA-wUAIY4DQAD8BQAhkAMBAPgFACHgA0AA_AUAIYcEAQD5BQAhiAQBAPkFACECAAAAJAAgIgAAlAEAIAIAAAAkACAiAACUAQAgAwAAADYAICkAAI0BACAqAACSAQAgAQAAADYAIAEAAAAkACAGDQAA2gkAIC8AANwJACAwAADbCQAgjQMAAPQFACCHBAAA9AUAIIgEAAD0BQAgDoUDAADGBQAwhgMAAJsBABCHAwAAxgUAMIgDAQDeBAAhiQMBAN4EACGKAwEA3gQAIYsDIADgBAAhjAMgAOAEACGNA0AA4QQAIY4DQADiBAAhkAMBAN4EACHgA0AA4gQAIYcEAQDfBAAhiAQBAN8EACEDAAAAJAAgAQAAmgEAMC4AAJsBACADAAAAJAAgAQAANQAwAgAANgAgAQAAAFUAIAEAAABVACADAAAAUwAgAQAAVAAwAgAAVQAgAwAAAFMAIAEAAFQAMAIAAFUAIAMAAABTACABAABUADACAABVACAKAwAA2QkAIIgDAQAAAAGJAwEAAAABigMBAAAAAYsDIAAAAAGMAyAAAAABjQNAAAAAAY4DQAAAAAGPA0AAAAABkAMBAAAAAQEiAACjAQAgCYgDAQAAAAGJAwEAAAABigMBAAAAAYsDIAAAAAGMAyAAAAABjQNAAAAAAY4DQAAAAAGPA0AAAAABkAMBAAAAAQEiAAClAQAwASIAAKUBADAKAwAA2AkAIIgDAQD4BQAhiQMBAPgFACGKAwEA-QUAIYsDIAD6BQAhjAMgAPoFACGNA0AA-wUAIY4DQAD8BQAhjwNAAPwFACGQAwEA-AUAIQIAAABVACAiAACoAQAgCYgDAQD4BQAhiQMBAPgFACGKAwEA-QUAIYsDIAD6BQAhjAMgAPoFACGNA0AA-wUAIY4DQAD8BQAhjwNAAPwFACGQAwEA-AUAIQIAAABTACAiAACqAQAgAgAAAFMAICIAAKoBACADAAAAVQAgKQAAowEAICoAAKgBACABAAAAVQAgAQAAAFMAIAUNAADVCQAgLwAA1wkAIDAAANYJACCKAwAA9AUAII0DAAD0BQAgDIUDAADFBQAwhgMAALEBABCHAwAAxQUAMIgDAQDeBAAhiQMBAN4EACGKAwEA3wQAIYsDIADgBAAhjAMgAOAEACGNA0AA4QQAIY4DQADiBAAhjwNAAOIEACGQAwEA3gQAIQMAAABTACABAACwAQAwLgAAsQEAIAMAAABTACABAABUADACAABVACABAAAATQAgAQAAAE0AIAMAAABLACABAABMADACAABNACADAAAASwAgAQAATAAwAgAATQAgAwAAAEsAIAEAAEwAMAIAAE0AIAoDAADUCQAgiAMBAAAAAYkDAQAAAAGKAwEAAAABiwMgAAAAAYwDIAAAAAGNA0AAAAABjgNAAAAAAY8DQAAAAAGQAwEAAAABASIAALkBACAJiAMBAAAAAYkDAQAAAAGKAwEAAAABiwMgAAAAAYwDIAAAAAGNA0AAAAABjgNAAAAAAY8DQAAAAAGQAwEAAAABASIAALsBADABIgAAuwEAMAoDAADTCQAgiAMBAPgFACGJAwEA-AUAIYoDAQD5BQAhiwMgAPoFACGMAyAA-gUAIY0DQAD7BQAhjgNAAPwFACGPA0AA_AUAIZADAQD4BQAhAgAAAE0AICIAAL4BACAJiAMBAPgFACGJAwEA-AUAIYoDAQD5BQAhiwMgAPoFACGMAyAA-gUAIY0DQAD7BQAhjgNAAPwFACGPA0AA_AUAIZADAQD4BQAhAgAAAEsAICIAAMABACACAAAASwAgIgAAwAEAIAMAAABNACApAAC5AQAgKgAAvgEAIAEAAABNACABAAAASwAgBQ0AANAJACAvAADSCQAgMAAA0QkAIIoDAAD0BQAgjQMAAPQFACAMhQMAAMQFADCGAwAAxwEAEIcDAADEBQAwiAMBAN4EACGJAwEA3gQAIYoDAQDfBAAhiwMgAOAEACGMAyAA4AQAIY0DQADhBAAhjgNAAOIEACGPA0AA4gQAIZADAQDeBAAhAwAAAEsAIAEAAMYBADAuAADHAQAgAwAAAEsAIAEAAEwAMAIAAE0AIAEAAABJACABAAAASQAgAwAAAEcAIAEAAEgAMAIAAEkAIAMAAABHACABAABIADACAABJACADAAAARwAgAQAASAAwAgAASQAgCgMAAM8JACCIAwEAAAABiQMBAAAAAYoDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAZADAQAAAAEBIgAAzwEAIAmIAwEAAAABiQMBAAAAAYoDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAZADAQAAAAEBIgAA0QEAMAEiAADRAQAwCgMAAM4JACCIAwEA-AUAIYkDAQD4BQAhigMBAPkFACGLAyAA-gUAIYwDIAD6BQAhjQNAAPsFACGOA0AA_AUAIY8DQAD8BQAhkAMBAPgFACECAAAASQAgIgAA1AEAIAmIAwEA-AUAIYkDAQD4BQAhigMBAPkFACGLAyAA-gUAIYwDIAD6BQAhjQNAAPsFACGOA0AA_AUAIY8DQAD8BQAhkAMBAPgFACECAAAARwAgIgAA1gEAIAIAAABHACAiAADWAQAgAwAAAEkAICkAAM8BACAqAADUAQAgAQAAAEkAIAEAAABHACAFDQAAywkAIC8AAM0JACAwAADMCQAgigMAAPQFACCNAwAA9AUAIAyFAwAAwwUAMIYDAADdAQAQhwMAAMMFADCIAwEA3gQAIYkDAQDeBAAhigMBAN8EACGLAyAA4AQAIYwDIADgBAAhjQNAAOEEACGOA0AA4gQAIY8DQADiBAAhkAMBAN4EACEDAAAARwAgAQAA3AEAMC4AAN0BACADAAAARwAgAQAASAAwAgAASQAgAQAAADMAIAEAAAAzACADAAAAMQAgAQAAMgAwAgAAMwAgAwAAADEAIAEAADIAMAIAADMAIAMAAAAxACABAAAyADACAAAzACANAwAAygkAIIgDAQAAAAGJAwEAAAABigMBAAAAAYsDIAAAAAGMAyAAAAABjQNAAAAAAY4DQAAAAAGPA0AAAAABkAMBAAAAAaoDAQAAAAGrAwEAAAABhgRAAAAAAQEiAADlAQAgDIgDAQAAAAGJAwEAAAABigMBAAAAAYsDIAAAAAGMAyAAAAABjQNAAAAAAY4DQAAAAAGPA0AAAAABkAMBAAAAAaoDAQAAAAGrAwEAAAABhgRAAAAAAQEiAADnAQAwASIAAOcBADANAwAAyQkAIIgDAQD4BQAhiQMBAPgFACGKAwEA-QUAIYsDIAD6BQAhjAMgAPoFACGNA0AA-wUAIY4DQAD8BQAhjwNAAPwFACGQAwEA-AUAIaoDAQD4BQAhqwMBAPkFACGGBEAA_AUAIQIAAAAzACAiAADqAQAgDIgDAQD4BQAhiQMBAPgFACGKAwEA-QUAIYsDIAD6BQAhjAMgAPoFACGNA0AA-wUAIY4DQAD8BQAhjwNAAPwFACGQAwEA-AUAIaoDAQD4BQAhqwMBAPkFACGGBEAA_AUAIQIAAAAxACAiAADsAQAgAgAAADEAICIAAOwBACADAAAAMwAgKQAA5QEAICoAAOoBACABAAAAMwAgAQAAADEAIAYNAADGCQAgLwAAyAkAIDAAAMcJACCKAwAA9AUAII0DAAD0BQAgqwMAAPQFACAPhQMAAMIFADCGAwAA8wEAEIcDAADCBQAwiAMBAN4EACGJAwEA3gQAIYoDAQDfBAAhiwMgAOAEACGMAyAA4AQAIY0DQADhBAAhjgNAAOIEACGPA0AA4gQAIZADAQDeBAAhqgMBAN4EACGrAwEA3wQAIYYEQADiBAAhAwAAADEAIAEAAPIBADAuAADzAQAgAwAAADEAIAEAADIAMAIAADMAIAEAAAAZACABAAAAGQAgAwAAAA0AIAEAABgAMAIAABkAIAMAAAANACABAAAYADACAAAZACADAAAADQAgAQAAGAAwAgAAGQAgGAMAAJEGACAEAADECAAgiAMBAAAAAY4DQAAAAAGPA0AAAAABkAMBAAAAAZwDAQAAAAGdAwEAAAABqAMAAACoAwKuAwAAAIUEArADQAAAAAG6AwEAAAABuwMBAAAAAcIDAQAAAAHDA4AAAAABxAOAAAAAAccDAQAAAAHiAwEAAAAB4wMBAAAAAeUDAQAAAAHmAwEAAAAB5wNAAAAAAYMEAQAAAAGFBAEAAAABASIAAPsBACAWiAMBAAAAAY4DQAAAAAGPA0AAAAABkAMBAAAAAZwDAQAAAAGdAwEAAAABqAMAAACoAwKuAwAAAIUEArADQAAAAAG6AwEAAAABuwMBAAAAAcIDAQAAAAHDA4AAAAABxAOAAAAAAccDAQAAAAHiAwEAAAAB4wMBAAAAAeUDAQAAAAHmAwEAAAAB5wNAAAAAAYMEAQAAAAGFBAEAAAABASIAAP0BADABIgAA_QEAMBgDAACQBgAgBAAAwggAIIgDAQD4BQAhjgNAAPwFACGPA0AA_AUAIZADAQD4BQAhnAMBAPgFACGdAwEA-AUAIagDAACEBqgDIq4DAACPBoUEIrADQAD7BQAhugMBAPkFACG7AwEA-QUAIcIDAQD5BQAhwwOAAAAAAcQDgAAAAAHHAwEA-AUAIeIDAQD5BQAh4wMBAPkFACHlAwEA-QUAIeYDAQD5BQAh5wNAAPsFACGDBAEA-AUAIYUEAQD5BQAhAgAAABkAICIAAIACACAWiAMBAPgFACGOA0AA_AUAIY8DQAD8BQAhkAMBAPgFACGcAwEA-AUAIZ0DAQD4BQAhqAMAAIQGqAMirgMAAI8GhQQisANAAPsFACG6AwEA-QUAIbsDAQD5BQAhwgMBAPkFACHDA4AAAAABxAOAAAAAAccDAQD4BQAh4gMBAPkFACHjAwEA-QUAIeUDAQD5BQAh5gMBAPkFACHnA0AA-wUAIYMEAQD4BQAhhQQBAPkFACECAAAADQAgIgAAggIAIAIAAAANACAiAACCAgAgAwAAABkAICkAAPsBACAqAACAAgAgAQAAABkAIAEAAAANACAPDQAAwwkAIC8AAMUJACAwAADECQAgsAMAAPQFACC6AwAA9AUAILsDAAD0BQAgwgMAAPQFACDDAwAA9AUAIMQDAAD0BQAg4gMAAPQFACDjAwAA9AUAIOUDAAD0BQAg5gMAAPQFACDnAwAA9AUAIIUEAAD0BQAgGYUDAAC-BQAwhgMAAIkCABCHAwAAvgUAMIgDAQDeBAAhjgNAAOIEACGPA0AA4gQAIZADAQDeBAAhnAMBAN4EACGdAwEA3gQAIagDAADyBKgDIq4DAAC_BYUEIrADQADhBAAhugMBAN8EACG7AwEA3wQAIcIDAQDfBAAhwwMAAIIFACDEAwAAggUAIMcDAQDeBAAh4gMBAN8EACHjAwEA3wQAIeUDAQDfBAAh5gMBAN8EACHnA0AA4QQAIYMEAQDeBAAhhQQBAN8EACEDAAAADQAgAQAAiAIAMC4AAIkCACADAAAADQAgAQAAGAAwAgAAGQAgAQAAAB0AIAEAAAAdACADAAAAGwAgAQAAHAAwAgAAHQAgAwAAABsAIAEAABwAMAIAAB0AIAMAAAAbACABAAAcADACAAAdACAQAwAAwgkAIAwAALYIACCIAwEAAAABiQMBAAAAAYoDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAZADAQAAAAH-A0AAAAAB_wNAAAAAAYAEAQAAAAGBBAEAAAABggQBAAAAAQEiAACRAgAgDogDAQAAAAGJAwEAAAABigMBAAAAAYsDIAAAAAGMAyAAAAABjQNAAAAAAY4DQAAAAAGPA0AAAAABkAMBAAAAAf4DQAAAAAH_A0AAAAABgAQBAAAAAYEEAQAAAAGCBAEAAAABASIAAJMCADABIgAAkwIAMBADAADBCQAgDAAAqQgAIIgDAQD4BQAhiQMBAPgFACGKAwEA-AUAIYsDIAD6BQAhjAMgAPoFACGNA0AA-wUAIY4DQAD8BQAhjwNAAPwFACGQAwEA-AUAIf4DQAD7BQAh_wNAAPsFACGABAEA-QUAIYEEAQD5BQAhggQBAPkFACECAAAAHQAgIgAAlgIAIA6IAwEA-AUAIYkDAQD4BQAhigMBAPgFACGLAyAA-gUAIYwDIAD6BQAhjQNAAPsFACGOA0AA_AUAIY8DQAD8BQAhkAMBAPgFACH-A0AA-wUAIf8DQAD7BQAhgAQBAPkFACGBBAEA-QUAIYIEAQD5BQAhAgAAABsAICIAAJgCACACAAAAGwAgIgAAmAIAIAMAAAAdACApAACRAgAgKgAAlgIAIAEAAAAdACABAAAAGwAgCQ0AAL4JACAvAADACQAgMAAAvwkAII0DAAD0BQAg_gMAAPQFACD_AwAA9AUAIIAEAAD0BQAggQQAAPQFACCCBAAA9AUAIBGFAwAAvQUAMIYDAACfAgAQhwMAAL0FADCIAwEA3gQAIYkDAQDeBAAhigMBAN4EACGLAyAA4AQAIYwDIADgBAAhjQNAAOEEACGOA0AA4gQAIY8DQADiBAAhkAMBAN4EACH-A0AA4QQAIf8DQADhBAAhgAQBAN8EACGBBAEA3wQAIYIEAQDfBAAhAwAAABsAIAEAAJ4CADAuAACfAgAgAwAAABsAIAEAABwAMAIAAB0AIAEAAAAhACABAAAAIQAgAwAAAB8AIAEAACAAMAIAACEAIAMAAAAfACABAAAgADACAAAhACADAAAAHwAgAQAAIAAwAgAAIQAgDAsAAPcHACAOAAC0CAAgiAMBAAAAAYsDIAAAAAGMAyAAAAABjQNAAAAAAY4DQAAAAAGPA0AAAAABqgMBAAAAAasDAQAAAAH8AwEAAAAB_QMBAAAAAQEiAACnAgAgCogDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAaoDAQAAAAGrAwEAAAAB_AMBAAAAAf0DAQAAAAEBIgAAqQIAMAEiAACpAgAwAQAAABsAIAEAAAAkACAMCwAA9QcAIA4AALIIACCIAwEA-AUAIYsDIAD6BQAhjAMgAPoFACGNA0AA-wUAIY4DQAD8BQAhjwNAAPwFACGqAwEA-AUAIasDAQD4BQAh_AMBAPkFACH9AwEA-QUAIQIAAAAhACAiAACuAgAgCogDAQD4BQAhiwMgAPoFACGMAyAA-gUAIY0DQAD7BQAhjgNAAPwFACGPA0AA_AUAIaoDAQD4BQAhqwMBAPgFACH8AwEA-QUAIf0DAQD5BQAhAgAAAB8AICIAALACACACAAAAHwAgIgAAsAIAIAEAAAAbACABAAAAJAAgAwAAACEAICkAAKcCACAqAACuAgAgAQAAACEAIAEAAAAfACAGDQAAuwkAIC8AAL0JACAwAAC8CQAgjQMAAPQFACD8AwAA9AUAIP0DAAD0BQAgDYUDAAC8BQAwhgMAALkCABCHAwAAvAUAMIgDAQDeBAAhiwMgAOAEACGMAyAA4AQAIY0DQADhBAAhjgNAAOIEACGPA0AA4gQAIaoDAQDeBAAhqwMBAN4EACH8AwEA3wQAIf0DAQDfBAAhAwAAAB8AIAEAALgCADAuAAC5AgAgAwAAAB8AIAEAACAAMAIAACEAIAEAAAA6ACABAAAAOgAgAwAAADgAIAEAADkAMAIAADoAIAMAAAA4ACABAAA5ADACAAA6ACADAAAAOAAgAQAAOQAwAgAAOgAgCQMAALoJACCIAwEAAAABiwMgAAAAAYwDIAAAAAGNA0AAAAABjgNAAAAAAZADAQAAAAH6AwEAAAAB-wMBAAAAAQEiAADBAgAgCIgDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABkAMBAAAAAfoDAQAAAAH7AwEAAAABASIAAMMCADABIgAAwwIAMAkDAAC5CQAgiAMBAPgFACGLAyAA-gUAIYwDIAD6BQAhjQNAAPsFACGOA0AA_AUAIZADAQD4BQAh-gMBAPgFACH7AwEA-AUAIQIAAAA6ACAiAADGAgAgCIgDAQD4BQAhiwMgAPoFACGMAyAA-gUAIY0DQAD7BQAhjgNAAPwFACGQAwEA-AUAIfoDAQD4BQAh-wMBAPgFACECAAAAOAAgIgAAyAIAIAIAAAA4ACAiAADIAgAgAwAAADoAICkAAMECACAqAADGAgAgAQAAADoAIAEAAAA4ACAEDQAAtgkAIC8AALgJACAwAAC3CQAgjQMAAPQFACALhQMAALsFADCGAwAAzwIAEIcDAAC7BQAwiAMBAN4EACGLAyAA4AQAIYwDIADgBAAhjQNAAOEEACGOA0AA4gQAIZADAQDeBAAh-gMBAN4EACH7AwEA3gQAIQMAAAA4ACABAADOAgAwLgAAzwIAIAMAAAA4ACABAAA5ADACAAA6ACABAAAALwAgAQAAAC8AIAMAAAAtACABAAAuADACAAAvACADAAAALQAgAQAALgAwAgAALwAgAwAAAC0AIAEAAC4AMAIAAC8AIAwDAAC1CQAgiAMBAAAAAYkDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAZADAQAAAAGqAwEAAAABqwMBAAAAAfkDAQAAAAEBIgAA1wIAIAuIAwEAAAABiQMBAAAAAYsDIAAAAAGMAyAAAAABjQNAAAAAAY4DQAAAAAGPA0AAAAABkAMBAAAAAaoDAQAAAAGrAwEAAAAB-QMBAAAAAQEiAADZAgAwASIAANkCADAMAwAAtAkAIIgDAQD4BQAhiQMBAPgFACGLAyAA-gUAIYwDIAD6BQAhjQNAAPsFACGOA0AA_AUAIY8DQAD8BQAhkAMBAPgFACGqAwEA-QUAIasDAQD5BQAh-QMBAPgFACECAAAALwAgIgAA3AIAIAuIAwEA-AUAIYkDAQD4BQAhiwMgAPoFACGMAyAA-gUAIY0DQAD7BQAhjgNAAPwFACGPA0AA_AUAIZADAQD4BQAhqgMBAPkFACGrAwEA-QUAIfkDAQD4BQAhAgAAAC0AICIAAN4CACACAAAALQAgIgAA3gIAIAMAAAAvACApAADXAgAgKgAA3AIAIAEAAAAvACABAAAALQAgBg0AALEJACAvAACzCQAgMAAAsgkAII0DAAD0BQAgqgMAAPQFACCrAwAA9AUAIA6FAwAAugUAMIYDAADlAgAQhwMAALoFADCIAwEA3gQAIYkDAQDeBAAhiwMgAOAEACGMAyAA4AQAIY0DQADhBAAhjgNAAOIEACGPA0AA4gQAIZADAQDeBAAhqgMBAN8EACGrAwEA3wQAIfkDAQDeBAAhAwAAAC0AIAEAAOQCADAuAADlAgAgAwAAAC0AIAEAAC4AMAIAAC8AIAEAAAArACABAAAAKwAgAwAAACkAIAEAACoAMAIAACsAIAMAAAApACABAAAqADACAAArACADAAAAKQAgAQAAKgAwAgAAKwAgDAMAALAJACCIAwEAAAABiQMBAAAAAYsDIAAAAAGMAyAAAAABjQNAAAAAAY4DQAAAAAGPA0AAAAABkAMBAAAAAaoDAQAAAAGrAwEAAAAB-QMBAAAAAQEiAADtAgAgC4gDAQAAAAGJAwEAAAABiwMgAAAAAYwDIAAAAAGNA0AAAAABjgNAAAAAAY8DQAAAAAGQAwEAAAABqgMBAAAAAasDAQAAAAH5AwEAAAABASIAAO8CADABIgAA7wIAMAwDAACvCQAgiAMBAPgFACGJAwEA-AUAIYsDIAD6BQAhjAMgAPoFACGNA0AA-wUAIY4DQAD8BQAhjwNAAPwFACGQAwEA-AUAIaoDAQD5BQAhqwMBAPkFACH5AwEA-AUAIQIAAAArACAiAADyAgAgC4gDAQD4BQAhiQMBAPgFACGLAyAA-gUAIYwDIAD6BQAhjQNAAPsFACGOA0AA_AUAIY8DQAD8BQAhkAMBAPgFACGqAwEA-QUAIasDAQD5BQAh-QMBAPgFACECAAAAKQAgIgAA9AIAIAIAAAApACAiAAD0AgAgAwAAACsAICkAAO0CACAqAADyAgAgAQAAACsAIAEAAAApACAGDQAArAkAIC8AAK4JACAwAACtCQAgjQMAAPQFACCqAwAA9AUAIKsDAAD0BQAgDoUDAAC5BQAwhgMAAPsCABCHAwAAuQUAMIgDAQDeBAAhiQMBAN4EACGLAyAA4AQAIYwDIADgBAAhjQNAAOEEACGOA0AA4gQAIY8DQADiBAAhkAMBAN4EACGqAwEA3wQAIasDAQDfBAAh-QMBAN4EACEDAAAAKQAgAQAA-gIAMC4AAPsCACADAAAAKQAgAQAAKgAwAgAAKwAgAQAAAFEAIAEAAABRACADAAAATwAgAQAAUAAwAgAAUQAgAwAAAE8AIAEAAFAAMAIAAFEAIAMAAABPACABAABQADACAABRACAKAwAAqwkAIIgDAQAAAAGJAwEAAAABigMBAAAAAYsDIAAAAAGMAyAAAAABjQNAAAAAAY4DQAAAAAGPA0AAAAABkAMBAAAAAQEiAACDAwAgCYgDAQAAAAGJAwEAAAABigMBAAAAAYsDIAAAAAGMAyAAAAABjQNAAAAAAY4DQAAAAAGPA0AAAAABkAMBAAAAAQEiAACFAwAwASIAAIUDADAKAwAAqgkAIIgDAQD4BQAhiQMBAPgFACGKAwEA-QUAIYsDIAD6BQAhjAMgAPoFACGNA0AA-wUAIY4DQAD8BQAhjwNAAPwFACGQAwEA-AUAIQIAAABRACAiAACIAwAgCYgDAQD4BQAhiQMBAPgFACGKAwEA-QUAIYsDIAD6BQAhjAMgAPoFACGNA0AA-wUAIY4DQAD8BQAhjwNAAPwFACGQAwEA-AUAIQIAAABPACAiAACKAwAgAgAAAE8AICIAAIoDACADAAAAUQAgKQAAgwMAICoAAIgDACABAAAAUQAgAQAAAE8AIAUNAACnCQAgLwAAqQkAIDAAAKgJACCKAwAA9AUAII0DAAD0BQAgDIUDAAC4BQAwhgMAAJEDABCHAwAAuAUAMIgDAQDeBAAhiQMBAN4EACGKAwEA3wQAIYsDIADgBAAhjAMgAOAEACGNA0AA4QQAIY4DQADiBAAhjwNAAOIEACGQAwEA3gQAIQMAAABPACABAACQAwAwLgAAkQMAIAMAAABPACABAABQADACAABRACABAAAAPgAgAQAAAD4AIAMAAAA8ACABAAA9ADACAAA-ACADAAAAPAAgAQAAPQAwAgAAPgAgAwAAADwAIAEAAD0AMAIAAD4AIAoDAACmCQAgiAMBAAAAAYkDAQAAAAGKAwEAAAABiwMgAAAAAYwDIAAAAAGNA0AAAAABkAMBAAAAAaoDAQAAAAGrAwEAAAABASIAAJkDACAJiAMBAAAAAYkDAQAAAAGKAwEAAAABiwMgAAAAAYwDIAAAAAGNA0AAAAABkAMBAAAAAaoDAQAAAAGrAwEAAAABASIAAJsDADABIgAAmwMAMAoDAAClCQAgiAMBAPgFACGJAwEA-AUAIYoDAQD5BQAhiwMgAPoFACGMAyAA-gUAIY0DQAD7BQAhkAMBAPgFACGqAwEA-AUAIasDAQD5BQAhAgAAAD4AICIAAJ4DACAJiAMBAPgFACGJAwEA-AUAIYoDAQD5BQAhiwMgAPoFACGMAyAA-gUAIY0DQAD7BQAhkAMBAPgFACGqAwEA-AUAIasDAQD5BQAhAgAAADwAICIAAKADACACAAAAPAAgIgAAoAMAIAMAAAA-ACApAACZAwAgKgAAngMAIAEAAAA-ACABAAAAPAAgBg0AAKIJACAvAACkCQAgMAAAowkAIIoDAAD0BQAgjQMAAPQFACCrAwAA9AUAIAyFAwAAtwUAMIYDAACnAwAQhwMAALcFADCIAwEA3gQAIYkDAQDeBAAhigMBAN8EACGLAyAA4AQAIYwDIADgBAAhjQNAAOEEACGQAwEA3gQAIaoDAQDeBAAhqwMBAN8EACEDAAAAPAAgAQAApgMAMC4AAKcDACADAAAAPAAgAQAAPQAwAgAAPgAgAQAAAFkAIAEAAABZACADAAAAVwAgAQAAWAAwAgAAWQAgAwAAAFcAIAEAAFgAMAIAAFkAIAMAAABXACABAABYADACAABZACAMAwAAoQkAIIgDAQAAAAGJAwEAAAABigMBAAAAAYsDIAAAAAGMAyAAAAABjQNAAAAAAY4DQAAAAAGPA0AAAAABkAMBAAAAAaoDAQAAAAGrAwEAAAABASIAAK8DACALiAMBAAAAAYkDAQAAAAGKAwEAAAABiwMgAAAAAYwDIAAAAAGNA0AAAAABjgNAAAAAAY8DQAAAAAGQAwEAAAABqgMBAAAAAasDAQAAAAEBIgAAsQMAMAEiAACxAwAwDAMAAKAJACCIAwEA-AUAIYkDAQD4BQAhigMBAPkFACGLAyAA-gUAIYwDIAD6BQAhjQNAAPsFACGOA0AA_AUAIY8DQAD8BQAhkAMBAPgFACGqAwEA-AUAIasDAQD5BQAhAgAAAFkAICIAALQDACALiAMBAPgFACGJAwEA-AUAIYoDAQD5BQAhiwMgAPoFACGMAyAA-gUAIY0DQAD7BQAhjgNAAPwFACGPA0AA_AUAIZADAQD4BQAhqgMBAPgFACGrAwEA-QUAIQIAAABXACAiAAC2AwAgAgAAAFcAICIAALYDACADAAAAWQAgKQAArwMAICoAALQDACABAAAAWQAgAQAAAFcAIAYNAACdCQAgLwAAnwkAIDAAAJ4JACCKAwAA9AUAII0DAAD0BQAgqwMAAPQFACAOhQMAALYFADCGAwAAvQMAEIcDAAC2BQAwiAMBAN4EACGJAwEA3gQAIYoDAQDfBAAhiwMgAOAEACGMAyAA4AQAIY0DQADhBAAhjgNAAOIEACGPA0AA4gQAIZADAQDeBAAhqgMBAN4EACGrAwEA3wQAIQMAAABXACABAAC8AwAwLgAAvQMAIAMAAABXACABAABYADACAABZACApBAAAogUAIAUAAKQFACAGAACjBQAgCQAApQUAIAoAAKYFACAOAACrBQAgDwAApwUAIBAAAKgFACARAACpBQAgEgAAqgUAIBMAAKwFACAUAACtBQAgFQAArgUAIBYAAK8FACAXAACwBQAgGAAAsQUAIBkAALIFACAaAACzBQAgGwAAtAUAIBwAALUFACCFAwAAnAUAMIYDAADDAwAQhwMAAJwFADCIAwEAAAABiwMgAJ8FACGOA0AAoQUAIY8DQAChBQAhnQMBAAAAAekDAQAAAAHqAwEAngUAIesDAQCeBQAh7AMBAJ4FACHtAwEAAAAB7gMBAJ4FACHvAwEAngUAIfADAQCeBQAh8QMBAJ4FACHyAwEAngUAIfMDAQCeBQAh9AMAAKAFACD1AwAAoAUAIAEAAADAAwAgAQAAAMADACApBAAAogUAIAUAAKQFACAGAACjBQAgCQAApQUAIAoAAKYFACAOAACrBQAgDwAApwUAIBAAAKgFACARAACpBQAgEgAAqgUAIBMAAKwFACAUAACtBQAgFQAArgUAIBYAAK8FACAXAACwBQAgGAAAsQUAIBkAALIFACAaAACzBQAgGwAAtAUAIBwAALUFACCFAwAAnAUAMIYDAADDAwAQhwMAAJwFADCIAwEAnQUAIYsDIACfBQAhjgNAAKEFACGPA0AAoQUAIZ0DAQCdBQAh6QMBAJ4FACHqAwEAngUAIesDAQCeBQAh7AMBAJ4FACHtAwEAngUAIe4DAQCeBQAh7wMBAJ4FACHwAwEAngUAIfEDAQCeBQAh8gMBAJ4FACHzAwEAngUAIfQDAACgBQAg9QMAAKAFACAhBAAAiQkAIAUAAIsJACAGAACKCQAgCQAAjAkAIAoAAI0JACAOAACSCQAgDwAAjgkAIBAAAI8JACARAACQCQAgEgAAkQkAIBMAAJMJACAUAACUCQAgFQAAlQkAIBYAAJYJACAXAACXCQAgGAAAmAkAIBkAAJkJACAaAACaCQAgGwAAmwkAIBwAAJwJACDpAwAA9AUAIOoDAAD0BQAg6wMAAPQFACDsAwAA9AUAIO0DAAD0BQAg7gMAAPQFACDvAwAA9AUAIPADAAD0BQAg8QMAAPQFACDyAwAA9AUAIPMDAAD0BQAg9AMAAPQFACD1AwAA9AUAIAMAAADDAwAgAQAAxAMAMAIAAMADACADAAAAwwMAIAEAAMQDADACAADAAwAgAwAAAMMDACABAADEAwAwAgAAwAMAICYEAAD1CAAgBQAA9wgAIAYAAPYIACAJAAD4CAAgCgAA-QgAIA4AAP4IACAPAAD6CAAgEAAA-wgAIBEAAPwIACASAAD9CAAgEwAA_wgAIBQAAIAJACAVAACBCQAgFgAAggkAIBcAAIMJACAYAACECQAgGQAAhQkAIBoAAIYJACAbAACHCQAgHAAAiAkAIIgDAQAAAAGLAyAAAAABjgNAAAAAAY8DQAAAAAGdAwEAAAAB6QMBAAAAAeoDAQAAAAHrAwEAAAAB7AMBAAAAAe0DAQAAAAHuAwEAAAAB7wMBAAAAAfADAQAAAAHxAwEAAAAB8gMBAAAAAfMDAQAAAAH0A4AAAAAB9QOAAAAAAQEiAADIAwAgEogDAQAAAAGLAyAAAAABjgNAAAAAAY8DQAAAAAGdAwEAAAAB6QMBAAAAAeoDAQAAAAHrAwEAAAAB7AMBAAAAAe0DAQAAAAHuAwEAAAAB7wMBAAAAAfADAQAAAAHxAwEAAAAB8gMBAAAAAfMDAQAAAAH0A4AAAAAB9QOAAAAAAQEiAADKAwAwASIAAMoDADAmBAAA0gYAIAUAANQGACAGAADTBgAgCQAA1QYAIAoAANYGACAOAADbBgAgDwAA1wYAIBAAANgGACARAADZBgAgEgAA2gYAIBMAANwGACAUAADdBgAgFQAA3gYAIBYAAN8GACAXAADgBgAgGAAA4QYAIBkAAOIGACAaAADjBgAgGwAA5AYAIBwAAOUGACCIAwEA-AUAIYsDIAD6BQAhjgNAAPwFACGPA0AA_AUAIZ0DAQD4BQAh6QMBAPkFACHqAwEA-QUAIesDAQD5BQAh7AMBAPkFACHtAwEA-QUAIe4DAQD5BQAh7wMBAPkFACHwAwEA-QUAIfEDAQD5BQAh8gMBAPkFACHzAwEA-QUAIfQDgAAAAAH1A4AAAAABAgAAAMADACAiAADNAwAgEogDAQD4BQAhiwMgAPoFACGOA0AA_AUAIY8DQAD8BQAhnQMBAPgFACHpAwEA-QUAIeoDAQD5BQAh6wMBAPkFACHsAwEA-QUAIe0DAQD5BQAh7gMBAPkFACHvAwEA-QUAIfADAQD5BQAh8QMBAPkFACHyAwEA-QUAIfMDAQD5BQAh9AOAAAAAAfUDgAAAAAECAAAAwwMAICIAAM8DACACAAAAwwMAICIAAM8DACADAAAAwAMAICkAAMgDACAqAADNAwAgAQAAAMADACABAAAAwwMAIBANAADPBgAgLwAA0QYAIDAAANAGACDpAwAA9AUAIOoDAAD0BQAg6wMAAPQFACDsAwAA9AUAIO0DAAD0BQAg7gMAAPQFACDvAwAA9AUAIPADAAD0BQAg8QMAAPQFACDyAwAA9AUAIPMDAAD0BQAg9AMAAPQFACD1AwAA9AUAIBWFAwAAmwUAMIYDAADWAwAQhwMAAJsFADCIAwEA3gQAIYsDIADgBAAhjgNAAOIEACGPA0AA4gQAIZ0DAQDeBAAh6QMBAN8EACHqAwEA3wQAIesDAQDfBAAh7AMBAN8EACHtAwEA3wQAIe4DAQDfBAAh7wMBAN8EACHwAwEA3wQAIfEDAQDfBAAh8gMBAN8EACHzAwEA3wQAIfQDAACCBQAg9QMAAIIFACADAAAAwwMAIAEAANUDADAuAADWAwAgAwAAAMMDACABAADEAwAwAgAAwAMAIAEAAAAWACABAAAAFgAgAwAAAAsAIAEAABUAMAIAABYAIAMAAAALACABAAAVADACAAAWACADAAAACwAgAQAAFQAwAgAAFgAgFwMAAJkGACAEAADOBgAgiAMBAAAAAY4DQAAAAAGPA0AAAAABkAMBAAAAAZwDAQAAAAGdAwEAAAABqAMAAACoAwKuAwAAAOUDA7ADQAAAAAG6AwEAAAABuwMBAAAAAcIDAQAAAAHDA4AAAAABxwMBAAAAAeEDAQAAAAHiAwEAAAAB4wMBAAAAAeUDAQAAAAHmAwEAAAAB5wNAAAAAAegDgAAAAAEBIgAA3gMAIBWIAwEAAAABjgNAAAAAAY8DQAAAAAGQAwEAAAABnAMBAAAAAZ0DAQAAAAGoAwAAAKgDAq4DAAAA5QMDsANAAAAAAboDAQAAAAG7AwEAAAABwgMBAAAAAcMDgAAAAAHHAwEAAAAB4QMBAAAAAeIDAQAAAAHjAwEAAAAB5QMBAAAAAeYDAQAAAAHnA0AAAAAB6AOAAAAAAQEiAADgAwAwASIAAOADADAXAwAAmAYAIAQAAM0GACCIAwEA-AUAIY4DQAD8BQAhjwNAAPwFACGQAwEA-AUAIZwDAQD4BQAhnQMBAPgFACGoAwAAhAaoAyKuAwAAlwblAyOwA0AA-wUAIboDAQD5BQAhuwMBAPkFACHCAwEA-QUAIcMDgAAAAAHHAwEA-AUAIeEDAQD4BQAh4gMBAPkFACHjAwEA-QUAIeUDAQD5BQAh5gMBAPkFACHnA0AA-wUAIegDgAAAAAECAAAAFgAgIgAA4wMAIBWIAwEA-AUAIY4DQAD8BQAhjwNAAPwFACGQAwEA-AUAIZwDAQD4BQAhnQMBAPgFACGoAwAAhAaoAyKuAwAAlwblAyOwA0AA-wUAIboDAQD5BQAhuwMBAPkFACHCAwEA-QUAIcMDgAAAAAHHAwEA-AUAIeEDAQD4BQAh4gMBAPkFACHjAwEA-QUAIeUDAQD5BQAh5gMBAPkFACHnA0AA-wUAIegDgAAAAAECAAAACwAgIgAA5QMAIAIAAAALACAiAADlAwAgAwAAABYAICkAAN4DACAqAADjAwAgAQAAABYAIAEAAAALACAPDQAAygYAIC8AAMwGACAwAADLBgAgrgMAAPQFACCwAwAA9AUAILoDAAD0BQAguwMAAPQFACDCAwAA9AUAIMMDAAD0BQAg4gMAAPQFACDjAwAA9AUAIOUDAAD0BQAg5gMAAPQFACDnAwAA9AUAIOgDAAD0BQAgGIUDAACXBQAwhgMAAOwDABCHAwAAlwUAMIgDAQDeBAAhjgNAAOIEACGPA0AA4gQAIZADAQDeBAAhnAMBAN4EACGdAwEA3gQAIagDAADyBKgDIq4DAACYBeUDI7ADQADhBAAhugMBAN8EACG7AwEA3wQAIcIDAQDfBAAhwwMAAIIFACDHAwEA3gQAIeEDAQDeBAAh4gMBAN8EACHjAwEA3wQAIeUDAQDfBAAh5gMBAN8EACHnA0AA4QQAIegDAACCBQAgAwAAAAsAIAEAAOsDADAuAADsAwAgAwAAAAsAIAEAABUAMAIAABYAIAEAAAATACABAAAAEwAgAwAAAAcAIAEAABIAMAIAABMAIAMAAAAHACABAAASADACAAATACADAAAABwAgAQAAEgAwAgAAEwAgIwMAALEGACAEAADJBgAgiAMBAAAAAY4DQAAAAAGQAwEAAAABnAMBAAAAAZ0DAQAAAAGmAwIAAAABqAMAAACoAwK6AwEAAAABuwMBAAAAAbwDQAAAAAG-AwAAAL4DA78DAQAAAAHAAwEAAAABwQMBAAAAAcIDAQAAAAHDAwEAAAABxAMBAAAAAccDAQAAAAHRAwEAAAAB0gNAAAAAAdMDAQAAAAHUAwEAAAAB1QMBAAAAAdYDAAAAtQMD2AMAAADYAwPZAwEAAAAB2gMBAAAAAdsDAQAAAAHcAwEAAAAB3QMBAAAAAd4DAQAAAAHfAwEAAAAB4ANAAAAAAQEiAAD0AwAgIYgDAQAAAAGOA0AAAAABkAMBAAAAAZwDAQAAAAGdAwEAAAABpgMCAAAAAagDAAAAqAMCugMBAAAAAbsDAQAAAAG8A0AAAAABvgMAAAC-AwO_AwEAAAABwAMBAAAAAcEDAQAAAAHCAwEAAAABwwMBAAAAAcQDAQAAAAHHAwEAAAAB0QMBAAAAAdIDQAAAAAHTAwEAAAAB1AMBAAAAAdUDAQAAAAHWAwAAALUDA9gDAAAA2AMD2QMBAAAAAdoDAQAAAAHbAwEAAAAB3AMBAAAAAd0DAQAAAAHeAwEAAAAB3wMBAAAAAeADQAAAAAEBIgAA9gMAMAEiAAD2AwAwIwMAALAGACAEAADIBgAgiAMBAPgFACGOA0AA_AUAIZADAQD4BQAhnAMBAPgFACGdAwEA-AUAIaYDAgCkBgAhqAMAAIQGqAMiugMBAPkFACG7AwEA-QUAIbwDQAD7BQAhvgMAAKUGvgMjvwMBAPkFACHAAwEA-QUAIcEDAQD4BQAhwgMBAPkFACHDAwEA-QUAIcQDAQD5BQAhxwMBAPgFACHRAwEA-AUAIdIDQAD7BQAh0wMBAPkFACHUAwEA-QUAIdUDAQD5BQAh1gMAAK4GtQMj2AMAAK8G2AMj2QMBAPkFACHaAwEA-QUAIdsDAQD5BQAh3AMBAPkFACHdAwEA-QUAId4DAQD5BQAh3wMBAPkFACHgA0AA_AUAIQIAAAATACAiAAD5AwAgIYgDAQD4BQAhjgNAAPwFACGQAwEA-AUAIZwDAQD4BQAhnQMBAPgFACGmAwIApAYAIagDAACEBqgDIroDAQD5BQAhuwMBAPkFACG8A0AA-wUAIb4DAAClBr4DI78DAQD5BQAhwAMBAPkFACHBAwEA-AUAIcIDAQD5BQAhwwMBAPkFACHEAwEA-QUAIccDAQD4BQAh0QMBAPgFACHSA0AA-wUAIdMDAQD5BQAh1AMBAPkFACHVAwEA-QUAIdYDAACuBrUDI9gDAACvBtgDI9kDAQD5BQAh2gMBAPkFACHbAwEA-QUAIdwDAQD5BQAh3QMBAPkFACHeAwEA-QUAId8DAQD5BQAh4ANAAPwFACECAAAABwAgIgAA-wMAIAIAAAAHACAiAAD7AwAgAwAAABMAICkAAPQDACAqAAD5AwAgAQAAABMAIAEAAAAHACAcDQAAwwYAIC8AAMYGACAwAADFBgAgwQIAAMQGACDCAgAAxwYAIKYDAAD0BQAgugMAAPQFACC7AwAA9AUAILwDAAD0BQAgvgMAAPQFACC_AwAA9AUAIMADAAD0BQAgwgMAAPQFACDDAwAA9AUAIMQDAAD0BQAg0gMAAPQFACDTAwAA9AUAINQDAAD0BQAg1QMAAPQFACDWAwAA9AUAINgDAAD0BQAg2QMAAPQFACDaAwAA9AUAINsDAAD0BQAg3AMAAPQFACDdAwAA9AUAIN4DAAD0BQAg3wMAAPQFACAkhQMAAJAFADCGAwAAggQAEIcDAACQBQAwiAMBAN4EACGOA0AA4gQAIZADAQDeBAAhnAMBAN4EACGdAwEA3gQAIaYDAgCABQAhqAMAAPIEqAMiugMBAN8EACG7AwEA3wQAIbwDQADhBAAhvgMAAIEFvgMjvwMBAN8EACHAAwEA3wQAIcEDAQDeBAAhwgMBAN8EACHDAwEA3wQAIcQDAQDfBAAhxwMBAN4EACHRAwEA3gQAIdIDQADhBAAh0wMBAN8EACHUAwEA3wQAIdUDAQDfBAAh1gMAAJEFtQMj2AMAAJIF2AMj2QMBAN8EACHaAwEA3wQAIdsDAQDfBAAh3AMBAN8EACHdAwEA3wQAId4DAQDfBAAh3wMBAN8EACHgA0AA4gQAIQMAAAAHACABAACBBAAwLgAAggQAIAMAAAAHACABAAASADACAAATACABAAAAEAAgAQAAABAAIAMAAAAJACABAAAPADACAAAQACADAAAACQAgAQAADwAwAgAAEAAgAwAAAAkAIAEAAA8AMAIAABAAICEDAACoBgAgBAAAwgYAIIgDAQAAAAGOA0AAAAABjwNAAAAAAZADAQAAAAGcAwEAAAABnQMBAAAAAagDAAAAqAMCrAMBAAAAAa4DAAAArgMDrwNAAAAAAbADQAAAAAGyAwAAALIDArMDEAAAAAG1AwAAALUDArYDAACnBgAgtwMBAAAAAbgDAQAAAAG5AwIAAAABugMBAAAAAbsDAQAAAAG8A0AAAAABvgMAAAC-AwO_AwEAAAABwAMBAAAAAcEDAQAAAAHCAwEAAAABwwOAAAAAAcQDgAAAAAHFAwEAAAABxgMBAAAAAccDAQAAAAEBIgAAigQAIB-IAwEAAAABjgNAAAAAAY8DQAAAAAGQAwEAAAABnAMBAAAAAZ0DAQAAAAGoAwAAAKgDAqwDAQAAAAGuAwAAAK4DA68DQAAAAAGwA0AAAAABsgMAAACyAwKzAxAAAAABtQMAAAC1AwK2AwAApwYAILcDAQAAAAG4AwEAAAABuQMCAAAAAboDAQAAAAG7AwEAAAABvANAAAAAAb4DAAAAvgMDvwMBAAAAAcADAQAAAAHBAwEAAAABwgMBAAAAAcMDgAAAAAHEA4AAAAABxQMBAAAAAcYDAQAAAAHHAwEAAAABASIAAIwEADABIgAAjAQAMCEDAACmBgAgBAAAwQYAIIgDAQD4BQAhjgNAAPwFACGPA0AA_AUAIZADAQD4BQAhnAMBAPgFACGdAwEA-AUAIagDAACEBqgDIqwDAQD4BQAhrgMAAJ8GrgMjrwNAAPwFACGwA0AA-wUAIbIDAACgBrIDIrMDEAChBgAhtQMAAKIGtQMitgMAAKMGACC3AwEA-QUAIbgDAQD5BQAhuQMCAKQGACG6AwEA-QUAIbsDAQD5BQAhvANAAPsFACG-AwAApQa-AyO_AwEA-QUAIcADAQD5BQAhwQMBAPkFACHCAwEA-QUAIcMDgAAAAAHEA4AAAAABxQMBAPkFACHGAwEA-QUAIccDAQD4BQAhAgAAABAAICIAAI8EACAfiAMBAPgFACGOA0AA_AUAIY8DQAD8BQAhkAMBAPgFACGcAwEA-AUAIZ0DAQD4BQAhqAMAAIQGqAMirAMBAPgFACGuAwAAnwauAyOvA0AA_AUAIbADQAD7BQAhsgMAAKAGsgMiswMQAKEGACG1AwAAoga1AyK2AwAAowYAILcDAQD5BQAhuAMBAPkFACG5AwIApAYAIboDAQD5BQAhuwMBAPkFACG8A0AA-wUAIb4DAAClBr4DI78DAQD5BQAhwAMBAPkFACHBAwEA-QUAIcIDAQD5BQAhwwOAAAAAAcQDgAAAAAHFAwEA-QUAIcYDAQD5BQAhxwMBAPgFACECAAAACQAgIgAAkQQAIAIAAAAJACAiAACRBAAgAwAAABAAICkAAIoEACAqAACPBAAgAQAAABAAIAEAAAAJACAXDQAAvAYAIC8AAL8GACAwAAC-BgAgwQIAAL0GACDCAgAAwAYAIK4DAAD0BQAgsAMAAPQFACCzAwAA9AUAILcDAAD0BQAguAMAAPQFACC5AwAA9AUAILoDAAD0BQAguwMAAPQFACC8AwAA9AUAIL4DAAD0BQAgvwMAAPQFACDAAwAA9AUAIMEDAAD0BQAgwgMAAPQFACDDAwAA9AUAIMQDAAD0BQAgxQMAAPQFACDGAwAA9AUAICKFAwAA-gQAMIYDAACYBAAQhwMAAPoEADCIAwEA3gQAIY4DQADiBAAhjwNAAOIEACGQAwEA3gQAIZwDAQDeBAAhnQMBAN4EACGoAwAA8gSoAyKsAwEA3gQAIa4DAAD7BK4DI68DQADiBAAhsANAAOEEACGyAwAA_ASyAyKzAxAA_QQAIbUDAAD-BLUDIrYDAAD_BAAgtwMBAN8EACG4AwEA3wQAIbkDAgCABQAhugMBAN8EACG7AwEA3wQAIbwDQADhBAAhvgMAAIEFvgMjvwMBAN8EACHAAwEA3wQAIcEDAQDfBAAhwgMBAN8EACHDAwAAggUAIMQDAACCBQAgxQMBAN8EACHGAwEA3wQAIccDAQDeBAAhAwAAAAkAIAEAAJcEADAuAACYBAAgAwAAAAkAIAEAAA8AMAIAABAAIAEAAABdACABAAAAXQAgAwAAAFsAIAEAAFwAMAIAAF0AIAMAAABbACABAABcADACAABdACADAAAAWwAgAQAAXAAwAgAAXQAgDAMAALsGACCIAwEAAAABiQMBAAAAAYoDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAZADAQAAAAGqAwEAAAABqwMBAAAAAQEiAACgBAAgC4gDAQAAAAGJAwEAAAABigMBAAAAAYsDIAAAAAGMAyAAAAABjQNAAAAAAY4DQAAAAAGPA0AAAAABkAMBAAAAAaoDAQAAAAGrAwEAAAABASIAAKIEADABIgAAogQAMAwDAAC6BgAgiAMBAPgFACGJAwEA-AUAIYoDAQD5BQAhiwMgAPoFACGMAyAA-gUAIY0DQAD7BQAhjgNAAPwFACGPA0AA_AUAIZADAQD4BQAhqgMBAPgFACGrAwEA-QUAIQIAAABdACAiAAClBAAgC4gDAQD4BQAhiQMBAPgFACGKAwEA-QUAIYsDIAD6BQAhjAMgAPoFACGNA0AA-wUAIY4DQAD8BQAhjwNAAPwFACGQAwEA-AUAIaoDAQD4BQAhqwMBAPkFACECAAAAWwAgIgAApwQAIAIAAABbACAiAACnBAAgAwAAAF0AICkAAKAEACAqAAClBAAgAQAAAF0AIAEAAABbACAGDQAAtwYAIC8AALkGACAwAAC4BgAgigMAAPQFACCNAwAA9AUAIKsDAAD0BQAgDoUDAAD5BAAwhgMAAK4EABCHAwAA-QQAMIgDAQDeBAAhiQMBAN4EACGKAwEA3wQAIYsDIADgBAAhjAMgAOAEACGNA0AA4QQAIY4DQADiBAAhjwNAAOIEACGQAwEA3gQAIaoDAQDeBAAhqwMBAN8EACEDAAAAWwAgAQAArQQAMC4AAK4EACADAAAAWwAgAQAAXAAwAgAAXQAgAQAAAAUAIAEAAAAFACADAAAAAwAgAQAABAAwAgAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAMAAAADACABAAAEADACAAAFACAWAwAAsgYAIAUAALMGACAGAAC0BgAgBwAAtQYAIAgAALYGACCIAwEAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAZADAQAAAAGcAwEAAAABnQMBAAAAAZ4DAQAAAAGfAwEAAAABoAMBAAAAAaEDAQAAAAGjAwAAAKMDAqQDIAAAAAGmAwAAAKYDAqgDAAAAqAMCqQMgAAAAAQEiAAC2BAAgEYgDAQAAAAGMAyAAAAABjQNAAAAAAY4DQAAAAAGPA0AAAAABkAMBAAAAAZwDAQAAAAGdAwEAAAABngMBAAAAAZ8DAQAAAAGgAwEAAAABoQMBAAAAAaMDAAAAowMCpAMgAAAAAaYDAAAApgMCqAMAAACoAwKpAyAAAAABASIAALgEADABIgAAuAQAMBYDAACFBgAgBQAAhgYAIAYAAIcGACAHAACIBgAgCAAAiQYAIIgDAQD4BQAhjAMgAPoFACGNA0AA-wUAIY4DQAD8BQAhjwNAAPwFACGQAwEA-AUAIZwDAQD4BQAhnQMBAPgFACGeAwEA-AUAIZ8DAQD5BQAhoAMBAPkFACGhAwEA-QUAIaMDAACCBqMDIqQDIAD6BQAhpgMAAIMGpgMiqAMAAIQGqAMiqQMgAPoFACECAAAABQAgIgAAuwQAIBGIAwEA-AUAIYwDIAD6BQAhjQNAAPsFACGOA0AA_AUAIY8DQAD8BQAhkAMBAPgFACGcAwEA-AUAIZ0DAQD4BQAhngMBAPgFACGfAwEA-QUAIaADAQD5BQAhoQMBAPkFACGjAwAAggajAyKkAyAA-gUAIaYDAACDBqYDIqgDAACEBqgDIqkDIAD6BQAhAgAAAAMAICIAAL0EACACAAAAAwAgIgAAvQQAIAMAAAAFACApAAC2BAAgKgAAuwQAIAEAAAAFACABAAAAAwAgBw0AAP8FACAvAACBBgAgMAAAgAYAII0DAAD0BQAgnwMAAPQFACCgAwAA9AUAIKEDAAD0BQAgFIUDAADvBAAwhgMAAMQEABCHAwAA7wQAMIgDAQDeBAAhjAMgAOAEACGNA0AA4QQAIY4DQADiBAAhjwNAAOIEACGQAwEA3gQAIZwDAQDeBAAhnQMBAN4EACGeAwEA3gQAIZ8DAQDfBAAhoAMBAN8EACGhAwEA3wQAIaMDAADwBKMDIqQDIADgBAAhpgMAAPEEpgMiqAMAAPIEqAMiqQMgAOAEACEDAAAAAwAgAQAAwwQAMC4AAMQEACADAAAAAwAgAQAABAAwAgAABQAgAQAAAEUAIAEAAABFACADAAAAQwAgAQAARAAwAgAARQAgAwAAAEMAIAEAAEQAMAIAAEUAIAMAAABDACABAABEADACAABFACAKAwAA_gUAIIgDAQAAAAGJAwEAAAABigMBAAAAAYsDIAAAAAGMAyAAAAABjQNAAAAAAY4DQAAAAAGPA0AAAAABkAMBAAAAAQEiAADMBAAgCYgDAQAAAAGJAwEAAAABigMBAAAAAYsDIAAAAAGMAyAAAAABjQNAAAAAAY4DQAAAAAGPA0AAAAABkAMBAAAAAQEiAADOBAAwASIAAM4EADAKAwAA_QUAIIgDAQD4BQAhiQMBAPgFACGKAwEA-QUAIYsDIAD6BQAhjAMgAPoFACGNA0AA-wUAIY4DQAD8BQAhjwNAAPwFACGQAwEA-AUAIQIAAABFACAiAADRBAAgCYgDAQD4BQAhiQMBAPgFACGKAwEA-QUAIYsDIAD6BQAhjAMgAPoFACGNA0AA-wUAIY4DQAD8BQAhjwNAAPwFACGQAwEA-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-AwAAgQW-AyO_AwEA3wQAIcADAQDfBAAhwQMBAN8EACHCAwEA3wQAIcMDAACCBQAgxAMAAIIFACDFAwEA3wQAIcYDAQDfBAAhxwMBAN4EACEHDQAA5wQAIC8AAI8FACAwAACPBQAgkQMAAACuAwOSAwAAAK4DCZMDAAAArgMJmAMAAI4FrgMjBw0AAOQEACAvAACNBQAgMAAAjQUAIJEDAAAAsgMCkgMAAACyAwiTAwAAALIDCJgDAACMBbIDIg0NAADnBAAgLwAAiwUAIDAAAIsFACDBAgAAiwUAIMICAACLBQAgkQMQAAAAAZIDEAAAAAWTAxAAAAAFlAMQAAAAAZUDEAAAAAGWAxAAAAABlwMQAAAAAZgDEACKBQAhBw0AAOQEACAvAACJBQAgMAAAiQUAIJEDAAAAtQMCkgMAAAC1AwiTAwAAALUDCJgDAACIBbUDIgSRA4AAAAAFzgOAAAAAAc8DgAAAAATQA4AAAAAEDQ0AAOcEACAvAADnBAAgMAAA5wQAIMECAACHBQAgwgIAAOcEACCRAwIAAAABkgMCAAAABZMDAgAAAAWUAwIAAAABlQMCAAAAAZYDAgAAAAGXAwIAAAABmAMCAIYFACEHDQAA5wQAIC8AAIUFACAwAACFBQAgkQMAAAC-AwOSAwAAAL4DCZMDAAAAvgMJmAMAAIQFvgMjDw0AAOcEACAvAACDBQAgMAAAgwUAIJEDgAAAAAGUA4AAAAABlQOAAAAAAZYDgAAAAAGXA4AAAAABmAOAAAAAAcgDAQAAAAHJAwEAAAABygMBAAAAAcsDgAAAAAHMA4AAAAABzQOAAAAAAQyRA4AAAAABlAOAAAAAAZUDgAAAAAGWA4AAAAABlwOAAAAAAZgDgAAAAAHIAwEAAAAByQMBAAAAAcoDAQAAAAHLA4AAAAABzAOAAAAAAc0DgAAAAAEHDQAA5wQAIC8AAIUFACAwAACFBQAgkQMAAAC-AwOSAwAAAL4DCZMDAAAAvgMJmAMAAIQFvgMjBJEDAAAAvgMDkgMAAAC-AwmTAwAAAL4DCZgDAACFBb4DIw0NAADnBAAgLwAA5wQAIDAAAOcEACDBAgAAhwUAIMICAADnBAAgkQMCAAAAAZIDAgAAAAWTAwIAAAAFlAMCAAAAAZUDAgAAAAGWAwIAAAABlwMCAAAAAZgDAgCGBQAhCJEDCAAAAAGSAwgAAAAFkwMIAAAABZQDCAAAAAGVAwgAAAABlgMIAAAAAZcDCAAAAAGYAwgAhwUAIQcNAADkBAAgLwAAiQUAIDAAAIkFACCRAwAAALUDApIDAAAAtQMIkwMAAAC1AwiYAwAAiAW1AyIEkQMAAAC1AwKSAwAAALUDCJMDAAAAtQMImAMAAIkFtQMiDQ0AAOcEACAvAACLBQAgMAAAiwUAIMECAACLBQAgwgIAAIsFACCRAxAAAAABkgMQAAAABZMDEAAAAAWUAxAAAAABlQMQAAAAAZYDEAAAAAGXAxAAAAABmAMQAIoFACEIkQMQAAAAAZIDEAAAAAWTAxAAAAAFlAMQAAAAAZUDEAAAAAGWAxAAAAABlwMQAAAAAZgDEACLBQAhBw0AAOQEACAvAACNBQAgMAAAjQUAIJEDAAAAsgMCkgMAAACyAwiTAwAAALIDCJgDAACMBbIDIgSRAwAAALIDApIDAAAAsgMIkwMAAACyAwiYAwAAjQWyAyIHDQAA5wQAIC8AAI8FACAwAACPBQAgkQMAAACuAwOSAwAAAK4DCZMDAAAArgMJmAMAAI4FrgMjBJEDAAAArgMDkgMAAACuAwmTAwAAAK4DCZgDAACPBa4DIySFAwAAkAUAMIYDAACCBAAQhwMAAJAFADCIAwEA3gQAIY4DQADiBAAhkAMBAN4EACGcAwEA3gQAIZ0DAQDeBAAhpgMCAIAFACGoAwAA8gSoAyK6AwEA3wQAIbsDAQDfBAAhvANAAOEEACG-AwAAgQW-AyO_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_YDAAADACD3AwAAAwAg-AMAAAMAIAP2AwAACQAg9wMAAAkAIPgDAAAJACAD9gMAAAcAIPcDAAAHACD4AwAABwAgA_YDAAALACD3AwAACwAg-AMAAAsAIAP2AwAADQAg9wMAAA0AIPgDAAANACAD9gMAABsAIPcDAAAbACD4AwAAGwAgA_YDAAApACD3AwAAKQAg-AMAACkAIAP2AwAALQAg9wMAAC0AIPgDAAAtACAD9gMAADEAIPcDAAAxACD4AwAAMQAgA_YDAAAkACD3AwAAJAAg-AMAACQAIAP2AwAAOAAg9wMAADgAIPgDAAA4ACAD9gMAADwAIPcDAAA8ACD4AwAAPAAgA_YDAABAACD3AwAAQAAg-AMAAEAAIAP2AwAAQwAg9wMAAEMAIPgDAABDACAD9gMAAEcAIPcDAABHACD4AwAARwAgA_YDAABLACD3AwAASwAg-AMAAEsAIAP2AwAATwAg9wMAAE8AIPgDAABPACAD9gMAAFMAIPcDAABTACD4AwAAUwAgA_YDAABXACD3AwAAVwAg-AMAAFcAIAP2AwAAWwAg9wMAAFsAIPgDAABbACAOhQMAALYFADCGAwAAvQMAEIcDAAC2BQAwiAMBAN4EACGJAwEA3gQAIYoDAQDfBAAhiwMgAOAEACGMAyAA4AQAIY0DQADhBAAhjgNAAOIEACGPA0AA4gQAIZADAQDeBAAhqgMBAN4EACGrAwEA3wQAIQyFAwAAtwUAMIYDAACnAwAQhwMAALcFADCIAwEA3gQAIYkDAQDeBAAhigMBAN8EACGLAyAA4AQAIYwDIADgBAAhjQNAAOEEACGQAwEA3gQAIaoDAQDeBAAhqwMBAN8EACEMhQMAALgFADCGAwAAkQMAEIcDAAC4BQAwiAMBAN4EACGJAwEA3gQAIYoDAQDfBAAhiwMgAOAEACGMAyAA4AQAIY0DQADhBAAhjgNAAOIEACGPA0AA4gQAIZADAQDeBAAhDoUDAAC5BQAwhgMAAPsCABCHAwAAuQUAMIgDAQDeBAAhiQMBAN4EACGLAyAA4AQAIYwDIADgBAAhjQNAAOEEACGOA0AA4gQAIY8DQADiBAAhkAMBAN4EACGqAwEA3wQAIasDAQDfBAAh-QMBAN4EACEOhQMAALoFADCGAwAA5QIAEIcDAAC6BQAwiAMBAN4EACGJAwEA3gQAIYsDIADgBAAhjAMgAOAEACGNA0AA4QQAIY4DQADiBAAhjwNAAOIEACGQAwEA3gQAIaoDAQDfBAAhqwMBAN8EACH5AwEA3gQAIQuFAwAAuwUAMIYDAADPAgAQhwMAALsFADCIAwEA3gQAIYsDIADgBAAhjAMgAOAEACGNA0AA4QQAIY4DQADiBAAhkAMBAN4EACH6AwEA3gQAIfsDAQDeBAAhDYUDAAC8BQAwhgMAALkCABCHAwAAvAUAMIgDAQDeBAAhiwMgAOAEACGMAyAA4AQAIY0DQADhBAAhjgNAAOIEACGPA0AA4gQAIaoDAQDeBAAhqwMBAN4EACH8AwEA3wQAIf0DAQDfBAAhEYUDAAC9BQAwhgMAAJ8CABCHAwAAvQUAMIgDAQDeBAAhiQMBAN4EACGKAwEA3gQAIYsDIADgBAAhjAMgAOAEACGNA0AA4QQAIY4DQADiBAAhjwNAAOIEACGQAwEA3gQAIf4DQADhBAAh_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_gNAAMkFACH_A0AAyQUAIYAEAQCeBQAhgQQBAJ4FACGCBAEAngUAIRsDAADKBQAgBAAA4AUAIIUDAADdBQAwhgMAAA0AEIcDAADdBQAwiAMBAJ0FACGOA0AAoQUAIY8DQAChBQAhkAMBAJ0FACGcAwEAnQUAIZ0DAQCdBQAhqAMAAN4FqAMirgMAAN8FhQQisANAAMkFACG6AwEAngUAIbsDAQCeBQAhwgMBAJ4FACHDAwAAoAUAIMQDAACgBQAgxwMBAJ0FACHiAwEAngUAIeMDAQCeBQAh5QMBAJ4FACHmAwEAngUAIecDQADJBQAhgwQBAJ0FACGFBAEAngUAIQSRAwAAAKgDApIDAAAAqAMIkwMAAACoAwiYAwAA9ASoAyIEkQMAAACFBAKSAwAAAIUECJMDAAAAhQQImAMAAMEFhQQiGwMAAMoFACAFAADwBQAgBgAA8QUAIAcAAPIFACAIAADzBQAghQMAAO0FADCGAwAAAwAQhwMAAO0FADCIAwEAnQUAIYwDIACfBQAhjQNAAMkFACGOA0AAoQUAIY8DQAChBQAhkAMBAJ0FACGcAwEAnQUAIZ0DAQCdBQAhngMBAJ0FACGfAwEAngUAIaADAQCeBQAhoQMBAJ4FACGjAwAA7gWjAyKkAyAAnwUAIaYDAADvBaYDIqgDAADeBagDIqkDIACfBQAhiQQAAAMAIIoEAAADACAaAwAAygUAIAQAAOAFACCFAwAA4QUAMIYDAAALABCHAwAA4QUAMIgDAQCdBQAhjgNAAKEFACGPA0AAoQUAIZADAQCdBQAhnAMBAJ0FACGdAwEAnQUAIagDAADeBagDIq4DAADiBeUDI7ADQADJBQAhugMBAJ4FACG7AwEAngUAIcIDAQCeBQAhwwMAAKAFACDHAwEAnQUAIeEDAQCdBQAh4gMBAJ4FACHjAwEAngUAIeUDAQCeBQAh5gMBAJ4FACHnA0AAyQUAIegDAACgBQAgBJEDAAAA5QMDkgMAAADlAwmTAwAAAOUDCZgDAACaBeUDIyYDAADKBQAgBAAA4AUAIIUDAADjBQAwhgMAAAcAEIcDAADjBQAwiAMBAJ0FACGOA0AAoQUAIZADAQCdBQAhnAMBAJ0FACGdAwEAnQUAIaYDAgDkBQAhqAMAAN4FqAMiugMBAJ4FACG7AwEAngUAIbwDQADJBQAhvgMAAOcFvgMjvwMBAJ4FACHAAwEAngUAIcEDAQCdBQAhwgMBAJ4FACHDAwEAngUAIcQDAQCeBQAhxwMBAJ0FACHRAwEAnQUAIdIDQADJBQAh0wMBAJ4FACHUAwEAngUAIdUDAQCeBQAh1gMAAOUFtQMj2AMAAOYF2AMj2QMBAJ4FACHaAwEAngUAIdsDAQCeBQAh3AMBAJ4FACHdAwEAngUAId4DAQCeBQAh3wMBAJ4FACHgA0AAoQUAIQiRAwIAAAABkgMCAAAABZMDAgAAAAWUAwIAAAABlQMCAAAAAZYDAgAAAAGXAwIAAAABmAMCAOcEACEEkQMAAAC1AwOSAwAAALUDCZMDAAAAtQMJmAMAAJYFtQMjBJEDAAAA2AMDkgMAAADYAwmTAwAAANgDCZgDAACUBdgDIwSRAwAAAL4DA5IDAAAAvgMJkwMAAAC-AwmYAwAAhQW-AyMkAwAAygUAIAQAAOAFACCFAwAA6AUAMIYDAAAJABCHAwAA6AUAMIgDAQCdBQAhjgNAAKEFACGPA0AAoQUAIZADAQCdBQAhnAMBAJ0FACGdAwEAnQUAIagDAADeBagDIqwDAQCdBQAhrgMAAOkFrgMjrwNAAKEFACGwA0AAyQUAIbIDAADqBbIDIrMDEADrBQAhtQMAAOwFtQMitgMAAP8EACC3AwEAngUAIbgDAQCeBQAhuQMCAOQFACG6AwEAngUAIbsDAQCeBQAhvANAAMkFACG-AwAA5wW-AyO_AwEAngUAIcADAQCeBQAhwQMBAJ4FACHCAwEAngUAIcMDAACgBQAgxAMAAKAFACDFAwEAngUAIcYDAQCeBQAhxwMBAJ0FACEEkQMAAACuAwOSAwAAAK4DCZMDAAAArgMJmAMAAI8FrgMjBJEDAAAAsgMCkgMAAACyAwiTAwAAALIDCJgDAACNBbIDIgiRAxAAAAABkgMQAAAABZMDEAAAAAWUAxAAAAABlQMQAAAAAZYDEAAAAAGXAxAAAAABmAMQAIsFACEEkQMAAAC1AwKSAwAAALUDCJMDAAAAtQMImAMAAIkFtQMiGQMAAMoFACAFAADwBQAgBgAA8QUAIAcAAPIFACAIAADzBQAghQMAAO0FADCGAwAAAwAQhwMAAO0FADCIAwEAnQUAIYwDIACfBQAhjQNAAMkFACGOA0AAoQUAIY8DQAChBQAhkAMBAJ0FACGcAwEAnQUAIZ0DAQCdBQAhngMBAJ0FACGfAwEAngUAIaADAQCeBQAhoQMBAJ4FACGjAwAA7gWjAyKkAyAAnwUAIaYDAADvBaYDIqgDAADeBagDIqkDIACfBQAhBJEDAAAAowMCkgMAAACjAwiTAwAAAKMDCJgDAAD4BKMDIgSRAwAAAKYDApIDAAAApgMIkwMAAACmAwiYAwAA9gSmAyIoAwAAygUAIAQAAOAFACCFAwAA4wUAMIYDAAAHABCHAwAA4wUAMIgDAQCdBQAhjgNAAKEFACGQAwEAnQUAIZwDAQCdBQAhnQMBAJ0FACGmAwIA5AUAIagDAADeBagDIroDAQCeBQAhuwMBAJ4FACG8A0AAyQUAIb4DAADnBb4DI78DAQCeBQAhwAMBAJ4FACHBAwEAnQUAIcIDAQCeBQAhwwMBAJ4FACHEAwEAngUAIccDAQCdBQAh0QMBAJ0FACHSA0AAyQUAIdMDAQCeBQAh1AMBAJ4FACHVAwEAngUAIdYDAADlBbUDI9gDAADmBdgDI9kDAQCeBQAh2gMBAJ4FACHbAwEAngUAIdwDAQCeBQAh3QMBAJ4FACHeAwEAngUAId8DAQCeBQAh4ANAAKEFACGJBAAABwAgigQAAAcAICYDAADKBQAgBAAA4AUAIIUDAADoBQAwhgMAAAkAEIcDAADoBQAwiAMBAJ0FACGOA0AAoQUAIY8DQAChBQAhkAMBAJ0FACGcAwEAnQUAIZ0DAQCdBQAhqAMAAN4FqAMirAMBAJ0FACGuAwAA6QWuAyOvA0AAoQUAIbADQADJBQAhsgMAAOoFsgMiswMQAOsFACG1AwAA7AW1AyK2AwAA_wQAILcDAQCeBQAhuAMBAJ4FACG5AwIA5AUAIboDAQCeBQAhuwMBAJ4FACG8A0AAyQUAIb4DAADnBb4DI78DAQCeBQAhwAMBAJ4FACHBAwEAngUAIcIDAQCeBQAhwwMAAKAFACDEAwAAoAUAIMUDAQCeBQAhxgMBAJ4FACHHAwEAnQUAIYkEAAAJACCKBAAACQAgHAMAAMoFACAEAADgBQAghQMAAOEFADCGAwAACwAQhwMAAOEFADCIAwEAnQUAIY4DQAChBQAhjwNAAKEFACGQAwEAnQUAIZwDAQCdBQAhnQMBAJ0FACGoAwAA3gWoAyKuAwAA4gXlAyOwA0AAyQUAIboDAQCeBQAhuwMBAJ4FACHCAwEAngUAIcMDAACgBQAgxwMBAJ0FACHhAwEAnQUAIeIDAQCeBQAh4wMBAJ4FACHlAwEAngUAIeYDAQCeBQAh5wNAAMkFACHoAwAAoAUAIIkEAAALACCKBAAACwAgHQMAAMoFACAEAADgBQAghQMAAN0FADCGAwAADQAQhwMAAN0FADCIAwEAnQUAIY4DQAChBQAhjwNAAKEFACGQAwEAnQUAIZwDAQCdBQAhnQMBAJ0FACGoAwAA3gWoAyKuAwAA3wWFBCKwA0AAyQUAIboDAQCeBQAhuwMBAJ4FACHCAwEAngUAIcMDAACgBQAgxAMAAKAFACDHAwEAnQUAIeIDAQCeBQAh4wMBAJ4FACHlAwEAngUAIeYDAQCeBQAh5wNAAMkFACGDBAEAnQUAIYUEAQCeBQAhiQQAAA0AIIoEAAANACAAAAAAAZEEAQAAAAEBkQQBAAAAAQGRBCAAAAABAZEEQAAAAAEBkQRAAAAAAQUpAACACwAgKgAAgwsAIIsEAACBCwAgjAQAAIILACCPBAAAwAMAIAMpAACACwAgiwQAAIELACCPBAAAwAMAIAAAAAGRBAAAAKMDAgGRBAAAAKYDAgGRBAAAAKgDAgUpAADnCgAgKgAA_goAIIsEAADoCgAgjAQAAP0KACCPBAAAwAMAIAcpAACpBgAgKgAArAYAIIsEAACqBgAgjAQAAKsGACCNBAAABwAgjgQAAAcAII8EAAATACAHKQAAmgYAICoAAJ0GACCLBAAAmwYAIIwEAACcBgAgjQQAAAkAII4EAAAJACCPBAAAEAAgBykAAJIGACAqAACVBgAgiwQAAJMGACCMBAAAlAYAII0EAAALACCOBAAACwAgjwQAABYAIAcpAACKBgAgKgAAjQYAIIsEAACLBgAgjAQAAIwGACCNBAAADQAgjgQAAA0AII8EAAAZACAWAwAAkQYAIIgDAQAAAAGOA0AAAAABjwNAAAAAAZADAQAAAAGcAwEAAAABnQMBAAAAAagDAAAAqAMCrgMAAACFBAKwA0AAAAABugMBAAAAAbsDAQAAAAHCAwEAAAABwwOAAAAAAcQDgAAAAAHiAwEAAAAB4wMBAAAAAeUDAQAAAAHmAwEAAAAB5wNAAAAAAYMEAQAAAAGFBAEAAAABAgAAABkAICkAAIoGACADAAAADQAgKQAAigYAICoAAI4GACAYAAAADQAgAwAAkAYAICIAAI4GACCIAwEA-AUAIY4DQAD8BQAhjwNAAPwFACGQAwEA-AUAIZwDAQD4BQAhnQMBAPgFACGoAwAAhAaoAyKuAwAAjwaFBCKwA0AA-wUAIboDAQD5BQAhuwMBAPkFACHCAwEA-QUAIcMDgAAAAAHEA4AAAAAB4gMBAPkFACHjAwEA-QUAIeUDAQD5BQAh5gMBAPkFACHnA0AA-wUAIYMEAQD4BQAhhQQBAPkFACEWAwAAkAYAIIgDAQD4BQAhjgNAAPwFACGPA0AA_AUAIZADAQD4BQAhnAMBAPgFACGdAwEA-AUAIagDAACEBqgDIq4DAACPBoUEIrADQAD7BQAhugMBAPkFACG7AwEA-QUAIcIDAQD5BQAhwwOAAAAAAcQDgAAAAAHiAwEA-QUAIeMDAQD5BQAh5QMBAPkFACHmAwEA-QUAIecDQAD7BQAhgwQBAPgFACGFBAEA-QUAIQGRBAAAAIUEAgUpAAD4CgAgKgAA-woAIIsEAAD5CgAgjAQAAPoKACCPBAAAwAMAIAMpAAD4CgAgiwQAAPkKACCPBAAAwAMAIBUDAACZBgAgiAMBAAAAAY4DQAAAAAGPA0AAAAABkAMBAAAAAZwDAQAAAAGdAwEAAAABqAMAAACoAwKuAwAAAOUDA7ADQAAAAAG6AwEAAAABuwMBAAAAAcIDAQAAAAHDA4AAAAAB4QMBAAAAAeIDAQAAAAHjAwEAAAAB5QMBAAAAAeYDAQAAAAHnA0AAAAAB6AOAAAAAAQIAAAAWACApAACSBgAgAwAAAAsAICkAAJIGACAqAACWBgAgFwAAAAsAIAMAAJgGACAiAACWBgAgiAMBAPgFACGOA0AA_AUAIY8DQAD8BQAhkAMBAPgFACGcAwEA-AUAIZ0DAQD4BQAhqAMAAIQGqAMirgMAAJcG5QMjsANAAPsFACG6AwEA-QUAIbsDAQD5BQAhwgMBAPkFACHDA4AAAAAB4QMBAPgFACHiAwEA-QUAIeMDAQD5BQAh5QMBAPkFACHmAwEA-QUAIecDQAD7BQAh6AOAAAAAARUDAACYBgAgiAMBAPgFACGOA0AA_AUAIY8DQAD8BQAhkAMBAPgFACGcAwEA-AUAIZ0DAQD4BQAhqAMAAIQGqAMirgMAAJcG5QMjsANAAPsFACG6AwEA-QUAIbsDAQD5BQAhwgMBAPkFACHDA4AAAAAB4QMBAPgFACHiAwEA-QUAIeMDAQD5BQAh5QMBAPkFACHmAwEA-QUAIecDQAD7BQAh6AOAAAAAAQGRBAAAAOUDAwUpAADzCgAgKgAA9goAIIsEAAD0CgAgjAQAAPUKACCPBAAAwAMAIAMpAADzCgAgiwQAAPQKACCPBAAAwAMAIB8DAACoBgAgiAMBAAAAAY4DQAAAAAGPA0AAAAABkAMBAAAAAZwDAQAAAAGdAwEAAAABqAMAAACoAwKsAwEAAAABrgMAAACuAwOvA0AAAAABsANAAAAAAbIDAAAAsgMCswMQAAAAAbUDAAAAtQMCtgMAAKcGACC3AwEAAAABuAMBAAAAAbkDAgAAAAG6AwEAAAABuwMBAAAAAbwDQAAAAAG-AwAAAL4DA78DAQAAAAHAAwEAAAABwQMBAAAAAcIDAQAAAAHDA4AAAAABxAOAAAAAAcUDAQAAAAHGAwEAAAABAgAAABAAICkAAJoGACADAAAACQAgKQAAmgYAICoAAJ4GACAhAAAACQAgAwAApgYAICIAAJ4GACCIAwEA-AUAIY4DQAD8BQAhjwNAAPwFACGQAwEA-AUAIZwDAQD4BQAhnQMBAPgFACGoAwAAhAaoAyKsAwEA-AUAIa4DAACfBq4DI68DQAD8BQAhsANAAPsFACGyAwAAoAayAyKzAxAAoQYAIbUDAACiBrUDIrYDAACjBgAgtwMBAPkFACG4AwEA-QUAIbkDAgCkBgAhugMBAPkFACG7AwEA-QUAIbwDQAD7BQAhvgMAAKUGvgMjvwMBAPkFACHAAwEA-QUAIcEDAQD5BQAhwgMBAPkFACHDA4AAAAABxAOAAAAAAcUDAQD5BQAhxgMBAPkFACEfAwAApgYAIIgDAQD4BQAhjgNAAPwFACGPA0AA_AUAIZADAQD4BQAhnAMBAPgFACGdAwEA-AUAIagDAACEBqgDIqwDAQD4BQAhrgMAAJ8GrgMjrwNAAPwFACGwA0AA-wUAIbIDAACgBrIDIrMDEAChBgAhtQMAAKIGtQMitgMAAKMGACC3AwEA-QUAIbgDAQD5BQAhuQMCAKQGACG6AwEA-QUAIbsDAQD5BQAhvANAAPsFACG-AwAApQa-AyO_AwEA-QUAIcADAQD5BQAhwQMBAPkFACHCAwEA-QUAIcMDgAAAAAHEA4AAAAABxQMBAPkFACHGAwEA-QUAIQGRBAAAAK4DAwGRBAAAALIDAgWRBBAAAAABlAQQAAAAAZUEEAAAAAGWBBAAAAABlwQQAAAAAQGRBAAAALUDAgKRBIAAAAAEmASAAAAABQWRBAIAAAABlAQCAAAAAZUEAgAAAAGWBAIAAAABlwQCAAAAAQGRBAAAAL4DAwUpAADuCgAgKgAA8QoAIIsEAADvCgAgjAQAAPAKACCPBAAAwAMAIAGRBIAAAAAEAykAAO4KACCLBAAA7woAII8EAADAAwAgIQMAALEGACCIAwEAAAABjgNAAAAAAZADAQAAAAGcAwEAAAABnQMBAAAAAaYDAgAAAAGoAwAAAKgDAroDAQAAAAG7AwEAAAABvANAAAAAAb4DAAAAvgMDvwMBAAAAAcADAQAAAAHBAwEAAAABwgMBAAAAAcMDAQAAAAHEAwEAAAAB0QMBAAAAAdIDQAAAAAHTAwEAAAAB1AMBAAAAAdUDAQAAAAHWAwAAALUDA9gDAAAA2AMD2QMBAAAAAdoDAQAAAAHbAwEAAAAB3AMBAAAAAd0DAQAAAAHeAwEAAAAB3wMBAAAAAeADQAAAAAECAAAAEwAgKQAAqQYAIAMAAAAHACApAACpBgAgKgAArQYAICMAAAAHACADAACwBgAgIgAArQYAIIgDAQD4BQAhjgNAAPwFACGQAwEA-AUAIZwDAQD4BQAhnQMBAPgFACGmAwIApAYAIagDAACEBqgDIroDAQD5BQAhuwMBAPkFACG8A0AA-wUAIb4DAAClBr4DI78DAQD5BQAhwAMBAPkFACHBAwEA-AUAIcIDAQD5BQAhwwMBAPkFACHEAwEA-QUAIdEDAQD4BQAh0gNAAPsFACHTAwEA-QUAIdQDAQD5BQAh1QMBAPkFACHWAwAArga1AyPYAwAArwbYAyPZAwEA-QUAIdoDAQD5BQAh2wMBAPkFACHcAwEA-QUAId0DAQD5BQAh3gMBAPkFACHfAwEA-QUAIeADQAD8BQAhIQMAALAGACCIAwEA-AUAIY4DQAD8BQAhkAMBAPgFACGcAwEA-AUAIZ0DAQD4BQAhpgMCAKQGACGoAwAAhAaoAyK6AwEA-QUAIbsDAQD5BQAhvANAAPsFACG-AwAApQa-AyO_AwEA-QUAIcADAQD5BQAhwQMBAPgFACHCAwEA-QUAIcMDAQD5BQAhxAMBAPkFACHRAwEA-AUAIdIDQAD7BQAh0wMBAPkFACHUAwEA-QUAIdUDAQD5BQAh1gMAAK4GtQMj2AMAAK8G2AMj2QMBAPkFACHaAwEA-QUAIdsDAQD5BQAh3AMBAPkFACHdAwEA-QUAId4DAQD5BQAh3wMBAPkFACHgA0AA_AUAIQGRBAAAALUDAwGRBAAAANgDAwUpAADpCgAgKgAA7AoAIIsEAADqCgAgjAQAAOsKACCPBAAAwAMAIAMpAADpCgAgiwQAAOoKACCPBAAAwAMAIAMpAADnCgAgiwQAAOgKACCPBAAAwAMAIAMpAACpBgAgiwQAAKoGACCPBAAAEwAgAykAAJoGACCLBAAAmwYAII8EAAAQACADKQAAkgYAIIsEAACTBgAgjwQAABYAIAMpAACKBgAgiwQAAIsGACCPBAAAGQAgAAAABSkAAOIKACAqAADlCgAgiwQAAOMKACCMBAAA5AoAII8EAADAAwAgAykAAOIKACCLBAAA4woAII8EAADAAwAgAAAAAAAFKQAA3QoAICoAAOAKACCLBAAA3goAIIwEAADfCgAgjwQAAAUAIAMpAADdCgAgiwQAAN4KACCPBAAABQAgAAAAAAAFKQAA2AoAICoAANsKACCLBAAA2QoAIIwEAADaCgAgjwQAAAUAIAMpAADYCgAgiwQAANkKACCPBAAABQAgAAAABSkAANMKACAqAADWCgAgiwQAANQKACCMBAAA1QoAII8EAAAFACADKQAA0woAIIsEAADUCgAgjwQAAAUAIAAAAAspAADpCAAwKgAA7ggAMIsEAADqCAAwjAQAAOsIADCNBAAA7QgAMI4EAADtCAAwjwQAAO0IADCQBAAA7AgAIJEEAADtCAAwkgQAAO8IADCTBAAA8AgAMAspAADdCAAwKgAA4ggAMIsEAADeCAAwjAQAAN8IADCNBAAA4QgAMI4EAADhCAAwjwQAAOEIADCQBAAA4AgAIJEEAADhCAAwkgQAAOMIADCTBAAA5AgAMAspAADRCAAwKgAA1ggAMIsEAADSCAAwjAQAANMIADCNBAAA1QgAMI4EAADVCAAwjwQAANUIADCQBAAA1AgAIJEEAADVCAAwkgQAANcIADCTBAAA2AgAMAspAADFCAAwKgAAyggAMIsEAADGCAAwjAQAAMcIADCNBAAAyQgAMI4EAADJCAAwjwQAAMkIADCQBAAAyAgAIJEEAADJCAAwkgQAAMsIADCTBAAAzAgAMAspAAC3CAAwKgAAvAgAMIsEAAC4CAAwjAQAALkIADCNBAAAuwgAMI4EAAC7CAAwjwQAALsIADCQBAAAuggAIJEEAAC7CAAwkgQAAL0IADCTBAAAvggAMAspAACeCAAwKgAAowgAMIsEAACfCAAwjAQAAKAIADCNBAAAoggAMI4EAACiCAAwjwQAAKIIADCQBAAAoQgAIJEEAACiCAAwkgQAAKQIADCTBAAApQgAMAspAACSCAAwKgAAlwgAMIsEAACTCAAwjAQAAJQIADCNBAAAlggAMI4EAACWCAAwjwQAAJYIADCQBAAAlQgAIJEEAACWCAAwkgQAAJgIADCTBAAAmQgAMAspAACGCAAwKgAAiwgAMIsEAACHCAAwjAQAAIgIADCNBAAAiggAMI4EAACKCAAwjwQAAIoIADCQBAAAiQgAIJEEAACKCAAwkgQAAIwIADCTBAAAjQgAMAspAAD6BwAwKgAA_wcAMIsEAAD7BwAwjAQAAPwHADCNBAAA_gcAMI4EAAD-BwAwjwQAAP4HADCQBAAA_QcAIJEEAAD-BwAwkgQAAIAIADCTBAAAgQgAMAspAADeBwAwKgAA4wcAMIsEAADfBwAwjAQAAOAHADCNBAAA4gcAMI4EAADiBwAwjwQAAOIHADCQBAAA4QcAIJEEAADiBwAwkgQAAOQHADCTBAAA5QcAMAspAADSBwAwKgAA1wcAMIsEAADTBwAwjAQAANQHADCNBAAA1gcAMI4EAADWBwAwjwQAANYHADCQBAAA1QcAIJEEAADWBwAwkgQAANgHADCTBAAA2QcAMAspAADGBwAwKgAAywcAMIsEAADHBwAwjAQAAMgHADCNBAAAygcAMI4EAADKBwAwjwQAAMoHADCQBAAAyQcAIJEEAADKBwAwkgQAAMwHADCTBAAAzQcAMAspAAC6BwAwKgAAvwcAMIsEAAC7BwAwjAQAALwHADCNBAAAvgcAMI4EAAC-BwAwjwQAAL4HADCQBAAAvQcAIJEEAAC-BwAwkgQAAMAHADCTBAAAwQcAMAspAACuBwAwKgAAswcAMIsEAACvBwAwjAQAALAHADCNBAAAsgcAMI4EAACyBwAwjwQAALIHADCQBAAAsQcAIJEEAACyBwAwkgQAALQHADCTBAAAtQcAMAspAACiBwAwKgAApwcAMIsEAACjBwAwjAQAAKQHADCNBAAApgcAMI4EAACmBwAwjwQAAKYHADCQBAAApQcAIJEEAACmBwAwkgQAAKgHADCTBAAAqQcAMAspAACWBwAwKgAAmwcAMIsEAACXBwAwjAQAAJgHADCNBAAAmgcAMI4EAACaBwAwjwQAAJoHADCQBAAAmQcAIJEEAACaBwAwkgQAAJwHADCTBAAAnQcAMAspAACKBwAwKgAAjwcAMIsEAACLBwAwjAQAAIwHADCNBAAAjgcAMI4EAACOBwAwjwQAAI4HADCQBAAAjQcAIJEEAACOBwAwkgQAAJAHADCTBAAAkQcAMAspAAD-BgAwKgAAgwcAMIsEAAD_BgAwjAQAAIAHADCNBAAAggcAMI4EAACCBwAwjwQAAIIHADCQBAAAgQcAIJEEAACCBwAwkgQAAIQHADCTBAAAhQcAMAspAADyBgAwKgAA9wYAMIsEAADzBgAwjAQAAPQGADCNBAAA9gYAMI4EAAD2BgAwjwQAAPYGADCQBAAA9QYAIJEEAAD2BgAwkgQAAPgGADCTBAAA-QYAMAspAADmBgAwKgAA6wYAMIsEAADnBgAwjAQAAOgGADCNBAAA6gYAMI4EAADqBgAwjwQAAOoGADCQBAAA6QYAIJEEAADqBgAwkgQAAOwGADCTBAAA7QYAMAqIAwEAAAABiQMBAAAAAYoDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAaoDAQAAAAGrAwEAAAABAgAAAF0AICkAAPEGACADAAAAXQAgKQAA8QYAICoAAPAGACABIgAA0goAMA8DAADKBQAghQMAAMgFADCGAwAAWwAQhwMAAMgFADCIAwEAAAABiQMBAJ0FACGKAwEAngUAIYsDIACfBQAhjAMgAJ8FACGNA0AAyQUAIY4DQAChBQAhjwNAAKEFACGQAwEAnQUAIaoDAQCdBQAhqwMBAJ4FACECAAAAXQAgIgAA8AYAIAIAAADuBgAgIgAA7wYAIA6FAwAA7QYAMIYDAADuBgAQhwMAAO0GADCIAwEAnQUAIYkDAQCdBQAhigMBAJ4FACGLAyAAnwUAIYwDIACfBQAhjQNAAMkFACGOA0AAoQUAIY8DQAChBQAhkAMBAJ0FACGqAwEAnQUAIasDAQCeBQAhDoUDAADtBgAwhgMAAO4GABCHAwAA7QYAMIgDAQCdBQAhiQMBAJ0FACGKAwEAngUAIYsDIACfBQAhjAMgAJ8FACGNA0AAyQUAIY4DQAChBQAhjwNAAKEFACGQAwEAnQUAIaoDAQCdBQAhqwMBAJ4FACEKiAMBAPgFACGJAwEA-AUAIYoDAQD5BQAhiwMgAPoFACGMAyAA-gUAIY0DQAD7BQAhjgNAAPwFACGPA0AA_AUAIaoDAQD4BQAhqwMBAPkFACEKiAMBAPgFACGJAwEA-AUAIYoDAQD5BQAhiwMgAPoFACGMAyAA-gUAIY0DQAD7BQAhjgNAAPwFACGPA0AA_AUAIaoDAQD4BQAhqwMBAPkFACEKiAMBAAAAAYkDAQAAAAGKAwEAAAABiwMgAAAAAYwDIAAAAAGNA0AAAAABjgNAAAAAAY8DQAAAAAGqAwEAAAABqwMBAAAAAQqIAwEAAAABiQMBAAAAAYoDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAaoDAQAAAAGrAwEAAAABAgAAAFkAICkAAP0GACADAAAAWQAgKQAA_QYAICoAAPwGACABIgAA0QoAMA8DAADKBQAghQMAAMsFADCGAwAAVwAQhwMAAMsFADCIAwEAAAABiQMBAJ0FACGKAwEAngUAIYsDIACfBQAhjAMgAJ8FACGNA0AAyQUAIY4DQAChBQAhjwNAAKEFACGQAwEAnQUAIaoDAQCdBQAhqwMBAJ4FACECAAAAWQAgIgAA_AYAIAIAAAD6BgAgIgAA-wYAIA6FAwAA-QYAMIYDAAD6BgAQhwMAAPkGADCIAwEAnQUAIYkDAQCdBQAhigMBAJ4FACGLAyAAnwUAIYwDIACfBQAhjQNAAMkFACGOA0AAoQUAIY8DQAChBQAhkAMBAJ0FACGqAwEAnQUAIasDAQCeBQAhDoUDAAD5BgAwhgMAAPoGABCHAwAA-QYAMIgDAQCdBQAhiQMBAJ0FACGKAwEAngUAIYsDIACfBQAhjAMgAJ8FACGNA0AAyQUAIY4DQAChBQAhjwNAAKEFACGQAwEAnQUAIaoDAQCdBQAhqwMBAJ4FACEKiAMBAPgFACGJAwEA-AUAIYoDAQD5BQAhiwMgAPoFACGMAyAA-gUAIY0DQAD7BQAhjgNAAPwFACGPA0AA_AUAIaoDAQD4BQAhqwMBAPkFACEKiAMBAPgFACGJAwEA-AUAIYoDAQD5BQAhiwMgAPoFACGMAyAA-gUAIY0DQAD7BQAhjgNAAPwFACGPA0AA_AUAIaoDAQD4BQAhqwMBAPkFACEKiAMBAAAAAYkDAQAAAAGKAwEAAAABiwMgAAAAAYwDIAAAAAGNA0AAAAABjgNAAAAAAY8DQAAAAAGqAwEAAAABqwMBAAAAAQiIAwEAAAABiQMBAAAAAYoDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAQIAAABVACApAACJBwAgAwAAAFUAICkAAIkHACAqAACIBwAgASIAANAKADANAwAAygUAIIUDAADMBQAwhgMAAFMAEIcDAADMBQAwiAMBAAAAAYkDAQCdBQAhigMBAJ4FACGLAyAAnwUAIYwDIACfBQAhjQNAAMkFACGOA0AAoQUAIY8DQAChBQAhkAMBAJ0FACECAAAAVQAgIgAAiAcAIAIAAACGBwAgIgAAhwcAIAyFAwAAhQcAMIYDAACGBwAQhwMAAIUHADCIAwEAnQUAIYkDAQCdBQAhigMBAJ4FACGLAyAAnwUAIYwDIACfBQAhjQNAAMkFACGOA0AAoQUAIY8DQAChBQAhkAMBAJ0FACEMhQMAAIUHADCGAwAAhgcAEIcDAACFBwAwiAMBAJ0FACGJAwEAnQUAIYoDAQCeBQAhiwMgAJ8FACGMAyAAnwUAIY0DQADJBQAhjgNAAKEFACGPA0AAoQUAIZADAQCdBQAhCIgDAQD4BQAhiQMBAPgFACGKAwEA-QUAIYsDIAD6BQAhjAMgAPoFACGNA0AA-wUAIY4DQAD8BQAhjwNAAPwFACEIiAMBAPgFACGJAwEA-AUAIYoDAQD5BQAhiwMgAPoFACGMAyAA-gUAIY0DQAD7BQAhjgNAAPwFACGPA0AA_AUAIQiIAwEAAAABiQMBAAAAAYoDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAQiIAwEAAAABiQMBAAAAAYoDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAQIAAABRACApAACVBwAgAwAAAFEAICkAAJUHACAqAACUBwAgASIAAM8KADANAwAAygUAIIUDAADNBQAwhgMAAE8AEIcDAADNBQAwiAMBAAAAAYkDAQCdBQAhigMBAJ4FACGLAyAAnwUAIYwDIACfBQAhjQNAAMkFACGOA0AAoQUAIY8DQAChBQAhkAMBAJ0FACECAAAAUQAgIgAAlAcAIAIAAACSBwAgIgAAkwcAIAyFAwAAkQcAMIYDAACSBwAQhwMAAJEHADCIAwEAnQUAIYkDAQCdBQAhigMBAJ4FACGLAyAAnwUAIYwDIACfBQAhjQNAAMkFACGOA0AAoQUAIY8DQAChBQAhkAMBAJ0FACEMhQMAAJEHADCGAwAAkgcAEIcDAACRBwAwiAMBAJ0FACGJAwEAnQUAIYoDAQCeBQAhiwMgAJ8FACGMAyAAnwUAIY0DQADJBQAhjgNAAKEFACGPA0AAoQUAIZADAQCdBQAhCIgDAQD4BQAhiQMBAPgFACGKAwEA-QUAIYsDIAD6BQAhjAMgAPoFACGNA0AA-wUAIY4DQAD8BQAhjwNAAPwFACEIiAMBAPgFACGJAwEA-AUAIYoDAQD5BQAhiwMgAPoFACGMAyAA-gUAIY0DQAD7BQAhjgNAAPwFACGPA0AA_AUAIQiIAwEAAAABiQMBAAAAAYoDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAQiIAwEAAAABiQMBAAAAAYoDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAQIAAABNACApAAChBwAgAwAAAE0AICkAAKEHACAqAACgBwAgASIAAM4KADANAwAAygUAIIUDAADOBQAwhgMAAEsAEIcDAADOBQAwiAMBAAAAAYkDAQCdBQAhigMBAJ4FACGLAyAAnwUAIYwDIACfBQAhjQNAAMkFACGOA0AAoQUAIY8DQAChBQAhkAMBAJ0FACECAAAATQAgIgAAoAcAIAIAAACeBwAgIgAAnwcAIAyFAwAAnQcAMIYDAACeBwAQhwMAAJ0HADCIAwEAnQUAIYkDAQCdBQAhigMBAJ4FACGLAyAAnwUAIYwDIACfBQAhjQNAAMkFACGOA0AAoQUAIY8DQAChBQAhkAMBAJ0FACEMhQMAAJ0HADCGAwAAngcAEIcDAACdBwAwiAMBAJ0FACGJAwEAnQUAIYoDAQCeBQAhiwMgAJ8FACGMAyAAnwUAIY0DQADJBQAhjgNAAKEFACGPA0AAoQUAIZADAQCdBQAhCIgDAQD4BQAhiQMBAPgFACGKAwEA-QUAIYsDIAD6BQAhjAMgAPoFACGNA0AA-wUAIY4DQAD8BQAhjwNAAPwFACEIiAMBAPgFACGJAwEA-AUAIYoDAQD5BQAhiwMgAPoFACGMAyAA-gUAIY0DQAD7BQAhjgNAAPwFACGPA0AA_AUAIQiIAwEAAAABiQMBAAAAAYoDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAQiIAwEAAAABiQMBAAAAAYoDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAQIAAABJACApAACtBwAgAwAAAEkAICkAAK0HACAqAACsBwAgASIAAM0KADANAwAAygUAIIUDAADPBQAwhgMAAEcAEIcDAADPBQAwiAMBAAAAAYkDAQCdBQAhigMBAJ4FACGLAyAAnwUAIYwDIACfBQAhjQNAAMkFACGOA0AAoQUAIY8DQAChBQAhkAMBAJ0FACECAAAASQAgIgAArAcAIAIAAACqBwAgIgAAqwcAIAyFAwAAqQcAMIYDAACqBwAQhwMAAKkHADCIAwEAnQUAIYkDAQCdBQAhigMBAJ4FACGLAyAAnwUAIYwDIACfBQAhjQNAAMkFACGOA0AAoQUAIY8DQAChBQAhkAMBAJ0FACEMhQMAAKkHADCGAwAAqgcAEIcDAACpBwAwiAMBAJ0FACGJAwEAnQUAIYoDAQCeBQAhiwMgAJ8FACGMAyAAnwUAIY0DQADJBQAhjgNAAKEFACGPA0AAoQUAIZADAQCdBQAhCIgDAQD4BQAhiQMBAPgFACGKAwEA-QUAIYsDIAD6BQAhjAMgAPoFACGNA0AA-wUAIY4DQAD8BQAhjwNAAPwFACEIiAMBAPgFACGJAwEA-AUAIYoDAQD5BQAhiwMgAPoFACGMAyAA-gUAIY0DQAD7BQAhjgNAAPwFACGPA0AA_AUAIQiIAwEAAAABiQMBAAAAAYoDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAQiIAwEAAAABiQMBAAAAAYoDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAQIAAABFACApAAC5BwAgAwAAAEUAICkAALkHACAqAAC4BwAgASIAAMwKADANAwAAygUAIIUDAADQBQAwhgMAAEMAEIcDAADQBQAwiAMBAAAAAYkDAQCdBQAhigMBAJ4FACGLAyAAnwUAIYwDIACfBQAhjQNAAMkFACGOA0AAoQUAIY8DQAChBQAhkAMBAJ0FACECAAAARQAgIgAAuAcAIAIAAAC2BwAgIgAAtwcAIAyFAwAAtQcAMIYDAAC2BwAQhwMAALUHADCIAwEAnQUAIYkDAQCdBQAhigMBAJ4FACGLAyAAnwUAIYwDIACfBQAhjQNAAMkFACGOA0AAoQUAIY8DQAChBQAhkAMBAJ0FACEMhQMAALUHADCGAwAAtgcAEIcDAAC1BwAwiAMBAJ0FACGJAwEAnQUAIYoDAQCeBQAhiwMgAJ8FACGMAyAAnwUAIY0DQADJBQAhjgNAAKEFACGPA0AAoQUAIZADAQCdBQAhCIgDAQD4BQAhiQMBAPgFACGKAwEA-QUAIYsDIAD6BQAhjAMgAPoFACGNA0AA-wUAIY4DQAD8BQAhjwNAAPwFACEIiAMBAPgFACGJAwEA-AUAIYoDAQD5BQAhiwMgAPoFACGMAyAA-gUAIY0DQAD7BQAhjgNAAPwFACGPA0AA_AUAIQiIAwEAAAABiQMBAAAAAYoDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAQiIAwEAAAABiQMBAAAAAYoDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAQIAAAABACApAADFBwAgAwAAAAEAICkAAMUHACAqAADEBwAgASIAAMsKADANAwAAygUAIIUDAADRBQAwhgMAAEAAEIcDAADRBQAwiAMBAAAAAYkDAQCdBQAhigMBAJ0FACGLAyAAnwUAIYwDIACfBQAhjQNAAMkFACGOA0AAoQUAIY8DQAChBQAhkAMBAJ0FACECAAAAAQAgIgAAxAcAIAIAAADCBwAgIgAAwwcAIAyFAwAAwQcAMIYDAADCBwAQhwMAAMEHADCIAwEAnQUAIYkDAQCdBQAhigMBAJ0FACGLAyAAnwUAIYwDIACfBQAhjQNAAMkFACGOA0AAoQUAIY8DQAChBQAhkAMBAJ0FACEMhQMAAMEHADCGAwAAwgcAEIcDAADBBwAwiAMBAJ0FACGJAwEAnQUAIYoDAQCdBQAhiwMgAJ8FACGMAyAAnwUAIY0DQADJBQAhjgNAAKEFACGPA0AAoQUAIZADAQCdBQAhCIgDAQD4BQAhiQMBAPgFACGKAwEA-AUAIYsDIAD6BQAhjAMgAPoFACGNA0AA-wUAIY4DQAD8BQAhjwNAAPwFACEIiAMBAPgFACGJAwEA-AUAIYoDAQD4BQAhiwMgAPoFACGMAyAA-gUAIY0DQAD7BQAhjgNAAPwFACGPA0AA_AUAIQiIAwEAAAABiQMBAAAAAYoDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAQiIAwEAAAABiQMBAAAAAYoDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGqAwEAAAABqwMBAAAAAQIAAAA-ACApAADRBwAgAwAAAD4AICkAANEHACAqAADQBwAgASIAAMoKADANAwAAygUAIIUDAADSBQAwhgMAADwAEIcDAADSBQAwiAMBAAAAAYkDAQCdBQAhigMBAJ4FACGLAyAAnwUAIYwDIACfBQAhjQNAAMkFACGQAwEAnQUAIaoDAQCdBQAhqwMBAJ4FACECAAAAPgAgIgAA0AcAIAIAAADOBwAgIgAAzwcAIAyFAwAAzQcAMIYDAADOBwAQhwMAAM0HADCIAwEAnQUAIYkDAQCdBQAhigMBAJ4FACGLAyAAnwUAIYwDIACfBQAhjQNAAMkFACGQAwEAnQUAIaoDAQCdBQAhqwMBAJ4FACEMhQMAAM0HADCGAwAAzgcAEIcDAADNBwAwiAMBAJ0FACGJAwEAnQUAIYoDAQCeBQAhiwMgAJ8FACGMAyAAnwUAIY0DQADJBQAhkAMBAJ0FACGqAwEAnQUAIasDAQCeBQAhCIgDAQD4BQAhiQMBAPgFACGKAwEA-QUAIYsDIAD6BQAhjAMgAPoFACGNA0AA-wUAIaoDAQD4BQAhqwMBAPkFACEIiAMBAPgFACGJAwEA-AUAIYoDAQD5BQAhiwMgAPoFACGMAyAA-gUAIY0DQAD7BQAhqgMBAPgFACGrAwEA-QUAIQiIAwEAAAABiQMBAAAAAYoDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGqAwEAAAABqwMBAAAAAQeIAwEAAAABiwMgAAAAAYwDIAAAAAGNA0AAAAABjgNAAAAAAfoDAQAAAAH7AwEAAAABAgAAADoAICkAAN0HACADAAAAOgAgKQAA3QcAICoAANwHACABIgAAyQoAMAwDAADKBQAghQMAANMFADCGAwAAOAAQhwMAANMFADCIAwEAAAABiwMgAJ8FACGMAyAAnwUAIY0DQADJBQAhjgNAAKEFACGQAwEAnQUAIfoDAQCdBQAh-wMBAJ0FACECAAAAOgAgIgAA3AcAIAIAAADaBwAgIgAA2wcAIAuFAwAA2QcAMIYDAADaBwAQhwMAANkHADCIAwEAnQUAIYsDIACfBQAhjAMgAJ8FACGNA0AAyQUAIY4DQAChBQAhkAMBAJ0FACH6AwEAnQUAIfsDAQCdBQAhC4UDAADZBwAwhgMAANoHABCHAwAA2QcAMIgDAQCdBQAhiwMgAJ8FACGMAyAAnwUAIY0DQADJBQAhjgNAAKEFACGQAwEAnQUAIfoDAQCdBQAh-wMBAJ0FACEHiAMBAPgFACGLAyAA-gUAIYwDIAD6BQAhjQNAAPsFACGOA0AA_AUAIfoDAQD4BQAh-wMBAPgFACEHiAMBAPgFACGLAyAA-gUAIYwDIAD6BQAhjQNAAPsFACGOA0AA_AUAIfoDAQD4BQAh-wMBAPgFACEHiAMBAAAAAYsDIAAAAAGMAyAAAAABjQNAAAAAAY4DQAAAAAH6AwEAAAAB-wMBAAAAAQsMAAD5BwAgiAMBAAAAAYkDAQAAAAGKAwEAAAABiwMgAAAAAYwDIAAAAAGNA0AAAAABjgNAAAAAAeADQAAAAAGHBAEAAAABiAQBAAAAAQIAAAA2ACApAAD4BwAgAwAAADYAICkAAPgHACAqAADoBwAgASIAAMgKADAQAwAAygUAIAwAANUFACCFAwAA1AUAMIYDAAAkABCHAwAA1AUAMIgDAQAAAAGJAwEAnQUAIYoDAQCdBQAhiwMgAJ8FACGMAyAAnwUAIY0DQADJBQAhjgNAAKEFACGQAwEAnQUAIeADQAChBQAhhwQBAJ4FACGIBAEAngUAIQIAAAA2ACAiAADoBwAgAgAAAOYHACAiAADnBwAgDoUDAADlBwAwhgMAAOYHABCHAwAA5QcAMIgDAQCdBQAhiQMBAJ0FACGKAwEAnQUAIYsDIACfBQAhjAMgAJ8FACGNA0AAyQUAIY4DQAChBQAhkAMBAJ0FACHgA0AAoQUAIYcEAQCeBQAhiAQBAJ4FACEOhQMAAOUHADCGAwAA5gcAEIcDAADlBwAwiAMBAJ0FACGJAwEAnQUAIYoDAQCdBQAhiwMgAJ8FACGMAyAAnwUAIY0DQADJBQAhjgNAAKEFACGQAwEAnQUAIeADQAChBQAhhwQBAJ4FACGIBAEAngUAIQqIAwEA-AUAIYkDAQD4BQAhigMBAPgFACGLAyAA-gUAIYwDIAD6BQAhjQNAAPsFACGOA0AA_AUAIeADQAD8BQAhhwQBAPkFACGIBAEA-QUAIQsMAADpBwAgiAMBAPgFACGJAwEA-AUAIYoDAQD4BQAhiwMgAPoFACGMAyAA-gUAIY0DQAD7BQAhjgNAAPwFACHgA0AA_AUAIYcEAQD5BQAhiAQBAPkFACELKQAA6gcAMCoAAO8HADCLBAAA6wcAMIwEAADsBwAwjQQAAO4HADCOBAAA7gcAMI8EAADuBwAwkAQAAO0HACCRBAAA7gcAMJIEAADwBwAwkwQAAPEHADAKCwAA9wcAIIgDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAaoDAQAAAAGrAwEAAAAB_AMBAAAAAQIAAAAhACApAAD2BwAgAwAAACEAICkAAPYHACAqAAD0BwAgASIAAMcKADAPCwAA2gUAIA4AANsFACCFAwAA2QUAMIYDAAAfABCHAwAA2QUAMIgDAQAAAAGLAyAAnwUAIYwDIACfBQAhjQNAAMkFACGOA0AAoQUAIY8DQAChBQAhqgMBAJ0FACGrAwEAnQUAIfwDAQCeBQAh_QMBAJ4FACECAAAAIQAgIgAA9AcAIAIAAADyBwAgIgAA8wcAIA2FAwAA8QcAMIYDAADyBwAQhwMAAPEHADCIAwEAnQUAIYsDIACfBQAhjAMgAJ8FACGNA0AAyQUAIY4DQAChBQAhjwNAAKEFACGqAwEAnQUAIasDAQCdBQAh_AMBAJ4FACH9AwEAngUAIQ2FAwAA8QcAMIYDAADyBwAQhwMAAPEHADCIAwEAnQUAIYsDIACfBQAhjAMgAJ8FACGNA0AAyQUAIY4DQAChBQAhjwNAAKEFACGqAwEAnQUAIasDAQCdBQAh_AMBAJ4FACH9AwEAngUAIQmIAwEA-AUAIYsDIAD6BQAhjAMgAPoFACGNA0AA-wUAIY4DQAD8BQAhjwNAAPwFACGqAwEA-AUAIasDAQD4BQAh_AMBAPkFACEKCwAA9QcAIIgDAQD4BQAhiwMgAPoFACGMAyAA-gUAIY0DQAD7BQAhjgNAAPwFACGPA0AA_AUAIaoDAQD4BQAhqwMBAPgFACH8AwEA-QUAIQcpAADCCgAgKgAAxQoAIIsEAADDCgAgjAQAAMQKACCNBAAAGwAgjgQAABsAII8EAAAdACAKCwAA9wcAIIgDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAaoDAQAAAAGrAwEAAAAB_AMBAAAAAQMpAADCCgAgiwQAAMMKACCPBAAAHQAgCwwAAPkHACCIAwEAAAABiQMBAAAAAYoDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAAB4ANAAAAAAYcEAQAAAAGIBAEAAAABBCkAAOoHADCLBAAA6wcAMI8EAADuBwAwkAQAAO0HACALiAMBAAAAAYkDAQAAAAGKAwEAAAABiwMgAAAAAYwDIAAAAAGNA0AAAAABjgNAAAAAAY8DQAAAAAGqAwEAAAABqwMBAAAAAYYEQAAAAAECAAAAMwAgKQAAhQgAIAMAAAAzACApAACFCAAgKgAAhAgAIAEiAADBCgAwEAMAAMoFACCFAwAA1gUAMIYDAAAxABCHAwAA1gUAMIgDAQAAAAGJAwEAnQUAIYoDAQCeBQAhiwMgAJ8FACGMAyAAnwUAIY0DQADJBQAhjgNAAKEFACGPA0AAoQUAIZADAQCdBQAhqgMBAJ0FACGrAwEAngUAIYYEQAChBQAhAgAAADMAICIAAIQIACACAAAAgggAICIAAIMIACAPhQMAAIEIADCGAwAAgggAEIcDAACBCAAwiAMBAJ0FACGJAwEAnQUAIYoDAQCeBQAhiwMgAJ8FACGMAyAAnwUAIY0DQADJBQAhjgNAAKEFACGPA0AAoQUAIZADAQCdBQAhqgMBAJ0FACGrAwEAngUAIYYEQAChBQAhD4UDAACBCAAwhgMAAIIIABCHAwAAgQgAMIgDAQCdBQAhiQMBAJ0FACGKAwEAngUAIYsDIACfBQAhjAMgAJ8FACGNA0AAyQUAIY4DQAChBQAhjwNAAKEFACGQAwEAnQUAIaoDAQCdBQAhqwMBAJ4FACGGBEAAoQUAIQuIAwEA-AUAIYkDAQD4BQAhigMBAPkFACGLAyAA-gUAIYwDIAD6BQAhjQNAAPsFACGOA0AA_AUAIY8DQAD8BQAhqgMBAPgFACGrAwEA-QUAIYYEQAD8BQAhC4gDAQD4BQAhiQMBAPgFACGKAwEA-QUAIYsDIAD6BQAhjAMgAPoFACGNA0AA-wUAIY4DQAD8BQAhjwNAAPwFACGqAwEA-AUAIasDAQD5BQAhhgRAAPwFACELiAMBAAAAAYkDAQAAAAGKAwEAAAABiwMgAAAAAYwDIAAAAAGNA0AAAAABjgNAAAAAAY8DQAAAAAGqAwEAAAABqwMBAAAAAYYEQAAAAAEKiAMBAAAAAYkDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAaoDAQAAAAGrAwEAAAAB-QMBAAAAAQIAAAAvACApAACRCAAgAwAAAC8AICkAAJEIACAqAACQCAAgASIAAMAKADAPAwAAygUAIIUDAADXBQAwhgMAAC0AEIcDAADXBQAwiAMBAAAAAYkDAQCdBQAhiwMgAJ8FACGMAyAAnwUAIY0DQADJBQAhjgNAAKEFACGPA0AAoQUAIZADAQCdBQAhqgMBAJ4FACGrAwEAngUAIfkDAQCdBQAhAgAAAC8AICIAAJAIACACAAAAjggAICIAAI8IACAOhQMAAI0IADCGAwAAjggAEIcDAACNCAAwiAMBAJ0FACGJAwEAnQUAIYsDIACfBQAhjAMgAJ8FACGNA0AAyQUAIY4DQAChBQAhjwNAAKEFACGQAwEAnQUAIaoDAQCeBQAhqwMBAJ4FACH5AwEAnQUAIQ6FAwAAjQgAMIYDAACOCAAQhwMAAI0IADCIAwEAnQUAIYkDAQCdBQAhiwMgAJ8FACGMAyAAnwUAIY0DQADJBQAhjgNAAKEFACGPA0AAoQUAIZADAQCdBQAhqgMBAJ4FACGrAwEAngUAIfkDAQCdBQAhCogDAQD4BQAhiQMBAPgFACGLAyAA-gUAIYwDIAD6BQAhjQNAAPsFACGOA0AA_AUAIY8DQAD8BQAhqgMBAPkFACGrAwEA-QUAIfkDAQD4BQAhCogDAQD4BQAhiQMBAPgFACGLAyAA-gUAIYwDIAD6BQAhjQNAAPsFACGOA0AA_AUAIY8DQAD8BQAhqgMBAPkFACGrAwEA-QUAIfkDAQD4BQAhCogDAQAAAAGJAwEAAAABiwMgAAAAAYwDIAAAAAGNA0AAAAABjgNAAAAAAY8DQAAAAAGqAwEAAAABqwMBAAAAAfkDAQAAAAEKiAMBAAAAAYkDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAaoDAQAAAAGrAwEAAAAB-QMBAAAAAQIAAAArACApAACdCAAgAwAAACsAICkAAJ0IACAqAACcCAAgASIAAL8KADAPAwAAygUAIIUDAADYBQAwhgMAACkAEIcDAADYBQAwiAMBAAAAAYkDAQCdBQAhiwMgAJ8FACGMAyAAnwUAIY0DQADJBQAhjgNAAKEFACGPA0AAoQUAIZADAQCdBQAhqgMBAJ4FACGrAwEAngUAIfkDAQCdBQAhAgAAACsAICIAAJwIACACAAAAmggAICIAAJsIACAOhQMAAJkIADCGAwAAmggAEIcDAACZCAAwiAMBAJ0FACGJAwEAnQUAIYsDIACfBQAhjAMgAJ8FACGNA0AAyQUAIY4DQAChBQAhjwNAAKEFACGQAwEAnQUAIaoDAQCeBQAhqwMBAJ4FACH5AwEAnQUAIQ6FAwAAmQgAMIYDAACaCAAQhwMAAJkIADCIAwEAnQUAIYkDAQCdBQAhiwMgAJ8FACGMAyAAnwUAIY0DQADJBQAhjgNAAKEFACGPA0AAoQUAIZADAQCdBQAhqgMBAJ4FACGrAwEAngUAIfkDAQCdBQAhCogDAQD4BQAhiQMBAPgFACGLAyAA-gUAIYwDIAD6BQAhjQNAAPsFACGOA0AA_AUAIY8DQAD8BQAhqgMBAPkFACGrAwEA-QUAIfkDAQD4BQAhCogDAQD4BQAhiQMBAPgFACGLAyAA-gUAIYwDIAD6BQAhjQNAAPsFACGOA0AA_AUAIY8DQAD8BQAhqgMBAPkFACGrAwEA-QUAIfkDAQD4BQAhCogDAQAAAAGJAwEAAAABiwMgAAAAAYwDIAAAAAGNA0AAAAABjgNAAAAAAY8DQAAAAAGqAwEAAAABqwMBAAAAAfkDAQAAAAEODAAAtggAIIgDAQAAAAGJAwEAAAABigMBAAAAAYsDIAAAAAGMAyAAAAABjQNAAAAAAY4DQAAAAAGPA0AAAAAB_gNAAAAAAf8DQAAAAAGABAEAAAABgQQBAAAAAYIEAQAAAAECAAAAHQAgKQAAtQgAIAMAAAAdACApAAC1CAAgKgAAqAgAIAEiAAC-CgAwEwMAAMoFACAMAADVBQAghQMAANwFADCGAwAAGwAQhwMAANwFADCIAwEAAAABiQMBAJ0FACGKAwEAnQUAIYsDIACfBQAhjAMgAJ8FACGNA0AAyQUAIY4DQAChBQAhjwNAAKEFACGQAwEAnQUAIf4DQADJBQAh_wNAAMkFACGABAEAngUAIYEEAQCeBQAhggQBAJ4FACECAAAAHQAgIgAAqAgAIAIAAACmCAAgIgAApwgAIBGFAwAApQgAMIYDAACmCAAQhwMAAKUIADCIAwEAnQUAIYkDAQCdBQAhigMBAJ0FACGLAyAAnwUAIYwDIACfBQAhjQNAAMkFACGOA0AAoQUAIY8DQAChBQAhkAMBAJ0FACH-A0AAyQUAIf8DQADJBQAhgAQBAJ4FACGBBAEAngUAIYIEAQCeBQAhEYUDAAClCAAwhgMAAKYIABCHAwAApQgAMIgDAQCdBQAhiQMBAJ0FACGKAwEAnQUAIYsDIACfBQAhjAMgAJ8FACGNA0AAyQUAIY4DQAChBQAhjwNAAKEFACGQAwEAnQUAIf4DQADJBQAh_wNAAMkFACGABAEAngUAIYEEAQCeBQAhggQBAJ4FACENiAMBAPgFACGJAwEA-AUAIYoDAQD4BQAhiwMgAPoFACGMAyAA-gUAIY0DQAD7BQAhjgNAAPwFACGPA0AA_AUAIf4DQAD7BQAh_wNAAPsFACGABAEA-QUAIYEEAQD5BQAhggQBAPkFACEODAAAqQgAIIgDAQD4BQAhiQMBAPgFACGKAwEA-AUAIYsDIAD6BQAhjAMgAPoFACGNA0AA-wUAIY4DQAD8BQAhjwNAAPwFACH-A0AA-wUAIf8DQAD7BQAhgAQBAPkFACGBBAEA-QUAIYIEAQD5BQAhCykAAKoIADAqAACuCAAwiwQAAKsIADCMBAAArAgAMI0EAADuBwAwjgQAAO4HADCPBAAA7gcAMJAEAACtCAAgkQQAAO4HADCSBAAArwgAMJMEAADxBwAwCg4AALQIACCIAwEAAAABiwMgAAAAAYwDIAAAAAGNA0AAAAABjgNAAAAAAY8DQAAAAAGqAwEAAAABqwMBAAAAAf0DAQAAAAECAAAAIQAgKQAAswgAIAMAAAAhACApAACzCAAgKgAAsQgAIAEiAAC9CgAwAgAAACEAICIAALEIACACAAAA8gcAICIAALAIACAJiAMBAPgFACGLAyAA-gUAIYwDIAD6BQAhjQNAAPsFACGOA0AA_AUAIY8DQAD8BQAhqgMBAPgFACGrAwEA-AUAIf0DAQD5BQAhCg4AALIIACCIAwEA-AUAIYsDIAD6BQAhjAMgAPoFACGNA0AA-wUAIY4DQAD8BQAhjwNAAPwFACGqAwEA-AUAIasDAQD4BQAh_QMBAPkFACEHKQAAuAoAICoAALsKACCLBAAAuQoAIIwEAAC6CgAgjQQAACQAII4EAAAkACCPBAAANgAgCg4AALQIACCIAwEAAAABiwMgAAAAAYwDIAAAAAGNA0AAAAABjgNAAAAAAY8DQAAAAAGqAwEAAAABqwMBAAAAAf0DAQAAAAEDKQAAuAoAIIsEAAC5CgAgjwQAADYAIA4MAAC2CAAgiAMBAAAAAYkDAQAAAAGKAwEAAAABiwMgAAAAAYwDIAAAAAGNA0AAAAABjgNAAAAAAY8DQAAAAAH-A0AAAAAB_wNAAAAAAYAEAQAAAAGBBAEAAAABggQBAAAAAQQpAACqCAAwiwQAAKsIADCPBAAA7gcAMJAEAACtCAAgFgQAAMQIACCIAwEAAAABjgNAAAAAAY8DQAAAAAGcAwEAAAABnQMBAAAAAagDAAAAqAMCrgMAAACFBAKwA0AAAAABugMBAAAAAbsDAQAAAAHCAwEAAAABwwOAAAAAAcQDgAAAAAHHAwEAAAAB4gMBAAAAAeMDAQAAAAHlAwEAAAAB5gMBAAAAAecDQAAAAAGDBAEAAAABhQQBAAAAAQIAAAAZACApAADDCAAgAwAAABkAICkAAMMIACAqAADBCAAgASIAALcKADAbAwAAygUAIAQAAOAFACCFAwAA3QUAMIYDAAANABCHAwAA3QUAMIgDAQAAAAGOA0AAoQUAIY8DQAChBQAhkAMBAJ0FACGcAwEAnQUAIZ0DAQAAAAGoAwAA3gWoAyKuAwAA3wWFBCKwA0AAyQUAIboDAQCeBQAhuwMBAJ4FACHCAwEAngUAIcMDAACgBQAgxAMAAKAFACDHAwEAAAAB4gMBAJ4FACHjAwEAngUAIeUDAQCeBQAh5gMBAJ4FACHnA0AAyQUAIYMEAQAAAAGFBAEAngUAIQIAAAAZACAiAADBCAAgAgAAAL8IACAiAADACAAgGYUDAAC-CAAwhgMAAL8IABCHAwAAvggAMIgDAQCdBQAhjgNAAKEFACGPA0AAoQUAIZADAQCdBQAhnAMBAJ0FACGdAwEAnQUAIagDAADeBagDIq4DAADfBYUEIrADQADJBQAhugMBAJ4FACG7AwEAngUAIcIDAQCeBQAhwwMAAKAFACDEAwAAoAUAIMcDAQCdBQAh4gMBAJ4FACHjAwEAngUAIeUDAQCeBQAh5gMBAJ4FACHnA0AAyQUAIYMEAQCdBQAhhQQBAJ4FACEZhQMAAL4IADCGAwAAvwgAEIcDAAC-CAAwiAMBAJ0FACGOA0AAoQUAIY8DQAChBQAhkAMBAJ0FACGcAwEAnQUAIZ0DAQCdBQAhqAMAAN4FqAMirgMAAN8FhQQisANAAMkFACG6AwEAngUAIbsDAQCeBQAhwgMBAJ4FACHDAwAAoAUAIMQDAACgBQAgxwMBAJ0FACHiAwEAngUAIeMDAQCeBQAh5QMBAJ4FACHmAwEAngUAIecDQADJBQAhgwQBAJ0FACGFBAEAngUAIRWIAwEA-AUAIY4DQAD8BQAhjwNAAPwFACGcAwEA-AUAIZ0DAQD4BQAhqAMAAIQGqAMirgMAAI8GhQQisANAAPsFACG6AwEA-QUAIbsDAQD5BQAhwgMBAPkFACHDA4AAAAABxAOAAAAAAccDAQD4BQAh4gMBAPkFACHjAwEA-QUAIeUDAQD5BQAh5gMBAPkFACHnA0AA-wUAIYMEAQD4BQAhhQQBAPkFACEWBAAAwggAIIgDAQD4BQAhjgNAAPwFACGPA0AA_AUAIZwDAQD4BQAhnQMBAPgFACGoAwAAhAaoAyKuAwAAjwaFBCKwA0AA-wUAIboDAQD5BQAhuwMBAPkFACHCAwEA-QUAIcMDgAAAAAHEA4AAAAABxwMBAPgFACHiAwEA-QUAIeMDAQD5BQAh5QMBAPkFACHmAwEA-QUAIecDQAD7BQAhgwQBAPgFACGFBAEA-QUAIQUpAACyCgAgKgAAtQoAIIsEAACzCgAgjAQAALQKACCPBAAABQAgFgQAAMQIACCIAwEAAAABjgNAAAAAAY8DQAAAAAGcAwEAAAABnQMBAAAAAagDAAAAqAMCrgMAAACFBAKwA0AAAAABugMBAAAAAbsDAQAAAAHCAwEAAAABwwOAAAAAAcQDgAAAAAHHAwEAAAAB4gMBAAAAAeMDAQAAAAHlAwEAAAAB5gMBAAAAAecDQAAAAAGDBAEAAAABhQQBAAAAAQMpAACyCgAgiwQAALMKACCPBAAABQAgFQQAAM4GACCIAwEAAAABjgNAAAAAAY8DQAAAAAGcAwEAAAABnQMBAAAAAagDAAAAqAMCrgMAAADlAwOwA0AAAAABugMBAAAAAbsDAQAAAAHCAwEAAAABwwOAAAAAAccDAQAAAAHhAwEAAAAB4gMBAAAAAeMDAQAAAAHlAwEAAAAB5gMBAAAAAecDQAAAAAHoA4AAAAABAgAAABYAICkAANAIACADAAAAFgAgKQAA0AgAICoAAM8IACABIgAAsQoAMBoDAADKBQAgBAAA4AUAIIUDAADhBQAwhgMAAAsAEIcDAADhBQAwiAMBAAAAAY4DQAChBQAhjwNAAKEFACGQAwEAnQUAIZwDAQCdBQAhnQMBAAAAAagDAADeBagDIq4DAADiBeUDI7ADQADJBQAhugMBAJ4FACG7AwEAngUAIcIDAQCeBQAhwwMAAKAFACDHAwEAAAAB4QMBAAAAAeIDAQCeBQAh4wMBAJ4FACHlAwEAngUAIeYDAQCeBQAh5wNAAMkFACHoAwAAoAUAIAIAAAAWACAiAADPCAAgAgAAAM0IACAiAADOCAAgGIUDAADMCAAwhgMAAM0IABCHAwAAzAgAMIgDAQCdBQAhjgNAAKEFACGPA0AAoQUAIZADAQCdBQAhnAMBAJ0FACGdAwEAnQUAIagDAADeBagDIq4DAADiBeUDI7ADQADJBQAhugMBAJ4FACG7AwEAngUAIcIDAQCeBQAhwwMAAKAFACDHAwEAnQUAIeEDAQCdBQAh4gMBAJ4FACHjAwEAngUAIeUDAQCeBQAh5gMBAJ4FACHnA0AAyQUAIegDAACgBQAgGIUDAADMCAAwhgMAAM0IABCHAwAAzAgAMIgDAQCdBQAhjgNAAKEFACGPA0AAoQUAIZADAQCdBQAhnAMBAJ0FACGdAwEAnQUAIagDAADeBagDIq4DAADiBeUDI7ADQADJBQAhugMBAJ4FACG7AwEAngUAIcIDAQCeBQAhwwMAAKAFACDHAwEAnQUAIeEDAQCdBQAh4gMBAJ4FACHjAwEAngUAIeUDAQCeBQAh5gMBAJ4FACHnA0AAyQUAIegDAACgBQAgFIgDAQD4BQAhjgNAAPwFACGPA0AA_AUAIZwDAQD4BQAhnQMBAPgFACGoAwAAhAaoAyKuAwAAlwblAyOwA0AA-wUAIboDAQD5BQAhuwMBAPkFACHCAwEA-QUAIcMDgAAAAAHHAwEA-AUAIeEDAQD4BQAh4gMBAPkFACHjAwEA-QUAIeUDAQD5BQAh5gMBAPkFACHnA0AA-wUAIegDgAAAAAEVBAAAzQYAIIgDAQD4BQAhjgNAAPwFACGPA0AA_AUAIZwDAQD4BQAhnQMBAPgFACGoAwAAhAaoAyKuAwAAlwblAyOwA0AA-wUAIboDAQD5BQAhuwMBAPkFACHCAwEA-QUAIcMDgAAAAAHHAwEA-AUAIeEDAQD4BQAh4gMBAPkFACHjAwEA-QUAIeUDAQD5BQAh5gMBAPkFACHnA0AA-wUAIegDgAAAAAEVBAAAzgYAIIgDAQAAAAGOA0AAAAABjwNAAAAAAZwDAQAAAAGdAwEAAAABqAMAAACoAwKuAwAAAOUDA7ADQAAAAAG6AwEAAAABuwMBAAAAAcIDAQAAAAHDA4AAAAABxwMBAAAAAeEDAQAAAAHiAwEAAAAB4wMBAAAAAeUDAQAAAAHmAwEAAAAB5wNAAAAAAegDgAAAAAEhBAAAyQYAIIgDAQAAAAGOA0AAAAABnAMBAAAAAZ0DAQAAAAGmAwIAAAABqAMAAACoAwK6AwEAAAABuwMBAAAAAbwDQAAAAAG-AwAAAL4DA78DAQAAAAHAAwEAAAABwQMBAAAAAcIDAQAAAAHDAwEAAAABxAMBAAAAAccDAQAAAAHRAwEAAAAB0gNAAAAAAdMDAQAAAAHUAwEAAAAB1QMBAAAAAdYDAAAAtQMD2AMAAADYAwPZAwEAAAAB2gMBAAAAAdsDAQAAAAHcAwEAAAAB3QMBAAAAAd4DAQAAAAHfAwEAAAAB4ANAAAAAAQIAAAATACApAADcCAAgAwAAABMAICkAANwIACAqAADbCAAgASIAALAKADAmAwAAygUAIAQAAOAFACCFAwAA4wUAMIYDAAAHABCHAwAA4wUAMIgDAQAAAAGOA0AAoQUAIZADAQCdBQAhnAMBAJ0FACGdAwEAAAABpgMCAOQFACGoAwAA3gWoAyK6AwEAngUAIbsDAQCeBQAhvANAAMkFACG-AwAA5wW-AyO_AwEAngUAIcADAQCeBQAhwQMBAJ0FACHCAwEAngUAIcMDAQCeBQAhxAMBAJ4FACHHAwEAAAAB0QMBAAAAAdIDQADJBQAh0wMBAJ4FACHUAwEAngUAIdUDAQCeBQAh1gMAAOUFtQMj2AMAAOYF2AMj2QMBAJ4FACHaAwEAngUAIdsDAQCeBQAh3AMBAJ4FACHdAwEAngUAId4DAQCeBQAh3wMBAJ4FACHgA0AAoQUAIQIAAAATACAiAADbCAAgAgAAANkIACAiAADaCAAgJIUDAADYCAAwhgMAANkIABCHAwAA2AgAMIgDAQCdBQAhjgNAAKEFACGQAwEAnQUAIZwDAQCdBQAhnQMBAJ0FACGmAwIA5AUAIagDAADeBagDIroDAQCeBQAhuwMBAJ4FACG8A0AAyQUAIb4DAADnBb4DI78DAQCeBQAhwAMBAJ4FACHBAwEAnQUAIcIDAQCeBQAhwwMBAJ4FACHEAwEAngUAIccDAQCdBQAh0QMBAJ0FACHSA0AAyQUAIdMDAQCeBQAh1AMBAJ4FACHVAwEAngUAIdYDAADlBbUDI9gDAADmBdgDI9kDAQCeBQAh2gMBAJ4FACHbAwEAngUAIdwDAQCeBQAh3QMBAJ4FACHeAwEAngUAId8DAQCeBQAh4ANAAKEFACEkhQMAANgIADCGAwAA2QgAEIcDAADYCAAwiAMBAJ0FACGOA0AAoQUAIZADAQCdBQAhnAMBAJ0FACGdAwEAnQUAIaYDAgDkBQAhqAMAAN4FqAMiugMBAJ4FACG7AwEAngUAIbwDQADJBQAhvgMAAOcFvgMjvwMBAJ4FACHAAwEAngUAIcEDAQCdBQAhwgMBAJ4FACHDAwEAngUAIcQDAQCeBQAhxwMBAJ0FACHRAwEAnQUAIdIDQADJBQAh0wMBAJ4FACHUAwEAngUAIdUDAQCeBQAh1gMAAOUFtQMj2AMAAOYF2AMj2QMBAJ4FACHaAwEAngUAIdsDAQCeBQAh3AMBAJ4FACHdAwEAngUAId4DAQCeBQAh3wMBAJ4FACHgA0AAoQUAISCIAwEA-AUAIY4DQAD8BQAhnAMBAPgFACGdAwEA-AUAIaYDAgCkBgAhqAMAAIQGqAMiugMBAPkFACG7AwEA-QUAIbwDQAD7BQAhvgMAAKUGvgMjvwMBAPkFACHAAwEA-QUAIcEDAQD4BQAhwgMBAPkFACHDAwEA-QUAIcQDAQD5BQAhxwMBAPgFACHRAwEA-AUAIdIDQAD7BQAh0wMBAPkFACHUAwEA-QUAIdUDAQD5BQAh1gMAAK4GtQMj2AMAAK8G2AMj2QMBAPkFACHaAwEA-QUAIdsDAQD5BQAh3AMBAPkFACHdAwEA-QUAId4DAQD5BQAh3wMBAPkFACHgA0AA_AUAISEEAADIBgAgiAMBAPgFACGOA0AA_AUAIZwDAQD4BQAhnQMBAPgFACGmAwIApAYAIagDAACEBqgDIroDAQD5BQAhuwMBAPkFACG8A0AA-wUAIb4DAAClBr4DI78DAQD5BQAhwAMBAPkFACHBAwEA-AUAIcIDAQD5BQAhwwMBAPkFACHEAwEA-QUAIccDAQD4BQAh0QMBAPgFACHSA0AA-wUAIdMDAQD5BQAh1AMBAPkFACHVAwEA-QUAIdYDAACuBrUDI9gDAACvBtgDI9kDAQD5BQAh2gMBAPkFACHbAwEA-QUAIdwDAQD5BQAh3QMBAPkFACHeAwEA-QUAId8DAQD5BQAh4ANAAPwFACEhBAAAyQYAIIgDAQAAAAGOA0AAAAABnAMBAAAAAZ0DAQAAAAGmAwIAAAABqAMAAACoAwK6AwEAAAABuwMBAAAAAbwDQAAAAAG-AwAAAL4DA78DAQAAAAHAAwEAAAABwQMBAAAAAcIDAQAAAAHDAwEAAAABxAMBAAAAAccDAQAAAAHRAwEAAAAB0gNAAAAAAdMDAQAAAAHUAwEAAAAB1QMBAAAAAdYDAAAAtQMD2AMAAADYAwPZAwEAAAAB2gMBAAAAAdsDAQAAAAHcAwEAAAAB3QMBAAAAAd4DAQAAAAHfAwEAAAAB4ANAAAAAAR8EAADCBgAgiAMBAAAAAY4DQAAAAAGPA0AAAAABnAMBAAAAAZ0DAQAAAAGoAwAAAKgDAqwDAQAAAAGuAwAAAK4DA68DQAAAAAGwA0AAAAABsgMAAACyAwKzAxAAAAABtQMAAAC1AwK2AwAApwYAILcDAQAAAAG4AwEAAAABuQMCAAAAAboDAQAAAAG7AwEAAAABvANAAAAAAb4DAAAAvgMDvwMBAAAAAcADAQAAAAHBAwEAAAABwgMBAAAAAcMDgAAAAAHEA4AAAAABxQMBAAAAAcYDAQAAAAHHAwEAAAABAgAAABAAICkAAOgIACADAAAAEAAgKQAA6AgAICoAAOcIACABIgAArwoAMCQDAADKBQAgBAAA4AUAIIUDAADoBQAwhgMAAAkAEIcDAADoBQAwiAMBAAAAAY4DQAChBQAhjwNAAKEFACGQAwEAnQUAIZwDAQCdBQAhnQMBAAAAAagDAADeBagDIqwDAQAAAAGuAwAA6QWuAyOvA0AAoQUAIbADQADJBQAhsgMAAOoFsgMiswMQAOsFACG1AwAA7AW1AyK2AwAA_wQAILcDAQCeBQAhuAMBAJ4FACG5AwIA5AUAIboDAQCeBQAhuwMBAJ4FACG8A0AAyQUAIb4DAADnBb4DI78DAQCeBQAhwAMBAJ4FACHBAwEAngUAIcIDAQCeBQAhwwMAAKAFACDEAwAAoAUAIMUDAQCeBQAhxgMBAJ4FACHHAwEAAAABAgAAABAAICIAAOcIACACAAAA5QgAICIAAOYIACAihQMAAOQIADCGAwAA5QgAEIcDAADkCAAwiAMBAJ0FACGOA0AAoQUAIY8DQAChBQAhkAMBAJ0FACGcAwEAnQUAIZ0DAQCdBQAhqAMAAN4FqAMirAMBAJ0FACGuAwAA6QWuAyOvA0AAoQUAIbADQADJBQAhsgMAAOoFsgMiswMQAOsFACG1AwAA7AW1AyK2AwAA_wQAILcDAQCeBQAhuAMBAJ4FACG5AwIA5AUAIboDAQCeBQAhuwMBAJ4FACG8A0AAyQUAIb4DAADnBb4DI78DAQCeBQAhwAMBAJ4FACHBAwEAngUAIcIDAQCeBQAhwwMAAKAFACDEAwAAoAUAIMUDAQCeBQAhxgMBAJ4FACHHAwEAnQUAISKFAwAA5AgAMIYDAADlCAAQhwMAAOQIADCIAwEAnQUAIY4DQAChBQAhjwNAAKEFACGQAwEAnQUAIZwDAQCdBQAhnQMBAJ0FACGoAwAA3gWoAyKsAwEAnQUAIa4DAADpBa4DI68DQAChBQAhsANAAMkFACGyAwAA6gWyAyKzAxAA6wUAIbUDAADsBbUDIrYDAAD_BAAgtwMBAJ4FACG4AwEAngUAIbkDAgDkBQAhugMBAJ4FACG7AwEAngUAIbwDQADJBQAhvgMAAOcFvgMjvwMBAJ4FACHAAwEAngUAIcEDAQCeBQAhwgMBAJ4FACHDAwAAoAUAIMQDAACgBQAgxQMBAJ4FACHGAwEAngUAIccDAQCdBQAhHogDAQD4BQAhjgNAAPwFACGPA0AA_AUAIZwDAQD4BQAhnQMBAPgFACGoAwAAhAaoAyKsAwEA-AUAIa4DAACfBq4DI68DQAD8BQAhsANAAPsFACGyAwAAoAayAyKzAxAAoQYAIbUDAACiBrUDIrYDAACjBgAgtwMBAPkFACG4AwEA-QUAIbkDAgCkBgAhugMBAPkFACG7AwEA-QUAIbwDQAD7BQAhvgMAAKUGvgMjvwMBAPkFACHAAwEA-QUAIcEDAQD5BQAhwgMBAPkFACHDA4AAAAABxAOAAAAAAcUDAQD5BQAhxgMBAPkFACHHAwEA-AUAIR8EAADBBgAgiAMBAPgFACGOA0AA_AUAIY8DQAD8BQAhnAMBAPgFACGdAwEA-AUAIagDAACEBqgDIqwDAQD4BQAhrgMAAJ8GrgMjrwNAAPwFACGwA0AA-wUAIbIDAACgBrIDIrMDEAChBgAhtQMAAKIGtQMitgMAAKMGACC3AwEA-QUAIbgDAQD5BQAhuQMCAKQGACG6AwEA-QUAIbsDAQD5BQAhvANAAPsFACG-AwAApQa-AyO_AwEA-QUAIcADAQD5BQAhwQMBAPkFACHCAwEA-QUAIcMDgAAAAAHEA4AAAAABxQMBAPkFACHGAwEA-QUAIccDAQD4BQAhHwQAAMIGACCIAwEAAAABjgNAAAAAAY8DQAAAAAGcAwEAAAABnQMBAAAAAagDAAAAqAMCrAMBAAAAAa4DAAAArgMDrwNAAAAAAbADQAAAAAGyAwAAALIDArMDEAAAAAG1AwAAALUDArYDAACnBgAgtwMBAAAAAbgDAQAAAAG5AwIAAAABugMBAAAAAbsDAQAAAAG8A0AAAAABvgMAAAC-AwO_AwEAAAABwAMBAAAAAcEDAQAAAAHCAwEAAAABwwOAAAAAAcQDgAAAAAHFAwEAAAABxgMBAAAAAccDAQAAAAEUBQAAswYAIAYAALQGACAHAAC1BgAgCAAAtgYAIIgDAQAAAAGMAyAAAAABjQNAAAAAAY4DQAAAAAGPA0AAAAABnAMBAAAAAZ0DAQAAAAGeAwEAAAABnwMBAAAAAaADAQAAAAGhAwEAAAABowMAAACjAwKkAyAAAAABpgMAAACmAwKoAwAAAKgDAqkDIAAAAAECAAAABQAgKQAA9AgAIAMAAAAFACApAAD0CAAgKgAA8wgAIAEiAACuCgAwGQMAAMoFACAFAADwBQAgBgAA8QUAIAcAAPIFACAIAADzBQAghQMAAO0FADCGAwAAAwAQhwMAAO0FADCIAwEAAAABjAMgAJ8FACGNA0AAyQUAIY4DQAChBQAhjwNAAKEFACGQAwEAnQUAIZwDAQCdBQAhnQMBAAAAAZ4DAQCdBQAhnwMBAJ4FACGgAwEAngUAIaEDAQCeBQAhowMAAO4FowMipAMgAJ8FACGmAwAA7wWmAyKoAwAA3gWoAyKpAyAAnwUAIQIAAAAFACAiAADzCAAgAgAAAPEIACAiAADyCAAgFIUDAADwCAAwhgMAAPEIABCHAwAA8AgAMIgDAQCdBQAhjAMgAJ8FACGNA0AAyQUAIY4DQAChBQAhjwNAAKEFACGQAwEAnQUAIZwDAQCdBQAhnQMBAJ0FACGeAwEAnQUAIZ8DAQCeBQAhoAMBAJ4FACGhAwEAngUAIaMDAADuBaMDIqQDIACfBQAhpgMAAO8FpgMiqAMAAN4FqAMiqQMgAJ8FACEUhQMAAPAIADCGAwAA8QgAEIcDAADwCAAwiAMBAJ0FACGMAyAAnwUAIY0DQADJBQAhjgNAAKEFACGPA0AAoQUAIZADAQCdBQAhnAMBAJ0FACGdAwEAnQUAIZ4DAQCdBQAhnwMBAJ4FACGgAwEAngUAIaEDAQCeBQAhowMAAO4FowMipAMgAJ8FACGmAwAA7wWmAyKoAwAA3gWoAyKpAyAAnwUAIRCIAwEA-AUAIYwDIAD6BQAhjQNAAPsFACGOA0AA_AUAIY8DQAD8BQAhnAMBAPgFACGdAwEA-AUAIZ4DAQD4BQAhnwMBAPkFACGgAwEA-QUAIaEDAQD5BQAhowMAAIIGowMipAMgAPoFACGmAwAAgwamAyKoAwAAhAaoAyKpAyAA-gUAIRQFAACGBgAgBgAAhwYAIAcAAIgGACAIAACJBgAgiAMBAPgFACGMAyAA-gUAIY0DQAD7BQAhjgNAAPwFACGPA0AA_AUAIZwDAQD4BQAhnQMBAPgFACGeAwEA-AUAIZ8DAQD5BQAhoAMBAPkFACGhAwEA-QUAIaMDAACCBqMDIqQDIAD6BQAhpgMAAIMGpgMiqAMAAIQGqAMiqQMgAPoFACEUBQAAswYAIAYAALQGACAHAAC1BgAgCAAAtgYAIIgDAQAAAAGMAyAAAAABjQNAAAAAAY4DQAAAAAGPA0AAAAABnAMBAAAAAZ0DAQAAAAGeAwEAAAABnwMBAAAAAaADAQAAAAGhAwEAAAABowMAAACjAwKkAyAAAAABpgMAAACmAwKoAwAAAKgDAqkDIAAAAAEEKQAA6QgAMIsEAADqCAAwjwQAAO0IADCQBAAA7AgAIAQpAADdCAAwiwQAAN4IADCPBAAA4QgAMJAEAADgCAAgBCkAANEIADCLBAAA0ggAMI8EAADVCAAwkAQAANQIACAEKQAAxQgAMIsEAADGCAAwjwQAAMkIADCQBAAAyAgAIAQpAAC3CAAwiwQAALgIADCPBAAAuwgAMJAEAAC6CAAgBCkAAJ4IADCLBAAAnwgAMI8EAACiCAAwkAQAAKEIACAEKQAAkggAMIsEAACTCAAwjwQAAJYIADCQBAAAlQgAIAQpAACGCAAwiwQAAIcIADCPBAAAiggAMJAEAACJCAAgBCkAAPoHADCLBAAA-wcAMI8EAAD-BwAwkAQAAP0HACAEKQAA3gcAMIsEAADfBwAwjwQAAOIHADCQBAAA4QcAIAQpAADSBwAwiwQAANMHADCPBAAA1gcAMJAEAADVBwAgBCkAAMYHADCLBAAAxwcAMI8EAADKBwAwkAQAAMkHACAEKQAAugcAMIsEAAC7BwAwjwQAAL4HADCQBAAAvQcAIAQpAACuBwAwiwQAAK8HADCPBAAAsgcAMJAEAACxBwAgBCkAAKIHADCLBAAAowcAMI8EAACmBwAwkAQAAKUHACAEKQAAlgcAMIsEAACXBwAwjwQAAJoHADCQBAAAmQcAIAQpAACKBwAwiwQAAIsHADCPBAAAjgcAMJAEAACNBwAgBCkAAP4GADCLBAAA_wYAMI8EAACCBwAwkAQAAIEHACAEKQAA8gYAMIsEAADzBgAwjwQAAPYGADCQBAAA9QYAIAQpAADmBgAwiwQAAOcGADCPBAAA6gYAMJAEAADpBgAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFKQAAqQoAICoAAKwKACCLBAAAqgoAIIwEAACrCgAgjwQAAMADACADKQAAqQoAIIsEAACqCgAgjwQAAMADACAAAAAFKQAApAoAICoAAKcKACCLBAAApQoAIIwEAACmCgAgjwQAAMADACADKQAApAoAIIsEAAClCgAgjwQAAMADACAAAAAFKQAAnwoAICoAAKIKACCLBAAAoAoAIIwEAAChCgAgjwQAAMADACADKQAAnwoAIIsEAACgCgAgjwQAAMADACAAAAAFKQAAmgoAICoAAJ0KACCLBAAAmwoAIIwEAACcCgAgjwQAAMADACADKQAAmgoAIIsEAACbCgAgjwQAAMADACAAAAAFKQAAlQoAICoAAJgKACCLBAAAlgoAIIwEAACXCgAgjwQAAMADACADKQAAlQoAIIsEAACWCgAgjwQAAMADACAAAAAFKQAAkAoAICoAAJMKACCLBAAAkQoAIIwEAACSCgAgjwQAAMADACADKQAAkAoAIIsEAACRCgAgjwQAAMADACAAAAAAAAAFKQAAiwoAICoAAI4KACCLBAAAjAoAIIwEAACNCgAgjwQAAMADACADKQAAiwoAIIsEAACMCgAgjwQAAMADACAAAAAAAAAFKQAAhgoAICoAAIkKACCLBAAAhwoAIIwEAACICgAgjwQAAMADACADKQAAhgoAIIsEAACHCgAgjwQAAMADACAAAAAFKQAAgQoAICoAAIQKACCLBAAAggoAIIwEAACDCgAgjwQAAMADACADKQAAgQoAIIsEAACCCgAgjwQAAMADACAAAAAFKQAA_AkAICoAAP8JACCLBAAA_QkAIIwEAAD-CQAgjwQAAMADACADKQAA_AkAIIsEAAD9CQAgjwQAAMADACAAAAAFKQAA9wkAICoAAPoJACCLBAAA-AkAIIwEAAD5CQAgjwQAAMADACADKQAA9wkAIIsEAAD4CQAgjwQAAMADACAAAAAFKQAA8gkAICoAAPUJACCLBAAA8wkAIIwEAAD0CQAgjwQAAMADACADKQAA8gkAIIsEAADzCQAgjwQAAMADACAAAAAFKQAA7QkAICoAAPAJACCLBAAA7gkAIIwEAADvCQAgjwQAAMADACADKQAA7QkAIIsEAADuCQAgjwQAAMADACAhBAAAiQkAIAUAAIsJACAGAACKCQAgCQAAjAkAIAoAAI0JACAOAACSCQAgDwAAjgkAIBAAAI8JACARAACQCQAgEgAAkQkAIBMAAJMJACAUAACUCQAgFQAAlQkAIBYAAJYJACAXAACXCQAgGAAAmAkAIBkAAJkJACAaAACaCQAgGwAAmwkAIBwAAJwJACDpAwAA9AUAIOoDAAD0BQAg6wMAAPQFACDsAwAA9AUAIO0DAAD0BQAg7gMAAPQFACDvAwAA9AUAIPADAAD0BQAg8QMAAPQFACDyAwAA9AUAIPMDAAD0BQAg9AMAAPQFACD1AwAA9AUAIAAIAwAA5AkAIAwAAOUJACCNAwAA9AUAIP4DAAD0BQAg_wMAAPQFACCABAAA9AUAIIEEAAD0BQAgggQAAPQFACAFAwAA5AkAIAwAAOUJACCNAwAA9AUAIIcEAAD0BQAgiAQAAPQFACAJAwAA5AkAIAUAAOkJACAGAADqCQAgBwAA6wkAIAgAAOwJACCNAwAA9AUAIJ8DAAD0BQAgoAMAAPQFACChAwAA9AUAIBkDAADkCQAgBAAA6AkAIKYDAAD0BQAgugMAAPQFACC7AwAA9AUAILwDAAD0BQAgvgMAAPQFACC_AwAA9AUAIMADAAD0BQAgwgMAAPQFACDDAwAA9AUAIMQDAAD0BQAg0gMAAPQFACDTAwAA9AUAINQDAAD0BQAg1QMAAPQFACDWAwAA9AUAINgDAAD0BQAg2QMAAPQFACDaAwAA9AUAINsDAAD0BQAg3AMAAPQFACDdAwAA9AUAIN4DAAD0BQAg3wMAAPQFACAUAwAA5AkAIAQAAOgJACCuAwAA9AUAILADAAD0BQAgswMAAPQFACC3AwAA9AUAILgDAAD0BQAguQMAAPQFACC6AwAA9AUAILsDAAD0BQAgvAMAAPQFACC-AwAA9AUAIL8DAAD0BQAgwAMAAPQFACDBAwAA9AUAIMIDAAD0BQAgwwMAAPQFACDEAwAA9AUAIMUDAAD0BQAgxgMAAPQFACAOAwAA5AkAIAQAAOgJACCuAwAA9AUAILADAAD0BQAgugMAAPQFACC7AwAA9AUAIMIDAAD0BQAgwwMAAPQFACDiAwAA9AUAIOMDAAD0BQAg5QMAAPQFACDmAwAA9AUAIOcDAAD0BQAg6AMAAPQFACAOAwAA5AkAIAQAAOgJACCwAwAA9AUAILoDAAD0BQAguwMAAPQFACDCAwAA9AUAIMMDAAD0BQAgxAMAAPQFACDiAwAA9AUAIOMDAAD0BQAg5QMAAPQFACDmAwAA9AUAIOcDAAD0BQAghQQAAPQFACAlBAAA9QgAIAUAAPcIACAGAAD2CAAgCQAA-AgAIAoAAPkIACAOAAD-CAAgDwAA-ggAIBAAAPsIACARAAD8CAAgEgAA_QgAIBMAAP8IACAUAACACQAgFgAAggkAIBcAAIMJACAYAACECQAgGQAAhQkAIBoAAIYJACAbAACHCQAgHAAAiAkAIIgDAQAAAAGLAyAAAAABjgNAAAAAAY8DQAAAAAGdAwEAAAAB6QMBAAAAAeoDAQAAAAHrAwEAAAAB7AMBAAAAAe0DAQAAAAHuAwEAAAAB7wMBAAAAAfADAQAAAAHxAwEAAAAB8gMBAAAAAfMDAQAAAAH0A4AAAAAB9QOAAAAAAQIAAADAAwAgKQAA7QkAIAMAAADDAwAgKQAA7QkAICoAAPEJACAnAAAAwwMAIAQAANIGACAFAADUBgAgBgAA0wYAIAkAANUGACAKAADWBgAgDgAA2wYAIA8AANcGACAQAADYBgAgEQAA2QYAIBIAANoGACATAADcBgAgFAAA3QYAIBYAAN8GACAXAADgBgAgGAAA4QYAIBkAAOIGACAaAADjBgAgGwAA5AYAIBwAAOUGACAiAADxCQAgiAMBAPgFACGLAyAA-gUAIY4DQAD8BQAhjwNAAPwFACGdAwEA-AUAIekDAQD5BQAh6gMBAPkFACHrAwEA-QUAIewDAQD5BQAh7QMBAPkFACHuAwEA-QUAIe8DAQD5BQAh8AMBAPkFACHxAwEA-QUAIfIDAQD5BQAh8wMBAPkFACH0A4AAAAAB9QOAAAAAASUEAADSBgAgBQAA1AYAIAYAANMGACAJAADVBgAgCgAA1gYAIA4AANsGACAPAADXBgAgEAAA2AYAIBEAANkGACASAADaBgAgEwAA3AYAIBQAAN0GACAWAADfBgAgFwAA4AYAIBgAAOEGACAZAADiBgAgGgAA4wYAIBsAAOQGACAcAADlBgAgiAMBAPgFACGLAyAA-gUAIY4DQAD8BQAhjwNAAPwFACGdAwEA-AUAIekDAQD5BQAh6gMBAPkFACHrAwEA-QUAIewDAQD5BQAh7QMBAPkFACHuAwEA-QUAIe8DAQD5BQAh8AMBAPkFACHxAwEA-QUAIfIDAQD5BQAh8wMBAPkFACH0A4AAAAAB9QOAAAAAASUEAAD1CAAgBQAA9wgAIAYAAPYIACAJAAD4CAAgCgAA-QgAIA8AAPoIACAQAAD7CAAgEQAA_AgAIBIAAP0IACATAAD_CAAgFAAAgAkAIBUAAIEJACAWAACCCQAgFwAAgwkAIBgAAIQJACAZAACFCQAgGgAAhgkAIBsAAIcJACAcAACICQAgiAMBAAAAAYsDIAAAAAGOA0AAAAABjwNAAAAAAZ0DAQAAAAHpAwEAAAAB6gMBAAAAAesDAQAAAAHsAwEAAAAB7QMBAAAAAe4DAQAAAAHvAwEAAAAB8AMBAAAAAfEDAQAAAAHyAwEAAAAB8wMBAAAAAfQDgAAAAAH1A4AAAAABAgAAAMADACApAADyCQAgAwAAAMMDACApAADyCQAgKgAA9gkAICcAAADDAwAgBAAA0gYAIAUAANQGACAGAADTBgAgCQAA1QYAIAoAANYGACAPAADXBgAgEAAA2AYAIBEAANkGACASAADaBgAgEwAA3AYAIBQAAN0GACAVAADeBgAgFgAA3wYAIBcAAOAGACAYAADhBgAgGQAA4gYAIBoAAOMGACAbAADkBgAgHAAA5QYAICIAAPYJACCIAwEA-AUAIYsDIAD6BQAhjgNAAPwFACGPA0AA_AUAIZ0DAQD4BQAh6QMBAPkFACHqAwEA-QUAIesDAQD5BQAh7AMBAPkFACHtAwEA-QUAIe4DAQD5BQAh7wMBAPkFACHwAwEA-QUAIfEDAQD5BQAh8gMBAPkFACHzAwEA-QUAIfQDgAAAAAH1A4AAAAABJQQAANIGACAFAADUBgAgBgAA0wYAIAkAANUGACAKAADWBgAgDwAA1wYAIBAAANgGACARAADZBgAgEgAA2gYAIBMAANwGACAUAADdBgAgFQAA3gYAIBYAAN8GACAXAADgBgAgGAAA4QYAIBkAAOIGACAaAADjBgAgGwAA5AYAIBwAAOUGACCIAwEA-AUAIYsDIAD6BQAhjgNAAPwFACGPA0AA_AUAIZ0DAQD4BQAh6QMBAPkFACHqAwEA-QUAIesDAQD5BQAh7AMBAPkFACHtAwEA-QUAIe4DAQD5BQAh7wMBAPkFACHwAwEA-QUAIfEDAQD5BQAh8gMBAPkFACHzAwEA-QUAIfQDgAAAAAH1A4AAAAABJQQAAPUIACAFAAD3CAAgBgAA9ggAIAkAAPgIACAKAAD5CAAgDgAA_ggAIA8AAPoIACAQAAD7CAAgEQAA_AgAIBIAAP0IACATAAD_CAAgFAAAgAkAIBUAAIEJACAWAACCCQAgFwAAgwkAIBgAAIQJACAZAACFCQAgGwAAhwkAIBwAAIgJACCIAwEAAAABiwMgAAAAAY4DQAAAAAGPA0AAAAABnQMBAAAAAekDAQAAAAHqAwEAAAAB6wMBAAAAAewDAQAAAAHtAwEAAAAB7gMBAAAAAe8DAQAAAAHwAwEAAAAB8QMBAAAAAfIDAQAAAAHzAwEAAAAB9AOAAAAAAfUDgAAAAAECAAAAwAMAICkAAPcJACADAAAAwwMAICkAAPcJACAqAAD7CQAgJwAAAMMDACAEAADSBgAgBQAA1AYAIAYAANMGACAJAADVBgAgCgAA1gYAIA4AANsGACAPAADXBgAgEAAA2AYAIBEAANkGACASAADaBgAgEwAA3AYAIBQAAN0GACAVAADeBgAgFgAA3wYAIBcAAOAGACAYAADhBgAgGQAA4gYAIBsAAOQGACAcAADlBgAgIgAA-wkAIIgDAQD4BQAhiwMgAPoFACGOA0AA_AUAIY8DQAD8BQAhnQMBAPgFACHpAwEA-QUAIeoDAQD5BQAh6wMBAPkFACHsAwEA-QUAIe0DAQD5BQAh7gMBAPkFACHvAwEA-QUAIfADAQD5BQAh8QMBAPkFACHyAwEA-QUAIfMDAQD5BQAh9AOAAAAAAfUDgAAAAAElBAAA0gYAIAUAANQGACAGAADTBgAgCQAA1QYAIAoAANYGACAOAADbBgAgDwAA1wYAIBAAANgGACARAADZBgAgEgAA2gYAIBMAANwGACAUAADdBgAgFQAA3gYAIBYAAN8GACAXAADgBgAgGAAA4QYAIBkAAOIGACAbAADkBgAgHAAA5QYAIIgDAQD4BQAhiwMgAPoFACGOA0AA_AUAIY8DQAD8BQAhnQMBAPgFACHpAwEA-QUAIeoDAQD5BQAh6wMBAPkFACHsAwEA-QUAIe0DAQD5BQAh7gMBAPkFACHvAwEA-QUAIfADAQD5BQAh8QMBAPkFACHyAwEA-QUAIfMDAQD5BQAh9AOAAAAAAfUDgAAAAAElBAAA9QgAIAUAAPcIACAGAAD2CAAgCQAA-AgAIAoAAPkIACAOAAD-CAAgDwAA-ggAIBAAAPsIACARAAD8CAAgEgAA_QgAIBMAAP8IACAUAACACQAgFQAAgQkAIBYAAIIJACAXAACDCQAgGQAAhQkAIBoAAIYJACAbAACHCQAgHAAAiAkAIIgDAQAAAAGLAyAAAAABjgNAAAAAAY8DQAAAAAGdAwEAAAAB6QMBAAAAAeoDAQAAAAHrAwEAAAAB7AMBAAAAAe0DAQAAAAHuAwEAAAAB7wMBAAAAAfADAQAAAAHxAwEAAAAB8gMBAAAAAfMDAQAAAAH0A4AAAAAB9QOAAAAAAQIAAADAAwAgKQAA_AkAIAMAAADDAwAgKQAA_AkAICoAAIAKACAnAAAAwwMAIAQAANIGACAFAADUBgAgBgAA0wYAIAkAANUGACAKAADWBgAgDgAA2wYAIA8AANcGACAQAADYBgAgEQAA2QYAIBIAANoGACATAADcBgAgFAAA3QYAIBUAAN4GACAWAADfBgAgFwAA4AYAIBkAAOIGACAaAADjBgAgGwAA5AYAIBwAAOUGACAiAACACgAgiAMBAPgFACGLAyAA-gUAIY4DQAD8BQAhjwNAAPwFACGdAwEA-AUAIekDAQD5BQAh6gMBAPkFACHrAwEA-QUAIewDAQD5BQAh7QMBAPkFACHuAwEA-QUAIe8DAQD5BQAh8AMBAPkFACHxAwEA-QUAIfIDAQD5BQAh8wMBAPkFACH0A4AAAAAB9QOAAAAAASUEAADSBgAgBQAA1AYAIAYAANMGACAJAADVBgAgCgAA1gYAIA4AANsGACAPAADXBgAgEAAA2AYAIBEAANkGACASAADaBgAgEwAA3AYAIBQAAN0GACAVAADeBgAgFgAA3wYAIBcAAOAGACAZAADiBgAgGgAA4wYAIBsAAOQGACAcAADlBgAgiAMBAPgFACGLAyAA-gUAIY4DQAD8BQAhjwNAAPwFACGdAwEA-AUAIekDAQD5BQAh6gMBAPkFACHrAwEA-QUAIewDAQD5BQAh7QMBAPkFACHuAwEA-QUAIe8DAQD5BQAh8AMBAPkFACHxAwEA-QUAIfIDAQD5BQAh8wMBAPkFACH0A4AAAAAB9QOAAAAAASUEAAD1CAAgBQAA9wgAIAYAAPYIACAJAAD4CAAgCgAA-QgAIA4AAP4IACAPAAD6CAAgEAAA-wgAIBEAAPwIACASAAD9CAAgEwAA_wgAIBQAAIAJACAVAACBCQAgFgAAggkAIBgAAIQJACAZAACFCQAgGgAAhgkAIBsAAIcJACAcAACICQAgiAMBAAAAAYsDIAAAAAGOA0AAAAABjwNAAAAAAZ0DAQAAAAHpAwEAAAAB6gMBAAAAAesDAQAAAAHsAwEAAAAB7QMBAAAAAe4DAQAAAAHvAwEAAAAB8AMBAAAAAfEDAQAAAAHyAwEAAAAB8wMBAAAAAfQDgAAAAAH1A4AAAAABAgAAAMADACApAACBCgAgAwAAAMMDACApAACBCgAgKgAAhQoAICcAAADDAwAgBAAA0gYAIAUAANQGACAGAADTBgAgCQAA1QYAIAoAANYGACAOAADbBgAgDwAA1wYAIBAAANgGACARAADZBgAgEgAA2gYAIBMAANwGACAUAADdBgAgFQAA3gYAIBYAAN8GACAYAADhBgAgGQAA4gYAIBoAAOMGACAbAADkBgAgHAAA5QYAICIAAIUKACCIAwEA-AUAIYsDIAD6BQAhjgNAAPwFACGPA0AA_AUAIZ0DAQD4BQAh6QMBAPkFACHqAwEA-QUAIesDAQD5BQAh7AMBAPkFACHtAwEA-QUAIe4DAQD5BQAh7wMBAPkFACHwAwEA-QUAIfEDAQD5BQAh8gMBAPkFACHzAwEA-QUAIfQDgAAAAAH1A4AAAAABJQQAANIGACAFAADUBgAgBgAA0wYAIAkAANUGACAKAADWBgAgDgAA2wYAIA8AANcGACAQAADYBgAgEQAA2QYAIBIAANoGACATAADcBgAgFAAA3QYAIBUAAN4GACAWAADfBgAgGAAA4QYAIBkAAOIGACAaAADjBgAgGwAA5AYAIBwAAOUGACCIAwEA-AUAIYsDIAD6BQAhjgNAAPwFACGPA0AA_AUAIZ0DAQD4BQAh6QMBAPkFACHqAwEA-QUAIesDAQD5BQAh7AMBAPkFACHtAwEA-QUAIe4DAQD5BQAh7wMBAPkFACHwAwEA-QUAIfEDAQD5BQAh8gMBAPkFACHzAwEA-QUAIfQDgAAAAAH1A4AAAAABJQQAAPUIACAFAAD3CAAgBgAA9ggAIAkAAPgIACAKAAD5CAAgDgAA_ggAIA8AAPoIACAQAAD7CAAgEQAA_AgAIBMAAP8IACAUAACACQAgFQAAgQkAIBYAAIIJACAXAACDCQAgGAAAhAkAIBkAAIUJACAaAACGCQAgGwAAhwkAIBwAAIgJACCIAwEAAAABiwMgAAAAAY4DQAAAAAGPA0AAAAABnQMBAAAAAekDAQAAAAHqAwEAAAAB6wMBAAAAAewDAQAAAAHtAwEAAAAB7gMBAAAAAe8DAQAAAAHwAwEAAAAB8QMBAAAAAfIDAQAAAAHzAwEAAAAB9AOAAAAAAfUDgAAAAAECAAAAwAMAICkAAIYKACADAAAAwwMAICkAAIYKACAqAACKCgAgJwAAAMMDACAEAADSBgAgBQAA1AYAIAYAANMGACAJAADVBgAgCgAA1gYAIA4AANsGACAPAADXBgAgEAAA2AYAIBEAANkGACATAADcBgAgFAAA3QYAIBUAAN4GACAWAADfBgAgFwAA4AYAIBgAAOEGACAZAADiBgAgGgAA4wYAIBsAAOQGACAcAADlBgAgIgAAigoAIIgDAQD4BQAhiwMgAPoFACGOA0AA_AUAIY8DQAD8BQAhnQMBAPgFACHpAwEA-QUAIeoDAQD5BQAh6wMBAPkFACHsAwEA-QUAIe0DAQD5BQAh7gMBAPkFACHvAwEA-QUAIfADAQD5BQAh8QMBAPkFACHyAwEA-QUAIfMDAQD5BQAh9AOAAAAAAfUDgAAAAAElBAAA0gYAIAUAANQGACAGAADTBgAgCQAA1QYAIAoAANYGACAOAADbBgAgDwAA1wYAIBAAANgGACARAADZBgAgEwAA3AYAIBQAAN0GACAVAADeBgAgFgAA3wYAIBcAAOAGACAYAADhBgAgGQAA4gYAIBoAAOMGACAbAADkBgAgHAAA5QYAIIgDAQD4BQAhiwMgAPoFACGOA0AA_AUAIY8DQAD8BQAhnQMBAPgFACHpAwEA-QUAIeoDAQD5BQAh6wMBAPkFACHsAwEA-QUAIe0DAQD5BQAh7gMBAPkFACHvAwEA-QUAIfADAQD5BQAh8QMBAPkFACHyAwEA-QUAIfMDAQD5BQAh9AOAAAAAAfUDgAAAAAElBAAA9QgAIAUAAPcIACAGAAD2CAAgCQAA-AgAIAoAAPkIACAOAAD-CAAgEAAA-wgAIBEAAPwIACASAAD9CAAgEwAA_wgAIBQAAIAJACAVAACBCQAgFgAAggkAIBcAAIMJACAYAACECQAgGQAAhQkAIBoAAIYJACAbAACHCQAgHAAAiAkAIIgDAQAAAAGLAyAAAAABjgNAAAAAAY8DQAAAAAGdAwEAAAAB6QMBAAAAAeoDAQAAAAHrAwEAAAAB7AMBAAAAAe0DAQAAAAHuAwEAAAAB7wMBAAAAAfADAQAAAAHxAwEAAAAB8gMBAAAAAfMDAQAAAAH0A4AAAAAB9QOAAAAAAQIAAADAAwAgKQAAiwoAIAMAAADDAwAgKQAAiwoAICoAAI8KACAnAAAAwwMAIAQAANIGACAFAADUBgAgBgAA0wYAIAkAANUGACAKAADWBgAgDgAA2wYAIBAAANgGACARAADZBgAgEgAA2gYAIBMAANwGACAUAADdBgAgFQAA3gYAIBYAAN8GACAXAADgBgAgGAAA4QYAIBkAAOIGACAaAADjBgAgGwAA5AYAIBwAAOUGACAiAACPCgAgiAMBAPgFACGLAyAA-gUAIY4DQAD8BQAhjwNAAPwFACGdAwEA-AUAIekDAQD5BQAh6gMBAPkFACHrAwEA-QUAIewDAQD5BQAh7QMBAPkFACHuAwEA-QUAIe8DAQD5BQAh8AMBAPkFACHxAwEA-QUAIfIDAQD5BQAh8wMBAPkFACH0A4AAAAAB9QOAAAAAASUEAADSBgAgBQAA1AYAIAYAANMGACAJAADVBgAgCgAA1gYAIA4AANsGACAQAADYBgAgEQAA2QYAIBIAANoGACATAADcBgAgFAAA3QYAIBUAAN4GACAWAADfBgAgFwAA4AYAIBgAAOEGACAZAADiBgAgGgAA4wYAIBsAAOQGACAcAADlBgAgiAMBAPgFACGLAyAA-gUAIY4DQAD8BQAhjwNAAPwFACGdAwEA-AUAIekDAQD5BQAh6gMBAPkFACHrAwEA-QUAIewDAQD5BQAh7QMBAPkFACHuAwEA-QUAIe8DAQD5BQAh8AMBAPkFACHxAwEA-QUAIfIDAQD5BQAh8wMBAPkFACH0A4AAAAAB9QOAAAAAASUEAAD1CAAgBQAA9wgAIAYAAPYIACAJAAD4CAAgCgAA-QgAIA4AAP4IACAPAAD6CAAgEAAA-wgAIBEAAPwIACASAAD9CAAgFAAAgAkAIBUAAIEJACAWAACCCQAgFwAAgwkAIBgAAIQJACAZAACFCQAgGgAAhgkAIBsAAIcJACAcAACICQAgiAMBAAAAAYsDIAAAAAGOA0AAAAABjwNAAAAAAZ0DAQAAAAHpAwEAAAAB6gMBAAAAAesDAQAAAAHsAwEAAAAB7QMBAAAAAe4DAQAAAAHvAwEAAAAB8AMBAAAAAfEDAQAAAAHyAwEAAAAB8wMBAAAAAfQDgAAAAAH1A4AAAAABAgAAAMADACApAACQCgAgAwAAAMMDACApAACQCgAgKgAAlAoAICcAAADDAwAgBAAA0gYAIAUAANQGACAGAADTBgAgCQAA1QYAIAoAANYGACAOAADbBgAgDwAA1wYAIBAAANgGACARAADZBgAgEgAA2gYAIBQAAN0GACAVAADeBgAgFgAA3wYAIBcAAOAGACAYAADhBgAgGQAA4gYAIBoAAOMGACAbAADkBgAgHAAA5QYAICIAAJQKACCIAwEA-AUAIYsDIAD6BQAhjgNAAPwFACGPA0AA_AUAIZ0DAQD4BQAh6QMBAPkFACHqAwEA-QUAIesDAQD5BQAh7AMBAPkFACHtAwEA-QUAIe4DAQD5BQAh7wMBAPkFACHwAwEA-QUAIfEDAQD5BQAh8gMBAPkFACHzAwEA-QUAIfQDgAAAAAH1A4AAAAABJQQAANIGACAFAADUBgAgBgAA0wYAIAkAANUGACAKAADWBgAgDgAA2wYAIA8AANcGACAQAADYBgAgEQAA2QYAIBIAANoGACAUAADdBgAgFQAA3gYAIBYAAN8GACAXAADgBgAgGAAA4QYAIBkAAOIGACAaAADjBgAgGwAA5AYAIBwAAOUGACCIAwEA-AUAIYsDIAD6BQAhjgNAAPwFACGPA0AA_AUAIZ0DAQD4BQAh6QMBAPkFACHqAwEA-QUAIesDAQD5BQAh7AMBAPkFACHtAwEA-QUAIe4DAQD5BQAh7wMBAPkFACHwAwEA-QUAIfEDAQD5BQAh8gMBAPkFACHzAwEA-QUAIfQDgAAAAAH1A4AAAAABJQQAAPUIACAFAAD3CAAgBgAA9ggAIAkAAPgIACAKAAD5CAAgDgAA_ggAIA8AAPoIACAQAAD7CAAgEgAA_QgAIBMAAP8IACAUAACACQAgFQAAgQkAIBYAAIIJACAXAACDCQAgGAAAhAkAIBkAAIUJACAaAACGCQAgGwAAhwkAIBwAAIgJACCIAwEAAAABiwMgAAAAAY4DQAAAAAGPA0AAAAABnQMBAAAAAekDAQAAAAHqAwEAAAAB6wMBAAAAAewDAQAAAAHtAwEAAAAB7gMBAAAAAe8DAQAAAAHwAwEAAAAB8QMBAAAAAfIDAQAAAAHzAwEAAAAB9AOAAAAAAfUDgAAAAAECAAAAwAMAICkAAJUKACADAAAAwwMAICkAAJUKACAqAACZCgAgJwAAAMMDACAEAADSBgAgBQAA1AYAIAYAANMGACAJAADVBgAgCgAA1gYAIA4AANsGACAPAADXBgAgEAAA2AYAIBIAANoGACATAADcBgAgFAAA3QYAIBUAAN4GACAWAADfBgAgFwAA4AYAIBgAAOEGACAZAADiBgAgGgAA4wYAIBsAAOQGACAcAADlBgAgIgAAmQoAIIgDAQD4BQAhiwMgAPoFACGOA0AA_AUAIY8DQAD8BQAhnQMBAPgFACHpAwEA-QUAIeoDAQD5BQAh6wMBAPkFACHsAwEA-QUAIe0DAQD5BQAh7gMBAPkFACHvAwEA-QUAIfADAQD5BQAh8QMBAPkFACHyAwEA-QUAIfMDAQD5BQAh9AOAAAAAAfUDgAAAAAElBAAA0gYAIAUAANQGACAGAADTBgAgCQAA1QYAIAoAANYGACAOAADbBgAgDwAA1wYAIBAAANgGACASAADaBgAgEwAA3AYAIBQAAN0GACAVAADeBgAgFgAA3wYAIBcAAOAGACAYAADhBgAgGQAA4gYAIBoAAOMGACAbAADkBgAgHAAA5QYAIIgDAQD4BQAhiwMgAPoFACGOA0AA_AUAIY8DQAD8BQAhnQMBAPgFACHpAwEA-QUAIeoDAQD5BQAh6wMBAPkFACHsAwEA-QUAIe0DAQD5BQAh7gMBAPkFACHvAwEA-QUAIfADAQD5BQAh8QMBAPkFACHyAwEA-QUAIfMDAQD5BQAh9AOAAAAAAfUDgAAAAAElBAAA9QgAIAUAAPcIACAGAAD2CAAgCQAA-AgAIAoAAPkIACAOAAD-CAAgDwAA-ggAIBEAAPwIACASAAD9CAAgEwAA_wgAIBQAAIAJACAVAACBCQAgFgAAggkAIBcAAIMJACAYAACECQAgGQAAhQkAIBoAAIYJACAbAACHCQAgHAAAiAkAIIgDAQAAAAGLAyAAAAABjgNAAAAAAY8DQAAAAAGdAwEAAAAB6QMBAAAAAeoDAQAAAAHrAwEAAAAB7AMBAAAAAe0DAQAAAAHuAwEAAAAB7wMBAAAAAfADAQAAAAHxAwEAAAAB8gMBAAAAAfMDAQAAAAH0A4AAAAAB9QOAAAAAAQIAAADAAwAgKQAAmgoAIAMAAADDAwAgKQAAmgoAICoAAJ4KACAnAAAAwwMAIAQAANIGACAFAADUBgAgBgAA0wYAIAkAANUGACAKAADWBgAgDgAA2wYAIA8AANcGACARAADZBgAgEgAA2gYAIBMAANwGACAUAADdBgAgFQAA3gYAIBYAAN8GACAXAADgBgAgGAAA4QYAIBkAAOIGACAaAADjBgAgGwAA5AYAIBwAAOUGACAiAACeCgAgiAMBAPgFACGLAyAA-gUAIY4DQAD8BQAhjwNAAPwFACGdAwEA-AUAIekDAQD5BQAh6gMBAPkFACHrAwEA-QUAIewDAQD5BQAh7QMBAPkFACHuAwEA-QUAIe8DAQD5BQAh8AMBAPkFACHxAwEA-QUAIfIDAQD5BQAh8wMBAPkFACH0A4AAAAAB9QOAAAAAASUEAADSBgAgBQAA1AYAIAYAANMGACAJAADVBgAgCgAA1gYAIA4AANsGACAPAADXBgAgEQAA2QYAIBIAANoGACATAADcBgAgFAAA3QYAIBUAAN4GACAWAADfBgAgFwAA4AYAIBgAAOEGACAZAADiBgAgGgAA4wYAIBsAAOQGACAcAADlBgAgiAMBAPgFACGLAyAA-gUAIY4DQAD8BQAhjwNAAPwFACGdAwEA-AUAIekDAQD5BQAh6gMBAPkFACHrAwEA-QUAIewDAQD5BQAh7QMBAPkFACHuAwEA-QUAIe8DAQD5BQAh8AMBAPkFACHxAwEA-QUAIfIDAQD5BQAh8wMBAPkFACH0A4AAAAAB9QOAAAAAASUEAAD1CAAgBQAA9wgAIAYAAPYIACAJAAD4CAAgCgAA-QgAIA4AAP4IACAPAAD6CAAgEAAA-wgAIBEAAPwIACASAAD9CAAgEwAA_wgAIBQAAIAJACAVAACBCQAgFgAAggkAIBcAAIMJACAYAACECQAgGgAAhgkAIBsAAIcJACAcAACICQAgiAMBAAAAAYsDIAAAAAGOA0AAAAABjwNAAAAAAZ0DAQAAAAHpAwEAAAAB6gMBAAAAAesDAQAAAAHsAwEAAAAB7QMBAAAAAe4DAQAAAAHvAwEAAAAB8AMBAAAAAfEDAQAAAAHyAwEAAAAB8wMBAAAAAfQDgAAAAAH1A4AAAAABAgAAAMADACApAACfCgAgAwAAAMMDACApAACfCgAgKgAAowoAICcAAADDAwAgBAAA0gYAIAUAANQGACAGAADTBgAgCQAA1QYAIAoAANYGACAOAADbBgAgDwAA1wYAIBAAANgGACARAADZBgAgEgAA2gYAIBMAANwGACAUAADdBgAgFQAA3gYAIBYAAN8GACAXAADgBgAgGAAA4QYAIBoAAOMGACAbAADkBgAgHAAA5QYAICIAAKMKACCIAwEA-AUAIYsDIAD6BQAhjgNAAPwFACGPA0AA_AUAIZ0DAQD4BQAh6QMBAPkFACHqAwEA-QUAIesDAQD5BQAh7AMBAPkFACHtAwEA-QUAIe4DAQD5BQAh7wMBAPkFACHwAwEA-QUAIfEDAQD5BQAh8gMBAPkFACHzAwEA-QUAIfQDgAAAAAH1A4AAAAABJQQAANIGACAFAADUBgAgBgAA0wYAIAkAANUGACAKAADWBgAgDgAA2wYAIA8AANcGACAQAADYBgAgEQAA2QYAIBIAANoGACATAADcBgAgFAAA3QYAIBUAAN4GACAWAADfBgAgFwAA4AYAIBgAAOEGACAaAADjBgAgGwAA5AYAIBwAAOUGACCIAwEA-AUAIYsDIAD6BQAhjgNAAPwFACGPA0AA_AUAIZ0DAQD4BQAh6QMBAPkFACHqAwEA-QUAIesDAQD5BQAh7AMBAPkFACHtAwEA-QUAIe4DAQD5BQAh7wMBAPkFACHwAwEA-QUAIfEDAQD5BQAh8gMBAPkFACHzAwEA-QUAIfQDgAAAAAH1A4AAAAABJQQAAPUIACAFAAD3CAAgBgAA9ggAIAkAAPgIACAKAAD5CAAgDgAA_ggAIA8AAPoIACAQAAD7CAAgEQAA_AgAIBIAAP0IACATAAD_CAAgFQAAgQkAIBYAAIIJACAXAACDCQAgGAAAhAkAIBkAAIUJACAaAACGCQAgGwAAhwkAIBwAAIgJACCIAwEAAAABiwMgAAAAAY4DQAAAAAGPA0AAAAABnQMBAAAAAekDAQAAAAHqAwEAAAAB6wMBAAAAAewDAQAAAAHtAwEAAAAB7gMBAAAAAe8DAQAAAAHwAwEAAAAB8QMBAAAAAfIDAQAAAAHzAwEAAAAB9AOAAAAAAfUDgAAAAAECAAAAwAMAICkAAKQKACADAAAAwwMAICkAAKQKACAqAACoCgAgJwAAAMMDACAEAADSBgAgBQAA1AYAIAYAANMGACAJAADVBgAgCgAA1gYAIA4AANsGACAPAADXBgAgEAAA2AYAIBEAANkGACASAADaBgAgEwAA3AYAIBUAAN4GACAWAADfBgAgFwAA4AYAIBgAAOEGACAZAADiBgAgGgAA4wYAIBsAAOQGACAcAADlBgAgIgAAqAoAIIgDAQD4BQAhiwMgAPoFACGOA0AA_AUAIY8DQAD8BQAhnQMBAPgFACHpAwEA-QUAIeoDAQD5BQAh6wMBAPkFACHsAwEA-QUAIe0DAQD5BQAh7gMBAPkFACHvAwEA-QUAIfADAQD5BQAh8QMBAPkFACHyAwEA-QUAIfMDAQD5BQAh9AOAAAAAAfUDgAAAAAElBAAA0gYAIAUAANQGACAGAADTBgAgCQAA1QYAIAoAANYGACAOAADbBgAgDwAA1wYAIBAAANgGACARAADZBgAgEgAA2gYAIBMAANwGACAVAADeBgAgFgAA3wYAIBcAAOAGACAYAADhBgAgGQAA4gYAIBoAAOMGACAbAADkBgAgHAAA5QYAIIgDAQD4BQAhiwMgAPoFACGOA0AA_AUAIY8DQAD8BQAhnQMBAPgFACHpAwEA-QUAIeoDAQD5BQAh6wMBAPkFACHsAwEA-QUAIe0DAQD5BQAh7gMBAPkFACHvAwEA-QUAIfADAQD5BQAh8QMBAPkFACHyAwEA-QUAIfMDAQD5BQAh9AOAAAAAAfUDgAAAAAElBAAA9QgAIAUAAPcIACAGAAD2CAAgCQAA-AgAIAoAAPkIACAOAAD-CAAgDwAA-ggAIBAAAPsIACARAAD8CAAgEgAA_QgAIBMAAP8IACAUAACACQAgFQAAgQkAIBYAAIIJACAXAACDCQAgGAAAhAkAIBkAAIUJACAaAACGCQAgHAAAiAkAIIgDAQAAAAGLAyAAAAABjgNAAAAAAY8DQAAAAAGdAwEAAAAB6QMBAAAAAeoDAQAAAAHrAwEAAAAB7AMBAAAAAe0DAQAAAAHuAwEAAAAB7wMBAAAAAfADAQAAAAHxAwEAAAAB8gMBAAAAAfMDAQAAAAH0A4AAAAAB9QOAAAAAAQIAAADAAwAgKQAAqQoAIAMAAADDAwAgKQAAqQoAICoAAK0KACAnAAAAwwMAIAQAANIGACAFAADUBgAgBgAA0wYAIAkAANUGACAKAADWBgAgDgAA2wYAIA8AANcGACAQAADYBgAgEQAA2QYAIBIAANoGACATAADcBgAgFAAA3QYAIBUAAN4GACAWAADfBgAgFwAA4AYAIBgAAOEGACAZAADiBgAgGgAA4wYAIBwAAOUGACAiAACtCgAgiAMBAPgFACGLAyAA-gUAIY4DQAD8BQAhjwNAAPwFACGdAwEA-AUAIekDAQD5BQAh6gMBAPkFACHrAwEA-QUAIewDAQD5BQAh7QMBAPkFACHuAwEA-QUAIe8DAQD5BQAh8AMBAPkFACHxAwEA-QUAIfIDAQD5BQAh8wMBAPkFACH0A4AAAAAB9QOAAAAAASUEAADSBgAgBQAA1AYAIAYAANMGACAJAADVBgAgCgAA1gYAIA4AANsGACAPAADXBgAgEAAA2AYAIBEAANkGACASAADaBgAgEwAA3AYAIBQAAN0GACAVAADeBgAgFgAA3wYAIBcAAOAGACAYAADhBgAgGQAA4gYAIBoAAOMGACAcAADlBgAgiAMBAPgFACGLAyAA-gUAIY4DQAD8BQAhjwNAAPwFACGdAwEA-AUAIekDAQD5BQAh6gMBAPkFACHrAwEA-QUAIewDAQD5BQAh7QMBAPkFACHuAwEA-QUAIe8DAQD5BQAh8AMBAPkFACHxAwEA-QUAIfIDAQD5BQAh8wMBAPkFACH0A4AAAAAB9QOAAAAAARCIAwEAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAZwDAQAAAAGdAwEAAAABngMBAAAAAZ8DAQAAAAGgAwEAAAABoQMBAAAAAaMDAAAAowMCpAMgAAAAAaYDAAAApgMCqAMAAACoAwKpAyAAAAABHogDAQAAAAGOA0AAAAABjwNAAAAAAZwDAQAAAAGdAwEAAAABqAMAAACoAwKsAwEAAAABrgMAAACuAwOvA0AAAAABsANAAAAAAbIDAAAAsgMCswMQAAAAAbUDAAAAtQMCtgMAAKcGACC3AwEAAAABuAMBAAAAAbkDAgAAAAG6AwEAAAABuwMBAAAAAbwDQAAAAAG-AwAAAL4DA78DAQAAAAHAAwEAAAABwQMBAAAAAcIDAQAAAAHDA4AAAAABxAOAAAAAAcUDAQAAAAHGAwEAAAABxwMBAAAAASCIAwEAAAABjgNAAAAAAZwDAQAAAAGdAwEAAAABpgMCAAAAAagDAAAAqAMCugMBAAAAAbsDAQAAAAG8A0AAAAABvgMAAAC-AwO_AwEAAAABwAMBAAAAAcEDAQAAAAHCAwEAAAABwwMBAAAAAcQDAQAAAAHHAwEAAAAB0QMBAAAAAdIDQAAAAAHTAwEAAAAB1AMBAAAAAdUDAQAAAAHWAwAAALUDA9gDAAAA2AMD2QMBAAAAAdoDAQAAAAHbAwEAAAAB3AMBAAAAAd0DAQAAAAHeAwEAAAAB3wMBAAAAAeADQAAAAAEUiAMBAAAAAY4DQAAAAAGPA0AAAAABnAMBAAAAAZ0DAQAAAAGoAwAAAKgDAq4DAAAA5QMDsANAAAAAAboDAQAAAAG7AwEAAAABwgMBAAAAAcMDgAAAAAHHAwEAAAAB4QMBAAAAAeIDAQAAAAHjAwEAAAAB5QMBAAAAAeYDAQAAAAHnA0AAAAAB6AOAAAAAARUDAACyBgAgBQAAswYAIAYAALQGACAHAAC1BgAgiAMBAAAAAYwDIAAAAAGNA0AAAAABjgNAAAAAAY8DQAAAAAGQAwEAAAABnAMBAAAAAZ0DAQAAAAGeAwEAAAABnwMBAAAAAaADAQAAAAGhAwEAAAABowMAAACjAwKkAyAAAAABpgMAAACmAwKoAwAAAKgDAqkDIAAAAAECAAAABQAgKQAAsgoAIAMAAAADACApAACyCgAgKgAAtgoAIBcAAAADACADAACFBgAgBQAAhgYAIAYAAIcGACAHAACIBgAgIgAAtgoAIIgDAQD4BQAhjAMgAPoFACGNA0AA-wUAIY4DQAD8BQAhjwNAAPwFACGQAwEA-AUAIZwDAQD4BQAhnQMBAPgFACGeAwEA-AUAIZ8DAQD5BQAhoAMBAPkFACGhAwEA-QUAIaMDAACCBqMDIqQDIAD6BQAhpgMAAIMGpgMiqAMAAIQGqAMiqQMgAPoFACEVAwAAhQYAIAUAAIYGACAGAACHBgAgBwAAiAYAIIgDAQD4BQAhjAMgAPoFACGNA0AA-wUAIY4DQAD8BQAhjwNAAPwFACGQAwEA-AUAIZwDAQD4BQAhnQMBAPgFACGeAwEA-AUAIZ8DAQD5BQAhoAMBAPkFACGhAwEA-QUAIaMDAACCBqMDIqQDIAD6BQAhpgMAAIMGpgMiqAMAAIQGqAMiqQMgAPoFACEViAMBAAAAAY4DQAAAAAGPA0AAAAABnAMBAAAAAZ0DAQAAAAGoAwAAAKgDAq4DAAAAhQQCsANAAAAAAboDAQAAAAG7AwEAAAABwgMBAAAAAcMDgAAAAAHEA4AAAAABxwMBAAAAAeIDAQAAAAHjAwEAAAAB5QMBAAAAAeYDAQAAAAHnA0AAAAABgwQBAAAAAYUEAQAAAAEMAwAA3gkAIIgDAQAAAAGJAwEAAAABigMBAAAAAYsDIAAAAAGMAyAAAAABjQNAAAAAAY4DQAAAAAGQAwEAAAAB4ANAAAAAAYcEAQAAAAGIBAEAAAABAgAAADYAICkAALgKACADAAAAJAAgKQAAuAoAICoAALwKACAOAAAAJAAgAwAA3QkAICIAALwKACCIAwEA-AUAIYkDAQD4BQAhigMBAPgFACGLAyAA-gUAIYwDIAD6BQAhjQNAAPsFACGOA0AA_AUAIZADAQD4BQAh4ANAAPwFACGHBAEA-QUAIYgEAQD5BQAhDAMAAN0JACCIAwEA-AUAIYkDAQD4BQAhigMBAPgFACGLAyAA-gUAIYwDIAD6BQAhjQNAAPsFACGOA0AA_AUAIZADAQD4BQAh4ANAAPwFACGHBAEA-QUAIYgEAQD5BQAhCYgDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAaoDAQAAAAGrAwEAAAAB_QMBAAAAAQ2IAwEAAAABiQMBAAAAAYoDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAf4DQAAAAAH_A0AAAAABgAQBAAAAAYEEAQAAAAGCBAEAAAABCogDAQAAAAGJAwEAAAABiwMgAAAAAYwDIAAAAAGNA0AAAAABjgNAAAAAAY8DQAAAAAGqAwEAAAABqwMBAAAAAfkDAQAAAAEKiAMBAAAAAYkDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAaoDAQAAAAGrAwEAAAAB-QMBAAAAAQuIAwEAAAABiQMBAAAAAYoDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAaoDAQAAAAGrAwEAAAABhgRAAAAAAQ8DAADCCQAgiAMBAAAAAYkDAQAAAAGKAwEAAAABiwMgAAAAAYwDIAAAAAGNA0AAAAABjgNAAAAAAY8DQAAAAAGQAwEAAAAB_gNAAAAAAf8DQAAAAAGABAEAAAABgQQBAAAAAYIEAQAAAAECAAAAHQAgKQAAwgoAIAMAAAAbACApAADCCgAgKgAAxgoAIBEAAAAbACADAADBCQAgIgAAxgoAIIgDAQD4BQAhiQMBAPgFACGKAwEA-AUAIYsDIAD6BQAhjAMgAPoFACGNA0AA-wUAIY4DQAD8BQAhjwNAAPwFACGQAwEA-AUAIf4DQAD7BQAh_wNAAPsFACGABAEA-QUAIYEEAQD5BQAhggQBAPkFACEPAwAAwQkAIIgDAQD4BQAhiQMBAPgFACGKAwEA-AUAIYsDIAD6BQAhjAMgAPoFACGNA0AA-wUAIY4DQAD8BQAhjwNAAPwFACGQAwEA-AUAIf4DQAD7BQAh_wNAAPsFACGABAEA-QUAIYEEAQD5BQAhggQBAPkFACEJiAMBAAAAAYsDIAAAAAGMAyAAAAABjQNAAAAAAY4DQAAAAAGPA0AAAAABqgMBAAAAAasDAQAAAAH8AwEAAAABCogDAQAAAAGJAwEAAAABigMBAAAAAYsDIAAAAAGMAyAAAAABjQNAAAAAAY4DQAAAAAHgA0AAAAABhwQBAAAAAYgEAQAAAAEHiAMBAAAAAYsDIAAAAAGMAyAAAAABjQNAAAAAAY4DQAAAAAH6AwEAAAAB-wMBAAAAAQiIAwEAAAABiQMBAAAAAYoDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGqAwEAAAABqwMBAAAAAQiIAwEAAAABiQMBAAAAAYoDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAQiIAwEAAAABiQMBAAAAAYoDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAQiIAwEAAAABiQMBAAAAAYoDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAQiIAwEAAAABiQMBAAAAAYoDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAQiIAwEAAAABiQMBAAAAAYoDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAQiIAwEAAAABiQMBAAAAAYoDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAQqIAwEAAAABiQMBAAAAAYoDAQAAAAGLAyAAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAaoDAQAAAAGrAwEAAAABCogDAQAAAAGJAwEAAAABigMBAAAAAYsDIAAAAAGMAyAAAAABjQNAAAAAAY4DQAAAAAGPA0AAAAABqgMBAAAAAasDAQAAAAEVAwAAsgYAIAUAALMGACAGAAC0BgAgCAAAtgYAIIgDAQAAAAGMAyAAAAABjQNAAAAAAY4DQAAAAAGPA0AAAAABkAMBAAAAAZwDAQAAAAGdAwEAAAABngMBAAAAAZ8DAQAAAAGgAwEAAAABoQMBAAAAAaMDAAAAowMCpAMgAAAAAaYDAAAApgMCqAMAAACoAwKpAyAAAAABAgAAAAUAICkAANMKACADAAAAAwAgKQAA0woAICoAANcKACAXAAAAAwAgAwAAhQYAIAUAAIYGACAGAACHBgAgCAAAiQYAICIAANcKACCIAwEA-AUAIYwDIAD6BQAhjQNAAPsFACGOA0AA_AUAIY8DQAD8BQAhkAMBAPgFACGcAwEA-AUAIZ0DAQD4BQAhngMBAPgFACGfAwEA-QUAIaADAQD5BQAhoQMBAPkFACGjAwAAggajAyKkAyAA-gUAIaYDAACDBqYDIqgDAACEBqgDIqkDIAD6BQAhFQMAAIUGACAFAACGBgAgBgAAhwYAIAgAAIkGACCIAwEA-AUAIYwDIAD6BQAhjQNAAPsFACGOA0AA_AUAIY8DQAD8BQAhkAMBAPgFACGcAwEA-AUAIZ0DAQD4BQAhngMBAPgFACGfAwEA-QUAIaADAQD5BQAhoQMBAPkFACGjAwAAggajAyKkAyAA-gUAIaYDAACDBqYDIqgDAACEBqgDIqkDIAD6BQAhFQMAALIGACAGAAC0BgAgBwAAtQYAIAgAALYGACCIAwEAAAABjAMgAAAAAY0DQAAAAAGOA0AAAAABjwNAAAAAAZADAQAAAAGcAwEAAAABnQMBAAAAAZ4DAQAAAAGfAwEAAAABoAMBAAAAAaEDAQAAAAGjAwAAAKMDAqQDIAAAAAGmAwAAAKYDAqgDAAAAqAMCqQMgAAAAAQIAAAAFACApAADYCgAgAwAAAAMAICkAANgKACAqAADcCgAgFwAAAAMAIAMAAIUGACAGAACHBgAgBwAAiAYAIAgAAIkGACAiAADcCgAgiAMBAPgFACGMAyAA-gUAIY0DQAD7BQAhjgNAAPwFACGPA0AA_AUAIZADAQD4BQAhnAMBAPgFACGdAwEA-AUAIZ4DAQD4BQAhnwMBAPkFACGgAwEA-QUAIaEDAQD5BQAhowMAAIIGowMipAMgAPoFACGmAwAAgwamAyKoAwAAhAaoAyKpAyAA-gUAIRUDAACFBgAgBgAAhwYAIAcAAIgGACAIAACJBgAgiAMBAPgFACGMAyAA-gUAIY0DQAD7BQAhjgNAAPwFACGPA0AA_AUAIZADAQD4BQAhnAMBAPgFACGdAwEA-AUAIZ4DAQD4BQAhnwMBAPkFACGgAwEA-QUAIaEDAQD5BQAhowMAAIIGowMipAMgAPoFACGmAwAAgwamAyKoAwAAhAaoAyKpAyAA-gUAIRUDAACyBgAgBQAAswYAIAcAALUGACAIAAC2BgAgiAMBAAAAAYwDIAAAAAGNA0AAAAABjgNAAAAAAY8DQAAAAAGQAwEAAAABnAMBAAAAAZ0DAQAAAAGeAwEAAAABnwMBAAAAAaADAQAAAAGhAwEAAAABowMAAACjAwKkAyAAAAABpgMAAACmAwKoAwAAAKgDAqkDIAAAAAECAAAABQAgKQAA3QoAIAMAAAADACApAADdCgAgKgAA4QoAIBcAAAADACADAACFBgAgBQAAhgYAIAcAAIgGACAIAACJBgAgIgAA4QoAIIgDAQD4BQAhjAMgAPoFACGNA0AA-wUAIY4DQAD8BQAhjwNAAPwFACGQAwEA-AUAIZwDAQD4BQAhnQMBAPgFACGeAwEA-AUAIZ8DAQD5BQAhoAMBAPkFACGhAwEA-QUAIaMDAACCBqMDIqQDIAD6BQAhpgMAAIMGpgMiqAMAAIQGqAMiqQMgAPoFACEVAwAAhQYAIAUAAIYGACAHAACIBgAgCAAAiQYAIIgDAQD4BQAhjAMgAPoFACGNA0AA-wUAIY4DQAD8BQAhjwNAAPwFACGQAwEA-AUAIZwDAQD4BQAhnQMBAPgFACGeAwEA-AUAIZ8DAQD5BQAhoAMBAPkFACGhAwEA-QUAIaMDAACCBqMDIqQDIAD6BQAhpgMAAIMGpgMiqAMAAIQGqAMiqQMgAPoFACElBAAA9QgAIAUAAPcIACAGAAD2CAAgCQAA-AgAIAoAAPkIACAOAAD-CAAgDwAA-ggAIBAAAPsIACARAAD8CAAgEgAA_QgAIBMAAP8IACAUAACACQAgFQAAgQkAIBYAAIIJACAXAACDCQAgGAAAhAkAIBkAAIUJACAaAACGCQAgGwAAhwkAIIgDAQAAAAGLAyAAAAABjgNAAAAAAY8DQAAAAAGdAwEAAAAB6QMBAAAAAeoDAQAAAAHrAwEAAAAB7AMBAAAAAe0DAQAAAAHuAwEAAAAB7wMBAAAAAfADAQAAAAHxAwEAAAAB8gMBAAAAAfMDAQAAAAH0A4AAAAAB9QOAAAAAAQIAAADAAwAgKQAA4goAIAMAAADDAwAgKQAA4goAICoAAOYKACAnAAAAwwMAIAQAANIGACAFAADUBgAgBgAA0wYAIAkAANUGACAKAADWBgAgDgAA2wYAIA8AANcGACAQAADYBgAgEQAA2QYAIBIAANoGACATAADcBgAgFAAA3QYAIBUAAN4GACAWAADfBgAgFwAA4AYAIBgAAOEGACAZAADiBgAgGgAA4wYAIBsAAOQGACAiAADmCgAgiAMBAPgFACGLAyAA-gUAIY4DQAD8BQAhjwNAAPwFACGdAwEA-AUAIekDAQD5BQAh6gMBAPkFACHrAwEA-QUAIewDAQD5BQAh7QMBAPkFACHuAwEA-QUAIe8DAQD5BQAh8AMBAPkFACHxAwEA-QUAIfIDAQD5BQAh8wMBAPkFACH0A4AAAAAB9QOAAAAAASUEAADSBgAgBQAA1AYAIAYAANMGACAJAADVBgAgCgAA1gYAIA4AANsGACAPAADXBgAgEAAA2AYAIBEAANkGACASAADaBgAgEwAA3AYAIBQAAN0GACAVAADeBgAgFgAA3wYAIBcAAOAGACAYAADhBgAgGQAA4gYAIBoAAOMGACAbAADkBgAgiAMBAPgFACGLAyAA-gUAIY4DQAD8BQAhjwNAAPwFACGdAwEA-AUAIekDAQD5BQAh6gMBAPkFACHrAwEA-QUAIewDAQD5BQAh7QMBAPkFACHuAwEA-QUAIe8DAQD5BQAh8AMBAPkFACHxAwEA-QUAIfIDAQD5BQAh8wMBAPkFACH0A4AAAAAB9QOAAAAAASUFAAD3CAAgBgAA9ggAIAkAAPgIACAKAAD5CAAgDgAA_ggAIA8AAPoIACAQAAD7CAAgEQAA_AgAIBIAAP0IACATAAD_CAAgFAAAgAkAIBUAAIEJACAWAACCCQAgFwAAgwkAIBgAAIQJACAZAACFCQAgGgAAhgkAIBsAAIcJACAcAACICQAgiAMBAAAAAYsDIAAAAAGOA0AAAAABjwNAAAAAAZ0DAQAAAAHpAwEAAAAB6gMBAAAAAesDAQAAAAHsAwEAAAAB7QMBAAAAAe4DAQAAAAHvAwEAAAAB8AMBAAAAAfEDAQAAAAHyAwEAAAAB8wMBAAAAAfQDgAAAAAH1A4AAAAABAgAAAMADACApAADnCgAgJQQAAPUIACAGAAD2CAAgCQAA-AgAIAoAAPkIACAOAAD-CAAgDwAA-ggAIBAAAPsIACARAAD8CAAgEgAA_QgAIBMAAP8IACAUAACACQAgFQAAgQkAIBYAAIIJACAXAACDCQAgGAAAhAkAIBkAAIUJACAaAACGCQAgGwAAhwkAIBwAAIgJACCIAwEAAAABiwMgAAAAAY4DQAAAAAGPA0AAAAABnQMBAAAAAekDAQAAAAHqAwEAAAAB6wMBAAAAAewDAQAAAAHtAwEAAAAB7gMBAAAAAe8DAQAAAAHwAwEAAAAB8QMBAAAAAfIDAQAAAAHzAwEAAAAB9AOAAAAAAfUDgAAAAAECAAAAwAMAICkAAOkKACADAAAAwwMAICkAAOkKACAqAADtCgAgJwAAAMMDACAEAADSBgAgBgAA0wYAIAkAANUGACAKAADWBgAgDgAA2wYAIA8AANcGACAQAADYBgAgEQAA2QYAIBIAANoGACATAADcBgAgFAAA3QYAIBUAAN4GACAWAADfBgAgFwAA4AYAIBgAAOEGACAZAADiBgAgGgAA4wYAIBsAAOQGACAcAADlBgAgIgAA7QoAIIgDAQD4BQAhiwMgAPoFACGOA0AA_AUAIY8DQAD8BQAhnQMBAPgFACHpAwEA-QUAIeoDAQD5BQAh6wMBAPkFACHsAwEA-QUAIe0DAQD5BQAh7gMBAPkFACHvAwEA-QUAIfADAQD5BQAh8QMBAPkFACHyAwEA-QUAIfMDAQD5BQAh9AOAAAAAAfUDgAAAAAElBAAA0gYAIAYAANMGACAJAADVBgAgCgAA1gYAIA4AANsGACAPAADXBgAgEAAA2AYAIBEAANkGACASAADaBgAgEwAA3AYAIBQAAN0GACAVAADeBgAgFgAA3wYAIBcAAOAGACAYAADhBgAgGQAA4gYAIBoAAOMGACAbAADkBgAgHAAA5QYAIIgDAQD4BQAhiwMgAPoFACGOA0AA_AUAIY8DQAD8BQAhnQMBAPgFACHpAwEA-QUAIeoDAQD5BQAh6wMBAPkFACHsAwEA-QUAIe0DAQD5BQAh7gMBAPkFACHvAwEA-QUAIfADAQD5BQAh8QMBAPkFACHyAwEA-QUAIfMDAQD5BQAh9AOAAAAAAfUDgAAAAAElBAAA9QgAIAUAAPcIACAJAAD4CAAgCgAA-QgAIA4AAP4IACAPAAD6CAAgEAAA-wgAIBEAAPwIACASAAD9CAAgEwAA_wgAIBQAAIAJACAVAACBCQAgFgAAggkAIBcAAIMJACAYAACECQAgGQAAhQkAIBoAAIYJACAbAACHCQAgHAAAiAkAIIgDAQAAAAGLAyAAAAABjgNAAAAAAY8DQAAAAAGdAwEAAAAB6QMBAAAAAeoDAQAAAAHrAwEAAAAB7AMBAAAAAe0DAQAAAAHuAwEAAAAB7wMBAAAAAfADAQAAAAHxAwEAAAAB8gMBAAAAAfMDAQAAAAH0A4AAAAAB9QOAAAAAAQIAAADAAwAgKQAA7goAIAMAAADDAwAgKQAA7goAICoAAPIKACAnAAAAwwMAIAQAANIGACAFAADUBgAgCQAA1QYAIAoAANYGACAOAADbBgAgDwAA1wYAIBAAANgGACARAADZBgAgEgAA2gYAIBMAANwGACAUAADdBgAgFQAA3gYAIBYAAN8GACAXAADgBgAgGAAA4QYAIBkAAOIGACAaAADjBgAgGwAA5AYAIBwAAOUGACAiAADyCgAgiAMBAPgFACGLAyAA-gUAIY4DQAD8BQAhjwNAAPwFACGdAwEA-AUAIekDAQD5BQAh6gMBAPkFACHrAwEA-QUAIewDAQD5BQAh7QMBAPkFACHuAwEA-QUAIe8DAQD5BQAh8AMBAPkFACHxAwEA-QUAIfIDAQD5BQAh8wMBAPkFACH0A4AAAAAB9QOAAAAAASUEAADSBgAgBQAA1AYAIAkAANUGACAKAADWBgAgDgAA2wYAIA8AANcGACAQAADYBgAgEQAA2QYAIBIAANoGACATAADcBgAgFAAA3QYAIBUAAN4GACAWAADfBgAgFwAA4AYAIBgAAOEGACAZAADiBgAgGgAA4wYAIBsAAOQGACAcAADlBgAgiAMBAPgFACGLAyAA-gUAIY4DQAD8BQAhjwNAAPwFACGdAwEA-AUAIekDAQD5BQAh6gMBAPkFACHrAwEA-QUAIewDAQD5BQAh7QMBAPkFACHuAwEA-QUAIe8DAQD5BQAh8AMBAPkFACHxAwEA-QUAIfIDAQD5BQAh8wMBAPkFACH0A4AAAAAB9QOAAAAAASUEAAD1CAAgBQAA9wgAIAYAAPYIACAKAAD5CAAgDgAA_ggAIA8AAPoIACAQAAD7CAAgEQAA_AgAIBIAAP0IACATAAD_CAAgFAAAgAkAIBUAAIEJACAWAACCCQAgFwAAgwkAIBgAAIQJACAZAACFCQAgGgAAhgkAIBsAAIcJACAcAACICQAgiAMBAAAAAYsDIAAAAAGOA0AAAAABjwNAAAAAAZ0DAQAAAAHpAwEAAAAB6gMBAAAAAesDAQAAAAHsAwEAAAAB7QMBAAAAAe4DAQAAAAHvAwEAAAAB8AMBAAAAAfEDAQAAAAHyAwEAAAAB8wMBAAAAAfQDgAAAAAH1A4AAAAABAgAAAMADACApAADzCgAgAwAAAMMDACApAADzCgAgKgAA9woAICcAAADDAwAgBAAA0gYAIAUAANQGACAGAADTBgAgCgAA1gYAIA4AANsGACAPAADXBgAgEAAA2AYAIBEAANkGACASAADaBgAgEwAA3AYAIBQAAN0GACAVAADeBgAgFgAA3wYAIBcAAOAGACAYAADhBgAgGQAA4gYAIBoAAOMGACAbAADkBgAgHAAA5QYAICIAAPcKACCIAwEA-AUAIYsDIAD6BQAhjgNAAPwFACGPA0AA_AUAIZ0DAQD4BQAh6QMBAPkFACHqAwEA-QUAIesDAQD5BQAh7AMBAPkFACHtAwEA-QUAIe4DAQD5BQAh7wMBAPkFACHwAwEA-QUAIfEDAQD5BQAh8gMBAPkFACHzAwEA-QUAIfQDgAAAAAH1A4AAAAABJQQAANIGACAFAADUBgAgBgAA0wYAIAoAANYGACAOAADbBgAgDwAA1wYAIBAAANgGACARAADZBgAgEgAA2gYAIBMAANwGACAUAADdBgAgFQAA3gYAIBYAAN8GACAXAADgBgAgGAAA4QYAIBkAAOIGACAaAADjBgAgGwAA5AYAIBwAAOUGACCIAwEA-AUAIYsDIAD6BQAhjgNAAPwFACGPA0AA_AUAIZ0DAQD4BQAh6QMBAPkFACHqAwEA-QUAIesDAQD5BQAh7AMBAPkFACHtAwEA-QUAIe4DAQD5BQAh7wMBAPkFACHwAwEA-QUAIfEDAQD5BQAh8gMBAPkFACHzAwEA-QUAIfQDgAAAAAH1A4AAAAABJQQAAPUIACAFAAD3CAAgBgAA9ggAIAkAAPgIACAOAAD-CAAgDwAA-ggAIBAAAPsIACARAAD8CAAgEgAA_QgAIBMAAP8IACAUAACACQAgFQAAgQkAIBYAAIIJACAXAACDCQAgGAAAhAkAIBkAAIUJACAaAACGCQAgGwAAhwkAIBwAAIgJACCIAwEAAAABiwMgAAAAAY4DQAAAAAGPA0AAAAABnQMBAAAAAekDAQAAAAHqAwEAAAAB6wMBAAAAAewDAQAAAAHtAwEAAAAB7gMBAAAAAe8DAQAAAAHwAwEAAAAB8QMBAAAAAfIDAQAAAAHzAwEAAAAB9AOAAAAAAfUDgAAAAAECAAAAwAMAICkAAPgKACADAAAAwwMAICkAAPgKACAqAAD8CgAgJwAAAMMDACAEAADSBgAgBQAA1AYAIAYAANMGACAJAADVBgAgDgAA2wYAIA8AANcGACAQAADYBgAgEQAA2QYAIBIAANoGACATAADcBgAgFAAA3QYAIBUAAN4GACAWAADfBgAgFwAA4AYAIBgAAOEGACAZAADiBgAgGgAA4wYAIBsAAOQGACAcAADlBgAgIgAA_AoAIIgDAQD4BQAhiwMgAPoFACGOA0AA_AUAIY8DQAD8BQAhnQMBAPgFACHpAwEA-QUAIeoDAQD5BQAh6wMBAPkFACHsAwEA-QUAIe0DAQD5BQAh7gMBAPkFACHvAwEA-QUAIfADAQD5BQAh8QMBAPkFACHyAwEA-QUAIfMDAQD5BQAh9AOAAAAAAfUDgAAAAAElBAAA0gYAIAUAANQGACAGAADTBgAgCQAA1QYAIA4AANsGACAPAADXBgAgEAAA2AYAIBEAANkGACASAADaBgAgEwAA3AYAIBQAAN0GACAVAADeBgAgFgAA3wYAIBcAAOAGACAYAADhBgAgGQAA4gYAIBoAAOMGACAbAADkBgAgHAAA5QYAIIgDAQD4BQAhiwMgAPoFACGOA0AA_AUAIY8DQAD8BQAhnQMBAPgFACHpAwEA-QUAIeoDAQD5BQAh6wMBAPkFACHsAwEA-QUAIe0DAQD5BQAh7gMBAPkFACHvAwEA-QUAIfADAQD5BQAh8QMBAPkFACHyAwEA-QUAIfMDAQD5BQAh9AOAAAAAAfUDgAAAAAEDAAAAwwMAICkAAOcKACAqAAD_CgAgJwAAAMMDACAFAADUBgAgBgAA0wYAIAkAANUGACAKAADWBgAgDgAA2wYAIA8AANcGACAQAADYBgAgEQAA2QYAIBIAANoGACATAADcBgAgFAAA3QYAIBUAAN4GACAWAADfBgAgFwAA4AYAIBgAAOEGACAZAADiBgAgGgAA4wYAIBsAAOQGACAcAADlBgAgIgAA_woAIIgDAQD4BQAhiwMgAPoFACGOA0AA_AUAIY8DQAD8BQAhnQMBAPgFACHpAwEA-QUAIeoDAQD5BQAh6wMBAPkFACHsAwEA-QUAIe0DAQD5BQAh7gMBAPkFACHvAwEA-QUAIfADAQD5BQAh8QMBAPkFACHyAwEA-QUAIfMDAQD5BQAh9AOAAAAAAfUDgAAAAAElBQAA1AYAIAYAANMGACAJAADVBgAgCgAA1gYAIA4AANsGACAPAADXBgAgEAAA2AYAIBEAANkGACASAADaBgAgEwAA3AYAIBQAAN0GACAVAADeBgAgFgAA3wYAIBcAAOAGACAYAADhBgAgGQAA4gYAIBoAAOMGACAbAADkBgAgHAAA5QYAIIgDAQD4BQAhiwMgAPoFACGOA0AA_AUAIY8DQAD8BQAhnQMBAPgFACHpAwEA-QUAIeoDAQD5BQAh6wMBAPkFACHsAwEA-QUAIe0DAQD5BQAh7gMBAPkFACHvAwEA-QUAIfADAQD5BQAh8QMBAPkFACHyAwEA-QUAIfMDAQD5BQAh9AOAAAAAAfUDgAAAAAElBAAA9QgAIAUAAPcIACAGAAD2CAAgCQAA-AgAIAoAAPkIACAOAAD-CAAgDwAA-ggAIBAAAPsIACARAAD8CAAgEgAA_QgAIBMAAP8IACAUAACACQAgFQAAgQkAIBcAAIMJACAYAACECQAgGQAAhQkAIBoAAIYJACAbAACHCQAgHAAAiAkAIIgDAQAAAAGLAyAAAAABjgNAAAAAAY8DQAAAAAGdAwEAAAAB6QMBAAAAAeoDAQAAAAHrAwEAAAAB7AMBAAAAAe0DAQAAAAHuAwEAAAAB7wMBAAAAAfADAQAAAAHxAwEAAAAB8gMBAAAAAfMDAQAAAAH0A4AAAAAB9QOAAAAAAQIAAADAAwAgKQAAgAsAIAMAAADDAwAgKQAAgAsAICoAAIQLACAnAAAAwwMAIAQAANIGACAFAADUBgAgBgAA0wYAIAkAANUGACAKAADWBgAgDgAA2wYAIA8AANcGACAQAADYBgAgEQAA2QYAIBIAANoGACATAADcBgAgFAAA3QYAIBUAAN4GACAXAADgBgAgGAAA4QYAIBkAAOIGACAaAADjBgAgGwAA5AYAIBwAAOUGACAiAACECwAgiAMBAPgFACGLAyAA-gUAIY4DQAD8BQAhjwNAAPwFACGdAwEA-AUAIekDAQD5BQAh6gMBAPkFACHrAwEA-QUAIewDAQD5BQAh7QMBAPkFACHuAwEA-QUAIe8DAQD5BQAh8AMBAPkFACHxAwEA-QUAIfIDAQD5BQAh8wMBAPkFACH0A4AAAAAB9QOAAAAAASUEAADSBgAgBQAA1AYAIAYAANMGACAJAADVBgAgCgAA1gYAIA4AANsGACAPAADXBgAgEAAA2AYAIBEAANkGACASAADaBgAgEwAA3AYAIBQAAN0GACAVAADeBgAgFwAA4AYAIBgAAOEGACAZAADiBgAgGgAA4wYAIBsAAOQGACAcAADlBgAgiAMBAPgFACGLAyAA-gUAIY4DQAD8BQAhjwNAAPwFACGdAwEA-AUAIekDAQD5BQAh6gMBAPkFACHrAwEA-QUAIewDAQD5BQAh7QMBAPkFACHuAwEA-QUAIe8DAQD5BQAh8AMBAPkFACHxAwEA-QUAIfIDAQD5BQAh8wMBAPkFACH0A4AAAAAB9QOAAAAAAQEDAAIVBAYDBRQEBhEFCRcGChoHDQAZDjcKDx4IECwNETAOEjQPEzsQFD8RFUIBFkYSF0oTGE4UGVIVGlYWG1oXHF4YBQMAAgUIBAYKBQcMBggOBwIDAAIEAAMCAwACBAADAgMAAgQAAwIDAAIEAAMDAwACDCIJDQAMAgsjCA4lCgMDAAIMJgkNAAsBDCcAAQwoAAEDAAIBAwACAQMAAgEDAAIBAwACAQMAAgEDAAIBAwACAQMAAgEDAAIBAwACAQMAAhQEXwAFYQAGYAAJYgAKYwAOaAAPZAAQZQARZgASZwATaQAUagAVawAWbAAXbQAYbgAZbwAacAAbcQAccgAAAQMAAgEDAAIDDQAeLwAfMAAgAAAAAw0AHi8AHzAAIAEDAAIBAwACAw0AJS8AJjAAJwAAAAMNACUvACYwACcBAwACAQMAAgMNACwvAC0wAC4AAAADDQAsLwAtMAAuAQMAAgEDAAIDDQAzLwA0MAA1AAAAAw0AMy8ANDAANQEDAAIBAwACAw0AOi8AOzAAPAAAAAMNADovADswADwBAwACAQMAAgMNAEEvAEIwAEMAAAADDQBBLwBCMABDAgMAAgQAAwIDAAIEAAMDDQBILwBJMABKAAAAAw0ASC8ASTAASgEDAAIBAwACAw0ATy8AUDAAUQAAAAMNAE8vAFAwAFECC6wCCA6tAgoCC7MCCA60AgoDDQBWLwBXMABYAAAAAw0AVi8AVzAAWAEDAAIBAwACAw0AXS8AXjAAXwAAAAMNAF0vAF4wAF8BAwACAQMAAgMNAGQvAGUwAGYAAAADDQBkLwBlMABmAQMAAgEDAAIDDQBrLwBsMABtAAAAAw0Aay8AbDAAbQEDAAIBAwACAw0Aci8AczAAdAAAAAMNAHIvAHMwAHQBAwACAQMAAgMNAHkvAHowAHsAAAADDQB5LwB6MAB7AQMAAgEDAAIDDQCAAS8AgQEwAIIBAAAAAw0AgAEvAIEBMACCAQAAAw0AhwEvAIgBMACJAQAAAAMNAIcBLwCIATAAiQECAwACBAADAgMAAgQAAwMNAI4BLwCPATAAkAEAAAADDQCOAS8AjwEwAJABAgMAAgQAAwIDAAIEAAMFDQCVAS8AmAEwAJkBwQIAlgHCAgCXAQAAAAAABQ0AlQEvAJgBMACZAcECAJYBwgIAlwECAwACBAADAgMAAgQAAwUNAJ4BLwChATAAogHBAgCfAcICAKABAAAAAAAFDQCeAS8AoQEwAKIBwQIAnwHCAgCgAQEDAAIBAwACAw0ApwEvAKgBMACpAQAAAAMNAKcBLwCoATAAqQEBAwACAQMAAgMNAK4BLwCvATAAsAEAAAADDQCuAS8ArwEwALABAQMAAgEDAAIDDQC1AS8AtgEwALcBAAAAAw0AtQEvALYBMAC3AR0CAR5zAR90ASB1ASF2ASN4ASR6GiV7GyZ9ASd_GiiAARwrgQEBLIIBAS2DARoxhgEdMocBITOIAQo0iQEKNYoBCjaLAQo3jAEKOI4BCjmQARo6kQEiO5MBCjyVARo9lgEjPpcBCj-YAQpAmQEaQZwBJEKdAShDngEWRJ8BFkWgARZGoQEWR6IBFkikARZJpgEaSqcBKUupARZMqwEaTawBKk6tARZPrgEWUK8BGlGyAStSswEvU7QBFFS1ARRVtgEUVrcBFFe4ARRYugEUWbwBGlq9ATBbvwEUXMEBGl3CATFewwEUX8QBFGDFARphyAEyYskBNmPKARNkywETZcwBE2bNARNnzgETaNABE2nSARpq0wE3a9UBE2zXARpt2AE4btkBE2_aARNw2wEacd4BOXLfAT1z4AEPdOEBD3XiAQ924wEPd-QBD3jmAQ956AEaeukBPnvrAQ987QEafe4BP37vAQ9_8AEPgAHxARqBAfQBQIIB9QFEgwH2AQeEAfcBB4UB-AEHhgH5AQeHAfoBB4gB_AEHiQH-ARqKAf8BRYsBgQIHjAGDAhqNAYQCRo4BhQIHjwGGAgeQAYcCGpEBigJHkgGLAkuTAYwCCJQBjQIIlQGOAgiWAY8CCJcBkAIImAGSAgiZAZQCGpoBlQJMmwGXAgicAZkCGp0BmgJNngGbAgifAZwCCKABnQIaoQGgAk6iAaECUqMBogIJpAGjAgmlAaQCCaYBpQIJpwGmAgmoAagCCakBqgIaqgGrAlOrAa8CCawBsQIarQGyAlSuAbUCCa8BtgIJsAG3AhqxAboCVbIBuwJZswG8AhC0Ab0CELUBvgIQtgG_AhC3AcACELgBwgIQuQHEAhq6AcUCWrsBxwIQvAHJAhq9AcoCW74BywIQvwHMAhDAAc0CGsEB0AJcwgHRAmDDAdICDsQB0wIOxQHUAg7GAdUCDscB1gIOyAHYAg7JAdoCGsoB2wJhywHdAg7MAd8CGs0B4AJizgHhAg7PAeICDtAB4wIa0QHmAmPSAecCZ9MB6AIN1AHpAg3VAeoCDdYB6wIN1wHsAg3YAe4CDdkB8AIa2gHxAmjbAfMCDdwB9QIa3QH2AmneAfcCDd8B-AIN4AH5AhrhAfwCauIB_QJu4wH-AhXkAf8CFeUBgAMV5gGBAxXnAYIDFegBhAMV6QGGAxrqAYcDb-sBiQMV7AGLAxrtAYwDcO4BjQMV7wGOAxXwAY8DGvEBkgNx8gGTA3XzAZQDEfQBlQMR9QGWAxH2AZcDEfcBmAMR-AGaAxH5AZwDGvoBnQN2-wGfAxH8AaEDGv0BogN3_gGjAxH_AaQDEYACpQMagQKoA3iCAqkDfIMCqgMXhAKrAxeFAqwDF4YCrQMXhwKuAxeIArADF4kCsgMaigKzA32LArUDF4wCtwMajQK4A36OArkDF48CugMXkAK7AxqRAr4Df5ICvwODAZMCwQMClALCAwKVAsUDApYCxgMClwLHAwKYAskDApkCywMamgLMA4QBmwLOAwKcAtADGp0C0QOFAZ4C0gMCnwLTAwKgAtQDGqEC1wOGAaIC2AOKAaMC2QMGpALaAwalAtsDBqYC3AMGpwLdAwaoAt8DBqkC4QMaqgLiA4sBqwLkAwasAuYDGq0C5wOMAa4C6AMGrwLpAwawAuoDGrEC7QONAbIC7gORAbMC7wMEtALwAwS1AvEDBLYC8gMEtwLzAwS4AvUDBLkC9wMaugL4A5IBuwL6AwS8AvwDGr0C_QOTAb4C_gMEvwL_AwTAAoAEGsMCgwSUAcQChASaAcUChQQFxgKGBAXHAocEBcgCiAQFyQKJBAXKAosEBcsCjQQazAKOBJsBzQKQBAXOApIEGs8CkwScAdAClAQF0QKVBAXSApYEGtMCmQSdAdQCmgSjAdUCmwQY1gKcBBjXAp0EGNgCngQY2QKfBBjaAqEEGNsCowQa3AKkBKQB3QKmBBjeAqgEGt8CqQSlAeACqgQY4QKrBBjiAqwEGuMCrwSmAeQCsASqAeUCsQQD5gKyBAPnArMEA-gCtAQD6QK1BAPqArcEA-sCuQQa7AK6BKsB7QK8BAPuAr4EGu8CvwSsAfACwAQD8QLBBAPyAsIEGvMCxQStAfQCxgSxAfUCxwQS9gLIBBL3AskEEvgCygQS-QLLBBL6As0EEvsCzwQa_ALQBLIB_QLSBBL-AtQEGv8C1QSzAYAD1gQSgQPXBBKCA9gEGoMD2wS0AYQD3AS4AQ"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config2.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config2);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AcademicRulesScalarFieldEnum: () => AcademicRulesScalarFieldEnum,
  AchievementScalarFieldEnum: () => AchievementScalarFieldEnum,
  ActivityScalarFieldEnum: () => ActivityScalarFieldEnum,
  AdmissionTestScalarFieldEnum: () => AdmissionTestScalarFieldEnum,
  AnyNull: () => AnyNull2,
  ApplyScalarFieldEnum: () => ApplyScalarFieldEnum,
  CalendarScalarFieldEnum: () => CalendarScalarFieldEnum,
  CommitteeScalarFieldEnum: () => CommitteeScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  EventScalarFieldEnum: () => EventScalarFieldEnum,
  ExamScheduleScalarFieldEnum: () => ExamScheduleScalarFieldEnum,
  GalleryScalarFieldEnum: () => GalleryScalarFieldEnum,
  JsonNull: () => JsonNull2,
  JsonNullValueFilter: () => JsonNullValueFilter,
  MissionVisionScalarFieldEnum: () => MissionVisionScalarFieldEnum,
  ModelName: () => ModelName,
  NewsScalarFieldEnum: () => NewsScalarFieldEnum,
  NoticeScalarFieldEnum: () => NoticeScalarFieldEnum,
  NullTypes: () => NullTypes2,
  NullableJsonNullValueInput: () => NullableJsonNullValueInput,
  NullsOrder: () => NullsOrder,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  RegistrationSystemScalarFieldEnum: () => RegistrationSystemScalarFieldEnum,
  RoutineScalarFieldEnum: () => RoutineScalarFieldEnum,
  SiteConfigScalarFieldEnum: () => SiteConfigScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  StaffScalarFieldEnum: () => StaffScalarFieldEnum,
  StudentScalarFieldEnum: () => StudentScalarFieldEnum,
  StudyScalarFieldEnum: () => StudyScalarFieldEnum,
  TeacherScalarFieldEnum: () => TeacherScalarFieldEnum,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UniformScalarFieldEnum: () => UniformScalarFieldEnum,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.9.1",
  engine: "e922089b7d7502aff4249d5da3420f6fa55fc6ad"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  AcademicRules: "AcademicRules",
  Achievement: "Achievement",
  Activity: "Activity",
  AdmissionTest: "AdmissionTest",
  Apply: "Apply",
  Calendar: "Calendar",
  Committee: "Committee",
  Event: "Event",
  Gallery: "Gallery",
  MissionVision: "MissionVision",
  News: "News",
  Notice: "Notice",
  RegistrationSystem: "RegistrationSystem",
  Routine: "Routine",
  ExamSchedule: "ExamSchedule",
  SiteConfig: "SiteConfig",
  Staff: "Staff",
  Student: "Student",
  Teacher: "Teacher",
  Uniform: "Uniform",
  User: "User",
  Study: "Study"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var AcademicRulesScalarFieldEnum = {
  id: "id",
  title: "title",
  description: "description",
  isActive: "isActive",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  siteConfigId: "siteConfigId"
};
var AchievementScalarFieldEnum = {
  id: "id",
  title: "title",
  description: "description",
  cover: "cover",
  coverPublicId: "coverPublicId",
  isActive: "isActive",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  udpatedAt: "udpatedAt",
  siteConfigId: "siteConfigId"
};
var ActivityScalarFieldEnum = {
  id: "id",
  title: "title",
  description: "description",
  isActive: "isActive",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  siteConfigId: "siteConfigId"
};
var AdmissionTestScalarFieldEnum = {
  id: "id",
  title: "title",
  description: "description",
  isActive: "isActive",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  siteConfigId: "siteConfigId"
};
var ApplyScalarFieldEnum = {
  id: "id",
  title: "title",
  description: "description",
  isActive: "isActive",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  siteConfigId: "siteConfigId"
};
var CalendarScalarFieldEnum = {
  id: "id",
  title: "title",
  description: "description",
  file: "file",
  filePublicId: "filePublicId",
  publishedDate: "publishedDate",
  isActive: "isActive",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  siteConfigId: "siteConfigId"
};
var CommitteeScalarFieldEnum = {
  id: "id",
  committeeId: "committeeId",
  name: "name",
  email: "email",
  status: "status",
  designation: "designation",
  message: "message",
  fatherName: "fatherName",
  motherName: "motherName",
  nationalId: "nationalId",
  bio: "bio",
  phone: "phone",
  qualification: "qualification",
  experience: "experience",
  presentAddress: "presentAddress",
  permanentAddress: "permanentAddress",
  startingDate: "startingDate",
  endingDate: "endingDate",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  userId: "userId",
  siteConfigId: "siteConfigId"
};
var EventScalarFieldEnum = {
  id: "id",
  title: "title",
  description: "description",
  startDate: "startDate",
  endDate: "endDate",
  location: "location",
  isActive: "isActive",
  coverImage: "coverImage",
  coverImagePublicId: "coverImagePublicId",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  siteConfigId: "siteConfigId"
};
var GalleryScalarFieldEnum = {
  id: "id",
  file: "file",
  filePublicId: "filePublicId",
  isActive: "isActive",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  eventId: "eventId",
  achievementId: "achievementId"
};
var MissionVisionScalarFieldEnum = {
  id: "id",
  mission: "mission",
  vision: "vision",
  isActive: "isActive",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  siteConfigId: "siteConfigId"
};
var NewsScalarFieldEnum = {
  id: "id",
  title: "title",
  content: "content",
  file: "file",
  filePublicId: "filePublicId",
  isActive: "isActive",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  siteConfigId: "siteConfigId"
};
var NoticeScalarFieldEnum = {
  id: "id",
  title: "title",
  content: "content",
  file: "file",
  filePublicId: "filePublicId",
  isActive: "isActive",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  siteConfigId: "siteConfigId"
};
var RegistrationSystemScalarFieldEnum = {
  id: "id",
  title: "title",
  description: "description",
  isActive: "isActive",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  siteConfigId: "siteConfigId"
};
var RoutineScalarFieldEnum = {
  id: "id",
  title: "title",
  description: "description",
  file: "file",
  filePublicId: "filePublicId",
  isActive: "isActive",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  siteConfigId: "siteConfigId"
};
var ExamScheduleScalarFieldEnum = {
  id: "id",
  title: "title",
  description: "description",
  file: "file",
  filePublicId: "filePublicId",
  isActive: "isActive",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  siteConfigId: "siteConfigId"
};
var SiteConfigScalarFieldEnum = {
  id: "id",
  email: "email",
  schoolName: "schoolName",
  logo: "logo",
  logoPublicId: "logoPublicId",
  address: "address",
  eiin: "eiin",
  estdYear: "estdYear",
  isActive: "isActive",
  facebookUrl: "facebookUrl",
  youtubeUrl: "youtubeUrl",
  linkdinUrl: "linkdinUrl",
  twitterUrl: "twitterUrl",
  instagramUrl: "instagramUrl",
  theme: "theme",
  darkTheme: "darkTheme",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var StaffScalarFieldEnum = {
  id: "id",
  staff_id: "staff_id",
  name: "name",
  email: "email",
  status: "status",
  fatherName: "fatherName",
  motherName: "motherName",
  nationalId: "nationalId",
  phone: "phone",
  bio: "bio",
  designation: "designation",
  qualification: "qualification",
  experience: "experience",
  startingDate: "startingDate",
  endingDate: "endingDate",
  presentAddress: "presentAddress",
  permanemtAddress: "permanemtAddress",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  userId: "userId",
  siteConfigId: "siteConfigId"
};
var StudentScalarFieldEnum = {
  id: "id",
  studentId: "studentId",
  name: "name",
  email: "email",
  status: "status",
  admissionDate: "admissionDate",
  academicYear: "academicYear",
  class: "class",
  section: "section",
  role: "role",
  group: "group",
  shift: "shift",
  dateOfBirth: "dateOfBirth",
  gender: "gender",
  bloodGroup: "bloodGroup",
  religion: "religion",
  nationality: "nationality",
  phone: "phone",
  presentAddress: "presentAddress",
  permanentAddress: "permanentAddress",
  fatherName: "fatherName",
  fatherPhone: "fatherPhone",
  motherName: "motherName",
  motherPhone: "motherPhone",
  guardianName: "guardianName",
  guardianRelation: "guardianRelation",
  guardianPhone: "guardianPhone",
  emergencyContact: "emergencyContact",
  previousSchool: "previousSchool",
  createdAt: "createdAt",
  udpatedAt: "udpatedAt",
  userId: "userId",
  siteConfigId: "siteConfigId"
};
var TeacherScalarFieldEnum = {
  id: "id",
  teacherId: "teacherId",
  name: "name",
  email: "email",
  designation: "designation",
  joiningDate: "joiningDate",
  endingDate: "endingDate",
  employmentType: "employmentType",
  salary: "salary",
  status: "status",
  department: "department",
  subject: "subject",
  highestDegree: "highestDegree",
  specialization: "specialization",
  experienceYears: "experienceYears",
  fatherName: "fatherName",
  motherName: "motherName",
  dateOfBirth: "dateOfBirth",
  gender: "gender",
  bloodGroup: "bloodGroup",
  religion: "religion",
  nationality: "nationality",
  phone: "phone",
  presentAddress: "presentAddress",
  permanentAddress: "permanentAddress",
  bankName: "bankName",
  bankAccount: "bankAccount",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  userId: "userId",
  siteConfigId: "siteConfigId"
};
var UniformScalarFieldEnum = {
  id: "id",
  title: "title",
  description: "description",
  file: "file",
  filePublicId: "filePublicId",
  isActive: "isActive",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  siteConfigId: "siteConfigId"
};
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  password: "password",
  profileImage: "profileImage",
  imagePublicId: "imagePublicId",
  googleId: "googleId",
  authProvider: "authProvider",
  emailVerified: "emailVerified",
  role: "role",
  status: "status",
  needPasswordChange: "needPasswordChange",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  siteConfigId: "siteConfigId"
};
var StudyScalarFieldEnum = {
  id: "id",
  title: "title",
  description: "description",
  isActive: "isActive",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  siteConfigId: "siteConfigId"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var NullableJsonNullValueInput = {
  DbNull: DbNull2,
  JsonNull: JsonNull2
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var JsonNullValueFilter = {
  DbNull: DbNull2,
  JsonNull: JsonNull2,
  AnyNull: AnyNull2
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/enums.ts
var Role = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  TEACHER: "TEACHER",
  STUDENT: "STUDENT",
  COMMITTEE: "COMMITTEE",
  STAFF: "STAFF"
};
var UserStatus = {
  ACTIVE: "ACTIVE",
  BLOCKED: "BLOCKED",
  DELETED: "DELETED"
};

// generated/prisma/client.ts
globalThis["__dirname"] = path2.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/app/utils/AppError.ts
var AppError = class extends Error {
  statusCode;
  constructor(statusCode, message, stack = "") {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};

// src/app/middleware/globalErrorHandler.ts
var globalErrorHandler = async (err, _req, res, _next) => {
  if (env_default.node_env === "development") {
    console.log("Error from Global Error Handler", err);
  }
  let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  let errorMessage = err.message || "Internal Server Error";
  let errorName = err.name || "Internal Server Error";
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = httpStatus.BAD_REQUEST;
    errorMessage = "You have provided incorrect field type or missing fields";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = httpStatus.BAD_REQUEST, errorMessage = "Duplicate Key Error";
    } else if (err.code === "P2003") {
      statusCode = httpStatus.BAD_REQUEST, errorMessage = "Foreign key constraint failed";
    } else if (err.code === "P2025") {
      statusCode = httpStatus.BAD_REQUEST, errorMessage = "An operation failed because it depends on one or more records that were required but not found.";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = httpStatus.UNAUTHORIZED;
      errorMessage = "Authentication failed against database server. Please Check Your Credentials";
    } else if (err.errorCode === "P1001") {
      statusCode = httpStatus.BAD_REQUEST;
      errorMessage = "Can't reach database server";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    errorMessage = "Error occurred during query execution";
  } else if (err instanceof AppError) {
    errorMessage = err.message;
    statusCode = err.statusCode;
  } else if (err instanceof Error) {
    errorMessage = err.message;
  }
  res.status(statusCode).json({
    success: false,
    statusCode: statusCode || httpStatus.INTERNAL_SERVER_ERROR,
    name: env_default.node_env === "development" ? errorName : "Internal Server Error",
    message: env_default.node_env === "development" ? errorMessage : "Internal Server Error",
    error: env_default.node_env === "development" ? err : void 0,
    stack: env_default.node_env === "development" ? err.stack : void 0
  });
};

// src/app/middleware/notFound.ts
import httpStatus2 from "http-status";
var notFound = (req, res) => {
  res.status(httpStatus2.NOT_FOUND).json({
    message: "Route not found",
    path: req.originalUrl,
    date: /* @__PURE__ */ new Date()
  });
};

// src/app/module/auth/auth.route.ts
import { Router } from "express";

// src/app/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/app/utils/catchAsync.ts
var catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

// src/app/utils/jwt.ts
import jwt from "jsonwebtoken";
var createToken = (payload, secret, expiresIn) => {
  const token = jwt.sign(
    payload,
    secret,
    {
      expiresIn
    }
  );
  return token;
};
var verifyToken = (token, secret) => {
  try {
    const verifiedToken = jwt.verify(token, secret);
    return {
      success: true,
      data: verifiedToken
    };
  } catch (error) {
    console.log("Token verification failed:", error);
    return {
      success: false,
      error: error.message
    };
  }
};
var jwtUtils = {
  createToken,
  verifyToken
};

// src/app/middleware/checkAuth.ts
import httpStatus3 from "http-status";
var auth = (...requiredRoles) => {
  return catchAsync(
    async (req, res, next) => {
      const token = req.cookies.accessToken ? req.cookies.accessToken : req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization?.split(" ")[1] : req.headers.authorization;
      if (!token) {
        throw new AppError(httpStatus3.UNAUTHORIZED, "You are not logged in. Please log in to access this resource.");
      }
      const verifiedToken = jwtUtils.verifyToken(token, env_default.jwt_access_secret);
      if (!verifiedToken.success) {
        throw new Error(verifiedToken.error);
      }
      const { email, name, userId, role } = verifiedToken.data;
      if (requiredRoles.length && !requiredRoles.includes(role)) {
        throw new AppError(httpStatus3.FORBIDDEN, "Forbidden. You don't have permission to access this resource.");
      }
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
          email,
          name,
          role
        }
      });
      if (!user) {
        throw new AppError(httpStatus3.NOT_FOUND, "User not found. Please log in again.");
      }
      if (user.status === UserStatus.BLOCKED) {
        throw new AppError(httpStatus3.BAD_REQUEST, "Your account has been blocked. Please contact support.");
      }
      req.user = {
        email,
        name,
        userId,
        role
      };
      next();
    }
  );
};

// src/app/module/auth/auth.controller.ts
import httpStatus5 from "http-status";

// src/app/utils/sendResponse.ts
var sendResponse = (res, data) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
    meta: data.meta
  });
};
var successResponse = (res, statusCode, message, data, meta) => {
  const response = {
    success: true,
    statusCode,
    message: message || "Request completed successfully",
    data,
    meta
  };
  res.status(statusCode).json(response);
};

// src/app/module/auth/auth.service.ts
import bcrypt from "bcryptjs";
import httpStatus4 from "http-status";
var loginUser = async (payload, siteConfigId) => {
  const { email, password } = payload;
  const isConfig = await prisma.siteConfig.findUnique({
    where: { id: siteConfigId }
  });
  if (!isConfig) {
    throw new AppError(httpStatus4.NOT_FOUND, "siteConfig not found");
  }
  const user = await prisma.user.findUnique({
    where: { email }
  });
  if (!user) {
    throw new AppError(httpStatus4.NOT_FOUND, "User not found");
  }
  if (user.status === UserStatus.BLOCKED) {
    throw new AppError(httpStatus4.FORBIDDEN, "User is blocked");
  }
  if (user.isDeleted || user.status === UserStatus.DELETED) {
    throw new AppError(httpStatus4.FORBIDDEN, "User is deleted");
  }
  if (user.password === null && user.googleId !== null) {
    throw new AppError(
      httpStatus4.BAD_REQUEST,
      "User already has an account with google. please try to login with google"
    );
  }
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new AppError(httpStatus4.UNAUTHORIZED, "Invalid credentials");
  }
  const jwtPayload = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    env_default.jwt_access_secret,
    env_default.jwt_access_expires_in
  );
  const refreshToken3 = jwtUtils.createToken(
    jwtPayload,
    env_default.jwt_refresh_secret,
    env_default.jwt_refresh_expires_in
  );
  return {
    accessToken,
    refreshToken: refreshToken3
  };
};
var getMe = async (user) => {
  const isUserExists = await prisma.user.findUnique({
    where: {
      id: user.userId
    },
    omit: {
      password: true
    }
  });
  if (!isUserExists) {
    throw new AppError(httpStatus4.NOT_FOUND, "User not found");
  }
  return isUserExists;
};
var refreshToken = async (token) => {
  const verifiedRefreshToken = jwtUtils.verifyToken(token, env_default.jwt_refresh_secret);
  if (!verifiedRefreshToken.success || !verifiedRefreshToken.data) {
    throw new Error(env_default.node_env === "development" ? verifiedRefreshToken.error : "Invalid refresh token");
  }
  const data = verifiedRefreshToken.data;
  const user = await prisma.user.findUnique({
    where: { id: data.userId }
  });
  if (!user || user.isDeleted || user.status !== UserStatus.ACTIVE) {
    throw new Error("User is inactive or not found");
  }
  const jwtPayload = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    env_default.jwt_access_secret,
    env_default.jwt_access_expires_in
  );
  const refreshToken3 = jwtUtils.createToken(
    jwtPayload,
    env_default.jwt_refresh_secret,
    env_default.jwt_refresh_expires_in
  );
  return {
    accessToken,
    refreshToken: refreshToken3
  };
};
var AuthService = {
  loginUser,
  getMe,
  refreshToken
};

// src/app/module/auth/auth.controller.ts
var loginUser2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const { siteConfigId } = req.params;
  console.log("site config params ", siteConfigId);
  const result = await AuthService.loginUser(payload, siteConfigId);
  const { accessToken, refreshToken: refreshToken3 } = result;
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: env_default.node_env === "production",
    sameSite: env_default.node_env === "production" ? "none" : "lax",
    maxAge: 1e3 * 60 * 60 * 24
    // 24 hour or 1 day
  });
  res.cookie("refreshToken", refreshToken3, {
    httpOnly: true,
    secure: env_default.node_env === "production",
    sameSite: env_default.node_env === "production" ? "none" : "lax",
    maxAge: 1e3 * 60 * 60 * 24 * 7
    // 7 days
  });
  sendResponse(res, {
    statusCode: httpStatus5.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      accessToken,
      refreshToken: refreshToken3
    }
  });
});
var getMe2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new Error("User information is missing in the request");
  }
  const result = await AuthService.getMe(user);
  sendResponse(res, {
    statusCode: httpStatus5.OK,
    success: true,
    message: "User profile fetched successfully",
    data: result
  });
});
var refreshToken2 = catchAsync(async (req, res) => {
  if (!req.cookies.refreshToken) {
    throw new Error("Refresh token is missing");
  }
  const result = await AuthService.refreshToken(req.cookies.refreshToken);
  const { accessToken, refreshToken: newRefreshToken } = result;
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: env_default.node_env === "production",
    sameSite: env_default.node_env === "production" ? "none" : "lax",
    maxAge: 1e3 * 60 * 60 * 24
    // 24 hour or 1 day
  });
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: env_default.node_env === "production",
    sameSite: env_default.node_env === "production" ? "none" : "lax",
    maxAge: 1e3 * 60 * 60 * 24 * 7
    // 7 days
  });
  sendResponse(res, {
    statusCode: httpStatus5.OK,
    success: true,
    message: "New tokens generated successfully",
    data: {
      accessToken,
      refreshToken: newRefreshToken
    }
  });
});
var AuthController = {
  loginUser: loginUser2,
  getMe: getMe2,
  refreshToken: refreshToken2
};

// src/app/module/auth/auth.route.ts
var router = Router({ mergeParams: true });
router.post("/login", AuthController.loginUser);
router.get(
  "/me",
  auth(Role.ADMIN, Role.COMMITTEE, Role.STAFF, Role.STUDENT, Role.SUPER_ADMIN, Role.TEACHER),
  AuthController.getMe
);
router.post("/refresh-token", AuthController.refreshToken);
var AuthRoutes = router;

// src/app/module/teacher/teacher.route.ts
import { Router as Router2 } from "express";

// src/app/module/teacher/teacher.service.ts
import bcrypt2 from "bcryptjs";
import httpStatus7 from "http-status";

// src/app/lib/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
cloudinary.config({
  cloud_name: env_default.cloudinary_cloud_name,
  api_key: env_default.cloudinary_api_key,
  api_secret: env_default.cloudinary_api_secret
});
var storage = multer.memoryStorage();
var upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10
    // 10 MB
  }
});
var Cloudinary = {
  cloudinary,
  upload
};

// src/app/utils/cloudinary.ts
import httpStatus6 from "http-status";
var createFile = async (file, path3, type) => {
  const cloudinaryRes = await new Promise(
    (resolve, reject) => {
      Cloudinary.cloudinary.uploader.upload_stream(
        {
          folder: path3,
          resource_type: type ?? "auto"
        },
        async (error, result) => {
          if (error) {
            return reject(error);
          }
          if (!result) {
            return reject(
              new AppError(
                httpStatus6.BAD_GATEWAY,
                "No result returned from cloudinary"
              )
            );
          }
          return resolve(result);
        }
      ).end(file.buffer);
    }
  );
  return cloudinaryRes;
};
var createFiles = async (files, path3, type) => {
  const cloudinaryRes = await Promise.all(
    files.map(
      (file) => {
        return new Promise(
          (resolve, reject) => {
            Cloudinary.cloudinary.uploader.upload_stream(
              {
                folder: path3,
                resource_type: type ?? "auto"
              },
              async (error, result) => {
                if (error) {
                  return reject(error);
                }
                if (!result) {
                  return reject(
                    new AppError(
                      httpStatus6.BAD_GATEWAY,
                      "No result returned from cloudinary"
                    )
                  );
                }
              }
            ).end(file.buffer);
          }
        );
      }
    )
  );
  return cloudinaryRes;
};

// src/app/module/teacher/teacher.service.ts
var createTeacher = async (payload, profile, siteConfigId) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: siteConfigId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus7.NOT_FOUND, "Site config not found");
  }
  const randomPass = Math.random().toString(36).slice(-8);
  console.log("pass", randomPass);
  const hasPass = await bcrypt2.hash(randomPass, Number(env_default.bcrypt_salt_rounds));
  console.log("ok");
  const profileRes = profile ? await createFile(profile, "Modern-School/Profile") : null;
  const createUser = await prisma.user.create({
    data: {
      siteConfigId,
      email: payload.email,
      name: payload.name,
      password: hasPass,
      role: "TEACHER",
      needPasswordChange: true,
      profileImage: profileRes ? profileRes.secure_url : null,
      imagePublicId: profileRes ? profileRes.public_id : null,
      teacher: {
        create: {
          siteConfigId,
          ...payload
        }
      }
    },
    omit: {
      password: true
    },
    include: {
      teacher: true
    }
  });
  return createUser;
};
var getAllTeacher = async (query, siteConfigId) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: siteConfigId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus7.NOT_FOUND, "site config not found");
  }
  const andConditions = [
    {
      siteConfigId
    }
  ];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: query.search,
            mode: "insensitive"
          }
        },
        {
          bankName: {
            contains: query.search,
            mode: "insensitive"
          }
        },
        {
          highestDegree: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (query.department) {
    andConditions.push({
      department: query.department
    });
  }
  if (query.designation) {
    andConditions.push({
      designation: query.designation
    });
  }
  if (query.bloodGroup) {
    andConditions.push({
      bloodGroup: query.bloodGroup
    });
  }
  if (query.employmentType) {
    andConditions.push({
      employmentType: query.eploymentType
    });
  }
  if (query.gender) {
    andConditions.push({
      gender: query.gender
    });
  }
  if (query.religin) {
    andConditions.push({
      religion: query.religion
    });
  }
  if (query.status) {
    andConditions.push({
      status: query.status
    });
  }
  const teachers = await prisma.teacher.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }
  });
  const total = await prisma.teacher.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    teachers,
    meta
  };
};
var getTeachers = async (query, siteConfigId) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: siteConfigId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus7.NOT_FOUND, "site config not found");
  }
  const andConditions = [
    {
      siteConfigId
    },
    {
      status: "ACTIVE"
    },
    {
      user: {
        status: "ACTIVE"
      }
    },
    {
      user: {
        isDeleted: false
      }
    }
  ];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: query.search,
            mode: "insensitive"
          }
        },
        {
          highestDegree: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (query.department) {
    andConditions.push({
      department: query.department
    });
  }
  if (query.designation) {
    andConditions.push({
      designation: query.designation
    });
  }
  if (query.employmentType) {
    andConditions.push({
      employmentType: query.eploymentType
    });
  }
  if (query.gender) {
    andConditions.push({
      gender: query.gender
    });
  }
  if (query.religin) {
    andConditions.push({
      religion: query.religion
    });
  }
  const teachers = await prisma.teacher.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    },
    omit: {
      bankAccount: true,
      bankName: true,
      phone: true,
      salary: true,
      siteConfigId: true,
      userId: true
    }
  });
  const total = await prisma.teacher.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    teachers,
    meta
  };
};
var getSingleTeacher = async (id, siteConfigId) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: siteConfigId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus7.NOT_FOUND, "site config not found");
  }
  const teacher = await prisma.teacher.findUnique({
    where: {
      id,
      user: {
        status: "ACTIVE",
        isDeleted: false
      },
      status: "ACTIVE"
    },
    omit: {
      bankAccount: true,
      bankName: true,
      phone: true,
      salary: true,
      siteConfigId: true,
      userId: true
    }
  });
  return teacher;
};
var updatedTeacher = async (payload, id, siteConfigId) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: siteConfigId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus7.NOT_FOUND, "site config not found");
  }
  const teacher = await prisma.teacher.findUnique({
    where: {
      id
    }
  });
  if (!teacher) {
    throw new AppError(httpStatus7.NOT_FOUND, "techer not found");
  }
  const udpateTeacher = await prisma.teacher.update({
    where: {
      id
    },
    data: {
      ...payload
    }
  });
  return udpateTeacher;
};
var deleteTeacher = async (id, siteConfigId) => {
  const transection = await prisma.$transaction(
    async (tx) => {
      const isConfig = await tx.siteConfig.findUnique({
        where: {
          id: siteConfigId
        }
      });
      if (!isConfig) {
        throw new AppError(httpStatus7.NOT_FOUND, "site config not found");
      }
      const teacher = await tx.teacher.findUnique({
        where: {
          id
        },
        select: {
          userId: true
        }
      });
      if (!teacher) {
        throw new AppError(httpStatus7.NOT_FOUND, "techer not found");
      }
      await tx.user.update({
        where: {
          id: teacher.userId
        },
        data: {
          isDeleted: true,
          status: "DELETED"
        }
      });
      await tx.teacher.update({
        where: {
          id
        },
        data: {
          status: "DELETED"
        }
      });
    },
    {
      maxWait: 1e4,
      timeout: 14e3
    }
  );
};
var teacherService = {
  createTeacher,
  getAllTeacher,
  getTeachers,
  getSingleTeacher,
  deleteTeacher,
  updatedTeacher
};

// src/app/module/teacher/teacher.controller.ts
import httpStatus8 from "http-status";
var createTeacher2 = catchAsync(
  async (req, res) => {
    const profile = req.file;
    console.log("profile", profile);
    if (!req.body.data) {
      throw new AppError(httpStatus8.BAD_REQUEST, "form data not found");
    }
    const data = JSON.parse(req.body.data);
    const siteConfigId = req.params.siteConfigId;
    const result = await teacherService.createTeacher(data, profile, siteConfigId);
    sendResponse(res, {
      statusCode: httpStatus8.CREATED,
      success: true,
      message: "Teacher created successfully",
      data: result
    });
  }
);
var getAllTeacher2 = catchAsync(
  async (req, res) => {
    const { siteConfigId } = req.params;
    const query = req.query;
    const { teachers, meta } = await teacherService.getAllTeacher(query, siteConfigId);
    if (teachers.length === 0) {
      throw new AppError(httpStatus8.NOT_FOUND, "teachers not found");
    }
    sendResponse(res, {
      statusCode: httpStatus8.OK,
      success: true,
      message: "Teachers retrive successfully",
      data: teachers,
      meta
    });
  }
);
var getTeachers2 = catchAsync(
  async (req, res) => {
    const { siteConfigId } = req.params;
    const query = req.query;
    const { teachers, meta } = await teacherService.getTeachers(query, siteConfigId);
    if (teachers.length === 0) {
      throw new AppError(httpStatus8.NOT_FOUND, "teachers not found");
    }
    sendResponse(res, {
      statusCode: httpStatus8.OK,
      success: true,
      message: "Teachers retrive successfully",
      data: teachers,
      meta
    });
  }
);
var getSingleTeacher2 = catchAsync(
  async (req, res) => {
    const { siteConfigId } = req.params;
    const id = req.params.id;
    const result = await teacherService.getSingleTeacher(id, siteConfigId);
    if (!result) {
      throw new AppError(httpStatus8.NOT_FOUND, "teachers not found");
    }
    sendResponse(res, {
      statusCode: httpStatus8.OK,
      success: true,
      message: "Teachers retrive successfully",
      data: result
    });
  }
);
var deleteTeacher2 = catchAsync(
  async (req, res) => {
    const { siteConfigId } = req.params;
    const id = req.params.id;
    const result = await teacherService.deleteTeacher(id, siteConfigId);
    sendResponse(res, {
      statusCode: httpStatus8.OK,
      success: true,
      message: "Teachers deleted successfully successfully",
      data: null
    });
  }
);
var updatedTeacher2 = catchAsync(
  async (req, res) => {
    const { siteConfigId } = req.params;
    const id = req.params.id;
    const body = req.body;
    const result = await teacherService.updatedTeacher(body, id, siteConfigId);
    sendResponse(res, {
      statusCode: httpStatus8.OK,
      success: true,
      message: "Teacher updated successfully",
      data: result
    });
  }
);
var teacherController = {
  createTeacher: createTeacher2,
  getAllTeacher: getAllTeacher2,
  getTeachers: getTeachers2,
  getSingleTeacher: getSingleTeacher2,
  deleteTeacher: deleteTeacher2,
  updatedTeacher: updatedTeacher2
};

// src/app/module/teacher/teacher.route.ts
var route = Router2({ mergeParams: true });
route.post(
  "/",
  auth(Role.SUPER_ADMIN, Role.ADMIN),
  Cloudinary.upload.single("profile"),
  teacherController.createTeacher
);
route.get(
  "/",
  teacherController.getTeachers
);
route.get(
  "/all-teachers",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  teacherController.getAllTeacher
);
route.get(
  "/:id",
  teacherController.getSingleTeacher
);
route.patch(
  "/:id",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  teacherController.deleteTeacher
);
route.put(
  "/:id",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  teacherController.updatedTeacher
);
var teacherRouter = route;

// src/app/module/staff/staff.route.ts
import { Router as Router3 } from "express";

// src/app/module/staff/staff.service.ts
import bcrypt3 from "bcryptjs";
import httpStatus9 from "http-status";
var createStaff = async (payload, profile, siteConfigId) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: siteConfigId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus9.NOT_FOUND, "Site config not found");
  }
  const randomPass = Math.random().toString(36).slice(-8);
  const hasPass = await bcrypt3.hash(randomPass, Number(env_default.bcrypt_salt_rounds));
  const profileRes = profile ? await createFile(profile, "Modern-School/Profile") : null;
  const createUser = await prisma.user.create({
    data: {
      siteConfigId,
      email: payload.email,
      name: payload.name,
      password: hasPass,
      role: "STAFF",
      needPasswordChange: true,
      profileImage: profileRes ? profileRes.secure_url : null,
      imagePublicId: profileRes ? profileRes.public_id : null,
      staff: {
        create: {
          siteConfigId,
          ...payload
        }
      }
    },
    omit: {
      password: true
    },
    include: {
      staff: true
    }
  });
  return createUser;
};
var getAllStaff = async (query, siteConfigId) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: siteConfigId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus9.NOT_FOUND, "site config not found");
  }
  const andConditions = [
    {
      siteConfigId
    }
  ];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: query.search,
            mode: "insensitive"
          }
        },
        {
          email: {
            contains: query.search,
            mode: "insensitive"
          }
        },
        {
          staff_id: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (query.designation) {
    andConditions.push({
      designation: query.designation
    });
  }
  if (query.status) {
    andConditions.push({
      status: query.status
    });
  }
  const staff = await prisma.staff.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }
  });
  const total = await prisma.staff.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    staff,
    meta
  };
};
var getStaffs = async (query, siteConfigId) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: siteConfigId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus9.NOT_FOUND, "site config not found");
  }
  const andConditions = [
    {
      siteConfigId
    },
    {
      status: "ACTIVE"
    }
  ];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: query.search,
            mode: "insensitive"
          }
        },
        {
          email: {
            contains: query.search,
            mode: "insensitive"
          }
        },
        {
          staff_id: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (query.designation) {
    andConditions.push({
      designation: query.designation
    });
  }
  const staff = await prisma.staff.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    },
    omit: {
      phone: true,
      siteConfigId: true,
      userId: true,
      nationalId: true
    }
  });
  const total = await prisma.staff.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    staff,
    meta
  };
};
var getSingleStaff = async (id, siteConfigId) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: siteConfigId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus9.NOT_FOUND, "site config not found");
  }
  const staff = await prisma.staff.findUnique({
    where: {
      id,
      status: "ACTIVE",
      user: {
        isDeleted: false
      }
    },
    omit: {
      phone: true,
      siteConfigId: true,
      userId: true,
      nationalId: true
    }
  });
  return staff;
};
var updatedStaff = async (payload, id, siteConfigId) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: siteConfigId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus9.NOT_FOUND, "site config not found");
  }
  const staff = await prisma.staff.findUnique({
    where: {
      id
    }
  });
  if (!staff) {
    throw new AppError(httpStatus9.NOT_FOUND, "staff not found");
  }
  const updateStaff = await prisma.staff.update({
    where: {
      id
    },
    data: {
      ...payload
    }
  });
  return updateStaff;
};
var deleteStaff = async (id, siteConfigId) => {
  const transection = await prisma.$transaction(
    async (tx) => {
      const isConfig = await tx.siteConfig.findUnique({
        where: {
          id: siteConfigId
        }
      });
      if (!isConfig) {
        throw new AppError(httpStatus9.NOT_FOUND, "site config not found");
      }
      const staff = await tx.staff.findUnique({
        where: {
          id
        },
        include: {
          user: true
        }
      });
      if (!staff) {
        throw new AppError(httpStatus9.NOT_FOUND, "staff not found");
      }
      if (staff.user.isDeleted) {
        throw new AppError(httpStatus9.BAD_REQUEST, "staff already deleted");
      }
      await tx.user.update({
        where: {
          id: staff.userId
        },
        data: {
          isDeleted: true
        }
      });
      await tx.staff.update({
        where: {
          id
        },
        data: {
          status: "DELETED"
        }
      });
    },
    {
      maxWait: 1e4,
      timeout: 15e3
    }
  );
};
var staffService = {
  createStaff,
  getAllStaff,
  getStaffs,
  getSingleStaff,
  deleteStaff,
  updatedStaff
};

// src/app/module/staff/staff.controller.ts
import httpStatus10 from "http-status";
var createStaff2 = catchAsync(
  async (req, res) => {
    if (!req.body.data) {
      throw new AppError(httpStatus10.BAD_REQUEST, "form data not found");
    }
    const siteConfigId = req.params.siteConfigId;
    const profile = req.file;
    const data = JSON.parse(req.body.data);
    const result = await staffService.createStaff(data, profile, siteConfigId);
    sendResponse(res, {
      statusCode: httpStatus10.OK,
      success: true,
      message: "Staff created successfully",
      data: result
    });
  }
);
var getAllStaff2 = catchAsync(
  async (req, res) => {
    const { siteConfigId } = req.params;
    const query = req.query;
    const { staff, meta } = await staffService.getAllStaff(query, siteConfigId);
    if (staff.length === 0) {
      throw new AppError(httpStatus10.NOT_FOUND, "staff not found");
    }
    sendResponse(res, {
      statusCode: httpStatus10.OK,
      success: true,
      message: "Staff retrieved successfully",
      data: staff,
      meta
    });
  }
);
var getStaffs2 = catchAsync(
  async (req, res) => {
    const { siteConfigId } = req.params;
    const query = req.query;
    const { staff, meta } = await staffService.getStaffs(query, siteConfigId);
    if (staff.length === 0) {
      throw new AppError(httpStatus10.NOT_FOUND, "staff not found");
    }
    sendResponse(res, {
      statusCode: httpStatus10.OK,
      success: true,
      message: "Staff retrieved successfully",
      data: staff,
      meta
    });
  }
);
var getSingleStaff2 = catchAsync(
  async (req, res) => {
    const { siteConfigId } = req.params;
    const id = req.params.id;
    const result = await staffService.getSingleStaff(id, siteConfigId);
    if (!result) {
      throw new AppError(httpStatus10.NOT_FOUND, "staff not found");
    }
    sendResponse(res, {
      statusCode: httpStatus10.OK,
      success: true,
      message: "Staff retrieved successfully",
      data: result
    });
  }
);
var deleteStaff2 = catchAsync(
  async (req, res) => {
    const { siteConfigId } = req.params;
    const id = req.params.id;
    const result = await staffService.deleteStaff(id, siteConfigId);
    sendResponse(res, {
      statusCode: httpStatus10.OK,
      success: true,
      message: "Staff deleted successfully",
      data: null
    });
  }
);
var updatedStaff2 = catchAsync(
  async (req, res) => {
    const { siteConfigId } = req.params;
    const id = req.params.id;
    const body = req.body;
    const result = await staffService.updatedStaff(body, id, siteConfigId);
    sendResponse(res, {
      statusCode: httpStatus10.OK,
      success: true,
      message: "Staff updated successfully",
      data: result
    });
  }
);
var staffController = {
  createStaff: createStaff2,
  getAllStaff: getAllStaff2,
  getStaffs: getStaffs2,
  getSingleStaff: getSingleStaff2,
  deleteStaff: deleteStaff2,
  updatedStaff: updatedStaff2
};

// src/app/module/staff/staff.route.ts
var route2 = Router3({ mergeParams: true });
route2.post(
  "/",
  Cloudinary.upload.single("profile"),
  auth(Role.SUPER_ADMIN, Role.ADMIN),
  staffController.createStaff
);
route2.get(
  "/",
  staffController.getStaffs
);
route2.get(
  "/all-staff",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  staffController.getAllStaff
);
route2.get(
  "/:id",
  staffController.getSingleStaff
);
route2.patch(
  "/:id",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  staffController.deleteStaff
);
route2.put(
  "/:id",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  staffController.updatedStaff
);
var staffRouter = route2;

// src/app/module/committee/committee.route.ts
import { Router as Router4 } from "express";

// src/app/module/committee/committee.service.ts
import bcrypt4 from "bcryptjs";
import httpStatus11 from "http-status";
var createCommittee = async (payload, profile, siteConfigId) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: siteConfigId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus11.NOT_FOUND, "Site config not found");
  }
  const randomPass = Math.random().toString(36).slice(-8);
  const hasPass = await bcrypt4.hash(randomPass, Number(env_default.bcrypt_salt_rounds));
  const profileRes = profile ? await createFile(profile, "Modern-School/Profile") : null;
  const createUser = await prisma.user.create({
    data: {
      siteConfigId,
      email: payload.email,
      name: payload.name,
      password: hasPass,
      role: "COMMITTEE",
      needPasswordChange: true,
      profileImage: profileRes ? profileRes.secure_url : null,
      imagePublicId: profileRes ? profileRes.public_id : null,
      committee: {
        create: {
          siteConfigId,
          ...payload
        }
      }
    },
    omit: {
      password: true
    },
    include: {
      committee: true
    }
  });
  return createUser;
};
var getAllCommittee = async (query, siteConfigId) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: siteConfigId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus11.NOT_FOUND, "site config not found");
  }
  const andConditions = [
    {
      siteConfigId
    }
  ];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: query.search,
            mode: "insensitive"
          }
        },
        {
          email: {
            contains: query.search,
            mode: "insensitive"
          }
        },
        {
          committeeId: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (query.designation) {
    andConditions.push({
      designation: query.designation
    });
  }
  if (query.status) {
    andConditions.push({
      status: query.status
    });
  }
  const committee = await prisma.committee.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }
  });
  const total = await prisma.committee.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    committee,
    meta
  };
};
var getCommittee = async (query, siteConfigId) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: siteConfigId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus11.NOT_FOUND, "site config not found");
  }
  const andConditions = [
    {
      siteConfigId
    },
    {
      status: "ACTIVE"
    }
  ];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: query.search,
            mode: "insensitive"
          }
        },
        {
          email: {
            contains: query.search,
            mode: "insensitive"
          }
        },
        {
          committeeId: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (query.designation) {
    andConditions.push({
      designation: query.designation
    });
  }
  const committee = await prisma.committee.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    },
    omit: {
      phone: true,
      siteConfigId: true,
      userId: true,
      nationalId: true
    }
  });
  const total = await prisma.committee.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    committee,
    meta
  };
};
var getSingleCommittee = async (id, siteConfigId) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: siteConfigId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus11.NOT_FOUND, "site config not found");
  }
  const committee = await prisma.committee.findUnique({
    where: {
      id,
      status: "ACTIVE"
    },
    omit: {
      phone: true,
      siteConfigId: true,
      userId: true,
      nationalId: true
    }
  });
  return committee;
};
var updatedCommittee = async (payload, id, siteConfigId) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: siteConfigId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus11.NOT_FOUND, "site config not found");
  }
  const committee = await prisma.committee.findUnique({
    where: {
      id
    }
  });
  if (!committee) {
    throw new AppError(httpStatus11.NOT_FOUND, "committee not found");
  }
  const updateCommittee = await prisma.committee.update({
    where: {
      id
    },
    data: {
      ...payload
    }
  });
  return updateCommittee;
};
var deleteCommittee = async (id, siteConfigId) => {
  const transaction = await prisma.$transaction(
    async (tx) => {
      const isConfig = await tx.siteConfig.findUnique({
        where: {
          id: siteConfigId
        }
      });
      if (!isConfig) {
        throw new AppError(httpStatus11.NOT_FOUND, "site config not found");
      }
      const committee = await tx.committee.findUnique({
        where: {
          id
        },
        include: {
          user: true
        }
      });
      if (!committee) {
        throw new AppError(httpStatus11.NOT_FOUND, "committee not found");
      }
      if (committee.user.isDeleted) {
        throw new AppError(httpStatus11.BAD_REQUEST, "committee already deleted");
      }
      await tx.user.update({
        where: {
          id: committee.userId
        },
        data: {
          isDeleted: true
        }
      });
      await tx.committee.update({
        where: {
          id
        },
        data: {
          status: "DELETED"
        }
      });
    },
    {
      maxWait: 1e4,
      timeout: 15e3
    }
  );
};
var committeeService = {
  createCommittee,
  getAllCommittee,
  getCommittee,
  getSingleCommittee,
  deleteCommittee,
  updatedCommittee
};

// src/app/module/committee/committee.controller.ts
import httpStatus12 from "http-status";
var createCommittee2 = catchAsync(
  async (req, res) => {
    if (!req.body.data) {
      throw new AppError(httpStatus12.BAD_REQUEST, "form data not found");
    }
    const profile = req.file;
    const siteConfigId = req.params.siteConfigId;
    const data = JSON.parse(req.body.data);
    const result = await committeeService.createCommittee(data, profile, siteConfigId);
    sendResponse(res, {
      statusCode: httpStatus12.OK,
      success: true,
      message: "Committee created successfully",
      data: result
    });
  }
);
var getAllCommittee2 = catchAsync(
  async (req, res) => {
    const { siteConfigId } = req.params;
    const query = req.query;
    const { committee, meta } = await committeeService.getAllCommittee(query, siteConfigId);
    if (committee.length === 0) {
      throw new AppError(httpStatus12.NOT_FOUND, "committee not found");
    }
    sendResponse(res, {
      statusCode: httpStatus12.OK,
      success: true,
      message: "Committee retrieved successfully",
      data: committee,
      meta
    });
  }
);
var getCommittee2 = catchAsync(
  async (req, res) => {
    const { siteConfigId } = req.params;
    const query = req.query;
    const { committee, meta } = await committeeService.getCommittee(query, siteConfigId);
    if (committee.length === 0) {
      throw new AppError(httpStatus12.NOT_FOUND, "committee not found");
    }
    sendResponse(res, {
      statusCode: httpStatus12.OK,
      success: true,
      message: "Committee retrieved successfully",
      data: committee,
      meta
    });
  }
);
var getSingleCommittee2 = catchAsync(
  async (req, res) => {
    const { siteConfigId } = req.params;
    const id = req.params.id;
    const result = await committeeService.getSingleCommittee(id, siteConfigId);
    if (!result) {
      throw new AppError(httpStatus12.NOT_FOUND, "committee not found");
    }
    sendResponse(res, {
      statusCode: httpStatus12.OK,
      success: true,
      message: "Committee retrieved successfully",
      data: result
    });
  }
);
var deleteCommittee2 = catchAsync(
  async (req, res) => {
    const { siteConfigId } = req.params;
    const id = req.params.id;
    const result = await committeeService.deleteCommittee(id, siteConfigId);
    sendResponse(res, {
      statusCode: httpStatus12.OK,
      success: true,
      message: "Committee deleted successfully",
      data: null
    });
  }
);
var updatedCommittee2 = catchAsync(
  async (req, res) => {
    const { siteConfigId } = req.params;
    const id = req.params.id;
    const body = req.body;
    const result = await committeeService.updatedCommittee(body, id, siteConfigId);
    sendResponse(res, {
      statusCode: httpStatus12.OK,
      success: true,
      message: "Committee updated successfully",
      data: result
    });
  }
);
var committeeController = {
  createCommittee: createCommittee2,
  getAllCommittee: getAllCommittee2,
  getCommittee: getCommittee2,
  getSingleCommittee: getSingleCommittee2,
  deleteCommittee: deleteCommittee2,
  updatedCommittee: updatedCommittee2
};

// src/app/module/committee/committee.route.ts
var route3 = Router4({ mergeParams: true });
route3.post(
  "/",
  Cloudinary.upload.single("profile"),
  auth(Role.SUPER_ADMIN, Role.ADMIN),
  committeeController.createCommittee
);
route3.get(
  "/",
  committeeController.getCommittee
);
route3.get(
  "/all-committee",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  committeeController.getAllCommittee
);
route3.get(
  "/:id",
  committeeController.getSingleCommittee
);
route3.patch(
  "/:id",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  committeeController.deleteCommittee
);
route3.put(
  "/:id",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  committeeController.updatedCommittee
);
var committeeRouter = route3;

// src/app/module/siteConfig/siteConfig.route.ts
import { Router as Router5 } from "express";

// src/app/module/siteConfig/siteConfig.controller.ts
import httpStatus14 from "http-status";

// src/app/module/siteConfig/siteConfig.service.ts
import httpStatus13 from "http-status";
var createSiteConfig = async (payload, logo) => {
  const cloudinaryRes = await new Promise(
    (resolve, reject) => {
      Cloudinary.cloudinary.uploader.upload_stream(
        {
          folder: "Modern-School/SiteConfig/logo",
          resource_type: "auto"
        },
        async (error, result) => {
          if (error) {
            return reject(error);
          }
          if (!result) {
            return reject(
              new AppError(
                httpStatus13.BAD_GATEWAY,
                "No result returned from cloudinary"
              )
            );
          }
          return resolve(result);
        }
      ).end(logo.buffer);
    }
  );
  const config3 = await prisma.siteConfig.create({
    data: {
      ...payload,
      logo: cloudinaryRes.secure_url,
      logoPublicId: cloudinaryRes.public_id
    }
  });
  return config3;
};
var getAllSiteConfig = async (query) => {
  console.log("query ", query);
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 9);
  const andConditions = [];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          schoolName: {
            contains: query.search,
            mode: "insensitive"
          }
        },
        {
          address: {
            contains: query.search,
            mode: "insensitive"
          }
        },
        {
          eiin: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (query.schoolName) {
    andConditions.push({
      schoolName: query.schoolName
    });
  }
  if (query.eiin) {
    andConditions.push({
      eiin: query.eiin
    });
  }
  const siteConfigs = await prisma.siteConfig.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }
  });
  const total = await prisma.siteConfig.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    siteConfigs,
    meta
  };
};
var getSiteConfig = async (id) => {
  const siteConfig = await prisma.siteConfig.findUnique({
    where: {
      id
    },
    include: {
      teacher: true,
      staffs: true,
      committees: true
    }
  });
  return siteConfig;
};
var deleteConfig = async (id) => {
  const config3 = await prisma.siteConfig.findUnique({
    where: { id }
  });
  if (!config3) {
    throw new AppError(httpStatus13.NOT_FOUND, "site config not found");
  }
  await prisma.$transaction(
    async (tx) => {
      await tx.siteConfig.delete({
        where: { id }
      });
      if (config3.logoPublicId) {
        await Cloudinary.cloudinary.uploader.destroy(config3.logoPublicId);
      }
    },
    {
      maxWait: 1e4,
      timeout: 15e3
    }
  );
};
var udpateSiteConfig = async (payload, id, logo) => {
  const isExist = await prisma.siteConfig.findUnique({
    where: { id }
  });
  if (!isExist) {
    throw new AppError(httpStatus13.NOT_FOUND, "site config not found");
  }
  const cloudinaryRes = logo ? await new Promise(
    (resolve, reject) => {
      Cloudinary.cloudinary.uploader.upload_stream(
        {
          folder: "Modern-School/siteConfig/logo",
          resource_type: "auto"
        },
        async (error, result) => {
          if (error) {
            return reject(error);
          }
          if (!result) {
            return reject(
              new AppError(
                httpStatus13.BAD_GATEWAY,
                "No result returned from cloudinary"
              )
            );
          }
          return resolve(result);
        }
      ).end(logo.buffer);
    }
  ) : null;
  const updatedConfig = await prisma.siteConfig.update({
    where: { id },
    data: {
      ...payload,
      logo: cloudinaryRes ? cloudinaryRes.secure_url : isExist.logo,
      logoPublicId: cloudinaryRes ? cloudinaryRes.public_id : isExist.logoPublicId
    }
  });
  if (cloudinaryRes && logo) {
    await Cloudinary.cloudinary.uploader.destroy(isExist.logoPublicId);
  }
  return updatedConfig;
};
var siteConfigService = {
  createSiteConfig,
  getAllSiteConfig,
  getSiteConfig,
  deleteConfig,
  udpateSiteConfig
};

// src/app/module/siteConfig/siteConfig.validation.ts
import { z } from "zod";
var siteConfigZodSchema = z.object({
  email: z.email(),
  schoolName: z.string(),
  address: z.string(),
  eiin: z.string(),
  estdYear: z.string(),
  theme: z.json().optional(),
  facebookUrl: z.string().optional(),
  youtubeUrl: z.string().optional(),
  linkdinUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
  instagramUrl: z.string().optional()
});
var siteConfigZodSchemaUpdate = z.object({
  email: z.email().optional(),
  schoolName: z.string().optional(),
  address: z.string().optional(),
  eiin: z.string().optional(),
  estdYear: z.string().optional(),
  theme: z.json().optional(),
  facebookUrl: z.string().optional(),
  youtubeUrl: z.string().optional(),
  linkdinUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
  instagramUrl: z.string().optional()
});

// src/app/module/siteConfig/siteConfig.controller.ts
var createSiteConfig2 = catchAsync(
  async (req, res) => {
    if (!req.file) {
      throw new AppError(httpStatus14.BAD_REQUEST, "No file uploaded");
    }
    const logo = req.file;
    if (!req.body.data) {
      throw new AppError(httpStatus14.BAD_REQUEST, "form data not found");
    }
    let data = JSON.parse(req.body.data);
    const validation = siteConfigZodSchema.safeParse(data);
    if (!validation.success) {
      throw new AppError(
        httpStatus14.BAD_REQUEST,
        validation.error.issues[0].message
      );
    }
    const result = await siteConfigService.createSiteConfig(data, logo);
    return sendResponse(res, {
      statusCode: httpStatus14.CREATED,
      success: true,
      message: "Site Config created successfully",
      data: result
    });
  }
);
var getAllSiteConfig2 = catchAsync(
  async (req, res) => {
    const query = req.query;
    const { siteConfigs, meta } = await siteConfigService.getAllSiteConfig(query);
    if (siteConfigs.length === 0) {
      throw new AppError(httpStatus14.NOT_FOUND, "site config not found");
    }
    return successResponse(res, httpStatus14.OK, "site config created successfully", siteConfigs, meta);
  }
);
var getSiteConfig2 = catchAsync(
  async (req, res) => {
    const id = req.params.siteConfigId;
    const result = await siteConfigService.getSiteConfig(id);
    if (!result) {
      throw new AppError(httpStatus14.NOT_FOUND, "site config not found");
    }
    return successResponse(res, httpStatus14.OK, "site config created successfully", result);
  }
);
var deleteSiteConfig = catchAsync(
  async (req, res) => {
    const id = req.params.siteConfigId;
    await siteConfigService.deleteConfig(id);
    return successResponse(res, httpStatus14.OK, "site config deleted successfully", null);
  }
);
var udpateSiteConfig2 = catchAsync(
  async (req, res) => {
    const logo = req.file;
    if (!req.body.data && !logo) {
      throw new AppError(httpStatus14.BAD_REQUEST, "form data not found");
    }
    let data = void 0;
    if (req.body.data) {
      data = JSON.parse(req.body.data);
      const validation = siteConfigZodSchemaUpdate.safeParse(data);
      if (!validation.success) {
        throw new AppError(
          httpStatus14.BAD_REQUEST,
          validation.error.issues[0].message
        );
      }
    }
    const id = req.params.siteConfigId;
    const result = await siteConfigService.udpateSiteConfig(data, id, logo);
    return sendResponse(res, {
      statusCode: httpStatus14.OK,
      success: true,
      message: "site config updated successfully",
      data: result
    });
  }
);
var siteConfigController = {
  createSiteConfig: createSiteConfig2,
  getAllSiteConfig: getAllSiteConfig2,
  getSiteConfig: getSiteConfig2,
  deleteSiteConfig,
  udpateSiteConfig: udpateSiteConfig2
};

// src/app/module/siteConfig/siteConfig.route.ts
var route4 = Router5({ mergeParams: true });
route4.post(
  "/",
  Cloudinary.upload.single("logo"),
  auth(Role.SUPER_ADMIN),
  siteConfigController.createSiteConfig
);
route4.get(
  "/all",
  auth(Role.SUPER_ADMIN),
  siteConfigController.getAllSiteConfig
);
route4.get(
  "/:siteConfigId",
  siteConfigController.getSiteConfig
);
route4.delete(
  "/:siteConfigId",
  auth(Role.SUPER_ADMIN),
  siteConfigController.deleteSiteConfig
);
route4.put(
  "/:siteConfigId",
  Cloudinary.upload.single("logo"),
  auth(Role.SUPER_ADMIN),
  siteConfigController.udpateSiteConfig
);
var siteConfigRouter = route4;

// src/app/module/event/event.route.ts
import { Router as Router6 } from "express";

// src/app/module/event/event.controller.ts
import httpStatus16 from "http-status";

// src/app/module/event/event.velidation.ts
import z2 from "zod";
var eventValidationZodSchema = z2.object({
  title: z2.string(),
  description: z2.string(),
  startDate: z2.string(),
  endDate: z2.string(),
  location: z2.string(),
  gallery: z2.array(z2.object({
    file: z2.url(),
    filePublicId: z2.string()
  })).optional()
});

// src/app/module/event/event.service.ts
import httpStatus15 from "http-status";
var createEvent = async (payload, cover, files, configId) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus15.NOT_FOUND, "siteConfig not found");
  }
  const transactionRes = await prisma.$transaction(
    async (tx) => {
      const coverRes = cover ? await createFile(cover, "Modern-School/Event/Cover") : null;
      const additionalFilesRes = files ? await createFiles(files, "Modern-School/Gallery") : null;
      const create = await tx.event.create({
        data: {
          ...payload,
          siteConfigId: configId,
          coverImage: coverRes?.secure_url,
          coverImagePublicId: coverRes?.public_id,
          gallery: {
            create: additionalFilesRes?.map((f) => ({
              file: f.secure_url,
              filePublicId: f.public_id
            }))
          }
        },
        include: {
          gallery: true
        }
      });
      return create;
    },
    {
      maxWait: 1e4,
      timeout: 15e3
    }
  );
  return transactionRes;
};
var getAllEvent = async (query, configId) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 5);
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus15.NOT_FOUND, "site config not found");
  }
  const andConditions = [
    {
      siteConfigId: isConfig.id
    }
  ];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.search,
            mode: "insensitive"
          }
        },
        {
          location: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (query.isActive) {
    andConditions.push({
      isActive: query.isActive
    });
  }
  if (query.isDeleted) {
    andConditions.push({
      isDeleted: query.isDeleted
    });
  }
  const events = await prisma.event.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }
  });
  const total = await prisma.event.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    events,
    meta
  };
};
var getEvents = async (query, configId) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 5);
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus15.NOT_FOUND, "site config not found");
  }
  const andConditions = [
    {
      isActive: true
    },
    {
      siteConfigId: isConfig.id
    }
  ];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.search,
            mode: "insensitive"
          }
        },
        {
          location: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  const events = await prisma.event.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }
  });
  const total = await prisma.event.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    events,
    meta
  };
};
var getSingleEvent = async (eventId) => {
  const isEvent = await prisma.event.findUnique({
    where: {
      id: eventId,
      isActive: true,
      isDeleted: false
    },
    include: {
      gallery: true
    }
  });
  if (!isEvent) {
    throw new AppError(httpStatus15.NOT_FOUND, "event not found");
  }
  return isEvent;
};
var updateEvent = async (payload, cover, files, eventId) => {
  const isEvent = await prisma.event.findUnique({
    where: {
      id: eventId
    }
  });
  if (!isEvent) {
    throw new AppError(httpStatus15.NOT_FOUND, "event not found");
  }
  const transactionRes = await prisma.$transaction(
    async (tx) => {
      const coverRes = cover ? await createFile(cover, "Modern-School/Event/Cover") : null;
      const additionalFilesRes = files ? await createFiles(files, "Modern-School/Gallery") : null;
      const update = await tx.event.update({
        where: {
          id: eventId
        },
        data: {
          ...payload,
          coverImage: coverRes?.secure_url,
          coverImagePublicId: coverRes?.public_id,
          gallery: {
            create: additionalFilesRes?.map((f) => ({
              file: f.secure_url,
              filePublicId: f.public_id
            }))
          }
        },
        include: {
          gallery: true
        }
      });
      if (cover) {
        await Cloudinary.cloudinary.uploader.destroy(isEvent.coverImage, {
          invalidate: true
        });
      }
      return update;
    },
    {
      maxWait: 1e4,
      timeout: 15e3
    }
  );
  return transactionRes;
};
var deleteEvent = async (eventId) => {
  const isEvent = await prisma.event.findUnique({
    where: {
      id: eventId
    }
  });
  if (!isEvent) {
    throw new AppError(httpStatus15.NOT_FOUND, "event not found");
  }
  if (!isEvent.isActive) {
    throw new AppError(httpStatus15.CONFLICT, "Event is temporary deactive");
  }
  if (isEvent.isDeleted) {
    throw new AppError(httpStatus15.CONFLICT, "Event already deleted");
  }
  await prisma.event.update({
    where: {
      id: isEvent.id
    },
    data: {
      isDeleted: true,
      deletedAt: /* @__PURE__ */ new Date()
    }
  });
};
var eventService = {
  createEvent,
  getAllEvent,
  getEvents,
  getSingleEvent,
  deleteEvent,
  updateEvent
};

// src/app/module/event/event.controller.ts
var createEvent2 = catchAsync(
  async (req, res) => {
    const configId = req.params.siteConfigId;
    const files = req.files;
    const cover = files?.["cover"]?.[0];
    const additionalFiles = files?.["additionalFiles"] || [];
    if (!req.body.data) {
      throw new AppError(httpStatus16.BAD_REQUEST, "form data not found");
    }
    let data = JSON.parse(req.body.data);
    const validation = eventValidationZodSchema.safeParse(data);
    if (!validation.success) {
      throw new AppError(httpStatus16.BAD_REQUEST, validation.error.issues[0].message);
    }
    data = validation.data;
    const result = await eventService.createEvent(data, cover, additionalFiles, configId);
    sendResponse(res, {
      statusCode: httpStatus16.OK,
      success: true,
      message: "event created successfully",
      data: result
    });
  }
);
var getAllEvents = catchAsync(
  async (req, res) => {
    const configId = req.params.siteConfigId;
    const query = req.query;
    const { events, meta } = await eventService.getAllEvent(query, configId);
    if (events.length === 0) {
      throw new AppError(httpStatus16.NOT_FOUND, "events not found");
    }
    sendResponse(res, {
      statusCode: httpStatus16.OK,
      success: true,
      message: "events retrive successfully",
      data: events,
      meta
    });
  }
);
var getEvents2 = catchAsync(
  async (req, res) => {
    const configId = req.params.siteConfigId;
    const query = req.query;
    const { events, meta } = await eventService.getEvents(query, configId);
    if (events.length === 0) {
      throw new AppError(httpStatus16.NOT_FOUND, "events not found");
    }
    sendResponse(res, {
      statusCode: httpStatus16.OK,
      success: true,
      message: "events retrive successfully",
      data: events,
      meta
    });
  }
);
var singleEvent = catchAsync(
  async (req, res) => {
    const eventId = req.params.eventId;
    const result = await eventService.getSingleEvent(eventId);
    sendResponse(res, {
      statusCode: httpStatus16.OK,
      success: true,
      message: "event retrive successfully",
      data: result
    });
  }
);
var updateEvent2 = catchAsync(
  async (req, res) => {
    const eventId = req.params.eventId;
    const files = req.files;
    const cover = files?.["cover"]?.[0];
    const additionalFiles = files?.["additionalFiles"] || [];
    let data = void 0;
    if (data) {
      data = JSON.parse(req.body.data);
      const validation = eventValidationZodSchema.safeParse(data);
      if (!validation.success) {
        throw new AppError(httpStatus16.BAD_REQUEST, validation.error.issues[0].message);
      }
      data = validation.data;
    }
    const result = await eventService.updateEvent(data, cover, additionalFiles, eventId);
    sendResponse(res, {
      statusCode: httpStatus16.OK,
      success: true,
      message: "event udpated successfully",
      data: result
    });
  }
);
var deleteEvent2 = catchAsync(
  async (req, res) => {
    const eventId = req.params.eventId;
    await eventService.deleteEvent(eventId);
    sendResponse(res, {
      statusCode: httpStatus16.OK,
      success: true,
      message: "event deleted successfully",
      data: null
    });
  }
);
var eventController = {
  createEvent: createEvent2,
  getAllEvents,
  getEvents: getEvents2,
  singleEvent,
  deleteEvent: deleteEvent2,
  updateEvent: updateEvent2
};

// src/app/module/event/event.route.ts
var route5 = Router6({ mergeParams: true });
route5.post(
  "/",
  Cloudinary.upload.fields([
    {
      name: "cover",
      maxCount: 1
    },
    {
      name: "additionalFiles",
      maxCount: 10
    }
  ]),
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  eventController.createEvent
);
route5.get(
  "/all",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  eventController.getAllEvents
);
route5.get(
  "/all-events",
  eventController.getEvents
);
route5.get(
  "/:eventId",
  eventController.singleEvent
);
route5.put(
  "/:eventId",
  Cloudinary.upload.fields([
    {
      name: "cover",
      maxCount: 1
    },
    {
      name: "additionalFiles",
      maxCount: 10
    }
  ]),
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  eventController.updateEvent
);
route5.patch(
  "/:eventId",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  eventController.deleteEvent
);
var eventRouter = route5;

// src/app/module/notice/notice.route.ts
import { Router as Router7 } from "express";

// src/app/module/notice/notice.controller.ts
import httpStatus18 from "http-status";

// src/app/module/notice/notice.validation.ts
import z3 from "zod";
var noticeZodSchema = z3.object({
  title: z3.string(),
  content: z3.string()
});

// src/app/module/notice/notice.service.ts
import httpStatus17 from "http-status";
var createNotice = async (payload, file, configId) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus17.NOT_FOUND, "site config not found");
  }
  const fileRes = file ? await createFile(file, "Modern-School/Notice") : null;
  const createNotice3 = await prisma.notice.create({
    data: {
      ...payload,
      file: fileRes?.secure_url,
      filePublicId: fileRes?.public_id,
      siteConfigId: configId
    }
  });
  return createNotice3;
};
var getAllNotices = async (query, configId) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 5);
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus17.NOT_FOUND, "site config not found");
  }
  const andConditions = [
    {
      siteConfigId: isConfig.id
    }
  ];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (query.isActive) {
    andConditions.push({
      isActive: query.isActive
    });
  }
  if (query.isDeleted) {
    andConditions.push({
      isDeleted: query.isDeleted
    });
  }
  const notices = await prisma.notice.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }
  });
  const total = await prisma.notice.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    notices,
    meta
  };
};
var getNotices = async (query, configId) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 5);
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus17.NOT_FOUND, "site config not found");
  }
  const andConditions = [
    {
      isActive: true
    },
    {
      siteConfigId: isConfig.id
    },
    {
      isDeleted: false
    }
  ];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  const notices = await prisma.notice.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }
  });
  const total = await prisma.notice.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    notices,
    meta
  };
};
var getSingleNotice = async (noticeId) => {
  const isNotice = await prisma.notice.findUnique({
    where: {
      id: noticeId,
      isActive: true,
      isDeleted: false
    }
  });
  if (!isNotice) {
    throw new AppError(httpStatus17.NOT_FOUND, "notice not found");
  }
  return isNotice;
};
var updateNotice = async (payload, file, noticeId) => {
  const isNotice = await prisma.notice.findUnique({
    where: {
      id: noticeId
    }
  });
  if (!isNotice) {
    throw new AppError(httpStatus17.NOT_FOUND, "notice not found");
  }
  if (!isNotice.isActive) {
    throw new AppError(httpStatus17.BAD_GATEWAY, "temporary deactive");
  }
  if (isNotice.deletedAt) {
    throw new AppError(httpStatus17.BAD_GATEWAY, "already deleted");
  }
  const fileRes = file ? await createFile(file, "Modern-School/Notice") : null;
  const transactionRes = await prisma.$transaction(
    async (tx) => {
      const notice = await tx.notice.update({
        where: {
          id: isNotice.id
        },
        data: {
          ...payload,
          file: fileRes?.secure_url,
          filePublicId: fileRes?.public_id
        }
      });
      return notice;
    },
    {
      timeout: 15e3,
      maxWait: 1e4
    }
  );
  return transactionRes;
};
var deleteNotice = async (noticeId, configId) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus17.NOT_FOUND, "site config not found");
  }
  const isNotice = await prisma.notice.findUnique({
    where: {
      id: noticeId
    }
  });
  if (!isNotice) {
    throw new AppError(httpStatus17.NOT_FOUND, "notice not found");
  }
  if (!isNotice.isActive) {
    throw new AppError(httpStatus17.CONFLICT, "Notce is temporary deactive");
  }
  if (isNotice.isDeleted) {
    throw new AppError(httpStatus17.CONFLICT, "notice already deleted");
  }
  await prisma.notice.update({
    where: {
      id: isNotice.id
    },
    data: {
      isDeleted: true,
      deletedAt: /* @__PURE__ */ new Date()
    }
  });
};
var noticeService = {
  createNotice,
  getNotices,
  getAllNotices,
  getSingleNotice,
  updateNotice,
  deleteNotice
};

// src/app/module/notice/notice.controller.ts
var createNotice2 = catchAsync(
  async (req, res) => {
    const file = req.file;
    if (!file) {
      throw new AppError(httpStatus18.BAD_REQUEST, "file not found");
    }
    if (!req.body.data) {
      throw new AppError(httpStatus18.BAD_REQUEST, "form data not found");
    }
    let data = JSON.parse(req.body.data);
    const validation = noticeZodSchema.safeParse(data);
    if (!validation.success) {
      throw new AppError(httpStatus18.BAD_REQUEST, validation.error.issues[0].message);
    }
    const configId = req.params.siteConfigId;
    const result = await noticeService.createNotice(data, file, configId);
    sendResponse(res, {
      statusCode: httpStatus18.OK,
      success: true,
      message: "notice created successfully",
      data: result
    });
  }
);
var getAllNotices2 = catchAsync(
  async (req, res) => {
    const configId = req.params.siteConfigId;
    const query = req.query;
    const { notices, meta } = await noticeService.getAllNotices(query, configId);
    if (notices.length === 0) {
      throw new AppError(httpStatus18.NOT_FOUND, "notices not found");
    }
    sendResponse(res, {
      statusCode: httpStatus18.OK,
      success: true,
      message: "notices retrive successfully",
      data: notices,
      meta
    });
  }
);
var getNotices2 = catchAsync(
  async (req, res) => {
    const configId = req.params.siteConfigId;
    const query = req.query;
    const { notices, meta } = await noticeService.getNotices(query, configId);
    if (notices.length === 0) {
      throw new AppError(httpStatus18.NOT_FOUND, "notices not found");
    }
    sendResponse(res, {
      statusCode: httpStatus18.OK,
      success: true,
      message: "notices retrive successfully",
      data: notices,
      meta
    });
  }
);
var getSingleNotice2 = catchAsync(
  async (req, res) => {
    const noticeId = req.params.noticeId;
    const result = await noticeService.getSingleNotice(noticeId);
    sendResponse(res, {
      statusCode: httpStatus18.OK,
      success: true,
      message: "notice retrive successfully",
      data: result
    });
  }
);
var deleteNotices = catchAsync(
  async (req, res) => {
    const configId = req.params.siteConfigId;
    const noticeId = req.params.noticeId;
    await noticeService.deleteNotice(noticeId, configId);
    sendResponse(res, {
      statusCode: httpStatus18.OK,
      success: true,
      message: "notices deleted successfully",
      data: null
    });
  }
);
var updateNotice2 = catchAsync(
  async (req, res) => {
    const file = req.file;
    let data = JSON.parse(req.body.data);
    const noticeId = req.params.noticeId;
    if (!file && !data) {
      throw new AppError(httpStatus18.BAD_REQUEST, "must be added one filed");
    }
    const result = await noticeService.updateNotice(data, file, noticeId);
    sendResponse(res, {
      statusCode: httpStatus18.OK,
      success: true,
      message: "notice updated successfully",
      data: result
    });
  }
);
var noticeController = {
  createNotice: createNotice2,
  getAllNotices: getAllNotices2,
  getNotices: getNotices2,
  deleteNotices,
  updateNotice: updateNotice2,
  getSingleNotice: getSingleNotice2
};

// src/app/module/notice/notice.route.ts
var route6 = Router7({ mergeParams: true });
route6.post(
  "/",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  Cloudinary.upload.single("file"),
  noticeController.createNotice
);
route6.get(
  "/all",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  noticeController.getAllNotices
);
route6.get(
  "/all-notices",
  noticeController.getNotices
);
route6.get(
  "/:noticeId",
  noticeController.getSingleNotice
);
route6.put(
  "/:noticeId",
  Cloudinary.upload.single("file"),
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  noticeController.updateNotice
);
route6.patch(
  "/:noticeId",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  noticeController.deleteNotices
);
var noticeRouter = route6;

// src/app/module/activity/activity.route.ts
import { Router as Router8 } from "express";

// src/app/module/activity/activity.service.ts
import httpStatus19 from "http-status";
var createActivity = async (payload, configId) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus19.NOT_FOUND, "site config not found");
  }
  const activity = prisma.activity.create({
    data: {
      ...payload,
      siteConfigId: configId
    }
  });
  return activity;
};
var getAllActivity = async (query, siteConfigId) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: siteConfigId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus19.NOT_FOUND, "site config not found");
  }
  const andConditions = [];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (query.isActive) {
    andConditions.push({
      isActive: query.isActive
    });
  }
  if (query.isDeleted) {
    andConditions.push({
      isDeleted: query.isDeleted
    });
  }
  if (query.siteConfig) {
    andConditions.push({
      siteConfigId: query.siteConfig
    });
  }
  const activities = await prisma.activity.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }
  });
  const total = await prisma.activity.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    activities,
    meta
  };
};
var getActvities = async (query, siteConfigId) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: siteConfigId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus19.NOT_FOUND, "site config not found");
  }
  const andConditions = [
    {
      siteConfigId
    },
    {
      isDeleted: false
    },
    {
      isActive: true
    }
  ];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  const activities = await prisma.activity.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }
  });
  const total = await prisma.activity.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    activities,
    meta
  };
};
var updateActivity = async (payload, activityId) => {
  const isActivity = await prisma.activity.findUnique({
    where: {
      id: activityId
    }
  });
  if (!isActivity) {
    throw new AppError(httpStatus19.NOT_FOUND, "activity not found");
  }
  if (isActivity.isDeleted) {
    throw new AppError(httpStatus19.CONFLICT, "Activity is deleted");
  }
  const update = await prisma.activity.update({
    where: {
      id: activityId
    },
    data: {
      ...payload
    }
  });
  return update;
};
var deleteActivity = async (activityId) => {
  const isActivity = await prisma.activity.findUnique({
    where: {
      id: activityId
    }
  });
  if (!isActivity) {
    throw new AppError(httpStatus19.NOT_FOUND, "Activity not found");
  }
  if (isActivity.isDeleted) {
    throw new AppError(httpStatus19.CONFLICT, "activity already deleted");
  }
  await prisma.activity.update({
    where: {
      id: isActivity.id
    },
    data: {
      isDeleted: true,
      deletedAt: /* @__PURE__ */ new Date()
    }
  });
};
var activityService = {
  createActivity,
  getAllActivity,
  getActvities,
  updateActivity,
  deleteActivity
};

// src/app/module/activity/activity.controller.ts
import httpStatus20 from "http-status";
var createActivity2 = catchAsync(
  async (req, res) => {
    const body = req.body;
    const configId = req.params.siteConfigId;
    const result = await activityService.createActivity(body, configId);
    sendResponse(res, {
      statusCode: httpStatus20.CREATED,
      success: true,
      message: "activity created successfully",
      data: result
    });
  }
);
var getAllActivities = catchAsync(
  async (req, res) => {
    const query = req.query;
    const configId = req.params.siteConfigId;
    const { activities, meta } = await activityService.getAllActivity(query, configId);
    sendResponse(res, {
      statusCode: httpStatus20.OK,
      success: true,
      message: "activity retrive successfully",
      data: activities,
      meta
    });
  }
);
var getActivities = catchAsync(
  async (req, res) => {
    const query = req.query;
    const configId = req.params.siteConfigId;
    const { activities, meta } = await activityService.getActvities(query, configId);
    sendResponse(res, {
      statusCode: httpStatus20.OK,
      success: true,
      message: "activity retrive successfully",
      data: activities,
      meta
    });
  }
);
var updateActivity2 = catchAsync(
  async (req, res) => {
    const body = req.body;
    const configId = req.params.siteConfigId;
    const activityId = req.params.activityId;
    const result = await activityService.updateActivity(body, activityId);
    sendResponse(res, {
      statusCode: httpStatus20.OK,
      success: true,
      message: "activity updated successfully",
      data: result
    });
  }
);
var deleteActivity2 = catchAsync(
  async (req, res) => {
    const activityId = req.params.activityId;
    await activityService.deleteActivity(activityId);
    sendResponse(res, {
      statusCode: httpStatus20.OK,
      success: true,
      message: "activity deleted successfully",
      data: null
    });
  }
);
var activityController = {
  createActivity: createActivity2,
  getAllActivities,
  getActivities,
  updateActivity: updateActivity2,
  deleteActivity: deleteActivity2
};

// src/app/module/activity/activity.route.ts
var route7 = Router8({ mergeParams: true });
route7.post(
  "/",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  activityController.createActivity
);
route7.get(
  "/all",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  activityController.getAllActivities
);
route7.get(
  "/all-activity",
  activityController.getActivities
);
route7.put(
  "/:activityId",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  activityController.updateActivity
);
route7.patch(
  "/:activityId",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  activityController.deleteActivity
);
var activityRouter = route7;

// src/app/module/admissionInfo/admission.route.ts
import { Router as Router9 } from "express";

// src/app/module/admissionInfo/admission.controller.ts
import httpStatus22 from "http-status";

// src/app/module/admissionInfo/admission.service.ts
import httpStatus21 from "http-status";
var createInfo = async (payload, configId) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus21.NOT_FOUND, "site config not found");
  }
  const info = prisma.admissionTest.create({
    data: {
      ...payload,
      siteConfigId: configId
    }
  });
  return info;
};
var getAllInfo = async (query) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const andConditions = [];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (query.isActive) {
    andConditions.push({
      isActive: query.isActive
    });
  }
  if (query.isDeleted) {
    andConditions.push({
      isDeleted: query.isDeleted
    });
  }
  const infos = await prisma.admissionTest.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }
  });
  const total = await prisma.admissionTest.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    infos,
    meta
  };
};
var getInfo = async (id, configId) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus21.NOT_FOUND, "site config not found");
  }
  const isInfo = await prisma.admissionTest.findUnique({
    where: {
      id,
      siteConfigId: configId
    }
  });
  if (!isInfo) {
    throw new AppError(httpStatus21.NOT_FOUND, " not found");
  }
  return isInfo;
};
var updatedInfo = async (payload, id) => {
  const isInfo = await prisma.admissionTest.findUnique({
    where: {
      id
    }
  });
  if (!isInfo) {
    throw new AppError(httpStatus21.NOT_FOUND, " not found");
  }
  if (isInfo.isDeleted) {
    throw new AppError(httpStatus21.CONFLICT, "info is deleted");
  }
  const update = await prisma.admissionTest.update({
    where: {
      id
    },
    data: {
      ...payload
    }
  });
  return update;
};
var deletedInfo = async (id) => {
  const isInfo = await prisma.admissionTest.findUnique({
    where: {
      id
    }
  });
  if (!isInfo) {
    throw new AppError(httpStatus21.NOT_FOUND, " not found");
  }
  if (isInfo.isDeleted) {
    throw new AppError(httpStatus21.CONFLICT, "inof already deleted");
  }
  await prisma.admissionTest.update({
    where: {
      id
    },
    data: {
      isDeleted: true,
      deletedAt: /* @__PURE__ */ new Date()
    }
  });
};
var adimissionService = {
  createInfo,
  getAllInfo,
  getInfo,
  updatedInfo,
  deletedInfo
};

// src/app/module/admissionInfo/admission.controller.ts
var createInfo2 = catchAsync(
  async (req, res) => {
    const body = req.body;
    const configId = req.params.siteConfigId;
    const result = await adimissionService.createInfo(body, configId);
    sendResponse(res, {
      statusCode: httpStatus22.CREATED,
      success: true,
      message: "adminssion info created successfully",
      data: result
    });
  }
);
var getAllInfo2 = catchAsync(
  async (req, res) => {
    const query = req.query;
    const { infos, meta } = await adimissionService.getAllInfo(query);
    sendResponse(res, {
      statusCode: httpStatus22.OK,
      success: true,
      message: "info retrive successfully",
      data: infos,
      meta
    });
  }
);
var getInof = catchAsync(
  async (req, res) => {
    const infoId = req.params.admissionInfoId;
    const configId = req.params.siteConfigId;
    const result = await adimissionService.getInfo(infoId, configId);
    sendResponse(res, {
      statusCode: httpStatus22.OK,
      success: true,
      message: "info retrive successfully",
      data: result
    });
  }
);
var updateInfo = catchAsync(
  async (req, res) => {
    const body = req.body;
    const infoId = req.params.admissionInfoId;
    const result = await adimissionService.updatedInfo(body, infoId);
    sendResponse(res, {
      statusCode: httpStatus22.OK,
      success: true,
      message: "info updated successfully",
      data: result
    });
  }
);
var deleteInfo = catchAsync(
  async (req, res) => {
    const infoId = req.params.admissionInfoId;
    await adimissionService.deletedInfo(infoId);
    sendResponse(res, {
      statusCode: httpStatus22.OK,
      success: true,
      message: "info deleted successfully",
      data: null
    });
  }
);
var admissionInfoController = {
  createInfo: createInfo2,
  getAllInfo: getAllInfo2,
  getInof,
  deleteInfo,
  updateInfo
};

// src/app/module/admissionInfo/admission.route.ts
var route8 = Router9({ mergeParams: true });
route8.post(
  "/",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  admissionInfoController.createInfo
);
route8.get(
  "/all-info",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  admissionInfoController.getAllInfo
);
route8.get(
  "/:admissionInfoId",
  admissionInfoController.getInof
);
route8.put(
  "/:admissionInfoId",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  admissionInfoController.updateInfo
);
route8.patch(
  "/:admissionInfoId",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  admissionInfoController.deleteInfo
);
var adminssionInfoRouter = route8;

// src/app/module/apply/apply.route.ts
import { Router as Router10 } from "express";

// src/app/module/apply/apply.controller.ts
import httpStatus24 from "http-status";

// src/app/module/apply/apply.service.ts
import httpStatus23 from "http-status";
var createApply = async (payload, configId) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus23.NOT_FOUND, "site config not found");
  }
  const apply = prisma.apply.create({
    data: {
      ...payload,
      siteConfigId: configId
    }
  });
  return apply;
};
var getAll = async (query) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const andConditions = [];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (query.isActive) {
    andConditions.push({
      isActive: query.isActive
    });
  }
  if (query.isDeleted) {
    andConditions.push({
      isDeleted: query.isDeleted
    });
  }
  if (query.configId) {
    andConditions.push({
      siteConfigId: query.configId
    });
  }
  const applys = await prisma.apply.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }
  });
  const total = await prisma.apply.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    applys,
    meta
  };
};
var getApply = async (id) => {
  const isApply = await prisma.apply.findUnique({
    where: {
      id,
      isActive: true,
      isDeleted: false
    }
  });
  if (!isApply) {
    throw new AppError(httpStatus23.NOT_FOUND, "not found");
  }
  return isApply;
};
var updateApply = async (payload, id) => {
  const isApply = await prisma.apply.findUnique({
    where: {
      id
    }
  });
  if (!isApply) {
    throw new AppError(httpStatus23.NOT_FOUND, "Not found");
  }
  if (isApply.isDeleted) {
    throw new AppError(httpStatus23.CONFLICT, "apply is deleted");
  }
  const update = await prisma.apply.update({
    where: {
      id
    },
    data: {
      ...payload
    }
  });
  return update;
};
var deleteApply = async (id) => {
  const isApply = await prisma.apply.findUnique({
    where: {
      id
    }
  });
  if (!isApply) {
    throw new AppError(httpStatus23.NOT_FOUND, "Not found");
  }
  if (isApply.isDeleted) {
    throw new AppError(httpStatus23.CONFLICT, "apply already deleted");
  }
  await prisma.apply.update({
    where: {
      id
    },
    data: {
      isDeleted: true,
      deletedAt: /* @__PURE__ */ new Date()
    }
  });
};
var applyService = {
  createApply,
  getAll,
  getApply,
  updateApply,
  deleteApply
};

// src/app/module/apply/apply.controller.ts
var createApply2 = catchAsync(
  async (req, res) => {
    const body = req.body;
    const configId = req.params.siteConfigId;
    const result = await applyService.createApply(body, configId);
    sendResponse(res, {
      statusCode: httpStatus24.CREATED,
      success: true,
      message: "apply rule created successfully",
      data: result
    });
  }
);
var getAll2 = catchAsync(
  async (req, res) => {
    const query = req.query;
    const { applys, meta } = await applyService.getAll(query);
    sendResponse(res, {
      statusCode: httpStatus24.OK,
      success: true,
      message: "apply info retrive successfully",
      data: applys,
      meta
    });
  }
);
var getApply2 = catchAsync(
  async (req, res) => {
    const applyId = req.params.applyId;
    const result = await applyService.getApply(applyId);
    sendResponse(res, {
      statusCode: httpStatus24.OK,
      success: true,
      message: "retrive successfully",
      data: result
    });
  }
);
var updateApply2 = catchAsync(
  async (req, res) => {
    const body = req.body;
    const applyId = req.params.applyId;
    const result = await applyService.updateApply(body, applyId);
    sendResponse(res, {
      statusCode: httpStatus24.OK,
      success: true,
      message: "apply updated successfully",
      data: result
    });
  }
);
var deleteApply2 = catchAsync(
  async (req, res) => {
    const applyId = req.params.applyId;
    await applyService.deleteApply(applyId);
    sendResponse(res, {
      statusCode: httpStatus24.OK,
      success: true,
      message: "apply deleted successfully",
      data: null
    });
  }
);
var applyController = {
  createApply: createApply2,
  getAll: getAll2,
  getApply: getApply2,
  updateApply: updateApply2,
  deleteApply: deleteApply2
};

// src/app/module/apply/apply.route.ts
var route9 = Router10({ mergeParams: true });
route9.post(
  "/",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  applyController.createApply
);
route9.get(
  "/all-apply",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  applyController.getAll
);
route9.get(
  "/:applyId",
  applyController.getApply
);
route9.put(
  "/:applyId",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  applyController.updateApply
);
route9.patch(
  "/:applyId",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  applyController.deleteApply
);
var applyRouter = route9;

// src/app/module/rules/rules.route.ts
import { Router as Router11 } from "express";

// src/app/module/rules/rules.controller.ts
import httpStatus26 from "http-status";

// src/app/module/rules/rules.service.ts
import httpStatus25 from "http-status";
var createInfo3 = async (payload, configId) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus25.NOT_FOUND, "site config not found");
  }
  const info = prisma.academicRules.create({
    data: {
      ...payload,
      siteConfigId: configId
    }
  });
  return info;
};
var getAllRules = async (query) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const andConditions = [];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (query.isActive) {
    andConditions.push({
      isActive: query.isActive
    });
  }
  if (query.isDeleted) {
    andConditions.push({
      isDeleted: query.isDeleted
    });
  }
  const rules = await prisma.academicRules.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }
  });
  const total = await prisma.academicRules.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    rules,
    meta
  };
};
var getRule = async (id) => {
  const isRules = await prisma.academicRules.findUnique({
    where: {
      id,
      isActive: true,
      isDeleted: false
    }
  });
  if (!isRules) {
    throw new AppError(httpStatus25.NOT_FOUND, " not found");
  }
  return isRules;
};
var updateRule = async (payload, id) => {
  const isRules = await prisma.academicRules.findUnique({
    where: {
      id
    }
  });
  if (!isRules) {
    throw new AppError(httpStatus25.NOT_FOUND, " not found");
  }
  if (isRules.isDeleted) {
    throw new AppError(httpStatus25.CONFLICT, "rules is deleted");
  }
  const update = await prisma.academicRules.update({
    where: {
      id
    },
    data: {
      ...payload
    }
  });
  return update;
};
var deleteRule = async (id) => {
  const isRule = await prisma.academicRules.findUnique({
    where: {
      id
    }
  });
  if (!isRule) {
    throw new AppError(httpStatus25.NOT_FOUND, " not found");
  }
  if (isRule.isDeleted) {
    throw new AppError(httpStatus25.CONFLICT, "rule already deleted");
  }
  await prisma.academicRules.update({
    where: {
      id
    },
    data: {
      isDeleted: true,
      deletedAt: /* @__PURE__ */ new Date()
    }
  });
};
var ruleService = {
  createInfo: createInfo3,
  getAllRules,
  getRule,
  updateRule,
  deleteRule
};

// src/app/module/rules/rules.controller.ts
var createRule = catchAsync(
  async (req, res) => {
    const body = req.body;
    const configId = req.params.siteConfigId;
    const result = await ruleService.createInfo(body, configId);
    sendResponse(res, {
      statusCode: httpStatus26.CREATED,
      success: true,
      message: "academic rule created successfully",
      data: result
    });
  }
);
var getAllRules2 = catchAsync(
  async (req, res) => {
    const query = req.query;
    const { rules, meta } = await ruleService.getAllRules(query);
    sendResponse(res, {
      statusCode: httpStatus26.OK,
      success: true,
      message: "academic rules retrive successfully",
      data: rules,
      meta
    });
  }
);
var getRule2 = catchAsync(
  async (req, res) => {
    const ruleId = req.params.academicRuleId;
    const result = await ruleService.getRule(ruleId);
    sendResponse(res, {
      statusCode: httpStatus26.OK,
      success: true,
      message: "academic rule retrive successfully",
      data: result
    });
  }
);
var updateRule2 = catchAsync(
  async (req, res) => {
    const body = req.body;
    const ruleId = req.params.academicRuleId;
    const result = await ruleService.updateRule(body, ruleId);
    sendResponse(res, {
      statusCode: httpStatus26.OK,
      success: true,
      message: "rule updated successfully",
      data: result
    });
  }
);
var deleteRule2 = catchAsync(
  async (req, res) => {
    const ruleId = req.params.academicRuleId;
    await ruleService.deleteRule(ruleId);
    sendResponse(res, {
      statusCode: httpStatus26.OK,
      success: true,
      message: "academic rule deleted successfully",
      data: null
    });
  }
);
var academicRuleController = {
  createRule,
  getAllRules: getAllRules2,
  getRule: getRule2,
  updateRule: updateRule2,
  deleteRule: deleteRule2
};

// src/app/module/rules/rules.route.ts
var route10 = Router11({ mergeParams: true });
route10.post(
  "/",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  academicRuleController.createRule
);
route10.get(
  "/all-rule",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  academicRuleController.getAllRules
);
route10.get(
  "/:academicRuleId",
  academicRuleController.getRule
);
route10.put(
  "/:academicRuleId",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  academicRuleController.updateRule
);
route10.patch(
  "/:academicRuleId",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  academicRuleController.deleteRule
);
var academicRuleRouter = route10;

// src/app/module/calendar/calendar.route.ts
import { Router as Router12 } from "express";

// src/app/module/calendar/calendar.controller.ts
import httpStatus28 from "http-status";

// src/app/module/calendar/calendar.validation.ts
import z4 from "zod";
var calendarZodSchema = z4.object({
  title: z4.string(),
  description: z4.string()
});

// src/app/module/calendar/calendar.service.ts
import httpStatus27 from "http-status";
var createCalendar = async (payload, file, configId) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus27.NOT_FOUND, "site config not found");
  }
  const fileRes = file ? await createFile(file, "Modern-School/Calendar") : null;
  if (!fileRes) {
    throw new AppError(httpStatus27.NOT_FOUND, "not found");
  }
  const create = await prisma.calendar.create({
    data: {
      ...payload,
      file: fileRes.secure_url,
      filePublicId: fileRes.public_id,
      siteConfigId: configId
    }
  });
  return create;
};
var getAllCalendar = async (query, configId) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 5);
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus27.NOT_FOUND, "site config not found");
  }
  const andConditions = [];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (query.isActive) {
    andConditions.push({
      isActive: query.isActive
    });
  }
  if (query.isDeleted) {
    andConditions.push({
      isDeleted: query.isDeleted
    });
  }
  const calendars = await prisma.calendar.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }
  });
  const total = await prisma.calendar.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    calendars,
    meta
  };
};
var getCalendar = async (calendarId, configId) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus27.NOT_FOUND, "site config not found");
  }
  const isCalendar = await prisma.calendar.findUnique({
    where: {
      id: calendarId,
      isActive: true,
      isDeleted: false
    }
  });
  if (!isCalendar) {
    throw new AppError(httpStatus27.NOT_FOUND, "calendar not found");
  }
  return isCalendar;
};
var updateCalendar = async (payload, file, calendarId) => {
  const isCalendar = await prisma.calendar.findUnique({
    where: {
      id: calendarId
    }
  });
  if (!isCalendar) {
    throw new AppError(httpStatus27.NOT_FOUND, "calendar not found");
  }
  const fileRes = file ? await createFile(file, "Modern-School/Calendar") : null;
  const calendar = await prisma.calendar.update({
    where: {
      id: isCalendar.id
    },
    data: {
      ...payload,
      file: fileRes?.secure_url,
      filePublicId: fileRes?.public_id
    }
  });
  if (file) {
    Cloudinary.cloudinary.uploader.destroy(isCalendar.filePublicId, {
      invalidate: true
    });
  }
  return calendar;
};
var deleteCalendar = async (calendarId) => {
  const isCalendar = await prisma.calendar.findUnique({
    where: {
      id: calendarId
    }
  });
  if (!isCalendar) {
    throw new AppError(httpStatus27.NOT_FOUND, "calendar not found");
  }
  if (isCalendar.isDeleted) {
    throw new AppError(httpStatus27.CONFLICT, "Calendar already deleted");
  }
  await prisma.calendar.update({
    where: {
      id: isCalendar.id
    },
    data: {
      isDeleted: true,
      deletedAt: /* @__PURE__ */ new Date()
    }
  });
};
var CalendarService = {
  createCalendar,
  getAllCalendar,
  getCalendar,
  updateCalendar,
  deleteCalendar
};

// src/app/module/calendar/calendar.controller.ts
var createCalendar2 = catchAsync(
  async (req, res) => {
    const file = req.file;
    if (!req.body.data) {
      throw new AppError(httpStatus28.BAD_REQUEST, "form data not found");
    }
    let data = JSON.parse(req.body.data);
    const validation = calendarZodSchema.safeParse(data);
    if (!validation.success) {
      throw new AppError(httpStatus28.BAD_REQUEST, validation.error.issues[0].message);
    }
    const configId = req.params.siteConfigId;
    const result = await CalendarService.createCalendar(data, file, configId);
    sendResponse(res, {
      statusCode: httpStatus28.OK,
      success: true,
      message: "calendar created successfully",
      data: result
    });
  }
);
var getAllCalendar2 = catchAsync(
  async (req, res) => {
    const configId = req.params.siteConfigId;
    const query = req.query;
    const { calendars, meta } = await CalendarService.getAllCalendar(query, configId);
    if (calendars.length === 0) {
      throw new AppError(httpStatus28.NOT_FOUND, "calendar not found");
    }
    sendResponse(res, {
      statusCode: httpStatus28.OK,
      success: true,
      message: "calendars retrive successfully",
      data: calendars,
      meta
    });
  }
);
var getCalendar2 = catchAsync(
  async (req, res) => {
    const configId = req.params.siteConfigId;
    const calendarId = req.params.calendarId;
    const result = await CalendarService.getCalendar(calendarId, configId);
    sendResponse(res, {
      statusCode: httpStatus28.OK,
      success: true,
      message: "calendar retrive successfully",
      data: result
    });
  }
);
var deleteCalendar2 = catchAsync(
  async (req, res) => {
    const calendarId = req.params.calendarId;
    await CalendarService.deleteCalendar(calendarId);
    sendResponse(res, {
      statusCode: httpStatus28.OK,
      success: true,
      message: "calendar deleted successfully",
      data: null
    });
  }
);
var updateCalendar2 = catchAsync(
  async (req, res) => {
    const file = req.file;
    const data = JSON.parse(req.body.data);
    const calendarId = req.params.calendarId;
    if (!file && !data) {
      throw new AppError(httpStatus28.BAD_REQUEST, "must be one field");
    }
    const result = await CalendarService.updateCalendar(data, file, calendarId);
    sendResponse(res, {
      statusCode: httpStatus28.OK,
      success: true,
      message: "calendar updated successfully",
      data: result
    });
  }
);
var calendarController = {
  createCalendar: createCalendar2,
  getAllCalendar: getAllCalendar2,
  getCalendar: getCalendar2,
  deleteCalendar: deleteCalendar2,
  updateCalendar: updateCalendar2
};

// src/app/module/calendar/calendar.route.ts
var route11 = Router12({ mergeParams: true });
route11.post(
  "/",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  Cloudinary.upload.single("file"),
  calendarController.createCalendar
);
route11.get(
  "/all-calendar",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  calendarController.getAllCalendar
);
route11.get(
  "/:calendarId",
  calendarController.getCalendar
);
route11.put(
  "/:calendarId",
  Cloudinary.upload.single("file"),
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  calendarController.updateCalendar
);
route11.patch(
  "/:calendarId",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  calendarController.deleteCalendar
);
var calendarRouter = route11;

// src/app/module/mission/mission.route.ts
import { Router as Router13 } from "express";

// src/app/module/mission/mission.controller.ts
import httpStatus30 from "http-status";

// src/app/module/mission/mission.service.ts
import httpStatus29 from "http-status";
var createMission = async (payload, configId) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus29.NOT_FOUND, "site config not found");
  }
  const mission = prisma.missionVision.create({
    data: {
      ...payload,
      siteConfigId: configId
    }
  });
  return mission;
};
var getAll3 = async (query) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const andConditions = [];
  if (query.isActive) {
    andConditions.push({
      isActive: query.isActive
    });
  }
  if (query.isDeleted) {
    andConditions.push({
      isDeleted: query.isDeleted
    });
  }
  const missions = await prisma.missionVision.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }
  });
  const total = await prisma.missionVision.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    missions,
    meta
  };
};
var getMission = async (id) => {
  const isMission = await prisma.missionVision.findUnique({
    where: {
      id
    }
  });
  if (!isMission) {
    throw new AppError(httpStatus29.NOT_FOUND, " not found");
  }
  return isMission;
};
var updateMission = async (payload, id) => {
  const isMission = await prisma.missionVision.findUnique({
    where: {
      id
    }
  });
  if (!isMission) {
    throw new AppError(httpStatus29.NOT_FOUND, " not found");
  }
  if (!isMission.isActive) {
    throw new AppError(httpStatus29.CONFLICT, "mission & vision is temporary deactived");
  }
  if (isMission.isDeleted) {
    throw new AppError(httpStatus29.CONFLICT, "mission & vision is deleted");
  }
  const update = await prisma.missionVision.update({
    where: {
      id
    },
    data: {
      ...payload
    }
  });
  return update;
};
var deleteMission = async (id) => {
  const isMission = await prisma.missionVision.findUnique({
    where: {
      id
    }
  });
  if (!isMission) {
    throw new AppError(httpStatus29.NOT_FOUND, " not found");
  }
  if (!isMission.isActive) {
    throw new AppError(httpStatus29.CONFLICT, "mission & vission is temporary deactive");
  }
  if (isMission.isDeleted) {
    throw new AppError(httpStatus29.CONFLICT, "mission & vision already deleted");
  }
  await prisma.missionVision.update({
    where: {
      id
    },
    data: {
      isDeleted: true,
      deletedAt: /* @__PURE__ */ new Date()
    }
  });
};
var missionService = {
  createMission,
  getAll: getAll3,
  getMission,
  updateMission,
  deleteMission
};

// src/app/module/mission/mission.controller.ts
var createMission2 = catchAsync(
  async (req, res) => {
    const body = req.body;
    const configId = req.params.siteConfigId;
    const result = await missionService.createMission(body, configId);
    sendResponse(res, {
      statusCode: httpStatus30.CREATED,
      success: true,
      message: "mission & vission created successfully",
      data: result
    });
  }
);
var getAll4 = catchAsync(
  async (req, res) => {
    const query = req.query;
    const { missions, meta } = await missionService.getAll(query);
    sendResponse(res, {
      statusCode: httpStatus30.OK,
      success: true,
      message: "missin & vission retrive successfully",
      data: missions,
      meta
    });
  }
);
var getMission2 = catchAsync(
  async (req, res) => {
    const missionId = req.params.missionId;
    const result = await missionService.getMission(missionId);
    sendResponse(res, {
      statusCode: httpStatus30.OK,
      success: true,
      message: "mission & vision retrive successfully",
      data: result
    });
  }
);
var updateMission2 = catchAsync(
  async (req, res) => {
    const body = req.body;
    const missionId = req.params.missionId;
    const result = await missionService.updateMission(body, missionId);
    sendResponse(res, {
      statusCode: httpStatus30.OK,
      success: true,
      message: "mission & vission updated successfully",
      data: result
    });
  }
);
var deleteMission2 = catchAsync(
  async (req, res) => {
    const missionId = req.params.missionId;
    await missionService.deleteMission(missionId);
    sendResponse(res, {
      statusCode: httpStatus30.OK,
      success: true,
      message: "mission deleted successfully",
      data: null
    });
  }
);
var missionController = {
  createMission: createMission2,
  getAll: getAll4,
  getMission: getMission2,
  updateMission: updateMission2,
  deleteMission: deleteMission2
};

// src/app/module/mission/mission.route.ts
var route12 = Router13({ mergeParams: true });
route12.post(
  "/",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  missionController.createMission
);
route12.get(
  "/all-mission",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  missionController.getAll
);
route12.get(
  "/:missionId",
  missionController.getMission
);
route12.put(
  "/:missionId",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  missionController.updateMission
);
route12.patch(
  "/:missionId",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  missionController.deleteMission
);
var missionRouter = route12;

// src/app/module/registration/registration.route.ts
import { Router as Router14 } from "express";

// src/app/module/registration/registration.controller.ts
import httpStatus32 from "http-status";

// src/app/module/registration/registration.service.ts
import httpStatus31 from "http-status";
var createRegistration = async (payload, configId) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus31.NOT_FOUND, "site config not found");
  }
  const registration = prisma.registrationSystem.create({
    data: {
      ...payload,
      siteConfigId: configId
    }
  });
  return registration;
};
var getAll5 = async (query) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const andConditions = [];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (query.isActive) {
    andConditions.push({
      isActive: query.isActive
    });
  }
  if (query.isDeleted) {
    andConditions.push({
      isDeleted: query.isDeleted
    });
  }
  const registrations = await prisma.registrationSystem.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }
  });
  const total = await prisma.registrationSystem.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    registrations,
    meta
  };
};
var getRegistration = async (id) => {
  const isRegistration = await prisma.registrationSystem.findUnique({
    where: {
      id,
      isActive: true,
      isDeleted: false
    }
  });
  if (!isRegistration) {
    throw new AppError(httpStatus31.NOT_FOUND, " not found");
  }
  return isRegistration;
};
var updateRegistration = async (payload, id) => {
  const isRegistration = await prisma.registrationSystem.findUnique({
    where: {
      id
    }
  });
  if (!isRegistration) {
    throw new AppError(httpStatus31.NOT_FOUND, " not found");
  }
  if (isRegistration.isDeleted) {
    throw new AppError(httpStatus31.CONFLICT, "registration is deleted");
  }
  const update = await prisma.registrationSystem.update({
    where: {
      id
    },
    data: {
      ...payload
    }
  });
  return update;
};
var deleteRegistration = async (id) => {
  const isRegistration = await prisma.registrationSystem.findUnique({
    where: {
      id
    }
  });
  if (!isRegistration) {
    throw new AppError(httpStatus31.NOT_FOUND, " not found");
  }
  if (isRegistration.isDeleted) {
    throw new AppError(httpStatus31.CONFLICT, "registration already deleted");
  }
  await prisma.apply.update({
    where: {
      id
    },
    data: {
      isDeleted: true,
      deletedAt: /* @__PURE__ */ new Date()
    }
  });
};
var registrationService = {
  createRegistration,
  getAll: getAll5,
  getRegistration,
  updateRegistration,
  deleteRegistration
};

// src/app/module/registration/registration.controller.ts
var createRegistration2 = catchAsync(
  async (req, res) => {
    const body = req.body;
    const configId = req.params.siteConfigId;
    const result = await registrationService.createRegistration(body, configId);
    sendResponse(res, {
      statusCode: httpStatus32.CREATED,
      success: true,
      message: "registration created successfully",
      data: result
    });
  }
);
var getAll6 = catchAsync(
  async (req, res) => {
    const query = req.query;
    const { registrations, meta } = await registrationService.getAll(query);
    sendResponse(res, {
      statusCode: httpStatus32.OK,
      success: true,
      message: "registration retrive successfully",
      data: registrations,
      meta
    });
  }
);
var getRegistration2 = catchAsync(
  async (req, res) => {
    const registrationId = req.params.registrationId;
    const result = await registrationService.getRegistration(registrationId);
    sendResponse(res, {
      statusCode: httpStatus32.OK,
      success: true,
      message: "registration retrive successfully",
      data: result
    });
  }
);
var updateRegistration2 = catchAsync(
  async (req, res) => {
    const body = req.body;
    const registrationId = req.params.registrationId;
    const result = await registrationService.updateRegistration(body, registrationId);
    sendResponse(res, {
      statusCode: httpStatus32.OK,
      success: true,
      message: "registrationId updated successfully",
      data: result
    });
  }
);
var deleteRegistration2 = catchAsync(
  async (req, res) => {
    const registrationId = req.params.registrationId;
    await registrationService.deleteRegistration(registrationId);
    sendResponse(res, {
      statusCode: httpStatus32.OK,
      success: true,
      message: "registration deleted successfully",
      data: null
    });
  }
);
var registrationController = {
  createRegistration: createRegistration2,
  getAll: getAll6,
  getRegistration: getRegistration2,
  updateRegistration: updateRegistration2,
  deleteRegistration: deleteRegistration2
};

// src/app/module/registration/registration.route.ts
var route13 = Router14({ mergeParams: true });
route13.post(
  "/",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  registrationController.createRegistration
);
route13.get(
  "/all-registration",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  registrationController.getAll
);
route13.get(
  "/:registrationId",
  registrationController.getRegistration
);
route13.put(
  "/:registrationId",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  registrationController.updateRegistration
);
route13.patch(
  "/:registrationId",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  registrationController.deleteRegistration
);
var registrationRouter = route13;

// src/app/module/study/study.route.ts
import { Router as Router15 } from "express";

// src/app/module/study/study.controller.ts
import httpStatus34 from "http-status";

// src/app/module/study/study.service.ts
import httpStatus33 from "http-status";
var createStudy = async (payload, configId) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus33.NOT_FOUND, "site config not found");
  }
  const study = prisma.study.create({
    data: {
      ...payload,
      siteConfigId: configId
    }
  });
  return study;
};
var getAll7 = async (query) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const andConditions = [];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (query.isActive) {
    andConditions.push({
      isActive: query.isActive
    });
  }
  if (query.isDeleted) {
    andConditions.push({
      isDeleted: query.isDeleted
    });
  }
  const studys = await prisma.study.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }
  });
  const total = await prisma.study.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    studys,
    meta
  };
};
var getStudy = async (id) => {
  const isStudy = await prisma.study.findUnique({
    where: {
      id,
      isActive: true,
      isDeleted: false
    }
  });
  if (!isStudy) {
    throw new AppError(httpStatus33.NOT_FOUND, " not found");
  }
  return isStudy;
};
var updateStudy = async (payload, id) => {
  const isStudy = await prisma.study.findUnique({
    where: {
      id
    }
  });
  if (!isStudy) {
    throw new AppError(httpStatus33.NOT_FOUND, " not found");
  }
  if (isStudy.isDeleted) {
    throw new AppError(httpStatus33.CONFLICT, "study is deleted");
  }
  const update = await prisma.study.update({
    where: {
      id
    },
    data: {
      ...payload
    }
  });
  return update;
};
var deleteStudy = async (id) => {
  const isStudy = await prisma.study.findUnique({
    where: {
      id
    }
  });
  if (!isStudy) {
    throw new AppError(httpStatus33.NOT_FOUND, " not found");
  }
  if (isStudy.isDeleted) {
    throw new AppError(httpStatus33.CONFLICT, "study already deleted");
  }
  await prisma.study.update({
    where: {
      id
    },
    data: {
      isDeleted: true,
      deletedAt: /* @__PURE__ */ new Date()
    }
  });
};
var StudyService = {
  createStudy,
  getAll: getAll7,
  getStudy,
  updateStudy,
  deleteStudy
};

// src/app/module/study/study.controller.ts
var createStudy2 = catchAsync(
  async (req, res) => {
    const body = req.body;
    const configId = req.params.siteConfigId;
    const result = await StudyService.createStudy(body, configId);
    sendResponse(res, {
      statusCode: httpStatus34.CREATED,
      success: true,
      message: "study created successfully",
      data: result
    });
  }
);
var getAll8 = catchAsync(
  async (req, res) => {
    const query = req.query;
    const { studys, meta } = await StudyService.getAll(query);
    sendResponse(res, {
      statusCode: httpStatus34.OK,
      success: true,
      message: "study retrive successfully",
      data: studys,
      meta
    });
  }
);
var getStudy2 = catchAsync(
  async (req, res) => {
    const studyId = req.params.studyId;
    const result = await StudyService.getStudy(studyId);
    sendResponse(res, {
      statusCode: httpStatus34.OK,
      success: true,
      message: "study retrive successfully",
      data: result
    });
  }
);
var updateStudy2 = catchAsync(
  async (req, res) => {
    const body = req.body;
    const studyId = req.params.studyId;
    const result = await StudyService.updateStudy(body, studyId);
    sendResponse(res, {
      statusCode: httpStatus34.OK,
      success: true,
      message: "study updated successfully",
      data: result
    });
  }
);
var deleteStudy2 = catchAsync(
  async (req, res) => {
    const studyId = req.params.studyId;
    await StudyService.deleteStudy(studyId);
    sendResponse(res, {
      statusCode: httpStatus34.OK,
      success: true,
      message: "study deleted successfully",
      data: null
    });
  }
);
var studyController = {
  createStudy: createStudy2,
  getAll: getAll8,
  getStudy: getStudy2,
  updateStudy: updateStudy2,
  deleteStudy: deleteStudy2
};

// src/app/module/study/study.route.ts
var route14 = Router15({ mergeParams: true });
route14.post(
  "/",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  studyController.createStudy
);
route14.get(
  "/all-study",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  studyController.getAll
);
route14.get(
  "/:studyId",
  studyController.getStudy
);
route14.put(
  "/:studyId",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  studyController.updateStudy
);
route14.patch(
  "/:studyId",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  studyController.deleteStudy
);
var studyRouter = route14;

// src/app/module/routine/routine.route.ts
import { Router as Router16 } from "express";

// src/app/module/routine/routine.controller.ts
import httpStatus36 from "http-status";

// src/app/module/routine/routine.validation.ts
import z5 from "zod";
var routineZodSchema = z5.object({
  title: z5.string(),
  description: z5.string()
});

// src/app/module/routine/routine.service.ts
import httpStatus35 from "http-status";
var createRoutine = async (payload, file, configId) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus35.NOT_FOUND, "site config not found");
  }
  if (!file) {
    throw new AppError(httpStatus35.BAD_REQUEST, "file must be added");
  }
  const fileRes = await createFile(file, "Modern-School/Routine");
  const createRoutine3 = await prisma.routine.create({
    data: {
      ...payload,
      file: fileRes.secure_url,
      filePublicId: fileRes?.public_id,
      siteConfigId: isConfig.id
    }
  });
  return createRoutine3;
};
var getAllRoutine = async (query, configId) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 5);
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus35.NOT_FOUND, "site config not found");
  }
  const andConditions = [];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (query.isActive) {
    andConditions.push({
      isActive: query.isActive
    });
  }
  if (query.isDeleted) {
    andConditions.push({
      isDeleted: query.isDeleted
    });
  }
  if (query.configId) {
    andConditions.push({
      siteConfigId: query.configId
    });
  }
  const routines = await prisma.routine.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }
  });
  const total = await prisma.routine.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    routines,
    meta
  };
};
var getSingleRoutine = async (routineId, configId) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus35.NOT_FOUND, "site config not found");
  }
  const isRoutine = await prisma.routine.findUnique({
    where: {
      id: routineId,
      isActive: true,
      isDeleted: false
    }
  });
  if (!isRoutine) {
    throw new AppError(httpStatus35.NOT_FOUND, "routine not found");
  }
  return isRoutine;
};
var updateRoutine = async (payload, file, routineId) => {
  const isRoutine = await prisma.routine.findUnique({
    where: {
      id: routineId
    }
  });
  if (!isRoutine) {
    throw new AppError(httpStatus35.NOT_FOUND, "routine not found");
  }
  const fileRes = file ? await createFile(file, "Modern-School/Routine") : null;
  const routine = await prisma.routine.update({
    where: {
      id: isRoutine.id
    },
    data: {
      ...payload,
      file: fileRes?.secure_url,
      filePublicId: fileRes?.public_id
    }
  });
  if (isRoutine.filePublicId) {
    Cloudinary.cloudinary.uploader.destroy(isRoutine.filePublicId, {
      invalidate: true
    });
  }
  return routine;
};
var deleteRoutine = async (routineId, configId) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus35.NOT_FOUND, "site config not found");
  }
  const isRoutine = await prisma.routine.findUnique({
    where: {
      id: routineId
    }
  });
  if (!isRoutine) {
    throw new AppError(httpStatus35.NOT_FOUND, "routine not found");
  }
  if (isRoutine.isDeleted) {
    throw new AppError(httpStatus35.CONFLICT, "routine already deleted");
  }
  await prisma.routine.update({
    where: {
      id: isRoutine.id
    },
    data: {
      isDeleted: true,
      deletedAt: /* @__PURE__ */ new Date()
    }
  });
};
var routineService = {
  createRoutine,
  getAllRoutine,
  getSingleRoutine,
  updateRoutine,
  deleteRoutine
};

// src/app/module/routine/routine.controller.ts
var createRoutine2 = catchAsync(
  async (req, res) => {
    const file = req.file;
    if (!req.body.data) {
      throw new AppError(httpStatus36.BAD_REQUEST, "form data not found");
    }
    let data = JSON.parse(req.body.data);
    const validation = routineZodSchema.safeParse(data);
    if (!validation.success) {
      throw new AppError(httpStatus36.BAD_REQUEST, validation.error.issues[0].message);
    }
    const configId = req.params.siteConfigId;
    const result = await routineService.createRoutine(data, file, configId);
    sendResponse(res, {
      statusCode: httpStatus36.OK,
      success: true,
      message: "routine created successfully",
      data: result
    });
  }
);
var getAllRoutine2 = catchAsync(
  async (req, res) => {
    const configId = req.params.siteConfigId;
    const query = req.query;
    const { routines, meta } = await routineService.getAllRoutine(query, configId);
    if (routines.length === 0) {
      throw new AppError(httpStatus36.NOT_FOUND, "routine not found");
    }
    sendResponse(res, {
      statusCode: httpStatus36.OK,
      success: true,
      message: "routine retrive successfully",
      data: routines,
      meta
    });
  }
);
var getSingle = catchAsync(
  async (req, res) => {
    const configId = req.params.siteConfigId;
    const routineId = req.params.routineId;
    const result = await routineService.getSingleRoutine(routineId, configId);
    sendResponse(res, {
      statusCode: httpStatus36.OK,
      success: true,
      message: "routine retrive successfully",
      data: result
    });
  }
);
var deleteRoutine2 = catchAsync(
  async (req, res) => {
    const configId = req.params.siteConfigId;
    const routineId = req.params.routineId;
    await routineService.deleteRoutine(routineId, configId);
    sendResponse(res, {
      statusCode: httpStatus36.OK,
      success: true,
      message: "routine deleted successfully",
      data: null
    });
  }
);
var updateRoutine2 = catchAsync(
  async (req, res) => {
    const file = req.file;
    const data = req.body.data;
    const routineId = req.params.routineId;
    const result = await routineService.updateRoutine(data, file, routineId);
    sendResponse(res, {
      statusCode: httpStatus36.OK,
      success: true,
      message: "routine updated successfully",
      data: result
    });
  }
);
var routineController = {
  createRoutine: createRoutine2,
  getAllRoutine: getAllRoutine2,
  getSingle,
  updateRoutine: updateRoutine2,
  deleteRoutine: deleteRoutine2
};

// src/app/module/routine/routine.route.ts
var route15 = Router16({ mergeParams: true });
route15.post(
  "/",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  Cloudinary.upload.single("file"),
  routineController.createRoutine
);
route15.get(
  "/all-routine",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  routineController.getAllRoutine
);
route15.get(
  "/:routineId",
  routineController.getSingle
);
route15.put(
  "/:routineId",
  Cloudinary.upload.single("file"),
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  routineController.updateRoutine
);
route15.patch(
  "/:routineId",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  routineController.deleteRoutine
);
var routineRouter = route15;

// src/app/module/achievement/achievement.route.ts
import { Router as Router17 } from "express";

// src/app/module/achievement/achievement.controller.ts
import httpStatus38 from "http-status";

// src/app/module/achievement/achievement.validation.ts
import z6 from "zod";
var achievementValidationZodSchema = z6.object({
  title: z6.string(),
  description: z6.string(),
  gallery: z6.array(z6.object({
    file: z6.url(),
    filePublicId: z6.string()
  })).optional()
});

// src/app/module/achievement/achievement.service.ts
import httpStatus37 from "http-status";
var createAchievement = async (payload, cover, files, configId) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus37.NOT_FOUND, "siteConfig not found");
  }
  const transactionRes = await prisma.$transaction(
    async (tx) => {
      const coverRes = cover ? await createFile(cover, "Modern-School/Achievement/Cover", "image") : null;
      const additionalFilesRes = files ? await createFiles(files, "Modern-School/Achievement/Files") : null;
      const create = await tx.achievement.create({
        data: {
          ...payload,
          siteConfigId: configId,
          cover: coverRes?.secure_url,
          coverPublicId: coverRes?.public_id,
          gallery: {
            create: additionalFilesRes?.map((f) => ({
              file: f.secure_url,
              filePublicId: f.public_id
            }))
          }
        },
        include: {
          gallery: true
        }
      });
      return create;
    },
    {
      maxWait: 1e4,
      timeout: 15e3
    }
  );
  return transactionRes;
};
var getAllAchievement = async (query, configId) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 5);
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus37.NOT_FOUND, "site config not found");
  }
  const andConditions = [];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (query.isActive) {
    andConditions.push({
      isActive: query.isActive
    });
  }
  if (query.isDeleted) {
    andConditions.push({
      isDeleted: query.isDeleted
    });
  }
  if (query.configId) {
    andConditions.push({
      siteConfigId: query.configId
    });
  }
  const achievements = await prisma.achievement.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }
  });
  const total = await prisma.achievement.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    achievements,
    meta
  };
};
var getAchieve = async (query, configId) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 5);
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus37.NOT_FOUND, "site config not found");
  }
  const andConditions = [
    {
      isActive: true
    },
    {
      siteConfigId: isConfig.id
    },
    {
      isDeleted: false
    }
  ];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  const achievements = await prisma.achievement.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }
  });
  const total = await prisma.achievement.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    achievements,
    meta
  };
};
var getSingleAchievements = async (achieveId) => {
  const isAchieve = await prisma.achievement.findUnique({
    where: {
      id: achieveId,
      isActive: true,
      isDeleted: false
    }
  });
  if (!isAchieve) {
    throw new AppError(httpStatus37.NOT_FOUND, "not found");
  }
  return isAchieve;
};
var deleteAchieve = async (achieveId) => {
  const isAchieve = await prisma.achievement.findUnique({
    where: {
      id: achieveId
    }
  });
  if (!isAchieve) {
    throw new AppError(httpStatus37.NOT_FOUND, "not found");
  }
  if (isAchieve.isDeleted) {
    throw new AppError(httpStatus37.CONFLICT, "achieve already deleted");
  }
  await prisma.achievement.update({
    where: {
      id: isAchieve.id
    },
    data: {
      isDeleted: true,
      deletedAt: /* @__PURE__ */ new Date()
    }
  });
};
var updateAchieve = async (payload, cover, files, achieveId) => {
  const isAchieve = await prisma.achievement.findUnique({
    where: {
      id: achieveId,
      isActive: true,
      isDeleted: false
    }
  });
  if (!isAchieve) {
    throw new AppError(httpStatus37.NOT_FOUND, "not found");
  }
  if (isAchieve.isDeleted) {
    throw new AppError(httpStatus37.CONFLICT, "achieve already deleted");
  }
  const transactionRes = await prisma.$transaction(
    async (tx) => {
      const coverRes = cover ? await createFile(cover, "Modern-School/Achievement/Cover", "image") : null;
      const additionalFilesRes = files ? await createFiles(files, "Modern-School/Achievement/Files") : null;
      const update = await tx.achievement.update({
        where: {
          id: isAchieve.id
        },
        data: {
          ...payload,
          cover: coverRes?.secure_url,
          coverPublicId: coverRes?.public_id,
          gallery: {
            create: additionalFilesRes?.map((f) => ({
              file: f.secure_url,
              filePublicId: f.public_id
            }))
          }
        }
      });
      await Cloudinary.cloudinary.uploader.destroy(
        isAchieve.coverPublicId,
        {
          invalidate: true
        }
      );
      return update;
    },
    {
      maxWait: 1e4,
      timeout: 15e3
    }
  );
  return transactionRes;
};
var achievementService = {
  createAchievement,
  getAllAchievement,
  getAchieve,
  getSingleAchievements,
  updateAchieve,
  deleteAchieve
};

// src/app/module/achievement/achievement.controller.ts
var createAchieve = catchAsync(
  async (req, res) => {
    const configId = req.params.siteConfigId;
    const files = req.files;
    const cover = files?.["cover"]?.[0];
    const additionalFiles = files?.["additionalFiles"] || [];
    if (!req.body.data) {
      throw new AppError(httpStatus38.BAD_REQUEST, "form data not found");
    }
    let data = JSON.parse(req.body.data);
    const validation = achievementValidationZodSchema.safeParse(data);
    if (!validation.success) {
      throw new AppError(httpStatus38.BAD_REQUEST, validation.error.issues[0].message);
    }
    data = validation.data;
    const result = await achievementService.createAchievement(data, cover, additionalFiles, configId);
    sendResponse(res, {
      statusCode: httpStatus38.CREATED,
      success: true,
      message: "achievement created successfully",
      data: result
    });
  }
);
var getAllAchieve = catchAsync(
  async (req, res) => {
    const configId = req.params.siteConfigId;
    const query = req.query;
    const { achievements, meta } = await achievementService.getAllAchievement(query, configId);
    if (achievements.length === 0) {
      throw new AppError(httpStatus38.NOT_FOUND, "not found");
    }
    sendResponse(res, {
      statusCode: httpStatus38.OK,
      success: true,
      message: "achievements retrive successfully",
      data: achievements,
      meta
    });
  }
);
var getAchieves = catchAsync(
  async (req, res) => {
    const configId = req.params.siteConfigId;
    const query = req.query;
    const { achievements, meta } = await achievementService.getAchieve(query, configId);
    if (achievements.length === 0) {
      throw new AppError(httpStatus38.NOT_FOUND, "not found");
    }
    sendResponse(res, {
      statusCode: httpStatus38.OK,
      success: true,
      message: "achievements retrive successfully",
      data: achievements,
      meta
    });
  }
);
var getSingle2 = catchAsync(
  async (req, res) => {
    const achieveId = req.params.achieveId;
    const result = await achievementService.getSingleAchievements(achieveId);
    sendResponse(res, {
      statusCode: httpStatus38.OK,
      success: true,
      message: "achieve retrive successfully",
      data: result
    });
  }
);
var updateAchieve2 = catchAsync(
  async (req, res) => {
    const configId = req.params.siteConfigId;
    const achieveId = req.params.achieveId;
    const files = req.files;
    const cover = files?.["cover"]?.[0];
    const additionalFiles = files?.["additionalFiles"] || [];
    let data = JSON.parse(req.body.data);
    if (data) {
      const validation = achievementValidationZodSchema.safeParse(data);
      if (!validation.success) {
        throw new AppError(httpStatus38.BAD_REQUEST, validation.error.issues[0].message);
      }
      data = validation.data;
    }
    const result = await achievementService.updateAchieve(data, cover, additionalFiles, achieveId);
    sendResponse(res, {
      statusCode: httpStatus38.OK,
      success: true,
      message: "achievement updated successfully",
      data: result
    });
  }
);
var deleteAchieve2 = catchAsync(
  async (req, res) => {
    const achieveId = req.params.achieveId;
    await achievementService.deleteAchieve(achieveId);
    sendResponse(res, {
      statusCode: httpStatus38.OK,
      success: true,
      message: "achieve deleted successfully",
      data: null
    });
  }
);
var achievementController = {
  createAchieve,
  getAllAchieve,
  getAchieves,
  getSingle: getSingle2,
  updateAchieve: updateAchieve2,
  deleteAchieve: deleteAchieve2
};

// src/app/module/achievement/achievement.route.ts
var route16 = Router17({ mergeParams: true });
route16.post(
  "/",
  Cloudinary.upload.fields([
    {
      name: "cover",
      maxCount: 1
    },
    {
      name: "additionalFiles",
      maxCount: 10
    }
  ]),
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  achievementController.createAchieve
);
route16.get(
  "/all",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  achievementController.getAllAchieve
);
route16.get(
  "/all-achievements",
  achievementController.getAchieves
);
route16.get(
  "/:achieveId",
  achievementController.getSingle
);
route16.patch(
  "/:achieveId",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  achievementController.deleteAchieve
);
route16.put(
  "/:achieveId",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  achievementController.updateAchieve
);
var achievementRouter = route16;

// src/app/module/uniform/uniform.route.ts
import { Router as Router18 } from "express";

// src/app/module/uniform/uniform.controller.ts
import httpStatus40 from "http-status";

// src/app/module/uniform/uniform.validation.ts
import z7 from "zod";
var uniformZodSchema = z7.object({
  title: z7.string(),
  descripiton: z7.string().optional()
});

// src/app/module/uniform/uniform.service.ts
import httpStatus39 from "http-status";
var createUniform = async (payload, file, configId) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus39.NOT_FOUND, "site config not found");
  }
  const fileRes = file ? await createFile(file, "Modern-School/Uniform") : null;
  const createUniform3 = await prisma.uniform.create({
    data: {
      ...payload,
      file: fileRes?.secure_url,
      filePublicId: fileRes?.public_id,
      siteConfigId: configId
    }
  });
  return createUniform3;
};
var getAllUniform = async (query, configId) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 5);
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus39.NOT_FOUND, "site config not found");
  }
  const andConditions = [];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (query.isActive) {
    andConditions.push({
      isActive: query.isActive
    });
  }
  if (query.isDeleted) {
    andConditions.push({
      isDeleted: query.isDeleted
    });
  }
  if (query.configId) {
    andConditions.push({
      siteConfigId: query.configId
    });
  }
  const uniforms = await prisma.uniform.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }
  });
  const total = await prisma.uniform.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    uniforms,
    meta
  };
};
var getUniforms = async (query, configId) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 5);
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus39.NOT_FOUND, "site config not found");
  }
  const andConditions = [
    {
      isActive: true
    },
    {
      siteConfigId: isConfig.id
    },
    {
      isDeleted: false
    }
  ];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  const uniforms = await prisma.uniform.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }
  });
  const total = await prisma.uniform.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    uniforms,
    meta
  };
};
var updateUniform = async (payload, file, uniformId) => {
  const isUniform = await prisma.uniform.findUnique({
    where: {
      id: uniformId
    }
  });
  if (!isUniform) {
    throw new AppError(httpStatus39.NOT_FOUND, "not found");
  }
  if (isUniform.isDeleted) {
    throw new AppError(httpStatus39.CONFLICT, "uniform already deleted");
  }
  const fileRes = file ? await createFile(file, "Modern-School/Uniform") : null;
  const transactionRes = await prisma.$transaction(
    async (tx) => {
      const uniforms = await tx.uniform.update({
        where: {
          id: isUniform.id
        },
        data: {
          ...payload,
          file: fileRes?.secure_url,
          filePublicId: fileRes?.public_id
        }
      });
      await Cloudinary.cloudinary.uploader.destroy(isUniform.filePublicId, {
        invalidate: true
      });
      return uniforms;
    }
  );
  return transactionRes;
};
var deleteUniform = async (uniformId, configId) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus39.NOT_FOUND, "site config not found");
  }
  const isUniform = await prisma.uniform.findUnique({
    where: {
      id: uniformId
    }
  });
  if (!isUniform) {
    throw new AppError(httpStatus39.NOT_FOUND, "not found");
  }
  if (isUniform.isDeleted) {
    throw new AppError(httpStatus39.CONFLICT, "already deleted");
  }
  await prisma.uniform.update({
    where: {
      id: isUniform.id
    },
    data: {
      isDeleted: true,
      deletedAt: /* @__PURE__ */ new Date()
    }
  });
};
var uniformService = {
  createUniform,
  getAllUniform,
  getUniforms,
  updateUniform,
  deleteUniform
};

// src/app/module/uniform/uniform.controller.ts
var createUniform2 = catchAsync(
  async (req, res) => {
    const file = req.file;
    if (!req.body.data) {
      throw new AppError(httpStatus40.BAD_REQUEST, "form data not found");
    }
    let data = JSON.parse(req.body.data);
    const validation = uniformZodSchema.safeParse(data);
    if (!validation.success) {
      throw new AppError(httpStatus40.BAD_REQUEST, validation.error.issues[0].message);
    }
    const configId = req.params.siteConfigId;
    const result = await uniformService.createUniform(data, file, configId);
    sendResponse(res, {
      statusCode: httpStatus40.OK,
      success: true,
      message: "uniform created successfully",
      data: result
    });
  }
);
var getAllUniforms = catchAsync(
  async (req, res) => {
    const configId = req.params.siteConfigId;
    const query = req.query;
    const { uniforms, meta } = await uniformService.getAllUniform(query, configId);
    if (uniforms.length === 0) {
      throw new AppError(httpStatus40.NOT_FOUND, "not found");
    }
    sendResponse(res, {
      statusCode: httpStatus40.OK,
      success: true,
      message: "uniform retrive successfully",
      data: uniforms,
      meta
    });
  }
);
var getUniforms2 = catchAsync(
  async (req, res) => {
    const configId = req.params.siteConfigId;
    const query = req.query;
    const { uniforms, meta } = await uniformService.getUniforms(query, configId);
    if (uniforms.length === 0) {
      throw new AppError(httpStatus40.NOT_FOUND, "uniform not found");
    }
    sendResponse(res, {
      statusCode: httpStatus40.OK,
      success: true,
      message: "unifrom retrive successfully",
      data: uniforms,
      meta
    });
  }
);
var deleteUniform2 = catchAsync(
  async (req, res) => {
    const configId = req.params.siteConfigId;
    const uniformId = req.params.uniformId;
    await uniformService.deleteUniform(uniformId, configId);
    sendResponse(res, {
      statusCode: httpStatus40.OK,
      success: true,
      message: "uniform deleted successfully",
      data: null
    });
  }
);
var updateUniform2 = catchAsync(
  async (req, res) => {
    const file = req.file;
    const data = req.body.data;
    const uniformId = req.params.uniformId;
    if (!file && !data) {
      throw new AppError(httpStatus40.BAD_REQUEST, "must be one field");
    }
    const result = await uniformService.updateUniform(data, file, uniformId);
    sendResponse(res, {
      statusCode: httpStatus40.OK,
      success: true,
      message: "unifrom updated successfully",
      data: result
    });
  }
);
var uniformController = {
  createUniform: createUniform2,
  getAllUniforms,
  getUniforms: getUniforms2,
  updateUniform: updateUniform2,
  deleteUniform: deleteUniform2
};

// src/app/module/uniform/uniform.route.ts
var route17 = Router18({ mergeParams: true });
route17.post(
  "/",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  Cloudinary.upload.single("file"),
  uniformController.createUniform
);
route17.get(
  "/all",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  uniformController.getAllUniforms
);
route17.get(
  "/all-uniroms",
  uniformController.getUniforms
);
route17.put(
  "/:uniformId",
  Cloudinary.upload.single("file"),
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  uniformController.updateUniform
);
route17.patch(
  "/:uniformId",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  uniformController.deleteUniform
);
var uniformRouter = route17;

// src/app/module/news/news.route.ts
import { Router as Router19 } from "express";

// src/app/module/news/news.controller.ts
import httpStatus42 from "http-status";

// src/app/module/news/news.validation.ts
import z8 from "zod";
var newsZodSchema = z8.object({
  title: z8.string(),
  content: z8.string()
});

// src/app/module/news/news.service.ts
import httpStatus41 from "http-status";
var createNews = async (payload, file, configId) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus41.NOT_FOUND, "site config not found");
  }
  const fileRes = file ? await createFile(file, "Modern-School/News") : null;
  const createNews3 = await prisma.news.create({
    data: {
      ...payload,
      file: fileRes?.secure_url,
      filePublicId: fileRes?.public_id,
      siteConfigId: configId
    }
  });
  return createNews3;
};
var getAllNews = async (query, configId) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 5);
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus41.NOT_FOUND, "site config not found");
  }
  const andConditions = [];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (query.isActive) {
    andConditions.push({
      isActive: query.isActive
    });
  }
  if (query.isDeleted) {
    andConditions.push({
      isDeleted: query.isDeleted
    });
  }
  if (query.configId) {
    andConditions.push({
      siteConfigId: query.configId
    });
  }
  const news = await prisma.news.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }
  });
  const total = await prisma.news.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    news,
    meta
  };
};
var getNews = async (query, configId) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 5);
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus41.NOT_FOUND, "site config not found");
  }
  const andConditions = [
    {
      isActive: true
    },
    {
      siteConfigId: isConfig.id
    },
    {
      isDeleted: false
    }
  ];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  const news = await prisma.news.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }
  });
  const total = await prisma.news.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    news,
    meta
  };
};
var getSingleNews = async (newsId, configId) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus41.NOT_FOUND, "site config not found");
  }
  const isNews = await prisma.news.findUnique({
    where: {
      id: newsId
    }
  });
  if (!isNews) {
    throw new AppError(httpStatus41.NOT_FOUND, "notice not found");
  }
  return isNews;
};
var updateNews = async (payload, file, newsId) => {
  const isNews = await prisma.news.findUnique({
    where: {
      id: newsId
    }
  });
  if (!isNews) {
    throw new AppError(httpStatus41.NOT_FOUND, "news not found");
  }
  const fileRes = file ? await createFile(file, "Modern-School/News") : null;
  const news = await prisma.news.update({
    where: {
      id: isNews.id
    },
    data: {
      ...payload,
      file: fileRes?.secure_url,
      filePublicId: fileRes?.public_id
    }
  });
  if (file) {
    Cloudinary.cloudinary.uploader.destroy(isNews.filePublicId, {
      invalidate: true
    });
  }
  return news;
};
var deleteNews = async (newsId, configId) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  });
  if (!isConfig) {
    throw new AppError(httpStatus41.NOT_FOUND, "site config not found");
  }
  const isNews = await prisma.news.findUnique({
    where: {
      id: newsId,
      siteConfigId: isConfig.id
    }
  });
  if (!isNews) {
    throw new AppError(httpStatus41.NOT_FOUND, "news not found");
  }
  if (!isNews.isActive) {
    throw new AppError(httpStatus41.CONFLICT, "news is temporary deactive");
  }
  if (isNews.isDeleted) {
    throw new AppError(httpStatus41.CONFLICT, "news already deleted");
  }
  await prisma.news.update({
    where: {
      id: isNews.id
    },
    data: {
      isDeleted: true,
      deletedAt: /* @__PURE__ */ new Date()
    }
  });
};
var newsService = {
  createNews,
  getAllNews,
  getNews,
  getSingleNews,
  updateNews,
  deleteNews
};

// src/app/module/news/news.controller.ts
var createNews2 = catchAsync(
  async (req, res) => {
    const file = req.file;
    if (!req.body.data) {
      throw new AppError(httpStatus42.BAD_REQUEST, "form data not found");
    }
    let data = JSON.parse(req.body.data);
    const validation = newsZodSchema.safeParse(data);
    if (!validation.success) {
      throw new AppError(httpStatus42.BAD_REQUEST, validation.error.issues[0].message);
    }
    const configId = req.params.siteConfigId;
    const result = await newsService.createNews(data, file, configId);
    sendResponse(res, {
      statusCode: httpStatus42.OK,
      success: true,
      message: "news created successfully",
      data: result
    });
  }
);
var getAllNews2 = catchAsync(
  async (req, res) => {
    const configId = req.params.siteConfigId;
    const query = req.query;
    const { news, meta } = await newsService.getAllNews(query, configId);
    if (news.length === 0) {
      throw new AppError(httpStatus42.NOT_FOUND, "news not found");
    }
    sendResponse(res, {
      statusCode: httpStatus42.OK,
      success: true,
      message: "news retrive successfully",
      data: news,
      meta
    });
  }
);
var getNews2 = catchAsync(
  async (req, res) => {
    const configId = req.params.siteConfigId;
    const query = req.query;
    const { news, meta } = await newsService.getNews(query, configId);
    if (news.length === 0) {
      throw new AppError(httpStatus42.NOT_FOUND, "news not found");
    }
    sendResponse(res, {
      statusCode: httpStatus42.OK,
      success: true,
      message: "news retrive successfully",
      data: news,
      meta
    });
  }
);
var getSingle3 = catchAsync(
  async (req, res) => {
    const configId = req.params.siteConfigId;
    const newsId = req.params.newsId;
    const result = await newsService.getSingleNews(newsId, configId);
    sendResponse(res, {
      statusCode: httpStatus42.OK,
      success: true,
      message: "news retrive successfully",
      data: result
    });
  }
);
var deleteNews2 = catchAsync(
  async (req, res) => {
    const configId = req.params.siteConfigId;
    const newsId = req.params.newsId;
    await newsService.deleteNews(newsId, configId);
    sendResponse(res, {
      statusCode: httpStatus42.OK,
      success: true,
      message: "news deleted successfully",
      data: null
    });
  }
);
var updateNews2 = catchAsync(
  async (req, res) => {
    const file = req.file;
    const data = JSON.parse(req.body.data);
    const newsId = req.params.newsId;
    if (!file && !data) {
      throw new AppError(httpStatus42.BAD_REQUEST, "must be one field");
    }
    const result = await newsService.updateNews(data, file, newsId);
    sendResponse(res, {
      statusCode: httpStatus42.OK,
      success: true,
      message: "news updated successfully",
      data: result
    });
  }
);
var newsController = {
  createNews: createNews2,
  getAllNews: getAllNews2,
  getNews: getNews2,
  getSingle: getSingle3,
  updateNews: updateNews2,
  deleteNews: deleteNews2
};

// src/app/module/news/news.route.ts
var route18 = Router19({ mergeParams: true });
route18.post(
  "/",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  Cloudinary.upload.single("file"),
  newsController.createNews
);
route18.get(
  "/all",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  newsController.getAllNews
);
route18.get(
  "/all-news",
  newsController.getNews
);
route18.get(
  "/:newsId",
  newsController.getSingle
);
route18.put(
  "/:newsId",
  Cloudinary.upload.single("file"),
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  newsController.updateNews
);
route18.patch(
  "/:newsId",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  newsController.deleteNews
);
var newsRouter = route18;

// src/app.ts
var app = express();
app.use(
  cors({
    origin: env_default.frontend_url,
    credentials: true
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.get("/", async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Modern School Backend"
  });
});
app.use("/api/v1/:siteConfigId/auth", AuthRoutes);
app.use("/api/v1/site-config", siteConfigRouter);
app.use("/api/v1/:siteConfigId/teacher", teacherRouter);
app.use("/api/v1/:siteConfigId/staff", staffRouter);
app.use("/api/v1/:siteConfigId/committee", committeeRouter);
app.use("/api/v1/:siteConfigId/event", eventRouter);
app.use("/api/v1/:siteConfigId/notice", noticeRouter);
app.use("/api/v1/:siteConfigId/activity", activityRouter);
app.use("/api/v1/:siteConfigId/admissionInfo", adminssionInfoRouter);
app.use("/api/v1/:siteConfigId/apply", applyRouter);
app.use("/api/v1/:siteConfigId/rule", academicRuleRouter);
app.use("/api/v1/:siteConfigId/calendar", calendarRouter);
app.use("/api/v1/:siteConfigId/mission-vission", missionRouter);
app.use("/api/v1/:siteConfigId/registration", registrationRouter);
app.use("/api/v1/:siteConfigId/study", studyRouter);
app.use("/api/v1/:siteConfigId/routine", routineRouter);
app.use("/api/v1/:siteConfigId/achievement", achievementRouter);
app.use("/api/v1/:siteConfigId/uniform", uniformRouter);
app.use("/api/v1/:siteConfigId/news", newsRouter);
app.use(globalErrorHandler);
app.use(notFound);
var app_default = app;

// src/app/utils/seed.ts
import bcrypt5 from "bcryptjs";
import httpStatus43 from "http-status";
var seedSiteConfig = async () => {
  const isSiteConfig = await prisma.siteConfig.findFirst();
  if (isSiteConfig) {
    console.log("default site config already exist");
    return isSiteConfig;
  }
  const siteConfig = await prisma.siteConfig.create({
    data: {
      email: env_default.siteConfigEmail,
      id: env_default.siteConfigId
    }
  });
  console.log("site config created", siteConfig);
  return siteConfig;
};
var seedSuperAdmin = async () => {
  try {
    const existSuperAdmin = await prisma.user.findFirst({
      where: { role: "SUPER_ADMIN" }
    });
    if (existSuperAdmin) {
      console.log("super admin already exists");
      return;
    }
    const name = env_default.super_admin_name;
    const email = env_default.super_admin_email;
    const password = env_default.super_admin_password;
    if (!name || !email || !password) {
      throw new AppError(
        httpStatus43.INTERNAL_SERVER_ERROR,
        "no super admin name, email, password"
      );
    }
    const hasPass = await bcrypt5.hash(
      password,
      Number(env_default.bcrypt_salt_rounds)
    );
    const siteConfig = await seedSiteConfig();
    const superAdmin = await prisma.user.create({
      data: {
        siteConfigId: siteConfig?.id,
        name,
        email,
        password: hasPass,
        emailVerified: true,
        needPasswordChange: false,
        role: Role.SUPER_ADMIN
      },
      omit: {
        password: true
      }
    });
    console.log("super admin created", superAdmin);
  } catch (error) {
    console.log("error", error);
    await prisma.user.delete({
      where: { email: env_default.super_admin_email }
    });
  }
};
var seedTesterAdmin = async () => {
  try {
    const name = env_default.tester_admin_name;
    const email = env_default.tester_admin_email;
    const password = env_default.tester_admin_password;
    if (!name || !email || !password) {
      throw new AppError(
        httpStatus43.INTERNAL_SERVER_ERROR,
        "no tester admin name, email, password"
      );
    }
    const existTesterAdmin = await prisma.user.findUnique({
      where: { email }
    });
    if (existTesterAdmin) {
      console.log("tester admin already exists");
      return;
    }
    const hasPass = await bcrypt5.hash(
      password,
      Number(env_default.bcrypt_salt_rounds)
    );
    const siteConfig = await seedSiteConfig();
    const testerAdmin = await prisma.user.create({
      data: {
        siteConfigId: siteConfig?.id,
        name,
        email,
        password: hasPass,
        emailVerified: true,
        needPasswordChange: false,
        role: Role.ADMIN
      },
      omit: {
        password: true
      }
    });
    console.log("tester admin created", testerAdmin);
  } catch (error) {
    console.log("error", error);
    await prisma.user.delete({
      where: { email: env_default.tester_admin_email }
    });
  }
};

// src/server.ts
var PORT = env_default.port;
var main = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");
    app_default.listen(PORT, () => {
      console.log(`server is running port ${PORT}`);
    });
    await seedSiteConfig();
    await seedSuperAdmin();
    await seedTesterAdmin();
  } catch (error) {
    console.error("Error statring the server", error);
    await prisma.$disconnect();
    process.exit(1);
  }
};
main();
//# sourceMappingURL=server.js.map