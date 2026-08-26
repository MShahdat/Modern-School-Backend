import { Router } from 'express'
import { auth } from '../../middleware/checkAuth'
import { AuthController } from './auth.controller'
import { Role } from '../../../../generated/prisma/enums'

const router = Router({ mergeParams: true })


router.post('/login', AuthController.loginUser)

router.get(
  '/me',
  auth(Role.ADMIN, Role.COMMITTEE, Role.STAFF, Role.STUDENT, Role.SUPER_ADMIN, Role.TEACHER),
  AuthController.getMe,
)
router.post('/refresh-token', AuthController.refreshToken)
export const AuthRoutes = router