import z from "zod";

export const achievementValidationZodSchema = z.object({
  title: z.string(),
  description: z.string()
})