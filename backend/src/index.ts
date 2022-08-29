import Server from './classes/Server';
import config from './types/Config';
import './types/ResponseAugmentation'; // Apply augmentation

const server = new Server(config);

export default server;
