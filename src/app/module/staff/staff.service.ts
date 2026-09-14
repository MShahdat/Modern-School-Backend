import bcrypt from "bcryptjs"
import { prisma } from "../../lib/prisma"
import { IRequestUser } from "../../middleware/checkAuth"
import { IStaffPayload, IUpdateStaffPayload } from "./staff.interface"
import httpStatus from 'http-status'
import config from "../../config/env"
import { IQuery } from "../../interface"
import { StaffWhereInput } from "../../../../generated/prisma/models"
import { AppError } from "../../utils/AppError"


//& CREATE STAFF
const createStaff = async (payload: IStaffPayload, siteConfigId: string, user: IRequestUser) => {
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
      role: "STAFF",
      needPasswordChange: true,
      staff: {
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
      staff: true
    }
  })

  return createUser
}


//& GET ALL STAFFS (ADMIN)
const getAllStaff = async (query: IQuery, siteConfigId: string) => {
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

  const andConditions: StaffWhereInput[] = [
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
          staff_id: {
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

  const staff = await prisma.staff.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,

    orderBy: {
      [sort]: order
    },
  })

  const total = await prisma.staff.count({
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
    staff,
    meta,
  };
}


//& GET ALL STAFFS (PUBLIC)
const getStaffs = async (query: IQuery, siteConfigId: string) => {
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

  const andConditions: StaffWhereInput[] = [
    {
      siteConfigId
    },
    {
      status: "ACTIVE"
    },
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
          staff_id: {
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

  const staff = await prisma.staff.findMany({
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

  const total = await prisma.staff.count({
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
    staff,
    meta,
  };
}


//& GET SINGLE STAFF
const getSingleStaff = async (id: string, siteConfigId: string) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: siteConfigId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const staff = await prisma.staff.findUnique({
    where: {
      id,
      status: "ACTIVE"
    },
    omit: {
      phone: true,
      siteConfigId: true,
      userId: true,
      nationalId: true
    }
  })
  return staff
}


//& UPDATE STAFF (ADMIN)
const updatedStaff = async (payload: IUpdateStaffPayload, id: string, siteConfigId: string) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: siteConfigId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const staff = await prisma.staff.findUnique({
    where: {
      id
    }
  })

  if (!staff) {
    throw new AppError(httpStatus.NOT_FOUND, 'staff not found')
  }

  const updateStaff = await prisma.staff.update({
    where: {
      id
    },
    data: {
      ...payload
    }
  })

  return updateStaff
}


//& DELETE STAFF (ADMIN)
const deleteStaff = async (id: string, siteConfigId: string) => {

  const transection = await prisma.$transaction(
    async (tx) => {
      const isConfig = await tx.siteConfig.findUnique({
        where: {
          id: siteConfigId
        }
      })

      if (!isConfig) {
        throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
      }

      const staff = await tx.staff.findUnique({
        where: {
          id
        },
        include: {
          user: true
        }
      })

      if (!staff) {
        throw new AppError(httpStatus.NOT_FOUND, 'staff not found')
      }

      if (staff.user.isDeleted) {
        throw new AppError(httpStatus.BAD_REQUEST, 'staff already deleted')
      }

      await tx.user.update({
        where: {
          id: staff.userId
        },
        data: {
          isDeleted: true
        }
      })

      await tx.staff.update({
        where: {
          id,
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

export const staffService = {
  createStaff,
  getAllStaff,
  getStaffs,
  getSingleStaff,
  deleteStaff,
  updatedStaff
}