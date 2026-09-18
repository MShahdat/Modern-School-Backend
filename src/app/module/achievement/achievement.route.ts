import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { Cloudinary } from "../../lib/cloudinary";
import { achievementController } from "./achievement.controller";



const route = Router()

route.post(
  '/',
  Cloudinary.upload.fields([
    {
      name: "cover",
      maxCount: 1
    },
    {
      name: "additionalFiles",
      maxCount: 10
    }
  ]),
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  achievementController.createAchieve
)


route.get(
  '/all',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  achievementController.getAllAchieve
)


route.get(
  '/all-achievements',
  achievementController.getAchieves
)

route.get(
  '/:achieveId',
  achievementController.getSingle
)

route.patch(
  '/:achieveId',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  achievementController.deleteAchieve
)

route.put(
  '/:achieveId',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  achievementController.updateAchieve
)

export const achievementRouter = route