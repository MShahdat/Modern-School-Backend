import { UploadApiResponse } from "cloudinary";
import { ISiteConfigPayload } from "./siteConfig.interface"
import { Cloudinary } from "../../lib/cloudinary";
import { AppError } from "../../utils/AppError";
import httpStatus from 'http-status'
import { prisma } from "../../lib/prisma";
import { IQuery } from "../../interface";
import { Prisma } from "../../../../generated/prisma/client";

//& CREATE SITECONFIG
const createSiteConfig = async (payload: ISiteConfigPayload, logo: Express.Multer.File) => {

  const cloudinaryRes = await new Promise<UploadApiResponse>(
    (resolve, reject) => {
      Cloudinary.cloudinary.uploader
        .upload_stream(
          {
            folder: "Modern-School/siteConfig/logo",
            resource_type: "image",
          },
          async (error, result) => {
            if (error) {
              return reject(error);
            }
            if (!result) {
              return reject(
                new AppError(
                  httpStatus.BAD_GATEWAY,
                  "No result returned from cloudinary",
                ),
              );
            }
            return resolve(result);
          },
        )
        .end(logo.buffer);
    },
  );


  const config = await prisma.siteConfig.create({
    data: {
      ...payload,
      logo: cloudinaryRes.secure_url,
      logoPublicId: cloudinaryRes.public_id
    }
  })

  return config
}


//& GET ALL SITE CONFIT
const getAllSiteConfig = async (query: IQuery) => {
  console.log('query ', query)

  const sort = query.sortBy ? query.sortBy : 'createdAt';
  const order = query.sortOrder ? query.sortOrder : 'desc';
  const page = Number(query.page || 1)
  const limit = Number(query.limit || 9)

  const andConditions: Prisma.SiteConfigWhereInput[] = []

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
    })
  }

  if (query.schoolName) {
    andConditions.push({
      schoolName: query.schoolName
    })
  }

  if (query.eiin) {
    andConditions.push({
      eiin: query.eiin
    })
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
  })

  const total = await prisma.siteConfig.count({
    where: {
      AND: andConditions
    },
  })

  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  }

  return {
    siteConfigs,
    meta
  }
}


//& GET SITE CONFIT
const getSiteConfig = async (id: string) => {

  const siteConfig = await prisma.siteConfig.findUnique({
    where: {
      id
    },
    include: {
      teacher: true,
      staffs: true,
      committees: true
    }
  })

  return siteConfig
}


//& DELETE
const deleteConfig = async (id: string) => {

  const config = await prisma.siteConfig.findUnique({
    where: { id }
  })

  if (!config) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const delConfig = await prisma.siteConfig.delete({
    where: { id }
  })

  await Cloudinary.cloudinary.uploader.destroy(config.logoPublicId as string)

}



//& UPDATE SITE CONFIG
const udpateSiteConfig = async (payload: ISiteConfigPayload, id: string, logo: Express.Multer.File) => {

  const isExist = await prisma.siteConfig.findUnique({
    where: { id }
  })

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }


  const cloudinaryRes = logo ? await new Promise<UploadApiResponse>(
    (resolve, reject) => {
      Cloudinary.cloudinary.uploader
        .upload_stream(
          {
            folder: "Modern-School/siteConfig/logo",
            resource_type: "image",
          },
          async (error, result) => {
            if (error) {
              return reject(error);
            }
            if (!result) {
              return reject(
                new AppError(
                  httpStatus.BAD_GATEWAY,
                  "No result returned from cloudinary",
                ),
              );
            }
            return resolve(result);
          },
        )
        .end(logo.buffer);
    },
  ) : null

  const updatedConfig = await prisma.siteConfig.update({
    where: { id },
    data: {
      ...payload,
      logo: cloudinaryRes ? cloudinaryRes.secure_url : isExist.logo,
      logoPublicId: cloudinaryRes ? cloudinaryRes.public_id : isExist.logoPublicId
    }
  })

  if (cloudinaryRes && logo) {
    await Cloudinary.cloudinary.uploader.destroy(isExist.logoPublicId as string)
  }

  return updatedConfig
}


export const siteConfigService = {
  createSiteConfig,
  getAllSiteConfig,
  getSiteConfig,
  deleteConfig,
  udpateSiteConfig
}