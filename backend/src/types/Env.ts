import { z } from 'zod';

const envVariables = z.object({
    PORT: z.number(),
    NODE_ENV: z.string(),
    MONGO_URI: z.string(),
    GOOGLE_DOMAIN: z.string(),
    CLIENT_ID: z.string(),
    JWT_SECRET: z.string(),
});

envVariables.parse(process.env);

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envVariables> {}
    }
}
