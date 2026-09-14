import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { admissionInfoController } from "./admission.controller";


const route = Router()

route.post(
  '/',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  admissionInfoController.createInfo
)


route.get(
  '/all-info',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  admissionInfoController.getAllInfo
)


route.get(
  '/:admissionInfoId',
  admissionInfoController.getInof
)


route.put(
  '/:admissionInfoId',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  admissionInfoController.updateInfo
)



route.patch(
  '/:admissionInfoId',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  admissionInfoController.deleteInfo
)

export const adminssionInfoRouter = route