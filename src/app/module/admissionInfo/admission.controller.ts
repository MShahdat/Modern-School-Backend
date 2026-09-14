import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status'
import { adimissionService } from "./admission.service";

//& CREATE 
const createInfo = catchAsync(
  async (req: Request, res: Response) => {

    const body = req.body
    const configId = req.params.siteConfigId as string

    const result = await adimissionService.createInfo(body, configId)

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "info created successfully",
      data: result
    })
  }
)


//& GET ALL (ADMIN)
const getAllInfo = catchAsync(
  async (req: Request, res: Response) => {

    const query = req.query
    const { infos, meta } = await adimissionService.getAllInfo(query)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "info retrive successfully",
      data: infos,
      meta
    })
  }
)



//& GET SINGLE (PUBLIC)
const getInof = catchAsync(
  async (req: Request, res: Response) => {

    const infoId = req.params.admissionInfoId as string

    const result = await adimissionService.getInfo(infoId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "info retrive successfully",
      data: result
    })
  }
)


//& UPDATE
const updateInfo = catchAsync(
  async (req: Request, res: Response) => {

    const body = req.body
    const infoId = req.params.admissionInfoId as string

    const result = await adimissionService.updatedInfo(body, infoId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "inof updated successfully",
      data: result
    })
  }
)


//& DELETED
const deleteInfo = catchAsync(
  async (req: Request, res: Response) => {

    const infoId = req.params.admissionInfoId as string


    await adimissionService.deletedInfo(infoId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "info deleted successfully",
      data: null
    })
  }
)




export const admissionInfoController = {
  createInfo,
  getAllInfo,
  getInof,
  deleteInfo,
  updateInfo
}



