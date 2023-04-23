import { z } from 'zod';

const envVariables = z.object({
    PORT: z.number(),
    NODEENV: z.string(),
    MONGOURI: z.string(),
    GOOGLEDOMAIN: z.string(),
    CLIENTID: z.string(),
    JWTSECRET: z.string(),
});

envVariables.parse(process.env);

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envVariables> {}
    }
}
