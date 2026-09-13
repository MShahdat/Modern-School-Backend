import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from 'http-status'
import { AppError } from "../../utils/AppError";
import { noticeZodSchema } from "./notice.validation";
import { noticeService } from "./notice.service";
import { sendResponse } from "../../utils/sendResponse";

//& CREATE NOTICE
const createNotice = catchAsync(
  async (req: Request, res: Response) => {

    const file = req.file

    if (!req.body.data) {
      throw new AppError(httpStatus.BAD_REQUEST, "form data not found");
    }

    let data = JSON.parse(req.body.data)

    const validation = noticeZodSchema.safeParse(data)

    if (!validation.success) {
      throw new AppError(httpStatus.BAD_REQUEST, validation.error.issues[0].message)
    }

    const configId = req.params.siteConfigId as string
    data = req.body.data

    const result = await noticeService.createNotice(data, file!, configId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'notice created successfully',
      data: result
    })
  }
)


//& GET ALL NOTICE (ADMIN)
const getAllNotices = catchAsync(
  async (req: Request, res: Response) => {

    const configId = req.params.siteConfigId as string
    const query = req.query

    const { notices, meta } = await noticeService.getAllNotices(query, configId)

    if (notices.length === 0) {
      throw new AppError(httpStatus.NOT_FOUND, 'notices not found')
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'notices retrive successfully',
      data: notices,
      meta
    })
  }
)


//& GET ALL NOTICE (PUBLIC)
const getNotices = catchAsync(
  async (req: Request, res: Response) => {

    const configId = req.params.siteConfigId as string
    const query = req.query

    const { notices, meta } = await noticeService.getAllNotices(query, configId)

    if (notices.length === 0) {
      throw new AppError(httpStatus.NOT_FOUND, 'notices not found')
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'notices retrive successfully',
      data: notices,
      meta
    })
  }
)


//& DELETE NOTICE (PUBLIC)
const deleteNotices = catchAsync(
  async (req: Request, res: Response) => {

    const configId = req.params.siteConfigId as string
    const noticeId = req.params.noticeId as string


    await noticeService.deleteNotice(noticeId, configId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'notices deleted successfully',
      data: null
    })
  }
)


//& UPDATE NOTICE
const updateNotice = catchAsync(
  async (req: Request, res: Response) => {

    const file = req.file
    const data = req.body.data
    const noticeId = req.params.noticeId as string


    const result = await noticeService.updateNotice(data, file!, noticeId)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'notice updated successfully',
      data: result
    })
  }
)


export const noticeController = {
  createNotice,
  getAllNotices,
  getNotices,
  deleteNotices,
  updateNotice,

}