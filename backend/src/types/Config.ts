export default interface Config {
    port?: number;
    nodeEnv: 'development' | 'production';
    mongoURI: string;
}
