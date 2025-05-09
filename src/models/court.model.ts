import { WorkhourZodSchema } from "./schedules";
import { z } from "zod";

export const CourtZodSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  workhours: z.array(WorkhourZodSchema),
});
export const CreateCourtZodSchema = CourtZodSchema.omit({ id: true });
export type ICourt = z.infer<typeof CourtZodSchema>;
export type ICreateCourt = z.infer<typeof CreateCourtZodSchema>;
