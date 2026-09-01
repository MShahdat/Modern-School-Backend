import { Router } from "express";
import { committeeController } from "./committee.controller";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";


const route = Router({ mergeParams: true })


route.post('/',
  auth(Role.SUPER_ADMIN, Role.ADMIN),
  committeeController.createCommittee)

route.get(
  '/',
  committeeController.getCommittee)

route.get(
  '/all-committee',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  committeeController.getAllCommittee)

route.get(
  '/:id',
  committeeController.getSingleCommittee)

route.patch(
  '/:id',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  committeeController.deleteCommittee)


route.put(
  '/:id',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  committeeController.updatedCommittee)


export const committeeRouter = route