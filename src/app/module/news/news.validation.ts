import z from "zod";


export const newsZodSchema = z.object({
  title: z.string(),
  content: z.string()
})