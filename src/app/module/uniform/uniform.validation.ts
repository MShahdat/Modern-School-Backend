import z from "zod";


export const uniformZodSchema = z.object({
  title: z.string(),
  descripiton: z.string().optional()
})