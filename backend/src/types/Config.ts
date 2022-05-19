export interface Config {
    port?: number;
    nodeEnv: 'development' | 'production';
    mongoURI: string;
    googleDomain: string;
    clientID: string;
    jwtSecret: string;
}

// Use require here just so that we can type the config
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config: Config = require('../../config.json');

// Default to port 5000 if not specified
config.port = config.port ?? 5000;

export default config;
