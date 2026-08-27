import express, { Application, Request, Response } from "express"
import config from "./app/config/env"
import cors from 'cors'
import cookieParser from "cookie-parser"
import { globalErrorHandler } from "./app/middleware/globalErrorHandler"
import { notFound } from "./app/middleware/notFound"
import { AuthRoutes } from "./app/module/auth/auth.route"
import { teacherRouter } from "./app/module/teacher/teacher.route"
import { siteConfigRouter } from "./app/module/siteConfig/siteConfig.route"
import { auth } from "./app/middleware/checkAuth"
import { Role } from "../generated/prisma/enums"

const app: Application = express()

app.use(
  cors({
    origin: config.frontend_url,
    credentials: true
  })
)


app.use(express.urlencoded({ extended: true }))


app.use(express.json())
app.use(cookieParser())


app.get('/', async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Modern School Backend'
  })
})


app.use('/api/v1/:siteConfigId/auth', AuthRoutes)

app.use('/api/v1/siteConfig',
  auth(Role.SUPER_ADMIN),
  siteConfigRouter)

app.use('/api/v1/:siteConfigId/teacher', teacherRouter)



app.use(globalErrorHandler)
app.use(notFound)



export default app