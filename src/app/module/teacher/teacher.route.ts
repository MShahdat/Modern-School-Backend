import { Router } from "express";
import { teacherController } from "./teacher.controller";



const route = Router({ mergeParams: true })


route.post('/', teacherController.createTeacher)


export const teacherRouter = route