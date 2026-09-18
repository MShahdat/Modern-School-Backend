import { AchievementWhereInput, EventWhereInput } from "../../../../generated/prisma/models"
import { IQuery } from "../../interface"
import { prisma } from "../../lib/prisma"
import { AppError } from "../../utils/AppError"
import { createFile, createFiles } from "../../utils/cloudinary"
import httpStatus from 'http-status'
import { IAchievementPayload, IUpdateAchievementPayload } from "./achievement.interface"
import { Cloudinary } from "../../lib/cloudinary"


//& CREATE
const createAchievement = async (payload: IAchievementPayload, cover: Express.Multer.File, files: Express.Multer.File[], configId: string) => {

  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'siteConfig not found')
  }

  const transactionRes = await prisma.$transaction(
    async (tx) => {
      const coverRes = cover ?
        await createFile(cover, 'Modern-School/Achievement/Cover', "image")
        : null

      const additionalFilesRes = files ?
        await createFiles(files, 'Modern-School/Achievement/Files')
        : null

      const create = await tx.achievement.create({
        data: {
          ...payload,
          siteConfigId: configId,
          coverImage: coverRes?.secure_url,
          coverImagePublicId: coverRes?.public_id,
          gallery: {
            create: additionalFilesRes?.map(f => ({
              file: f.secure_url,
              filePublicId: f.public_id
            }))
          }
        }
      })
      return create
    },
    {
      maxWait: 10000,
      timeout: 15000
    }
  )

  return transactionRes

}



//& GET ALL (ADMIN)
const getAllAchievement = async (query: IQuery, configId: string) => {

  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 5);

  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const andConditions: AchievementWhereInput[] = []

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
    })
  }

  if (query.isActive) {
    andConditions.push({
      isActive: query.isActive
    })
  }

  if (query.isDeleted) {
    andConditions.push({
      isDeleted: query.isDeleted
    })
  }

  if (query.configId) {
    andConditions.push({
      siteConfigId: query.configId
    })
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

  })

  const total = await prisma.achievement.count({
    where: {
      AND: andConditions,
    },
  });

  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };

  return {
    achievements,
    meta,
  };

}


//& GET ALL (PUBLIC)
const getAchieve = async (query: IQuery, configId: string) => {

  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 5);

  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const andConditions: AchievementWhereInput[] = [
    {
      isActive: true
    },
    {
      siteConfigId: isConfig.id
    },
    {
      isDeleted: false
    }
  ]

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
    })
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

  })

  const total = await prisma.achievement.count({
    where: {
      AND: andConditions,
    },
  });

  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };

  return {
    achievements,
    meta,
  };

}


//& GET SINLGE
const getSingleAchievements = async (achieveId: string
) => {

  const isAchieve = await prisma.achievement.findUnique({
    where: {
      id: achieveId,
      isActive: true,
      isDeleted: false
    }
  })

  if (!isAchieve) {
    throw new AppError(httpStatus.NOT_FOUND, 'not found')
  }

  return isAchieve
}



//& SOFT DELETE
const deleteAchieve = async (achieveId: string) => {

  const isAchieve = await prisma.achievement.findUnique({
    where: {
      id: achieveId
    }
  })

  if (!isAchieve) {
    throw new AppError(httpStatus.NOT_FOUND, 'not found')
  }


  if (!isAchieve.isActive) {
    throw new AppError(httpStatus.CONFLICT, 'achievement is temporary deactive')
  }

  if (isAchieve.isDeleted) {
    throw new AppError(httpStatus.CONFLICT, 'achieve already deleted')
  }

  await prisma.achievement.update({
    where: {
      id: isAchieve.id
    },
    data: {
      isDeleted: true,
      deletedAt: new Date()
    }
  })

}


//& UPDATE
const updateAchieve = async (payload: IUpdateAchievementPayload, cover: Express.Multer.File, files: Express.Multer.File[], achieveId: string) => {

  const isAchieve = await prisma.achievement.findUnique({
    where: {
      id: achieveId,
      isActive: true,
      isDeleted: false
    }
  })

  if (!isAchieve) {
    throw new AppError(httpStatus.NOT_FOUND, 'not found')
  }


  if (!isAchieve.isActive) {
    throw new AppError(httpStatus.CONFLICT, 'achievement is temporary deactive')
  }

  if (isAchieve.isDeleted) {
    throw new AppError(httpStatus.CONFLICT, 'achieve already deleted')
  }

  const transactionRes = await prisma.$transaction(
    async (tx) => {
      const coverRes = cover ?
        await createFile(cover, 'Modern-School/Achievement/Cover', "image")
        : null

      const additionalFilesRes = files ?
        await createFiles(files, 'Modern-School/Achievement/Files')
        : null

      const update = await tx.achievement.update({
        where: {
          id: isAchieve.id,
        },
        data: {
          ...payload,
          coverImage: coverRes?.secure_url,
          coverImagePublicId: coverRes?.public_id,
          gallery: {
            create: additionalFilesRes?.map(f => ({
              file: f.secure_url,
              filePublicId: f.public_id
            }))
          }
        }
      })

      await Cloudinary.cloudinary.uploader.destroy(isAchieve.coverPublicId!,
        {
          invalidate: true
        })
      return update
    },
    {
      maxWait: 10000,
      timeout: 15000
    }
  )

  return transactionRes

}


export const achievementService = {
  createAchievement,
  getAllAchievement,
  getAchieve,
  getSingleAchievements,
  updateAchieve,
  deleteAchieve
}