import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from 'http-status'
import { AppError } from "../../utils/AppError";
import { sendResponse } from "../../utils/sendResponse";
import { routineZodSchema } from "./routine.validation";
import { routineService } from "./routine.service";

//& CREATE
const createRoutine = catchAsync(
  async (req: Request, res: Response) => {

    const file = req.file

    if (!req.body.data) {
      throw new AppError(httpStatus.BAD_REQUEST, "form data not found");
    }

    let data = JSON.parse(req.body.data)

    const validation = routineZodSchema.safeParse(data)

    if (!validation.success) {
      throw new AppError(httpStatus.BAD_REQUEST, validation.error.issues[0].message)
    }

    const configId = req.params.siteConfigId as string
    data = req.body.data

    const result = await routineService.createRoutine(data, file!, configId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'routine created successfully',
      data: result
    })
  }
)


//& GET ALL (ADMIN)
const getAllRoutine = catchAsync(
  async (req: Request, res: Response) => {

    const configId = req.params.siteConfigId as string
    const query = req.query

    const { routines, meta } = await routineService.getAllRoutine(query, configId)

    if (routines.length === 0) {
      throw new AppError(httpStatus.NOT_FOUND, 'routine not found')
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'routine retrive successfully',
      data: routines,
      meta
    })
  }
)


//& GET SINGLE (PUBLIC)
const getSingle = catchAsync(
  async (req: Request, res: Response) => {

    const configId = req.params.siteConfigId as string
    const routineId = req.params.routineId as string


    await routineService.getSingleRoutine(routineId, configId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'routine retrive successfully',
      data: null
    })
  }
)


//& DELETE (PUBLIC)
const deleteRoutine = catchAsync(
  async (req: Request, res: Response) => {

    const configId = req.params.siteConfigId as string
    const routineId = req.params.routineId as string


    await routineService.deleteRoutine(routineId, configId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'routine deleted successfully',
      data: null
    })
  }
)


//& UPDATE
const updateRoutine = catchAsync(
  async (req: Request, res: Response) => {

    const file = req.file
    const data = req.body.data
    const routineId = req.params.routineId as string


    const result = await routineService.updateRoutine(data, file!, routineId)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'routine updated successfully',
      data: result
    })
  }
)


export const routineController = {
  createRoutine,
  getAllRoutine,
  getSingle,
  updateRoutine,
  deleteRoutine
}