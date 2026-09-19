import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { Cloudinary } from "../../lib/cloudinary";
import { calendarController } from "./calendar.controller";



const route = Router({ mergeParams: true })

route.post(
  '/',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  Cloudinary.upload.single('file'),
  calendarController.createCalendar
)

route.get(
  '/all-calendar',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  calendarController.getAllCalendar
)

route.get(
  '/:calendarId',
  calendarController.getCalendar
)

route.put(
  '/:calendarId',
  Cloudinary.upload.single('file'),
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  calendarController.updateCalendar
)


route.patch(
  '/:calendarId',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  calendarController.deleteCalendar
)



export const calendarRouter = route