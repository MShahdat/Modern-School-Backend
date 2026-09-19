
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status'
import { StudyService } from "./study.service";


//& CREATE 
const createStudy = catchAsync(
  async (req: Request, res: Response) => {

    const body = req.body
    const configId = req.params.siteConfigId as string

    const result = await StudyService.createStudy(body, configId)

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "study created successfully",
      data: result
    })
  }
)


//& GET ALL (ADMIN)
const getAll = catchAsync(
  async (req: Request, res: Response) => {

    const query = req.query
    const { studys, meta } = await StudyService.getAll(query)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "study retrive successfully",
      data: studys,
      meta
    })
  }
)



//& GET SINGLE (PUBLIC)
const getStudy = catchAsync(
  async (req: Request, res: Response) => {

    const studyId = req.params.studyId as string

    const result = await StudyService.getStudy(studyId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "study retrive successfully",
      data: result
    })
  }
)


//& UPDATE
const updateStudy = catchAsync(
  async (req: Request, res: Response) => {

    const body = req.body
    const studyId = req.params.studyId as string

    const result = await StudyService.updateStudy(body, studyId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "study updated successfully",
      data: result
    })
  }
)


//& DELETED
const deleteStudy = catchAsync(
  async (req: Request, res: Response) => {

    const studyId = req.params.studyId as string


    await StudyService.deleteStudy(studyId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "study deleted successfully",
      data: null
    })
  }
)




export const studyController = {
  createStudy,
  getAll,
  getStudy,
  updateStudy,
  deleteStudy
}




