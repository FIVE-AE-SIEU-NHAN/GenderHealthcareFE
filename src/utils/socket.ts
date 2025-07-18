import { io, Socket } from 'socket.io-client';

export interface ServerToClientEvents {
  'payment:status': (data: { status: 'PENDING' | 'PAID' | 'CANCELLED' | 'FAILED'; content: string }) => void;
  'notify:send': (data: { notification_id: string; content: string }) => void;
  
  'chat:message': (data: { id: string; sender_id: string; content: string; created_at: string }) => void;
  'chat:typing': (data: { sender_id: string; is_typing: boolean }) => void;
  'call:offer': (data: { offer: any }) => void;
  'call:answer': (data: { answer: any }) => void;
  'call:ice-candidate': (data: { candidate: any }) => void;
}

export interface ClientToServerEvents {
  'chat:joinRoom': (room_id: string) => void;
  'chat:leaveRoom': (room_id: string) => void;
  
  'chat:message': (data: { room_id: string; sender_id: string; message: string }) => void;
  'chat:typing': (data: { room_id: string; sender_id: string; is_typing: boolean }) => void;
  
  'call:joinRoom': (room_id: string) => void;
  'call:leaveRoom': (room_id: string) => void;
  'call:offer': (data: { offer: any }) => void;
  'call:answer': (data: { answer: any }) => void;
  'call:ice-candidate': (data: { candidate: any }) => void;
}

const URL = import.meta.env.VITE_BASE_URL; 

// The 'autoConnect: false' is important. 
// Manually connect only when we have the user's ID.
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL, {
  autoConnect: false
});