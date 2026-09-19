import express, { Application, Request, Response } from "express"
import config from "./app/config/env"
import cors from 'cors'
import cookieParser from "cookie-parser"
import { globalErrorHandler } from "./app/middleware/globalErrorHandler"
import { notFound } from "./app/middleware/notFound"
import { AuthRoutes } from "./app/module/auth/auth.route"
import { teacherRouter } from "./app/module/teacher/teacher.route"
import { staffRouter } from "./app/module/staff/staff.route"
import { committeeRouter } from "./app/module/committee/committee.route"
import { siteConfigRouter } from "./app/module/siteConfig/siteConfig.route"
import { auth } from "./app/middleware/checkAuth"
import { Role } from "../generated/prisma/enums"
import { eventRouter } from "./app/module/event/event.route"
import { noticeRouter } from "./app/module/notice/notice.route"
import { activityRouter } from "./app/module/activity/activity.route"
import { adminssionInfoRouter } from "./app/module/admissionInfo/admission.route"
import { applyRouter } from "./app/module/apply/apply.route"
import { academicRuleRouter } from "./app/module/rules/rules.route"
import { calendarRouter } from "./app/module/calendar/calendar.route"
import { missionRouter } from "./app/module/mission/mission.route"
import { registrationRouter } from "./app/module/registration/registration.route"
import { studyRouter } from "./app/module/study/study.route"
import { routineRouter } from "./app/module/routine/routine.route"
import { achievementRouter } from "./app/module/achievement/achievement.route"
import { uniformRouter } from "./app/module/uniform/uniform.route"
import { newsRouter } from "./app/module/news/news.route"

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

app.use('/api/v1/site-config', siteConfigRouter)

app.use('/api/v1/:siteConfigId/teacher', teacherRouter)

app.use('/api/v1/:siteConfigId/staff', staffRouter)

app.use('/api/v1/:siteConfigId/committee', committeeRouter)

app.use('/api/v1/:siteConfigId/event', eventRouter)

app.use('/api/v1/:siteConfigId/notice', noticeRouter)

app.use('/api/v1/:siteConfigId/activity', activityRouter)

app.use('/api/v1/:siteConfigId/admissionInfo', adminssionInfoRouter)

app.use('/api/v1/:siteConfigId/apply', applyRouter)

app.use('/api/v1/:siteConfigId/rule', academicRuleRouter)

app.use('/api/v1/:siteConfigId/calendar', calendarRouter)

app.use('/api/v1/:siteConfigId/mission-vission', missionRouter)

app.use('/api/v1/:siteConfigId/registration', registrationRouter)

app.use('/api/v1/:siteConfigId/study', studyRouter)

app.use('/api/v1/:siteConfigId/routine', routineRouter)

app.use('/api/v1/:siteConfigId/achievement', achievementRouter)

app.use('/api/v1/:siteConfigId/uniform', uniformRouter)

app.use('/api/v1/:siteConfigId/news', newsRouter)


app.use(globalErrorHandler)
app.use(notFound)



export default app