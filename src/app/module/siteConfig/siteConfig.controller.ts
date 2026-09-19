import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AppError } from "../../utils/AppError";
import httpStatus from 'http-status'
import { siteConfigService } from "./siteConfig.service";
import { sendResponse, successResponse } from "../../utils/sendResponse";
import { siteConfigZodSchema, siteConfigZodSchemaUpdate } from "./siteConfig.validation";


//& CREATE SITECONFIG
const createSiteConfig = catchAsync(
  async (req: Request, res: Response) => {

    if (!req.file) {
      throw new AppError(httpStatus.BAD_REQUEST, "No file uploaded");
    }

    const logo = req.file

    if (!req.body.data) {
      throw new AppError(httpStatus.BAD_REQUEST, "form data not found");
    }
    let data = JSON.parse(req.body.data);

    const validation = siteConfigZodSchema.safeParse(data)

    if (!validation.success) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        validation.error.issues[0].message,
      );
    }

    const result = await siteConfigService.createSiteConfig(data, logo)

    return sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Site Config created successfully',
      data: result
    })
  }
)


//& GET ALL SITE CONFIG
const getAllSiteConfig = catchAsync(
  async (req: Request, res: Response) => {
    const query = req.query

    const { siteConfigs, meta } = await siteConfigService.getAllSiteConfig(query)

    if (siteConfigs.length === 0) {
      throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
    }
    return successResponse(res, httpStatus.OK, 'site config created successfully', siteConfigs, meta)
  }
)



//& GET SITE CONFIG
const getSiteConfig = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.siteConfigId as string

    const result = await siteConfigService.getSiteConfig(id)

    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, 'site config not found')
    }
    return successResponse(res, httpStatus.OK, 'site config created successfully', result)
  }
)


//& DELETE SITE CONFIG
const deleteSiteConfig = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.siteConfigId as string

    await siteConfigService.deleteConfig(id)

    return successResponse(res, httpStatus.OK, 'site config deleted successfully', null)
  }
)


//& UPDATE SITE CONFIG
const udpateSiteConfig = catchAsync(
  async (req: Request, res: Response) => {

    const logo = req.file

    if (!req.body.data && !logo) {
      throw new AppError(httpStatus.BAD_REQUEST, "form data not found");
    }

    let data = undefined
    if (req.body.data) {
      data = JSON.parse(req.body.data)
      const validation = siteConfigZodSchemaUpdate.safeParse(data)

      if (!validation.success) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          validation.error.issues[0].message,
        );
      }
    }


    const id = req.params.siteConfigId as string

    const result = await siteConfigService.udpateSiteConfig(data, id, logo!)

    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'site config updated successfully',
      data: result
    })
  }
)
export const siteConfigController = {
  createSiteConfig,
  getAllSiteConfig,
  getSiteConfig,
  deleteSiteConfig,
  udpateSiteConfig
}