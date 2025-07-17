import { io, Socket } from 'socket.io-client';

export interface ServerToClientEvents {
  'payment:status': (data: { status: 'PENDING' | 'PAID' | 'CANCELLED' | 'FAILED'; content: string }) => void;
  'notify:send': (data: { notification_id: string; content: string }) => void;
}

export interface ClientToServerEvents {}

const URL = import.meta.env.VITE_BASE_URL; 

// The 'autoConnect: false' is important. 
// Manually connect only when we have the user's ID.
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL, {
  autoConnect: false
});