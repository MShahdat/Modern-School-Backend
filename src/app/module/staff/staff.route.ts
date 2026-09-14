import { Router } from "express";
import { staffController } from "./staff.controller";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";


const route = Router({ mergeParams: true })


route.post('/',
  auth(Role.SUPER_ADMIN, Role.ADMIN),
  staffController.createStaff)

route.get(
  '/',
  staffController.getStaffs)

route.get(
  '/all-staff',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  staffController.getAllStaff)

route.get(
  '/:id',
  staffController.getSingleStaff)

route.patch(
  '/:id',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  staffController.deleteStaff)


route.put(
  '/:id',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  staffController.updatedStaff)


export const staffRouter = route