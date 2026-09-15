
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status'
import { registrationService } from "./registration.service";


//& CREATE 
const createRegistration = catchAsync(
  async (req: Request, res: Response) => {

    const body = req.body
    const configId = req.params.siteConfigId as string

    const result = await registrationService.createRegistration(body, configId)

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "registration created successfully",
      data: result
    })
  }
)


//& GET ALL (ADMIN)
const getAll = catchAsync(
  async (req: Request, res: Response) => {

    const query = req.query
    const { registrations, meta } = await registrationService.getAll(query)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "registration retrive successfully",
      data: registrations,
      meta
    })
  }
)



//& GET SINGLE (PUBLIC)
const getRegistration = catchAsync(
  async (req: Request, res: Response) => {

    const registrationId = req.params.registrationId as string

    const result = await registrationService.getRegistration(registrationId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "registration retrive successfully",
      data: result
    })
  }
)


//& UPDATE
const updateRegistration = catchAsync(
  async (req: Request, res: Response) => {

    const body = req.body
    const registrationId = req.params.applyId as string

    const result = await registrationService.updateRegistration(body, registrationId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "registrationId updated successfully",
      data: result
    })
  }
)


//& DELETED
const deleteRegistration = catchAsync(
  async (req: Request, res: Response) => {

    const registrationId = req.params.registrationId as string


    await registrationService.deleteRegistration(registrationId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "registration deleted successfully",
      data: null
    })
  }
)




export const registrationController = {
  createRegistration,
  getAll,
  getRegistration,
  updateRegistration,
  deleteRegistration
}




