import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { staffService } from "./staff.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status'
import { AppError } from "../../utils/AppError";


//& CREATE STAFF
const createStaff = catchAsync(
  async (req: Request, res: Response) => {
    const body = req.body
    const user = req.user!
    const { siteConfigId } = req.params

    const result = await staffService.createStaff(body, siteConfigId as string, user)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Staff created successfully',
      data: result,
    })
  }
)


//& GET ALL STAFF (ADMIN)
const getAllStaff = catchAsync(
  async (req: Request, res: Response) => {

    const { siteConfigId } = req.params
    const query = req.query

    const { staff, meta } = await staffService.getAllStaff(query, siteConfigId as string)

    if (staff.length === 0) {
      throw new AppError(httpStatus.NOT_FOUND, 'staff not found')
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Staff retrieved successfully',
      data: staff,
      meta
    })
  }
)


//& GET ALL STAFF (PUBLIC)
const getStaffs = catchAsync(
  async (req: Request, res: Response) => {

    const { siteConfigId } = req.params
    const query = req.query

    const { staff, meta } = await staffService.getStaffs(query, siteConfigId as string)

    if (staff.length === 0) {
      throw new AppError(httpStatus.NOT_FOUND, 'staff not found')
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Staff retrieved successfully',
      data: staff,
      meta
    })
  }
)


//& GET SINGLE STAFF (PUBLIC)
const getSingleStaff = catchAsync(
  async (req: Request, res: Response) => {

    const { siteConfigId } = req.params
    const id = req.params.id as string

    const result = await staffService.getSingleStaff(id, siteConfigId as string)

    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, 'staff not found')
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Staff retrieved successfully',
      data: result
    })
  }
)


//& DELETE STAFF (ADMIN)
const deleteStaff = catchAsync(
  async (req: Request, res: Response) => {

    const { siteConfigId } = req.params
    const id = req.params.id as string

    const result = await staffService.deleteStaff(id, siteConfigId as string)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Staff deleted successfully',
      data: null
    })
  }
)


//& UPDATE STAFF (ADMIN)
const updatedStaff = catchAsync(
  async (req: Request, res: Response) => {

    const { siteConfigId } = req.params
    const id = req.params.id as string
    const body = req.body

    const result = await staffService.updatedStaff(body, id, siteConfigId as string)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Staff updated successfully',
      data: result
    })
  }
)

export const staffController = {
  createStaff,
  getAllStaff,
  getStaffs,
  getSingleStaff,
  deleteStaff,
  updatedStaff
}