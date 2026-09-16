import { NoticeWhereInput, RoutineWhereInput } from "../../../../generated/prisma/models";
import { IQuery } from "../../interface";
import { Cloudinary } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { createFile } from "../../utils/cloudinary";
import httpStatus from 'http-status'
import { IRoutinePayload, IUpdateRoutinePayload } from "./routine.interface";

//& CREATE
const createRoutine = async (payload: IRoutinePayload, file: Express.Multer.File, configId: string) => {

  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const fileRes = file ?
    await createFile(file, 'Modern-School/Routine')
    : null

  const createRoutine = await prisma.routine.create({
    data: {
      ...payload,
      file: fileRes?.secure_url,
      filePublicId: fileRes?.public_id,
      siteConfigId: isConfig.id,
    }
  })

  return createRoutine
}


//& GET ALL (ADMIN)
const getAllRoutine = async (query: IQuery, configId: string) => {

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

  const andConditions: RoutineWhereInput[] = []

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

  const routines = await prisma.routine.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }

  })

  const total = await prisma.routine.count({
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
    routines,
    meta,
  };

}



//& GET SINLGE
const getSingleRoutine = async (routineId: string, configId: string
) => {

  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const isRoutine = await prisma.routine.findUnique({
    where: {
      id: routineId
    }
  })

  if (!isRoutine) {
    throw new AppError(httpStatus.NOT_FOUND, 'routine not found')
  }

  return isRoutine

}


//& UPDATE SINLGE
const updateRoutine = async (payload: IUpdateRoutinePayload, file: Express.Multer.File, routineId: string
) => {

  const isRoutine = await prisma.routine.findUnique({
    where: {
      id: routineId
    }
  })

  if (!isRoutine) {
    throw new AppError(httpStatus.NOT_FOUND, 'routine not found')
  }

  const fileRes = file ?
    await createFile(file, 'Modern-School/Routine')
    : null

  const routine = await prisma.routine.update({
    where: {
      id: isRoutine.id
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

  return routine

}




//& SOFT DELETE
const deleteRoutine = async (routineId: string, configId: string) => {

  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const isRoutine = await prisma.routine.findUnique({
    where: {
      id: routineId
    }
  })

  if (!isRoutine) {
    throw new AppError(httpStatus.NOT_FOUND, 'routine not found')
  }


  if (!isRoutine.isActive) {
    throw new AppError(httpStatus.CONFLICT, 'routine is temporary deactive')
  }

  if (isRoutine.isDeleted) {
    throw new AppError(httpStatus.CONFLICT, 'routine already deleted')
  }

  await prisma.routine.update({
    where: {
      id: isRoutine.id
    },
    data: {
      isDeleted: true,
      deletedAt: new Date()
    }
  })

}



export const routineService = {
  createRoutine,
  getAllRoutine,
  getSingleRoutine,
  updateRoutine,
  deleteRoutine
}