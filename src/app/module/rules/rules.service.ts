import { AcademicRulesWhereInput, ActivityWhereInput, AdmissionTestWhereInput } from "../../../../generated/prisma/models";
import { IQuery } from "../../interface";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import httpStatus from 'http-status'
import { IRulesPayload, IUpdatePayload } from "./rules.interface";


//& CREATE
const createInfo = async (payload: IRulesPayload, configId: string) => {

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
const getAllRules = async (query: IQuery) => {

  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);

  const andConditions: AcademicRulesWhereInput[] = [];

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

  const rules = await prisma.academicRules.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,

    orderBy: {
      [sort]: order
    },
  })

  const total = await prisma.academicRules.count({
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
    rules,
    meta,
  };
}


//& GET SINGLE (PUBLIC)
const getRule = async (id: string) => {

  const isRules = await prisma.academicRules.findUnique({
    where: {
      id,
      isActive: true
    }
  })

  if (!isRules) {
    throw new AppError(httpStatus.NOT_FOUND, ' not found')
  }

  return isRules
}


//& UPDATE
const updateRule = async (payload: IUpdatePayload, id: string) => {

  const isRules = await prisma.academicRules.findUnique({
    where: {
      id
    }
  })

  if (!isRules) {
    throw new AppError(httpStatus.NOT_FOUND, ' not found')
  }

  if (!isRules.isActive) {
    throw new AppError(httpStatus.CONFLICT, 'rules is temporary deactived')
  }

  if (isRules.isDeleted) {
    throw new AppError(httpStatus.CONFLICT, 'rules is deleted')
  }

  const update = await prisma.academicRules.update({
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
const deleteRule = async (id: string) => {

  const isRule = await prisma.academicRules.findUnique({
    where: {
      id
    }
  })

  if (!isRule) {
    throw new AppError(httpStatus.NOT_FOUND, ' not found')
  }


  if (!isRule.isActive) {
    throw new AppError(httpStatus.CONFLICT, 'rule is temporary deactive')
  }

  if (isRule.isDeleted) {
    throw new AppError(httpStatus.CONFLICT, 'rule already deleted')
  }

  await prisma.academicRules.update({
    where: {
      id
    },
    data: {
      isDeleted: true,
      deletedAt: new Date()
    }
  })

}

export const ruleService = {
  createInfo,
  getAllRules,
  getRule,
  updateRule,
  deleteRule
}