import Server from './classes/Server';
import config from './types/Config';
import './types/ResponseAugmentation'; // Apply augmentation
import { values } from '@shared/index';

const server = new Server(config);
console.log(values);

export default server;
