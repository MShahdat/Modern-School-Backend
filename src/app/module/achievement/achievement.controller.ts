import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AppError } from "../../utils/AppError";
import httpStatus from 'http-status'
import { sendResponse } from "../../utils/sendResponse";
import { achievementValidationZodSchema } from "./achievement.validation";
import { achievementService } from "./achievement.service";


//& CREATE
const createAchieve = catchAsync(
  async (req: Request, res: Response) => {

    const configId = req.params.siteConfigId as string

    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    const cover = files?.["cover"]?.[0];
    const additionalFiles = files?.["additionalFiles"] || [];

    if (!req.body.data) {
      throw new AppError(httpStatus.BAD_REQUEST, "form data not found");
    }

    let data = JSON.parse(req.body.data)
    const validation = achievementValidationZodSchema.safeParse(data)

    if (!validation.success) {
      throw new AppError(httpStatus.BAD_REQUEST, validation.error.issues[0].message)
    }

    data = validation.data

    const result = await achievementService.createAchievement(data, cover!, additionalFiles, configId)

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'achievement created successfully',
      data: result
    })
  }
)


//& GET ALL (ADMIN)
const getAllAchieve = catchAsync(
  async (req: Request, res: Response) => {

    const configId = req.params.siteConfigId as string
    const query = req.query

    const { achievements, meta } = await achievementService.getAllAchievement(query, configId)

    if (achievements.length === 0) {
      throw new AppError(httpStatus.NOT_FOUND, 'not found')
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'achievements retrive successfully',
      data: achievements,
      meta
    })
  }
)


//& GET ALL (PUBLIC)
const getAchieves = catchAsync(
  async (req: Request, res: Response) => {

    const configId = req.params.siteConfigId as string
    const query = req.query

    const { achievements, meta } = await achievementService.getAchieve(query, configId)

    if (achievements.length === 0) {
      throw new AppError(httpStatus.NOT_FOUND, 'not found')
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'achievements retrive successfully',
      data: achievements,
      meta
    })
  }
)

//& GET SINGLE
const getSingle = catchAsync(
  async (req: Request, res: Response) => {

    const achieveId = req.params.achieveId as string


    const result = await achievementService.getSingleAchievements(achieveId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'achieve retrive successfully',
      data: result
    })
  }
)


//& UPDATE
const updateAchieve = catchAsync(
  async (req: Request, res: Response) => {

    const configId = req.params.siteConfigId as string
    const achieveId = req.params.achieveId as string

    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    const cover = files?.["cover"]?.[0];
    const additionalFiles = files?.["additionalFiles"] || [];

    let data = JSON.parse(req.body.data)

    if (data) {
      const validation = achievementValidationZodSchema.safeParse(data)

      if (!validation.success) {
        throw new AppError(httpStatus.BAD_REQUEST, validation.error.issues[0].message)
      }

      data = validation.data
    }

    const result = await achievementService.updateAchieve(data, cover!, additionalFiles!, achieveId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'achievement updated successfully',
      data: result
    })
  }
)


//& DELETE
const deleteAchieve = catchAsync(
  async (req: Request, res: Response) => {

    const achieveId = req.params.achieveId as string


    await achievementService.deleteAchieve(achieveId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'achieve deleted successfully',
      data: null
    })
  }
)



export const achievementController = {
  createAchieve,
  getAllAchieve,
  getAchieves,
  getSingle,
  updateAchieve,
  deleteAchieve
}