import { AcademicRulesWhereInput, ApplyWhereInput, MissionVisionWhereInput } from "../../../../generated/prisma/models";
import { IQuery } from "../../interface";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import httpStatus from 'http-status'
import { IMissionPayload, IUpdateMissionPayload } from "./mission.interface";


//& CREATE
const createMission = async (payload: IMissionPayload, configId: string) => {

  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const mission = prisma.missionVision.create({
    data: {
      ...payload,
      siteConfigId: configId
    }
  })

  return mission
}


//& GET ALL (ADMIN)
const getAll = async (query: IQuery) => {

  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);

  const andConditions: MissionVisionWhereInput[] = [
  ];



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

  const missions = await prisma.missionVision.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,

    orderBy: {
      [sort]: order
    },
  })

  const total = await prisma.missionVision.count({
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
    missions,
    meta,
  };
}


//& GET SINGLE (PUBLIC)
const getMission = async (id: string) => {

  const isMission = await prisma.missionVision.findUnique({
    where: {
      id
    }
  })

  if (!isMission) {
    throw new AppError(httpStatus.NOT_FOUND, ' not found')
  }

  return isMission
}


//& UPDATE
const updateMission = async (payload: IUpdateMissionPayload, id: string) => {

  const isMission = await prisma.missionVision.findUnique({
    where: {
      id
    }
  })

  if (!isMission) {
    throw new AppError(httpStatus.NOT_FOUND, ' not found')
  }

  if (!isMission.isActive) {
    throw new AppError(httpStatus.CONFLICT, 'mission & vision is temporary deactived')
  }

  if (isMission.isDeleted) {
    throw new AppError(httpStatus.CONFLICT, 'mission & vision is deleted')
  }

  const update = await prisma.missionVision.update({
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
const deleteMission = async (id: string) => {

  const isMission = await prisma.missionVision.findUnique({
    where: {
      id
    }
  })

  if (!isMission) {
    throw new AppError(httpStatus.NOT_FOUND, ' not found')
  }


  if (!isMission.isActive) {
    throw new AppError(httpStatus.CONFLICT, 'mission & vission is temporary deactive')
  }

  if (isMission.isDeleted) {
    throw new AppError(httpStatus.CONFLICT, 'mission & vision already deleted')
  }

  await prisma.missionVision.update({
    where: {
      id
    },
    data: {
      isDeleted: true,
      deletedAt: new Date()
    }
  })

}

export const missionService = {
  createMission,
  getAll,
  getMission,
  updateMission,
  deleteMission
}