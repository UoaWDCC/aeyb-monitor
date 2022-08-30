import Server from './classes/Server';
import config from './types/Config';
import './types/ResponseAugmentation'; // Apply augmentation
import hello from '../../shared';

console.log(hello());

const server = new Server(config);

export default server;
