import bcrypt from 'bcryptjs'
import { JwtPayload, SignOptions } from 'jsonwebtoken'

import { prisma } from '../../lib/prisma'
import { UserStatus } from '../../../../generated/prisma/enums'
import config from '../../config/env'
import { ILogin } from './auth.interface'
import { AppError } from '../../utils/AppError'
import httpStatus from 'http-status'
import { jwtUtils } from '../../utils/jwt'
import { IRequestUser } from '../../middleware/checkAuth'



//& LOGIN USER
const loginUser = async (payload: ILogin, siteConfigId: string) => {
  const { email, password } = payload

  const isConfig = await prisma.siteConfig.findUnique({
    where: { id: siteConfigId }
  })

  if (!isConfig) {
    throw new AppError(httpStatus.NOT_FOUND, 'siteConfig not found')
  }

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }

  if (user.status === UserStatus.BLOCKED) {
    throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
  }

  if (user.isDeleted || user.status === UserStatus.DELETED) {
    throw new AppError(httpStatus.FORBIDDEN, "User is deleted");
  }

  if (user.password === null && user.googleId !== null) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "User already has an account with google. please try to login with google",
    );
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password)

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  const jwtPayload = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  }

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions
  );

  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions
  );

  return {
    accessToken,
    refreshToken
  }
}



//& GET ME
const getMe = async (user: IRequestUser) => {
  const isUserExists = await prisma.user.findUnique({
    where: {
      id: user.userId,
    },
    omit: {
      password: true,
    },
  })

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }

  return isUserExists
}



//& CREATE ACCESS TOKEN
const refreshToken = async (token: string) => {
  const verifiedRefreshToken = jwtUtils.verifyToken(token, config.jwt_refresh_secret)

  if (!verifiedRefreshToken.success || !verifiedRefreshToken.data) {
    throw new Error(config.node_env === 'development' ? verifiedRefreshToken.error : 'Invalid refresh token')
  }

  const data = verifiedRefreshToken.data as JwtPayload

  const user = await prisma.user.findUnique({
    where: { id: data.userId },
  })

  if (!user || user.isDeleted || user.status !== UserStatus.ACTIVE) {
    throw new Error('User is inactive or not found')
  }

  const jwtPayload = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  }

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions
  );

  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions
  );

  return {
    accessToken,
    refreshToken
  }
}



export const AuthService = {
  loginUser,
  getMe,
  refreshToken
}



