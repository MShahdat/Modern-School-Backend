import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { applyController } from "./apply.controller";


const route = Router({ mergeParams: true })

route.post(
  '/',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  applyController.createApply
)


route.get(
  '/all-apply',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  applyController.getAll
)


route.get(
  '/:applyId',
  applyController.getApply
)


route.put(
  '/:applyId',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  applyController.updateApply
)



route.patch(
  '/:applyId',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  applyController.deleteApply
)

export const applyRouter = route