import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { Cloudinary } from "../../lib/cloudinary";
import { routineController } from "./routine.controller";


const route = Router({ mergeParams: true })

route.post(
  '/',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  Cloudinary.upload.single('file'),
  routineController.createRoutine
)

route.get(
  '/all-routine',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  routineController.getAllRoutine
)

route.get(
  "/:routineId",
  routineController.getSingle
)

route.put(
  '/:routineId',
  Cloudinary.upload.single('file'),
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  routineController.updateRoutine
)


route.patch(
  '/:routineId',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  routineController.deleteRoutine
)



export const routineRouter = route