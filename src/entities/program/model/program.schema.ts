import { z } from "zod";

export const programSchema = z.object({
  nameRu: z.string().trim().min(2, "Name in Russian is required"),
  nameKz: z.string().trim().min(2, "Name in Kazakh is required"),
  nameEn: z.string().trim().min(2, "Name in English is required"),
  universityId: z.number().min(1, "University is required"),
  specialtyId: z.number().min(1, "Specialty is required"),
  grantCount: z.number().min(0),
  minPoints: z.number().min(0).max(140),
  degree: z.string(),
  languages: z.array(z.string()).min(1, "At least one language must be selected"),
});

export type ProgramFormValues = z.infer<typeof programSchema>;
