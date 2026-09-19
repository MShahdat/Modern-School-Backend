import z from "zod";

export const eventValidationZodSchema = z.object({
  title: z.string(),
  description: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  location: z.string(),
  gallery: z.array(z.object({
    file: z.url(),
    filePublicId: z.string(),
  })).optional()
})