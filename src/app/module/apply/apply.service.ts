import { AcademicRulesWhereInput, ApplyWhereInput } from "../../../../generated/prisma/models";
import { IQuery } from "../../interface";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import httpStatus from 'http-status'
import { IApplyPayload, IUpdateApplyPayload } from "./apply.interface";


//& CREATE
const createApply = async (payload: IApplyPayload, configId: string) => {

  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const info = prisma.academicRules.create({
    data: {
      ...payload,
      siteConfigId: configId
    }
  })

  return info
}


//& GET ALL (ADMIN)
const getAll = async (query: IQuery) => {

  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);

  const andConditions: ApplyWhereInput[] = [
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

  const applys = await prisma.apply.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,

    orderBy: {
      [sort]: order
    },
  })

  const total = await prisma.apply.count({
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
    applys,
    meta,
  };
}


//& GET SINGLE (PUBLIC)
const getApply = async (id: string) => {

  const isApply = await prisma.apply.findUnique({
    where: {
      id: id
    }
  })

  if (!isApply) {
    throw new AppError(httpStatus.NOT_FOUND, ' not found')
  }

  return isApply
}


//& UPDATE
const updateApply = async (payload: IUpdateApplyPayload, id: string) => {

  const isApply = await prisma.apply.findUnique({
    where: {
      id
    }
  })

  if (!isApply) {
    throw new AppError(httpStatus.NOT_FOUND, ' not found')
  }

  if (!isApply.isActive) {
    throw new AppError(httpStatus.CONFLICT, 'apply is temporary deactived')
  }

  if (isApply.isDeleted) {
    throw new AppError(httpStatus.CONFLICT, 'apply is deleted')
  }

  const update = await prisma.apply.update({
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
const deleteApply = async (id: string) => {

  const isApply = await prisma.apply.findUnique({
    where: {
      id
    }
  })

  if (!isApply) {
    throw new AppError(httpStatus.NOT_FOUND, ' not found')
  }


  if (!isApply.isActive) {
    throw new AppError(httpStatus.CONFLICT, 'apply is temporary deactive')
  }

  if (isApply.isDeleted) {
    throw new AppError(httpStatus.CONFLICT, 'apply already deleted')
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

export const applyService = {
  createApply,
  getAll,
  getApply,
  updateApply,
  deleteApply
}