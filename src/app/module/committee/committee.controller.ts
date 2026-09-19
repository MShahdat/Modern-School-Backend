import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { committeeService } from "./committee.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status'
import { AppError } from "../../utils/AppError";


//& CREATE COMMITTEE
const createCommittee = catchAsync(
  async (req: Request, res: Response) => {

    if (!req.body.data) {
      throw new AppError(httpStatus.BAD_REQUEST, 'form data not found')
    }

    const profile = req.file

    const siteConfigId = req.params.siteConfigId as string
    const data = JSON.parse(req.body.data)

    const result = await committeeService.createCommittee(data, profile!, siteConfigId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Committee created successfully',
      data: result,
    })
  }
)


//& GET ALL COMMITTEE (ADMIN)
const getAllCommittee = catchAsync(
  async (req: Request, res: Response) => {

    const { siteConfigId } = req.params
    const query = req.query

    const { committee, meta } = await committeeService.getAllCommittee(query, siteConfigId as string)

    if (committee.length === 0) {
      throw new AppError(httpStatus.NOT_FOUND, 'committee not found')
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Committee retrieved successfully',
      data: committee,
      meta
    })
  }
)


//& GET ALL COMMITTEE (PUBLIC)
const getCommittee = catchAsync(
  async (req: Request, res: Response) => {

    const { siteConfigId } = req.params
    const query = req.query

    const { committee, meta } = await committeeService.getCommittee(query, siteConfigId as string)

    if (committee.length === 0) {
      throw new AppError(httpStatus.NOT_FOUND, 'committee not found')
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Committee retrieved successfully',
      data: committee,
      meta
    })
  }
)


//& GET SINGLE COMMITTEE (PUBLIC)
const getSingleCommittee = catchAsync(
  async (req: Request, res: Response) => {

    const { siteConfigId } = req.params
    const id = req.params.id as string

    const result = await committeeService.getSingleCommittee(id, siteConfigId as string)

    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, 'committee not found')
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Committee retrieved successfully',
      data: result
    })
  }
)


//& DELETE COMMITTEE (ADMIN)
const deleteCommittee = catchAsync(
  async (req: Request, res: Response) => {

    const { siteConfigId } = req.params
    const id = req.params.id as string

    const result = await committeeService.deleteCommittee(id, siteConfigId as string)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Committee deleted successfully',
      data: null
    })
  }
)


//& UPDATE COMMITTEE (ADMIN)
const updatedCommittee = catchAsync(
  async (req: Request, res: Response) => {

    const { siteConfigId } = req.params
    const id = req.params.id as string
    const body = req.body

    const result = await committeeService.updatedCommittee(body, id, siteConfigId as string)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Committee updated successfully',
      data: result
    })
  }
)

export const committeeController = {
  createCommittee,
  getAllCommittee,
  getCommittee,
  getSingleCommittee,
  deleteCommittee,
  updatedCommittee
}