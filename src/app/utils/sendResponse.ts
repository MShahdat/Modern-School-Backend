import { Response } from "express";


type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

type TResponseData<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: TMeta
}

export const sendResponse = <T>(res: Response, data: TResponseData<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
    meta: data.meta
  })
}

export const successResponse = <T>(res: Response, statusCode: number, message?: string, data?: T, meta?: TMeta) => {
  const response = {
    success: true,
    statusCode,
    message: message || "Request completed successfully",
    data,
    meta
  }
  res.status(statusCode).json(response)
}
