import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { activityController } from "./activity.controller";


const route = Router()

route.post(
  '/',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  activityController.createActivity
)


route.get(
  '/all',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  activityController.getAllActivities
)


route.get(
  '/all-activity',
  activityController.getActivities
)


route.put(
  '/:activityId',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  activityController.updateActivity
)



route.patch(
  '/:activityId',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  activityController.deleteActivity
)

export const activityRouter = route