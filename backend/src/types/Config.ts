export default interface Config {
    port?: number;
    nodeEnv: 'development' | 'production';
    mongoURI: string;
    googleDomain: string;
    clientID: string;
    jwtSecret: string;
}
