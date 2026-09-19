import bcrypt from "bcryptjs"
import { prisma } from "../../lib/prisma"
import { IRequestUser } from "../../middleware/checkAuth"
import { AppError } from "../../utils/AppError"
import { ITeacherPayload, IUpdateTeacherPayload } from "./teacher.interface"
import httpStatus from 'http-status'
import config from "../../config/env"
import { IQuery } from "../../interface"
import { TeacherWhereInput } from "../../../../generated/prisma/models"
import { createFile } from "../../utils/cloudinary"

//& CREATE TEACHER
const createTeacher = async (payload: ITeacherPayload, profile: Express.Multer.File, siteConfigId: string) => {

  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: siteConfigId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'Site config not found')
  }


  const randomPass = Math.random().toString(36).slice(-8)
  console.log('pass', randomPass)

  const hasPass = await bcrypt.hash(randomPass, Number(config.bcrypt_salt_rounds))

  console.log('ok')
  const profileRes = profile ? await createFile(profile, 'Modern-School/Profile') : null

  const createUser = await prisma.user.create({
    data: {
      siteConfigId,
      email: payload.email,
      name: payload.name,
      password: hasPass,
      role: "TEACHER",
      needPasswordChange: true,
      profileImage: profileRes ? profileRes.secure_url : null,
      imagePublicId: profileRes ? profileRes.public_id : null,
      teacher: {
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
      teacher: true
    }
  })

  return createUser
}



//& GET ALL TEACHERS (ADMIN)
const getAllTeacher = async (query: IQuery, siteConfigId: string) => {

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

  const andConditions: TeacherWhereInput[] = [
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
          bankName: {
            contains: query.search,
            mode: "insensitive"
          }
        },
        {
          highestDegree: {
            contains: query.search,
            mode: "insensitive"
          }
        }

      ]
    })
  }


  if (query.department) {
    andConditions.push({
      department: query.department
    })
  }

  if (query.designation) {
    andConditions.push({
      designation: query.designation
    })
  }

  if (query.bloodGroup) {
    andConditions.push({
      bloodGroup: query.bloodGroup
    })
  }

  if (query.employmentType) {
    andConditions.push({
      employmentType: query.eploymentType
    })
  }


  if (query.gender) {
    andConditions.push({
      gender: query.gender
    })
  }

  if (query.religin) {
    andConditions.push({
      religion: query.religion
    })
  }

  if (query.status) {
    andConditions.push({
      status: query.status
    })
  }


  const teachers = await prisma.teacher.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,

    orderBy: {
      [sort]: order
    },
  })

  const total = await prisma.teacher.count({
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
    teachers,
    meta,
  };
}


//& GET ALL TEACHERS (PUBLIC)
const getTeachers = async (query: IQuery, siteConfigId: string) => {

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

  const andConditions: TeacherWhereInput[] = [
    {
      siteConfigId
    },
    {
      status: "ACTIVE"
    },
    {
      user: {
        status: "ACTIVE"
      }
    },
    {
      user: {
        isDeleted: false
      }
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
          highestDegree: {
            contains: query.search,
            mode: "insensitive"
          }
        }

      ]
    })
  }


  if (query.department) {
    andConditions.push({
      department: query.department
    })
  }

  if (query.designation) {
    andConditions.push({
      designation: query.designation
    })
  }

  if (query.employmentType) {
    andConditions.push({
      employmentType: query.eploymentType
    })
  }


  if (query.gender) {
    andConditions.push({
      gender: query.gender
    })
  }

  if (query.religin) {
    andConditions.push({
      religion: query.religion
    })
  }


  const teachers = await prisma.teacher.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,

    orderBy: {
      [sort]: order
    },
    omit: {
      bankAccount: true,
      bankName: true,
      phone: true,
      salary: true,
      siteConfigId: true,
      userId: true
    }
  })

  const total = await prisma.teacher.count({
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
    teachers,
    meta,
  };
}


//& GET SINGLE TEACHER (PUBLIC)
const getSingleTeacher = async (id: string, siteConfigId: string) => {
  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: siteConfigId,

    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const teacher = await prisma.teacher.findUnique({
    where: {
      id,
      user: {
        status: 'ACTIVE',
        isDeleted: false
      },
      status: "ACTIVE"
    },
    omit: {
      bankAccount: true,
      bankName: true,
      phone: true,
      salary: true,
      siteConfigId: true,
      userId: true
    }
  })
  return teacher
}


//& UPDATE TEACHER (ADMIN)
const updatedTeacher = async (payload: IUpdateTeacherPayload, id: string, siteConfigId: string) => {

  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: siteConfigId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const teacher = await prisma.teacher.findUnique({
    where: {
      id
    }
  })

  if (!teacher) {
    throw new AppError(httpStatus.NOT_FOUND, 'techer not found')
  }

  // if (teacher.status === 'DELETED') {
  //   throw new AppError(httpStatus.BAD_REQUEST, 'teacher is soft deleted. you can not update')
  // }

  // if (teacher.status === 'BLOCKED') {
  //   throw new AppError(httpStatus.BAD_REQUEST, 'teacher temporary blocked')
  // }


  const udpateTeacher = await prisma.teacher.update({
    where: {
      id
    },
    data: {
      ...payload
    }
  })

  return udpateTeacher
}


//& DELETE TEACHER (ADMIN)
const deleteTeacher = async (id: string, siteConfigId: string) => {

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

      const teacher = await tx.teacher.findUnique({
        where: {
          id
        },
        select: {
          userId: true
        }
      })

      if (!teacher) {
        throw new AppError(httpStatus.NOT_FOUND, 'techer not found')
      }

      await tx.user.update({
        where: {
          id: teacher.userId
        },
        data: {
          isDeleted: true,
          status: "DELETED"
        }
      })

      await tx.teacher.update({
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
      timeout: 14000
    }
  )
}


export const teacherService = {
  createTeacher,
  getAllTeacher,
  getTeachers,
  getSingleTeacher,
  deleteTeacher,
  updatedTeacher
}