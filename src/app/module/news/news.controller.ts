import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from 'http-status'
import { AppError } from "../../utils/AppError";
import { sendResponse } from "../../utils/sendResponse";
import { newsZodSchema } from "./news.validation";
import { newsService } from "./news.service";

//& CREATE
const createNews = catchAsync(
  async (req: Request, res: Response) => {

    const file = req.file

    if (!req.body.data) {
      throw new AppError(httpStatus.BAD_REQUEST, "form data not found");
    }

    let data = JSON.parse(req.body.data)

    const validation = newsZodSchema.safeParse(data)

    if (!validation.success) {
      throw new AppError(httpStatus.BAD_REQUEST, validation.error.issues[0].message)
    }

    const configId = req.params.siteConfigId as string

    const result = await newsService.createNews(data, file!, configId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'news created successfully',
      data: result
    })
  }
)


//& GET ALL (ADMIN)
const getAllNews = catchAsync(
  async (req: Request, res: Response) => {

    const configId = req.params.siteConfigId as string
    const query = req.query

    const { news, meta } = await newsService.getAllNews(query, configId)

    if (news.length === 0) {
      throw new AppError(httpStatus.NOT_FOUND, 'news not found')
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'news retrive successfully',
      data: news,
      meta
    })
  }
)


//& GET ALL (PUBLIC)
const getNews = catchAsync(
  async (req: Request, res: Response) => {

    const configId = req.params.siteConfigId as string
    const query = req.query

    const { news, meta } = await newsService.getNews(query, configId)

    if (news.length === 0) {
      throw new AppError(httpStatus.NOT_FOUND, 'news not found')
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'news retrive successfully',
      data: news,
      meta
    })
  }
)


//& GET SINGLE (PUBLIC)
const getSingle = catchAsync(
  async (req: Request, res: Response) => {

    const configId = req.params.siteConfigId as string
    const newsId = req.params.newsId as string

    const result = await newsService.getSingleNews(newsId, configId)


    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'news retrive successfully',
      data: result
    })
  }
)



//& DELETE NEWS (PUBLIC)
const deleteNews = catchAsync(
  async (req: Request, res: Response) => {

    const configId = req.params.siteConfigId as string
    const newsId = req.params.newsId as string


    await newsService.deleteNews(newsId, configId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'news deleted successfully',
      data: null
    })
  }
)


//& UPDATE
const updateNews = catchAsync(
  async (req: Request, res: Response) => {

    const file = req.file
    const data = JSON.parse(req.body.data)
    const newsId = req.params.newsId as string

    if (!file && !data) {
      throw new AppError(httpStatus.BAD_REQUEST, 'must be one field')
    }

    const result = await newsService.updateNews(data, file!, newsId)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'news updated successfully',
      data: result
    })
  }
)


export const newsController = {
  createNews,
  getAllNews,
  getNews,
  getSingle,
  updateNews,
  deleteNews
}