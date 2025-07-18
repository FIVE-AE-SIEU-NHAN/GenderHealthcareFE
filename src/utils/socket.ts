import { io, Socket } from 'socket.io-client';

// Events the client LISTENS FOR (receives from the server)
export interface ServerToClientEvents {
  'payment:status': (data: { status: 'PENDING' | 'PAID' | 'CANCELLED' | 'FAILED'; content: string }) => void;
  'notify:send': (data: { notification_id: string; content: string }) => void;
  
  'chat:message': (data: { id: string; sender_id: string; content: string; created_at: string }) => void;
  'chat:typing': (data: { sender_id: string; is_typing: boolean }) => void;

  // --- NEW AND UPDATED WEBRTC EVENTS ---
  // The server tells the first user that a new peer has joined.
  'user:joined': (data: { peerId: string }) => void;
  'user:left': (data: { peerId: string }) => void;
  // All signaling events now include who they are 'from'.
  'call:offer': (data: { offer: RTCSessionDescriptionInit; from: string; }) => void;
  'call:answer': (data: { answer: RTCSessionDescriptionInit; from: string; }) => void;
  'call:ice-candidate': (data: { candidate: RTCIceCandidateInit; from: string; }) => void;
}

// Events the client EMITS (sends to the server)
export interface ClientToServerEvents {
  'chat:joinRoom': (room_id: string) => void;
  'chat:leaveRoom': (room_id: string) => void;
  'chat:message': (data: { room_id: string; sender_id: string; message: string }) => void;
  'chat:typing': (data: { room_id: string; sender_id: string; is_typing: boolean }) => void;
  
  'call:joinRoom': (room_id: string) => void;
  'call:leaveRoom': (room_id: string) => void;

  // --- UPDATED WEBRTC EVENTS ---
  // All signaling events must now specify who they are 'to'.
  'call:offer': (data: { offer: RTCSessionDescriptionInit; to: string; }) => void;
  'call:answer': (data: { answer: RTCSessionDescriptionInit; to: string; }) => void;
  'call:ice-candidate': (data: { candidate: RTCIceCandidateInit; to: string; }) => void;
}

const URL = import.meta.env.VITE_BASE_URL; 

// The 'autoConnect: false' is important. 
// Manually connect only when we have the user's ID.
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL, {
  autoConnect: false
});