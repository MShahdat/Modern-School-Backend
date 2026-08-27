import { z } from 'zod'


export const siteConfigZodSchema = z.object({
  email: z.email(),
  schoolName: z.string(),
  address: z.string(),
  eiin: z.string(),
  estdYear: z.string(),
  theme: z.json().optional(),

  facebookUrl: z.string().optional(),
  youtubeUrl: z.string().optional(),
  linkdinUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
  instagramUrl: z.string().optional()
})



export const siteConfigZodSchemaUpdate = z.object({
  email: z.email().optional(),
  schoolName: z.string().optional(),
  address: z.string().optional(),
  eiin: z.string().optional(),
  estdYear: z.string().optional(),
  theme: z.json().optional(),

  facebookUrl: z.string().optional(),
  youtubeUrl: z.string().optional(),
  linkdinUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
  instagramUrl: z.string().optional()
})