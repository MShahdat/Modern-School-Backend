import { NoticeWhereInput } from "../../../../generated/prisma/models";
import { IQuery } from "../../interface";
import { Cloudinary } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { createFile } from "../../utils/cloudinary";
import { INoticePayload, IUpdateNotice } from "./notice.interface";
import httpStatus from 'http-status'

//& CREATE NOTICE
const createNotice = async (payload: INoticePayload, file: Express.Multer.File, configId: string) => {

  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const fileRes = file ?
    await createFile(file, 'Modern-School/Notice')
    : null

  const createNotice = await prisma.notice.create({
    data: {
      ...payload,
      file: fileRes?.secure_url,
      filePublicId: fileRes?.public_id,
      siteConfigId: configId
    }
  })

  return createNotice
}


//& GET ALL NOTICE (ADMIN)
const getAllNotices = async (query: IQuery, configId: string) => {

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

  const andConditions: NoticeWhereInput[] = [
    {
      siteConfigId: isConfig.id
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

  const notices = await prisma.notice.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }

  })

  const total = await prisma.notice.count({
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
    notices,
    meta,
  };

}


//& GET ALL NOTICE (PUBLIC)
const getNotices = async (query: IQuery, configId: string) => {

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

  const andConditions: NoticeWhereInput[] = [
    {
      isActive: true
    },
    {
      siteConfigId: isConfig.id
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


  const notices = await prisma.notice.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }

  })

  const total = await prisma.notice.count({
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
    notices,
    meta,
  };

}


//& GET SINLGE NOTICE
const getSingleNotice = async (noticeId: string, configId: string
) => {

  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const isNotice = await prisma.notice.findUnique({
    where: {
      id: noticeId
    }
  })

  if (!isNotice) {
    throw new AppError(httpStatus.NOT_FOUND, 'notice not found')
  }

  return isNotice

}


//& UPDATE SINLGE NOTICE
const updateNotice = async (payload: IUpdateNotice, file: Express.Multer.File, noticeId: string
) => {

  const isNotice = await prisma.notice.findUnique({
    where: {
      id: noticeId
    }
  })

  if (!isNotice) {
    throw new AppError(httpStatus.NOT_FOUND, 'notice not found')
  }

  const fileRes = file ?
    await createFile(file, 'Modern-School/Notice')
    : null

  const notice = await prisma.notice.update({
    where: {
      id: isNotice.id
    },
    data: {
      ...payload,
      file: fileRes?.secure_url,
      filePublicId: fileRes?.public_id
    }
  })


  // if (file) {
  //   Cloudinary.cloudinary.uploader.destroy(isNotice.filePublicId, {
  //     invalidate: true,
  //   })
  // }

  return notice

}




//& SOFT DELETE NOTICE
const deleteNotice = async (noticeId: string, configId: string) => {

  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const isNotice = await prisma.notice.findUnique({
    where: {
      id: noticeId
    }
  })

  if (!isNotice) {
    throw new AppError(httpStatus.NOT_FOUND, 'notice not found')
  }


  if (!isNotice.isActive) {
    throw new AppError(httpStatus.CONFLICT, 'Notce is temporary deactive')
  }

  if (isNotice.isDeleted) {
    throw new AppError(httpStatus.CONFLICT, 'notice already deleted')
  }

  await prisma.notice.update({
    where: {
      id: isNotice.id
    },
    data: {
      isDeleted: true,
      deletedAt: new Date()
    }
  })

}



export const noticeService = {
  createNotice,
  getNotices,
  getAllNotices,
  getSingleNotice,
  updateNotice,
  deleteNotice,

}