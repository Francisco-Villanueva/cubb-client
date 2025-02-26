import { ScheduleZodSchema } from "./schedules";
import { z } from "zod";

export const CourtZodSchema = z.object({
  name: z.string().min(1),
  schedules: z.array(ScheduleZodSchema).optional(),
});
export type ICourt = z.infer<typeof CourtZodSchema>;
