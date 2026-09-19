import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { registrationController } from "./registration.controller";


const route = Router({ mergeParams: true })

route.post(
  '/',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  registrationController.createRegistration
)


route.get(
  '/all-registration',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  registrationController.getAll
)


route.get(
  '/:registrationId',
  registrationController.getRegistration
)


route.put(
  '/:registrationId',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  registrationController.updateRegistration
)



route.patch(
  '/:registrationId',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  registrationController.deleteRegistration
)


export const registrationRouter = route