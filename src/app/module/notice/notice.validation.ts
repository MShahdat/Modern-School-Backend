import z from "zod";


export const noticeZodSchema = z.object({
  title: z.string(),
  content: z.string()
})