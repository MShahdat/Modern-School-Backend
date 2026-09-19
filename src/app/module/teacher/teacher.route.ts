import { Router } from "express";
import { teacherController } from "./teacher.controller";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { Cloudinary } from "../../lib/cloudinary";



const route = Router({ mergeParams: true })


route.post('/',
  auth(Role.SUPER_ADMIN, Role.ADMIN),
  Cloudinary.upload.single('profile'),
  teacherController.createTeacher)

route.get(
  '/',
  teacherController.getTeachers)

route.get(
  '/all-teachers',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  teacherController.getAllTeacher)

route.get(
  '/:id',
  teacherController.getSingleTeacher)

route.patch(
  '/:id',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  teacherController.deleteTeacher)


route.put(
  '/:id',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  teacherController.updatedTeacher)




export const teacherRouter = route