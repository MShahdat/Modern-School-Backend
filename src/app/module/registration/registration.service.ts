import { AcademicRulesWhereInput, ApplyWhereInput, RegistrationSystemWhereInput } from "../../../../generated/prisma/models";
import { IQuery } from "../../interface";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import httpStatus from 'http-status'
import { IRegistrationPayload, IUpdateRegistrationPayload } from "./registration.interface";


//& CREATE
const createRegistration = async (payload: IRegistrationPayload, configId: string) => {

  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const registration = prisma.registrationSystem.create({
    data: {
      ...payload,
      siteConfigId: configId
    }
  })

  return registration
}


//& GET ALL (ADMIN)
const getAll = async (query: IQuery) => {

  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);

  const andConditions: RegistrationSystemWhereInput[] = [
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

  const registrations = await prisma.registrationSystem.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,

    orderBy: {
      [sort]: order
    },
  })

  const total = await prisma.registrationSystem.count({
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
    registrations,
    meta,
  };
}


//& GET SINGLE (PUBLIC)
const getRegistration = async (id: string) => {

  const isRegistration = await prisma.registrationSystem.findUnique({
    where: {
      id,
      isActive: true,
      isDeleted: false
    }
  })

  if (!isRegistration) {
    throw new AppError(httpStatus.NOT_FOUND, ' not found')
  }

  return isRegistration
}


//& UPDATE
const updateRegistration = async (payload: IUpdateRegistrationPayload, id: string) => {

  const isRegistration = await prisma.registrationSystem.findUnique({
    where: {
      id
    }
  })

  if (!isRegistration) {
    throw new AppError(httpStatus.NOT_FOUND, ' not found')
  }

  if (isRegistration.isDeleted) {
    throw new AppError(httpStatus.CONFLICT, 'registration is deleted')
  }

  const update = await prisma.registrationSystem.update({
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
const deleteRegistration = async (id: string) => {

  const isRegistration = await prisma.registrationSystem.findUnique({
    where: {
      id
    }
  })

  if (!isRegistration) {
    throw new AppError(httpStatus.NOT_FOUND, ' not found')
  }


  if (isRegistration.isDeleted) {
    throw new AppError(httpStatus.CONFLICT, 'registration already deleted')
  }

  await prisma.apply.update({
    where: {
      id
    },
    data: {
      isDeleted: true,
      deletedAt: new Date()
    }
  })

}

export const registrationService = {
  createRegistration,
  getAll,
  getRegistration,
  updateRegistration,
  deleteRegistration
}