import { ActivityWhereInput, AdmissionTestWhereInput } from "../../../../generated/prisma/models";
import { IQuery } from "../../interface";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import httpStatus from 'http-status'
import { IAdmissionPayload, IUpdateAdimissionPayload } from "./admission.interface";


//& CREATE
const createInfo = async (payload: IAdmissionPayload, configId: string) => {

  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const info = prisma.admissionTest.create({
    data: {
      ...payload,
      siteConfigId: configId
    }
  })

  return info
}


//& GET ALL INFO (ADMIN)
const getAllInfo = async (query: IQuery) => {

  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);

  const andConditions: AdmissionTestWhereInput[] = [];

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

  const infos = await prisma.admissionTest.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,

    orderBy: {
      [sort]: order
    },
  })

  const total = await prisma.admissionTest.count({
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
    infos,
    meta,
  };
}


//& GET SINGLE INFO (PUBLIC)
const getInfo = async (id: string, configId: string) => {

  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const isInfo = await prisma.admissionTest.findUnique({
    where: {
      id,
      siteConfigId: configId
    }
  })

  if (!isInfo) {
    throw new AppError(httpStatus.NOT_FOUND, ' not found')
  }



  return isInfo
}


//& UPDATE
const updatedInfo = async (payload: IUpdateAdimissionPayload, id: string) => {

  const isInfo = await prisma.admissionTest.findUnique({
    where: {
      id
    }
  })

  if (!isInfo) {
    throw new AppError(httpStatus.NOT_FOUND, ' not found')
  }

  if (!isInfo.isActive) {
    throw new AppError(httpStatus.CONFLICT, 'info is temporary deactived')
  }

  if (isInfo.isDeleted) {
    throw new AppError(httpStatus.CONFLICT, 'info is deleted')
  }

  const update = await prisma.admissionTest.update({
    where: {
      id
    },
    data: {
      ...payload
    }
  })

  return update

}



//& SOFT DELETE 
const deletedInfo = async (id: string) => {

  const isInfo = await prisma.admissionTest.findUnique({
    where: {
      id
    }
  })

  if (!isInfo) {
    throw new AppError(httpStatus.NOT_FOUND, ' not found')
  }


  if (!isInfo.isActive) {
    throw new AppError(httpStatus.CONFLICT, 'info is temporary deactive')
  }

  if (isInfo.isDeleted) {
    throw new AppError(httpStatus.CONFLICT, 'inof already deleted')
  }

  await prisma.admissionTest.update({
    where: {
      id
    },
    data: {
      isDeleted: true,
      deletedAt: new Date()
    }
  })

}

export const adimissionService = {
  createInfo,
  getAllInfo,
  getInfo,
  updatedInfo,
  deletedInfo
}