import z from "zod";

export const achievementValidationZodSchema = z.object({
  title: z.string(),
  description: z.string(),
  gallery: z.array(z.object({
    file: z.url(),
    filePublicId: z.string(),
  })).optional()
})