import { z } from "zod";

export const specialtySchema = z.object({
  code: z.string().trim().min(2, "Specialty code is required"),
  nameRu: z.string().trim().min(2, "Name in Russian is required"),
  nameKz: z.string().trim().min(2, "Name in Kazakh is required"),
  nameEn: z.string().trim().min(2, "Name in English is required"),
  descriptionRu: z.string().trim().optional(),
  descriptionKz: z.string().trim().optional(),
  descriptionEn: z.string().trim().optional(),
});

export type SpecialtyFormValues = z.infer<typeof specialtySchema>;
