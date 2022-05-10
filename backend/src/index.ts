import Server from './classes/Server';
import Config from './types/Config';

const config: Config = require('../config.json');

const server = new Server(config);

export default server;
