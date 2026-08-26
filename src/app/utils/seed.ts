import { Role } from "../../../generated/prisma/enums";
import config from "../config/env";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import httpStatus from "http-status";
import { AppError } from "./AppError";


const getSiteConfigId = async () => {
  const siteConfig = await prisma.siteConfig.findUnique({
    where: { id: config.siteConfigId },
    select: { id: true },
  });

  if (!siteConfig) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `site config not found for SITE_CONFIG_ID: ${config.siteConfigId}`,
    );
  }

  return siteConfig.id;
};

export const seedSuperAdmin = async () => {
  try {
    const existSuperAdmin = await prisma.user.findFirst({
      where: { role: "SUPER_ADMIN" },
      omit: {
        password: true
      }
    });

    if (existSuperAdmin) {
      console.log("super admin already exists");
      return;
    }

    const name = config.super_admin_name;
    const email = config.super_admin_email;
    const password = config.super_admin_password;

    if (!name || !email || !password) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "no super admin name, email, password",
      );
    }

    const hasPass = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds),
    );
    const siteConfigId = await getSiteConfigId();

    const superAdmin = await prisma.user.create({
      data: {
        siteConfigId,
        name,
        email,
        password: hasPass,
        emailVerified: true,
        needPasswordChange: false,
        role: Role.SUPER_ADMIN,
      },
    });

    console.log("super admin created", superAdmin);
  }
  catch (error) {
    console.log("error", error);
    await prisma.user.delete({
      where: { email: config.super_admin_email },
    });
  }
};

export const seedTesterAdmin = async () => {
  try {
    const name = config.tester_admin_name;
    const email = config.tester_admin_email;
    const password = config.tester_admin_password;

    if (!name || !email || !password) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "no tester admin name, email, password",
      );
    }

    const existTesterAdmin = await prisma.user.findUnique({
      where: { email },
      omit: {
        password: true
      }
    });

    if (existTesterAdmin) {
      console.log("tester admin already exists");
      return;
    }

    const hasPass = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds),
    );
    const siteConfigId = await getSiteConfigId();

    const testerAdmin = await prisma.user.create({
      data: {
        siteConfigId,
        name,
        email,
        password: hasPass,
        emailVerified: true,
        needPasswordChange: false,
        role: Role.ADMIN,
      },
    });

    console.log("tester admin created", testerAdmin);
  }
  catch (error) {
    console.log("error", error);
    await prisma.user.delete({
      where: { email: config.tester_admin_email },
    });
  }
};
