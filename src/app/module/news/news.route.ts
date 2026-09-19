import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { Cloudinary } from "../../lib/cloudinary";
import { newsController } from "./news.controller";


const route = Router({ mergeParams: true })

route.post(
  '/',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  Cloudinary.upload.single('file'),
  newsController.createNews
)

route.get(
  '/all',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  newsController.getAllNews
)


route.get(
  '/all-news',
  newsController.getNews
)

route.get(
  "/:newsId",
  newsController.getSingle
)

route.put(
  '/:newsId',
  Cloudinary.upload.single('file'),
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  newsController.updateNews
)


route.patch(
  '/:newsId',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  newsController.deleteNews
)



export const newsRouter = route