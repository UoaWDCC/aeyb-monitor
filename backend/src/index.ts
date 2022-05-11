import Server from './classes/Server';
import Config from './types/Config';

// Use require here just so that we can type the config
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config: Config = require('../config.json');

const server = new Server(config);

export default server;
