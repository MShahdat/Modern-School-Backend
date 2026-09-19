
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status'
import { missionService } from "../mission/mission.service";



//& CREATE 
const createMission = catchAsync(
  async (req: Request, res: Response) => {

    const body = req.body
    const configId = req.params.siteConfigId as string

    const result = await missionService.createMission(body, configId)

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "mission & vission created successfully",
      data: result
    })
  }
)


//& GET ALL (ADMIN)
const getAll = catchAsync(
  async (req: Request, res: Response) => {

    const query = req.query
    const { missions, meta } = await missionService.getAll(query)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "missin & vission retrive successfully",
      data: missions,
      meta
    })
  }
)



//& GET SINGLE (PUBLIC)
const getMission = catchAsync(
  async (req: Request, res: Response) => {

    const missionId = req.params.missionId as string

    const result = await missionService.getMission(missionId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "mission & vision retrive successfully",
      data: result
    })
  }
)


//& UPDATE
const updateMission = catchAsync(
  async (req: Request, res: Response) => {

    const body = req.body
    const missionId = req.params.missionId as string

    const result = await missionService.updateMission(body, missionId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "mission & vission updated successfully",
      data: result
    })
  }
)


//& DELETED
const deleteMission = catchAsync(
  async (req: Request, res: Response) => {

    const missionId = req.params.missionId as string


    await missionService.deleteMission(missionId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "mission deleted successfully",
      data: null
    })
  }
)




export const missionController = {
  createMission,
  getAll,
  getMission,
  updateMission,
  deleteMission
}




