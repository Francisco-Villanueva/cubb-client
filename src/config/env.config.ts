import { z } from "zod";

const envZodModel = z.object({
  VITE_BASE_API_URL: z.string().url(),
  VITE_PUBLIC_APIMAPS: z.string(),
});

/*
 |TODO For the moment prevent this from passing deployment into production.
 |------>  envZodModel.parse(process.env);
*/

type EnvType = z.infer<typeof envZodModel>;
declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvType {}
  }
}
