import bcrypt from "bcryptjs"
import { prisma } from "../../lib/prisma"
import { IRequestUser } from "../../middleware/checkAuth"
import { ICommitteePayload, IUpdateCommitteePayload } from "./committee.interface"
import httpStatus from 'http-status'
import config from "../../config/env"
import { IQuery } from "../../interface"
import { CommitteeWhereInput } from "../../../../generated/prisma/models"
import { AppError } from "../../utils/AppError"


//& CREATE COMMITTEE
const createCommittee = async (payload: ICommitteePayload, siteConfigId: string, user: IRequestUser) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: siteConfigId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'Site config not found')
  }

  const isAdmin = await prisma.user.findUnique({
    where: {
      id: user.userId
    }
  })

  if (!isAdmin) {
    throw new AppError(httpStatus.NOT_FOUND, 'admin not found')
  }

  const randomPass = Math.random().toString(36).slice(-8)

  const hasPass = await bcrypt.hash(randomPass, Number(config.bcrypt_salt_rounds))

  const createUser = await prisma.user.create({
    data: {
      siteConfigId,
      email: payload.email,
      name: payload.name,
      password: hasPass,
      role: "COMMITTEE",
      needPasswordChange: true,
      committee: {
        create: {
          siteConfigId,
          ...payload
        }
      }
    },
    omit: {
      password: true
    },
    include: {
      committee: true
    }
  })

  return createUser
}


//& GET ALL COMMITTEE (ADMIN)
const getAllCommittee = async (query: IQuery, siteConfigId: string) => {
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

  const andConditions: CommitteeWhereInput[] = [
    {
      siteConfigId
    }
  ];

  if (query.search) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: query.search,
            mode: "insensitive"
          }
        },
        {
          email: {
            contains: query.search,
            mode: "insensitive"
          }
        },
        {
          committeeId: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    })
  }

  if (query.designation) {
    andConditions.push({
      designation: query.designation
    })
  }

  if (query.status) {
    andConditions.push({
      status: query.status
    })
  }

  const committee = await prisma.committee.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,

    orderBy: {
      [sort]: order
    },
  })

  const total = await prisma.committee.count({
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
    committee,
    meta,
  };
}


//& GET ALL COMMITTEE (PUBLIC)
const getCommittee = async (query: IQuery, siteConfigId: string) => {
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

  const andConditions: CommitteeWhereInput[] = [
    {
      siteConfigId
    },
    {
      status: "ACTIVE"
    }
  ];

  if (query.search) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: query.search,
            mode: "insensitive"
          }
        },
        {
          email: {
            contains: query.search,
            mode: "insensitive"
          }
        },
        {
          committeeId: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    })
  }

  if (query.designation) {
    andConditions.push({
      designation: query.designation
    })
  }

  const committee = await prisma.committee.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,

    orderBy: {
      [sort]: order
    },
    omit: {
      phone: true,
      siteConfigId: true,
      userId: true,
      nationalId: true
    }
  })

  const total = await prisma.committee.count({
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
    committee,
    meta,
  };
}


//& GET SINGLE (PUBLIC)
const getSingleCommittee = async (id: string, siteConfigId: string) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: siteConfigId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const committee = await prisma.committee.findUnique({
    where: {
      id,
      status: 'ACTIVE'
    },
    omit: {
      phone: true,
      siteConfigId: true,
      userId: true,
      nationalId: true
    }
  })
  return committee
}


//& UPDATE (ADMIN)
const updatedCommittee = async (payload: IUpdateCommitteePayload, id: string, siteConfigId: string) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: siteConfigId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const committee = await prisma.committee.findUnique({
    where: {
      id
    }
  })

  if (!committee) {
    throw new AppError(httpStatus.NOT_FOUND, 'committee not found')
  }

  const updateCommittee = await prisma.committee.update({
    where: {
      id
    },
    data: {
      ...payload
    }
  })

  return updateCommittee
}


//& DELETED (AMIDN)
const deleteCommittee = async (id: string, siteConfigId: string) => {
  const transaction = await prisma.$transaction(
    async (tx) => {
      const isConfig = await tx.siteConfig.findUnique({
        where: {
          id: siteConfigId
        }
      })

      if (!isConfig) {
        throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
      }

      const committee = await tx.committee.findUnique({
        where: {
          id
        },
        include: {
          user: true
        }
      })

      if (!committee) {
        throw new AppError(httpStatus.NOT_FOUND, 'committee not found')
      }


      if (committee.user.isDeleted) {
        throw new AppError(httpStatus.BAD_REQUEST, 'committee already deleted')
      }

      await tx.user.update({
        where: {
          id: committee.userId
        },
        data: {
          isDeleted: true
        }
      })

      await tx.committee.update({
        where: {
          id
        },
        data: {
          status: "DELETED"
        }
      })
    },
    {
      maxWait: 10000,
      timeout: 15000
    }
  )
}

export const committeeService = {
  createCommittee,
  getAllCommittee,
  getCommittee,
  getSingleCommittee,
  deleteCommittee,
  updatedCommittee
}