import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { Cloudinary } from "../../lib/cloudinary";
import { noticeController } from "./notice.controller";



const route = Router()

route.post(
  '/',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  Cloudinary.upload.single('file'),
  noticeController.createNotice
)

route.get(
  '/all',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  noticeController.getAllNotices
)


route.get(
  '/all-notices',
  noticeController.getNotices
)


route.put(
  '/:noticeId',
  Cloudinary.upload.single('file'),
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  noticeController.updateNotice
)


route.patch(
  '/:noticeId',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  noticeController.deleteNotices
)



export const noticeRouter = route