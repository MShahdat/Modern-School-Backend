import { NoticeWhereInput, UniformWhereInput } from "../../../../generated/prisma/models";
import { IQuery } from "../../interface";
import { Cloudinary } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { createFile } from "../../utils/cloudinary";
import httpStatus from 'http-status'
import { IUniformPayload, IUpdateUniform } from "./uniform.interface";

//& CREATE 
const createUniform = async (payload: IUniformPayload, file: Express.Multer.File, configId: string) => {

  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const fileRes = file ?
    await createFile(file, 'Modern-School/Uniform')
    : null

  const createUniform = await prisma.uniform.create({
    data: {
      ...payload,
      file: fileRes?.secure_url!,
      filePublicId: fileRes?.public_id,
      siteConfigId: configId
    }
  })

  return createUniform
}


//& GET ALL (ADMIN)
const getAllUniform = async (query: IQuery, configId: string) => {

  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 5);

  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const andConditions: UniformWhereInput[] = []

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

  if (query.configId) {
    andConditions.push({
      siteConfigId: query.configId
    })
  }

  const uniforms = await prisma.uniform.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }

  })

  const total = await prisma.uniform.count({
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
    uniforms,
    meta,
  };

}


//& GET ALL (PUBLIC)
const getUniforms = async (query: IQuery, configId: string) => {

  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 5);

  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const andConditions: UniformWhereInput[] = [
    {
      isActive: true
    },
    {
      siteConfigId: isConfig.id
    },
    {
      isDeleted: false
    }
  ]

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


  const uniforms = await prisma.uniform.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }

  })

  const total = await prisma.uniform.count({
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
    uniforms,
    meta,
  };

}



//& UPDATE
const updateUniform = async (payload: IUpdateUniform, file: Express.Multer.File, uniformId: string
) => {

  const isUniform = await prisma.uniform.findUnique({
    where: {
      id: uniformId
    }
  })

  if (!isUniform) {
    throw new AppError(httpStatus.NOT_FOUND, 'not found')
  }

  const fileRes = file ?
    await createFile(file, 'Modern-School/Uniform')
    : null

  const transactionRes = await prisma.$transaction(
    async (tx) => {
      const uniforms = await prisma.uniform.update({
        where: {
          id: isUniform.id
        },
        data: {
          ...payload,
          file: fileRes?.secure_url,
          filePublicId: fileRes?.public_id
        }
      })

      await Cloudinary.cloudinary.uploader.destroy(isUniform.filePublicId!, {
        invalidate: true
      })

      return uniforms
    }
  )

}



//& SOFT DELETE
const deleteUniform = async (uniformId: string, configId: string) => {

  const isConfig = await prisma.siteConfig.findUnique({
    where: {
      id: configId
    }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
  }

  const isUniform = await prisma.uniform.findUnique({
    where: {
      id: uniformId
    }
  })

  if (!isUniform) {
    throw new AppError(httpStatus.NOT_FOUND, 'not found')
  }


  if (!isUniform.isActive) {
    throw new AppError(httpStatus.CONFLICT, 'temporary deactive')
  }

  if (isUniform.isDeleted) {
    throw new AppError(httpStatus.CONFLICT, 'already deleted')
  }

  await prisma.uniform.update({
    where: {
      id: isUniform.id
    },
    data: {
      isDeleted: true,
      deletedAt: new Date()
    }
  })

}



export const uniformService = {
  createUniform,
  getAllUniform,
  getUniforms,
  updateUniform,
  deleteUniform
}