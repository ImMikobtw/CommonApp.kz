import { z } from "zod";

export const universitySchema = z.object({
  nameRu: z.string().trim().min(2, "Name in Russian is required"),
  nameKz: z.string().trim().min(2, "Name in Kazakh is required"),
  nameEn: z.string().trim().min(2, "Name in English is required"),
  
  abbrRu: z.string().trim().optional(),
  abbrKz: z.string().trim().optional(),
  abbrEn: z.string().trim().optional(),
  
  descriptionRu: z.string().trim().optional(),
  descriptionKz: z.string().trim().optional(),
  descriptionEn: z.string().trim().optional(),
  
  logo: z.string().trim().url("Invalid logo URL").or(z.literal("")).optional(),
  website: z.string().trim().url("Invalid website URL").or(z.literal("")).optional(),
  phone: z.string().trim().optional(),
  address: z.string().trim().optional(),
  code: z.string().trim().optional(),
  services: z.array(z.string()).optional().default([]),
});

export type UniversityFormValues = z.infer<typeof universitySchema>;
