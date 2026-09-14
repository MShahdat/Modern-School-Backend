import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { eventController } from "./event.controller";
import { Cloudinary } from "../../lib/cloudinary";



const route = Router()

route.post(
  '/',
  Cloudinary.upload.fields([
    {
      name: "cover",
      maxCount: 1
    },
    {
      name: "additionalFiles",
      maxCount: 10
    }
  ]),
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  eventController.createEvent
)


route.get(
  '/all',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  eventController.getAllEvents
)


route.get(
  '/all-events',
  eventController.getEvents
)


route.patch(
  '/:eventId',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  eventController.deleteEvent
)

export const eventRouter = route