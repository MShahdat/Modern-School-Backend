import { Router } from "express";
import { siteConfigController } from "./siteConfig.controller";
import { Cloudinary } from "../../lib/cloudinary";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";




const route = Router({ mergeParams: true })


route.post('/',
  Cloudinary.upload.single('logo'),
  auth(Role.SUPER_ADMIN),
  siteConfigController.createSiteConfig)


route.get('/all-siteConfig',
  auth(Role.SUPER_ADMIN),
  siteConfigController.getAllSiteConfig
)

route.get('/:siteConfigId',
  siteConfigController.getSiteConfig
)

route.delete('/:siteConfigId',
  auth(Role.SUPER_ADMIN),
  siteConfigController.deleteSiteConfig
)

route.put('/:siteConfigId',
  Cloudinary.upload.single('logo'),
  auth(Role.SUPER_ADMIN),
  siteConfigController.udpateSiteConfig)


export const siteConfigRouter = route