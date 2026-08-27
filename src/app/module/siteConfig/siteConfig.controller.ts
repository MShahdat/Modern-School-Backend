import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AppError } from "../../utils/AppError";
import httpStatus from 'http-status'
import { siteConfigService } from "./siteConfig.service";
import { successResponse } from "../../utils/sendResponse";
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

    const resutl = await siteConfigService.createSiteConfig(data, logo)
    return successResponse(res, httpStatus.CREATED, 'site config created successfully', resutl)
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

    const resutl = await siteConfigService.udpateSiteConfig(data, id, logo!)

    return successResponse(res, httpStatus.OK, 'site config updated successfully', resutl)
  }
)
export const siteConfigController = {
  createSiteConfig,
  getAllSiteConfig,
  getSiteConfig,
  deleteSiteConfig,
  udpateSiteConfig
}