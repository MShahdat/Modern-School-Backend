import { ActivityWhereInput } from "../../../../generated/prisma/models";
import { IQuery } from "../../interface";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { IActivityPayload, IUpdateActivityPayload } from "./activity.interface";
import httpStatus from 'http-status'


//& CREATE ACTIVITY 
const createActivity = async (payload: IActivityPayload, configId: string) => {

  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const activity = prisma.activity.create({
    data: {
      ...payload,
      siteConfigId: configId
    }
  })

  return activity
}


//& GET ALL ACTIVITY (ADMIN)
const getAllActivity = async (query: IQuery, siteConfigId: string) => {

  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);

  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: siteConfigId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const andConditions: ActivityWhereInput[] = [];

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


  if (query.siteConfig) {
    andConditions.push({
      siteConfigId: query.siteConfig
    })
  }

  const activities = await prisma.activity.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,

    orderBy: {
      [sort]: order
    },
  })

  const total = await prisma.activity.count({
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
    activities,
    meta,
  };
}


//& GET ALL ACTIVITY (PUBLIC)
const getActvities = async (query: IQuery, siteConfigId: string) => {

  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);

  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: siteConfigId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const andConditions: ActivityWhereInput[] = [
    {
      siteConfigId
    },
    {
      isDeleted: false
    },
    {
      isActive: true
    }
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

  const activities = await prisma.activity.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,

    orderBy: {
      [sort]: order
    },
  })

  const total = await prisma.activity.count({
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
    activities,
    meta,
  };
}


//& UPDATE ACTIVITY
const updateActivity = async (payload: IUpdateActivityPayload, activityId: string) => {

  const isActivity = await prisma.activity.findUnique({
    where: {
      id: activityId
    }
  })

  if (!isActivity) {
    throw new AppError(httpStatus.NOT_FOUND, 'activity not found')
  }

  if (isActivity.isDeleted) {
    throw new AppError(httpStatus.CONFLICT, 'Activity is deleted')
  }

  const update = await prisma.activity.update({
    where: {
      id: activityId
    },
    data: {
      ...payload
    }
  })

  return update

}



//& SOFT DELETE 
const deleteActivity = async (activityId: string) => {

  const isActivity = await prisma.activity.findUnique({
    where: {
      id: activityId
    }
  })

  if (!isActivity) {
    throw new AppError(httpStatus.NOT_FOUND, 'Activity not found')
  }


  if (isActivity.isDeleted) {
    throw new AppError(httpStatus.CONFLICT, 'activity already deleted')
  }

  await prisma.activity.update({
    where: {
      id: isActivity.id
    },
    data: {
      isDeleted: true,
      deletedAt: new Date()
    }
  })

}

export const activityService = {
  createActivity,
  getAllActivity,
  getActvities,
  updateActivity,
  deleteActivity
}