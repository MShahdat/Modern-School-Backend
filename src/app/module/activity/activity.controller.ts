import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { activityService } from "./activity.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status'

//& CREATE ACTIVITY
const createActivity = catchAsync(
  async (req: Request, res: Response) => {

    const body = req.body
    const configId = req.params.siteConfigId as string

    const result = await activityService.createActivity(body, configId)

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "activity created successfully",
      data: result
    })
  }
)


//& GET ALL ACTIVITY (ADMIN)
const getAllActivities = catchAsync(
  async (req: Request, res: Response) => {

    const query = req.query
    const configId = req.params.siteConfigId as string

    const { activities, meta } = await activityService.getAllActivity(query, configId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "activity retrive successfully",
      data: activities,
      meta
    })
  }
)



//& GET ALL ACTIVITY (PUBLIC)
const getActivities = catchAsync(
  async (req: Request, res: Response) => {

    const query = req.query
    const configId = req.params.siteConfigId as string

    const { activities, meta } = await activityService.getActvities(query, configId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "activity retrive successfully",
      data: activities,
      meta
    })
  }
)


//& UPDATE ACTIVITY
const updateActivity = catchAsync(
  async (req: Request, res: Response) => {

    const body = req.body
    const configId = req.params.siteConfigId as string
    const activityId = req.params.activityId as string

    const result = await activityService.updateActivity(body, activityId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "activity updated successfully",
      data: result
    })
  }
)


//& DELETED
const deleteActivity = catchAsync(
  async (req: Request, res: Response) => {

    const activityId = req.params.activityId as string

    await activityService.deleteActivity(activityId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "activity deleted successfully",
      data: null
    })
  }
)




export const activityController = {
  createActivity,
  getAllActivities,
  getActivities,
  updateActivity,
  deleteActivity
}



