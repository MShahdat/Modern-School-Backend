import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { teacherService } from "./teacher.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status'
import { AppError } from "../../utils/AppError";


//& CREATE TEACHER
const createTeacher = catchAsync(
  async (req: Request, res: Response) => {
    const body = req.body
    const user = req.user!
    const { siteConfigId } = req.params

    const result = await teacherService.createTeacher(body, siteConfigId as string, user)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logged in successfully',
      data: result,
    })
  }
)


//& GET ALL TEACHERS (ADMIN)
const getAllTeacher = catchAsync(
  async (req: Request, res: Response) => {

    const { siteConfigId } = req.params
    const query = req.query

    const { teachers, meta } = await teacherService.getAllTeacher(query, siteConfigId as string)

    if (teachers.length === 0) {
      throw new AppError(httpStatus.NOT_FOUND, 'teachers not found')
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Teachers retrive successfully',
      data: teachers,
      meta
    })
  }
)


//& GET ALL TEACHERS (PUBLIC)
const getTeachers = catchAsync(
  async (req: Request, res: Response) => {

    const { siteConfigId } = req.params
    const query = req.query

    const { teachers, meta } = await teacherService.getTeachers(query, siteConfigId as string)

    if (teachers.length === 0) {
      throw new AppError(httpStatus.NOT_FOUND, 'teachers not found')
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Teachers retrive successfully',
      data: teachers,
      meta
    })
  }
)



//& GET SINGLE TEACHER (PUBLIC)
const getSingleTeacher = catchAsync(
  async (req: Request, res: Response) => {

    const { siteConfigId } = req.params
    const id = req.params.id as string

    const result = await teacherService.getSingleTeacher(id, siteConfigId as string)

    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, 'teachers not found')
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Teachers retrive successfully',
      data: result
    })
  }
)



//& DELTE TEACHER (ADMIN)
const deleteTeacher = catchAsync(
  async (req: Request, res: Response) => {

    const { siteConfigId } = req.params
    const id = req.params.id as string

    const result = await teacherService.deleteTeacher(id, siteConfigId as string)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Teachers deleted successfully successfully',
      data: null
    })
  }
)



//& GET UPDATE TEACHER (ADMIN)
const updatedTeacher = catchAsync(
  async (req: Request, res: Response) => {

    const { siteConfigId } = req.params
    const id = req.params.id as string
    const body = req.body

    const result = await teacherService.updatedTeacher(body, id, siteConfigId as string)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Teacher updated successfully',
      data: result
    })
  }
)

export const teacherController = {
  createTeacher,
  getAllTeacher,
  getTeachers,
  getSingleTeacher,
  deleteTeacher,
  updatedTeacher
}