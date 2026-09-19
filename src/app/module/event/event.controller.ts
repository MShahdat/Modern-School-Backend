import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AppError } from "../../utils/AppError";
import httpStatus from 'http-status'
import { eventValidationZodSchema } from "./event.velidation";
import { eventService } from "./event.service";
import { sendResponse } from "../../utils/sendResponse";


//& CREATE EVENT
const createEvent = catchAsync(
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
    const validation = eventValidationZodSchema.safeParse(data)

    if (!validation.success) {
      throw new AppError(httpStatus.BAD_REQUEST, validation.error.issues[0].message)
    }

    data = validation.data

    const result = await eventService.createEvent(data, cover!, additionalFiles, configId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'event created successfully',
      data: result
    })
  }
)


//& GET ALL EVENT (ADMIN)
const getAllEvents = catchAsync(
  async (req: Request, res: Response) => {

    const configId = req.params.siteConfigId as string
    const query = req.query

    const { events, meta } = await eventService.getAllEvent(query, configId)

    if (events.length === 0) {
      throw new AppError(httpStatus.NOT_FOUND, 'events not found')
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'events retrive successfully',
      data: events,
      meta
    })
  }
)


//& GET ALL EVENTS (PUBLIC)
const getEvents = catchAsync(
  async (req: Request, res: Response) => {

    const configId = req.params.siteConfigId as string
    const query = req.query

    const { events, meta } = await eventService.getEvents(query, configId)

    if (events.length === 0) {
      throw new AppError(httpStatus.NOT_FOUND, 'events not found')
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'events retrive successfully',
      data: events,
      meta
    })
  }
)


//& GET EVENT (PUBLIC)
const singleEvent = catchAsync(
  async (req: Request, res: Response) => {

    const eventId = req.params.eventId as string

    const result = await eventService.getSingleEvent(eventId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'event retrive successfully',
      data: result
    })
  }
)


//& UDATE EVENT
const updateEvent = catchAsync(
  async (req: Request, res: Response) => {

    const eventId = req.params.eventId as string

    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    const cover = files?.["cover"]?.[0];
    const additionalFiles = files?.["additionalFiles"] || [];

    let data = undefined

    if (data) {
      data = JSON.parse(req.body.data)
      const validation = eventValidationZodSchema.safeParse(data)

      if (!validation.success) {
        throw new AppError(httpStatus.BAD_REQUEST, validation.error.issues[0].message)
      }
      data = validation.data
    }

    const result = await eventService.updateEvent(data!, cover!, additionalFiles, eventId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'event udpated successfully',
      data: result
    })
  }
)

//& DELETE EVENT (PUBLIC)
const deleteEvent = catchAsync(
  async (req: Request, res: Response) => {

    const eventId = req.params.eventId as string


    await eventService.deleteEvent(eventId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'event deleted successfully',
      data: null
    })
  }
)



export const eventController = {
  createEvent,
  getAllEvents,
  getEvents,
  singleEvent,
  deleteEvent,
  updateEvent
}