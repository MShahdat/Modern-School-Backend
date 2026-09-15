import { AcademicRulesWhereInput, ApplyWhereInput, RegistrationSystemWhereInput, StudyWhereInput } from "../../../../generated/prisma/models";
import { IQuery } from "../../interface";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import httpStatus from 'http-status'
import { IStudyPayload, IUpdateStudyPayload } from "./study.interface";


//& CREATE
const createStudy = async (payload: IStudyPayload, configId: string) => {

  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const study = prisma.study.create({
    data: {
      ...payload,
      siteConfigId: configId
    }
  })

  return study
}


//& GET ALL (ADMIN)
const getAll = async (query: IQuery) => {

  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);

  const andConditions: StudyWhereInput[] = [
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

  const studys = await prisma.study.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,

    orderBy: {
      [sort]: order
    },
  })

  const total = await prisma.study.count({
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
    studys,
    meta,
  };
}


//& GET SINGLE (PUBLIC)
const getStudy = async (id: string) => {

  const isStudy = await prisma.study.findUnique({
    where: {
      id
    }
  })

  if (!isStudy) {
    throw new AppError(httpStatus.NOT_FOUND, ' not found')
  }

  return isStudy
}


//& UPDATE
const updateStudy = async (payload: IUpdateStudyPayload, id: string) => {

  const isStudy = await prisma.study.findUnique({
    where: {
      id
    }
  })

  if (!isStudy) {
    throw new AppError(httpStatus.NOT_FOUND, ' not found')
  }

  if (!isStudy.isActive) {
    throw new AppError(httpStatus.CONFLICT, 'study is temporary deactived')
  }

  if (isStudy.isDeleted) {
    throw new AppError(httpStatus.CONFLICT, 'study is deleted')
  }

  const update = await prisma.study.update({
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
const deleteStudy = async (id: string) => {

  const isStudy = await prisma.study.findUnique({
    where: {
      id
    }
  })

  if (!isStudy) {
    throw new AppError(httpStatus.NOT_FOUND, ' not found')
  }


  if (!isStudy.isActive) {
    throw new AppError(httpStatus.CONFLICT, 'study is temporary deactive')
  }

  if (isStudy.isDeleted) {
    throw new AppError(httpStatus.CONFLICT, 'study already deleted')
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

export const StudyService = {
  createStudy,
  getAll,
  getStudy,
  updateStudy,
  deleteStudy
}