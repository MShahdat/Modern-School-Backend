
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status'
import { applyService } from "./apply.service";



//& CREATE 
const createApply = catchAsync(
  async (req: Request, res: Response) => {

    const body = req.body
    const configId = req.params.siteConfigId as string

    const result = await applyService.createApply(body, configId)

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "apply rule created successfully",
      data: result
    })
  }
)


//& GET ALL (ADMIN)
const getAll = catchAsync(
  async (req: Request, res: Response) => {

    const query = req.query
    const { applys, meta } = await applyService.getAll(query)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "apply info retrive successfully",
      data: applys,
      meta
    })
  }
)



//& GET SINGLE (PUBLIC)
const getApply = catchAsync(
  async (req: Request, res: Response) => {

    const applyId = req.params.applyId as string

    const result = await applyService.getApply(applyId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "retrive successfully",
      data: result
    })
  }
)


//& UPDATE
const updateApply = catchAsync(
  async (req: Request, res: Response) => {

    const body = req.body
    const applyId = req.params.applyId as string

    const result = await applyService.updateApply(body, applyId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "apply updated successfully",
      data: result
    })
  }
)


//& DELETED
const deleteApply = catchAsync(
  async (req: Request, res: Response) => {

    const applyId = req.params.applyId as string


    await applyService.deleteApply(applyId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "apply deleted successfully",
      data: null
    })
  }
)




export const applyController = {
  createApply,
  getAll,
  getApply,
  updateApply,
  deleteApply
}




