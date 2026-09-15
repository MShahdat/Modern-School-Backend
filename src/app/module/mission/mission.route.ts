import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { missionController } from "./mission.controller";


const route = Router()

route.post(
  '/',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  missionController.createMission
)


route.get(
  '/all-mission',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  missionController.getAll
)


route.get(
  '/:missionId',
  missionController.getMission
)


route.put(
  '/:missionId',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  missionController.updateMission
)



route.patch(
  '/:missionId',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  missionController.deleteMission
)

export const missionRouter = route