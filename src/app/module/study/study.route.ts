import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { studyController } from "./study.controller";


const route = Router({ mergeParams: true })

route.post(
  '/',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  studyController.createStudy
)


route.get(
  '/all-study',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  studyController.getAll
)


route.get(
  '/:studyId',
  studyController.getStudy
)


route.put(
  '/:studyId',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  studyController.updateStudy
)



route.patch(
  '/:studyId',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  studyController.deleteStudy
)


export const studyRouter = route