import z from "zod";


export const routineZodSchema = z.object({
  title: z.string(),
  description: z.string()
})