import { UploadApiResponse } from "cloudinary";
import { Cloudinary } from "../lib/cloudinary";
import { AppError } from "./AppError";
import httpStatus from 'http-status'

export const createFile = async (file: Express.Multer.File, path: string, type?: any) => {
  const cloudinaryRes = await new Promise<UploadApiResponse>(
    (resolve, reject) => {
      Cloudinary.cloudinary.uploader
        .upload_stream(
          {
            folder: path,
            resource_type: type ?? "auto",
          },
          async (error, result) => {
            if (error) {
              return reject(error);
            }
            if (!result) {
              return reject(
                new AppError(
                  httpStatus.BAD_GATEWAY,
                  "No result returned from cloudinary",
                ),
              );
            }
            return resolve(result);
          },
        ).end(file.buffer);
    },
  );

  return cloudinaryRes
}


export const createFiles = async (files: Express.Multer.File[], path: string, type?: any) => {
  const cloudinaryRes = await Promise.all(
    files.map((file) => {
      return new Promise<UploadApiResponse>(
        (resolve, reject) => {
          Cloudinary.cloudinary.uploader
            .upload_stream(
              {
                folder: path,
                resource_type: type ?? "auto",
              },
              async (error, result) => {
                if (error) {
                  return reject(error);
                }
                if (!result) {
                  return reject(
                    new AppError(
                      httpStatus.BAD_GATEWAY,
                      "No result returned from cloudinary",
                    ),
                  );
                }
              },
            ).end(file.buffer);
        },
      )
    }
    ))

  return cloudinaryRes
}