import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from 'http-status'
import { AppError } from "../../utils/AppError";
import { sendResponse } from "../../utils/sendResponse";
import { uniformZodSchema } from "./uniform.validation";
import { uniformService } from "./uniform.service";

//& CREATE
const createUniform = catchAsync(
  async (req: Request, res: Response) => {

    const file = req.file

    if (!req.body.data) {
      throw new AppError(httpStatus.BAD_REQUEST, "form data not found");
    }

    let data = JSON.parse(req.body.data)

    const validation = uniformZodSchema.safeParse(data)

    if (!validation.success) {
      throw new AppError(httpStatus.BAD_REQUEST, validation.error.issues[0].message)
    }

    const configId = req.params.siteConfigId as string
    data = req.body.data

    const result = await uniformService.createUniform(data, file!, configId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'uniform created successfully',
      data: result
    })
  }
)


//& GET ALL (ADMIN)
const getAllUniforms = catchAsync(
  async (req: Request, res: Response) => {

    const configId = req.params.siteConfigId as string
    const query = req.query

    const { uniforms, meta } = await uniformService.getAllUniform(query, configId)

    if (uniforms.length === 0) {
      throw new AppError(httpStatus.NOT_FOUND, 'not found')
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'uniform retrive successfully',
      data: uniforms,
      meta
    })
  }
)


//& GET ALL (PUBLIC)
const getUniforms = catchAsync(
  async (req: Request, res: Response) => {

    const configId = req.params.siteConfigId as string
    const query = req.query

    const { uniforms, meta } = await uniformService.getUniforms(query, configId)

    if (uniforms.length === 0) {
      throw new AppError(httpStatus.NOT_FOUND, 'uniform not found')
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'unifrom retrive successfully',
      data: uniforms,
      meta
    })
  }
)


//& DELETE (PUBLIC)
const deleteUniform = catchAsync(
  async (req: Request, res: Response) => {

    const configId = req.params.siteConfigId as string
    const uniformId = req.params.uniformId as string


    await uniformService.deleteUniform(uniformId, configId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'uniform deleted successfully',
      data: null
    })
  }
)


//& UPDATE
const updateUniform = catchAsync(
  async (req: Request, res: Response) => {

    const file = req.file
    const data = req.body.data
    const uniformId = req.params.uniformId as string


    const result = await uniformService.updateUniform(data, file!, uniformId)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'unifrom updated successfully',
      data: result
    })
  }
)


export const uniformController = {
  createUniform,
  getAllUniforms,
  getUniforms,
  updateUniform,
  deleteUniform
}