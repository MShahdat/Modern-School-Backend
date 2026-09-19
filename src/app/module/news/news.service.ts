import { NewsWhereInput, NoticeWhereInput } from "../../../../generated/prisma/models";
import { IQuery } from "../../interface";
import { Cloudinary } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { createFile } from "../../utils/cloudinary";
import httpStatus from 'http-status'
import { INewsPayload, IUpdateNewsPayload } from "./news.interface";

//& CREATE NEWS
const createNews = async (payload: INewsPayload, file: Express.Multer.File, configId: string) => {

  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const fileRes = file ?
    await createFile(file, 'Modern-School/News')
    : null

  const createNews = await prisma.news.create({
    data: {
      ...payload,
      file: fileRes?.secure_url,
      filePublicId: fileRes?.public_id,
      siteConfigId: configId
    }
  })

  return createNews
}


//& GET ALL (ADMIN)
const getAllNews = async (query: IQuery, configId: string) => {

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

  const andConditions: NewsWhereInput[] = []

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

  const news = await prisma.news.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }

  })

  const total = await prisma.news.count({
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
    news,
    meta,
  };

}


//& GET ALL (PUBLIC)
const getNews = async (query: IQuery, configId: string) => {

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

  const andConditions: NewsWhereInput[] = [
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


  const news = await prisma.news.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }

  })

  const total = await prisma.news.count({
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
    news,
    meta,
  };

}


//& GET SINLGE
const getSingleNews = async (newsId: string, configId: string
) => {

  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const isNews = await prisma.news.findUnique({
    where: {
      id: newsId
    }
  })

  if (!isNews) {
    throw new AppError(httpStatus.NOT_FOUND, 'notice not found')
  }

  return isNews

}


//& UPDATE SINLGE
const updateNews = async (payload: IUpdateNewsPayload, file: Express.Multer.File, newsId: string
) => {

  const isNews = await prisma.news.findUnique({
    where: {
      id: newsId
    }
  })

  if (!isNews) {
    throw new AppError(httpStatus.NOT_FOUND, 'news not found')
  }

  const fileRes = file ?
    await createFile(file, 'Modern-School/News')
    : null

  const news = await prisma.news.update({
    where: {
      id: isNews.id
    },
    data: {
      ...payload,
      file: fileRes?.secure_url,
      filePublicId: fileRes?.public_id
    }
  })


  if (file) {
    Cloudinary.cloudinary.uploader.destroy(isNews.filePublicId!, {
      invalidate: true,
    })
  }

  return news

}




//& SOFT DELETE
const deleteNews = async (newsId: string, configId: string) => {

  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const isNews = await prisma.news.findUnique({
    where: {
      id: newsId,
      siteConfigId: isConfig.id
    }
  })

  if (!isNews) {
    throw new AppError(httpStatus.NOT_FOUND, 'news not found')
  }


  if (!isNews.isActive) {
    throw new AppError(httpStatus.CONFLICT, 'news is temporary deactive')
  }

  if (isNews.isDeleted) {
    throw new AppError(httpStatus.CONFLICT, 'news already deleted')
  }

  await prisma.news.update({
    where: {
      id: isNews.id
    },
    data: {
      isDeleted: true,
      deletedAt: new Date()
    }
  })

}



export const newsService = {
  createNews,
  getAllNews,
  getNews,
  getSingleNews,
  updateNews,
  deleteNews
}