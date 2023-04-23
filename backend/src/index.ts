import Server from './classes/Server';
import './types/ResponseAugmentation'; // Apply augmentation
import dotenv from 'dotenv';

dotenv.config();

const server = new Server();

export default server;
