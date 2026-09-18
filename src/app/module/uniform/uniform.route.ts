import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { Cloudinary } from "../../lib/cloudinary";
import { uniformController } from "./uniform.controller";



const route = Router()

route.post(
  '/',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  Cloudinary.upload.single('file'),
  uniformController.createUniform
)

route.get(
  '/all',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  uniformController.getAllUniforms
)


route.get(
  '/all-uniroms',
  uniformController.getUniforms
)


route.put(
  '/:uniformId',
  Cloudinary.upload.single('file'),
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  uniformController.updateUniform
)


route.patch(
  '/:uniformId',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  uniformController.deleteUniform
)



export const uniformRouter = route