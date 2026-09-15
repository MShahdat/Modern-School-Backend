import { CalendarWhereInput, NoticeWhereInput } from "../../../../generated/prisma/models";
import { IQuery } from "../../interface";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { createFile } from "../../utils/cloudinary";
import httpStatus from 'http-status'
import { ICalendarPayload, IUpdateCalendarPayload } from "./calendar.interface";

//& CREATE
const createCalendar = async (payload: ICalendarPayload, file: Express.Multer.File, configId: string) => {

  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const fileRes = file ?
    await createFile(file, 'Modern-School/Calendar')
    : null

  if (!fileRes) {
    throw new AppError(httpStatus.NOT_FOUND, 'not found')
  }
  const create = await prisma.calendar.create({
    data: {
      ...payload,
      file: fileRes.secure_url,
      filePublicId: fileRes.public_id,
      siteConfigId: configId
    }
  })

  return create
}


//& GET ALL (ADMIN)
const getAllCalendar = async (query: IQuery, configId: string) => {

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

  const andConditions: CalendarWhereInput[] = []

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

  const calendars = await prisma.calendar.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }

  })

  const total = await prisma.calendar.count({
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
    calendars,
    meta,
  };

}



//& GET SINLGE
const getCalendar = async (calendarId: string, configId: string
) => {

  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const isCalendar = await prisma.calendar.findUnique({
    where: {
      id: calendarId
    }
  })

  if (!isCalendar) {
    throw new AppError(httpStatus.NOT_FOUND, 'calendar not found')
  }

  return isCalendar

}


//& UPDATE
const updateCalendar = async (payload: IUpdateCalendarPayload, file: Express.Multer.File, calendarId: string
) => {

  const isCalendar = await prisma.calendar.findUnique({
    where: {
      id: calendarId
    }
  })

  if (!isCalendar) {
    throw new AppError(httpStatus.NOT_FOUND, 'calendar not found')
  }

  const fileRes = file ?
    await createFile(file, 'Modern-School/Calendar')
    : null

  const calendar = await prisma.calendar.update({
    where: {
      id: isCalendar.id
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

  return calendar

}



//& SOFT DELETE
const deleteCalendar = async (calendarId: string) => {

  const isCalendar = await prisma.calendar.findUnique({
    where: {
      id: calendarId
    }
  })

  if (!isCalendar) {
    throw new AppError(httpStatus.NOT_FOUND, 'calendar not found')
  }


  if (!isCalendar.isActive) {
    throw new AppError(httpStatus.CONFLICT, 'Calendar is temporary deactive')
  }

  if (isCalendar.isDeleted) {
    throw new AppError(httpStatus.CONFLICT, 'Calendar already deleted')
  }

  await prisma.notice.update({
    where: {
      id: isCalendar.id
    },
    data: {
      isDeleted: true,
      deletedAt: new Date()
    }
  })

}



export const CalendarService = {
  createCalendar,
  getAllCalendar,
  getCalendar,
  updateCalendar,
  deleteCalendar
}