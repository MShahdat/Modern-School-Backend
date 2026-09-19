import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from 'http-status'
import { AppError } from "../../utils/AppError";

import { sendResponse } from "../../utils/sendResponse";
import { calendarZodSchema } from "./calendar.validation";
import { CalendarService } from "./calendar.service";

//& CREATE
const createCalendar = catchAsync(
  async (req: Request, res: Response) => {

    const file = req.file

    if (!req.body.data) {
      throw new AppError(httpStatus.BAD_REQUEST, "form data not found");
    }

    let data = JSON.parse(req.body.data)

    const validation = calendarZodSchema.safeParse(data)

    if (!validation.success) {
      throw new AppError(httpStatus.BAD_REQUEST, validation.error.issues[0].message)
    }

    const configId = req.params.siteConfigId as string

    const result = await CalendarService.createCalendar(data, file!, configId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'calendar created successfully',
      data: result
    })
  }
)


//& GET ALL (ADMIN)
const getAllCalendar = catchAsync(
  async (req: Request, res: Response) => {

    const configId = req.params.siteConfigId as string
    const query = req.query

    const { calendars, meta } = await CalendarService.getAllCalendar(query, configId)

    if (calendars.length === 0) {
      throw new AppError(httpStatus.NOT_FOUND, 'calendar not found')
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'calendars retrive successfully',
      data: calendars,
      meta
    })
  }
)


//& GET (PUBLIC)
const getCalendar = catchAsync(
  async (req: Request, res: Response) => {

    const configId = req.params.siteConfigId as string
    const calendarId = req.params.calendarId as string

    const result = await CalendarService.getCalendar(calendarId, configId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'calendar retrive successfully',
      data: result,
    })
  }
)


//& DELETE (PUBLIC)
const deleteCalendar = catchAsync(
  async (req: Request, res: Response) => {

    const calendarId = req.params.calendarId as string

    await CalendarService.deleteCalendar(calendarId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'calendar deleted successfully',
      data: null
    })
  }
)


//& UPDATE
const updateCalendar = catchAsync(
  async (req: Request, res: Response) => {

    const file = req.file
    const data = JSON.parse(req.body.data)
    const calendarId = req.params.calendarId as string

    if (!file && !data) {
      throw new AppError(httpStatus.BAD_REQUEST, 'must be one field')
    }

    const result = await CalendarService.updateCalendar(data, file!, calendarId)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'calendar updated successfully',
      data: result
    })
  }
)


export const calendarController = {
  createCalendar,
  getAllCalendar,
  getCalendar,
  deleteCalendar,
  updateCalendar
}