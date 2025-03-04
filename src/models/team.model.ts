import { z } from "zod";

export const TeamZodSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  category: z.string().optional(),
  shield: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
});
export const CreateTeamZodSchema = TeamZodSchema.omit({ id: true });
export type ITeam = z.infer<typeof TeamZodSchema>;
export type ICreateTeam = z.infer<typeof CreateTeamZodSchema>;
