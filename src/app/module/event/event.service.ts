import { EventWhereInput } from "../../../../generated/prisma/models"
import { IQuery } from "../../interface"
import { Cloudinary } from "../../lib/cloudinary"
import { prisma } from "../../lib/prisma"
import { AppError } from "../../utils/AppError"
import { createFile, createFiles } from "../../utils/cloudinary"
import { IEventPayload, IUpdateEventPayload } from "./event.interface"
import httpStatus from 'http-status'


//& CREATE EVENT
const createEvent = async (payload: IEventPayload, cover: Express.Multer.File, files: Express.Multer.File[], configId: string) => {
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
        await createFile(cover, 'Modern-School/Event/Cover')
        : null

      const additionalFilesRes = files ?
        await createFiles(files, 'Modern-School/Gallery')
        : null

      const create = await tx.event.create({
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
        },
        include: {
          gallery: true
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



//& GET ALL EVENT (ADMIN)
const getAllEvent = async (query: IQuery, configId: string) => {

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

  const andConditions: EventWhereInput[] = [
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
        },
        {
          location: {
            contains: query.search,
            mode: 'insensitive'
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

  const events = await prisma.event.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }

  })

  const total = await prisma.event.count({
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
    events,
    meta,
  };

}


//& GET ALL EVENTS (PUBLIC)
const getEvents = async (query: IQuery, configId: string) => {

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

  const andConditions: EventWhereInput[] = [
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
        },
        {
          location: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    })
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

  })

  const total = await prisma.event.count({
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
    events,
    meta,
  };

}


//& GET SINLGE EVENT
const getSingleEvent = async (eventId: string
) => {

  const isEvent = await prisma.event.findUnique({
    where: {
      id: eventId,
      isActive: true,
      isDeleted: false
    },
    include: {
      gallery: true
    }
  })

  if (!isEvent) {
    throw new AppError(httpStatus.NOT_FOUND, 'event not found')
  }

  return isEvent
}


//& UPDATE EVENT
const updateEvent = async (payload: IUpdateEventPayload, cover: Express.Multer.File, files: Express.Multer.File[], eventId: string) => {

  const isEvent = await prisma.event.findUnique({
    where: {
      id: eventId
    }
  })

  if (!isEvent) {
    throw new AppError(httpStatus.NOT_FOUND, 'event not found')
  }

  const transactionRes = await prisma.$transaction(
    async (tx) => {
      const coverRes = cover ?
        await createFile(cover, 'Modern-School/Event/Cover')
        : null

      const additionalFilesRes = files ?
        await createFiles(files, 'Modern-School/Gallery')
        : null

      const update = await tx.event.update({
        where: {
          id: eventId
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
        },
        include: {
          gallery: true
        }
      })

      if (cover) {
        await Cloudinary.cloudinary.uploader.destroy(isEvent.coverImage!, {
          invalidate: true
        })
      }

      return update
    },
    {
      maxWait: 10000,
      timeout: 15000
    }
  )

  return transactionRes

}



//& SOFT DELETE EVENT
const deleteEvent = async (eventId: string) => {

  const isEvent = await prisma.event.findUnique({
    where: {
      id: eventId
    }
  })

  if (!isEvent) {
    throw new AppError(httpStatus.NOT_FOUND, 'event not found')
  }


  if (!isEvent.isActive) {
    throw new AppError(httpStatus.CONFLICT, 'Event is temporary deactive')
  }

  if (isEvent.isDeleted) {
    throw new AppError(httpStatus.CONFLICT, 'Event already deleted')
  }

  await prisma.event.update({
    where: {
      id: isEvent.id
    },
    data: {
      isDeleted: true,
      deletedAt: new Date()
    }
  })

}




export const eventService = {
  createEvent,
  getAllEvent,
  getEvents,
  getSingleEvent,
  deleteEvent,
  updateEvent
}