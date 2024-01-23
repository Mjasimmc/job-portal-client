import Socket from 'socket.io-client';
import { BaseURL } from './config_Api';

export const socket = Socket.io(BaseURL);
