import React, { useState, useEffect, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Send, UserCircle2 } from 'lucide-react';

// --- Import your custom hooks ---
import { useSocket } from '@/contexts/SocketContext';
import { useAuth } from '@/contexts/AuthContext';

// Define a type for our chat messages for better type-safety
interface ChatMessage {
  id: string;
  sender_id: string;
  content: string;
  created_at?: string; // Optional since we create it client-side temporarily before server confirmation
}

// Define the props for our component
interface VideoChatRoomProps {
  chat_room_id: string;
  onLeave: () => void; // A callback function to notify the parent component that the user has left
}

const VideoChatRoom: React.FC<VideoChatRoomProps> = ({ chat_room_id, onLeave }) => {
  const socket = useSocket(); // Use the socket from your context
  const { user } = useAuth(); // Get the authenticated user
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  // Refs to hold references to DOM elements and other non-state values
  const localVideoRef = useRef<Webcam>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Effect to automatically scroll the chat window to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // --- THE FIX: Effect to handle turning the camera on/off ---
  // This hook listens for changes to `isCameraOff` and manually enables/disables the video track.
  useEffect(() => {
    if (localVideoRef.current && localVideoRef.current.stream) {
      const stream = localVideoRef.current.stream as MediaStream;
      const videoTracks = stream.getVideoTracks();
      if (videoTracks.length > 0) {
        // Enable or disable the first video track based on the component's state
        videoTracks[0].enabled = !isCameraOff;
      }
    }
  }, [isCameraOff]);


  // Main effect for handling all socket event listeners for this component's lifecycle
  useEffect(() => {
    if (!socket || !user) return;

    // --- Join Rooms on mount ---
    socket.emit('chat:joinRoom', chat_room_id);
    socket.emit('call:joinRoom', chat_room_id);
    console.log(`Socket ${socket.id} joining chat and call rooms: ${chat_room_id}`);

    // --- Define Handlers ---
    const handleChatMessage = (message: ChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };
    
    // NOTE: Replace these with your full WebRTC logic
    const handleOffer = (data: { offer: any }) => console.log('Received offer:', data.offer);
    const handleAnswer = (data: { answer: any }) => console.log('Received answer:', data.answer);
    const handleNewICECandidate = (data: { candidate: any }) => console.log('Received ICE candidate:', data.candidate);

    // --- Register Listeners ---
    socket.on('chat:message', handleChatMessage);
    socket.on('call:offer', handleOffer);
    socket.on('call:answer', handleAnswer);
    socket.on('call:ice-candidate', handleNewICECandidate);

    // --- Cleanup on component unmount ---
    return () => {
      console.log(`Socket ${socket.id} leaving chat and call rooms: ${chat_room_id}`);
      socket.emit('chat:leaveRoom', chat_room_id);
      socket.emit('call:leaveRoom', chat_room_id);

      // Remove the specific listeners to prevent memory leaks and duplicate handlers
      socket.off('chat:message', handleChatMessage);
      socket.off('call:offer', handleOffer);
      socket.off('call:answer', handleAnswer);
      socket.off('call:ice-candidate', handleNewICECandidate);
      
      // Also clean up any existing WebRTC peer connection
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
        peerConnectionRef.current = null;
      }
    };
  }, [socket, user, chat_room_id]);


  const handleSendMessage = useCallback(() => {
    if (newMessage.trim() && socket && user) {
      const messageData = { sender_id: user.user_id, message: newMessage };
      
      // Emit the message to the server via socket
      socket.emit('chat:message', messageData);
      
      // Optimistically update our own UI for a faster user experience
      setMessages((prev) => [...prev, { id: `temp_${Date.now()}`, sender_id: user.user_id, content: newMessage }]);
      setNewMessage('');
    }
  }, [newMessage, socket, user]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
      <div className="flex flex-1 overflow-hidden">
        {/* Main Content Area: Video Streams */}
        <div className="flex-1 flex flex-col p-4 gap-4 relative">
          <div className="relative flex-1 bg-black rounded-lg overflow-hidden border border-gray-700">
            {/* Remote Video Stream will be attached here by your WebRTC logic */}
            <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-sm font-semibold">
              Remote User
            </div>
          </div>
          {/* Local Video Picture-in-Picture Style */}
          <div className="absolute top-4 right-4 w-48 lg:w-64 h-auto bg-black rounded-lg self-end overflow-hidden border-2 border-gray-500 shadow-lg z-10">
             {/* Placeholder for when the camera is off */}
            <div className={`transition-opacity duration-300 ${isCameraOff ? 'opacity-100' : 'opacity-0'}`}>
                <div className="w-full h-full flex items-center justify-center bg-gray-800" style={{aspectRatio: '16/9'}}>
                    <UserCircle2 className="w-16 h-16 text-gray-500" />
                </div>
            </div>
            {/* Actual Webcam Feed */}
            <div className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${isCameraOff ? 'opacity-0' : 'opacity-100'}`}>
                <Webcam
                    audio={!isMuted} // The audio prop works as a boolean
                    ref={localVideoRef}
                    mirrored={true}
                    className="w-full h-full object-cover"
                    // The invalid `video` prop has been removed
                />
            </div>
             <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 px-2 py-0.5 rounded text-xs font-semibold">
              You
            </div>
          </div>
        </div>

        {/* Side Panel: Chat */}
        <div className="w-80 bg-gray-800 flex flex-col border-l border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <h2 className="font-bold text-lg">Live Chat</h2>
            <p className="text-xs text-gray-400 truncate">Room: {chat_room_id}</p>
          </div>
          <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender_id === user?.user_id ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`py-2 px-3 rounded-lg max-w-xs text-sm shadow ${
                    msg.sender_id === user?.user_id
                      ? 'bg-blue-600 rounded-br-none'
                      : 'bg-gray-600 rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-gray-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-500 transition-colors rounded-full p-2 flex-shrink-0">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Control Bar */}
      <div className="bg-gray-900 bg-opacity-50 py-3 flex justify-center items-center gap-6 border-t border-gray-700">
        <button onClick={() => setIsMuted(!isMuted)} className={`p-3 rounded-full transition-colors ${isMuted ? 'bg-red-500 text-white' : 'bg-gray-600 hover:bg-gray-500'}`}>
          {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
        </button>
        <button onClick={() => setIsCameraOff(!isCameraOff)} className={`p-3 rounded-full transition-colors ${isCameraOff ? 'bg-red-500 text-white' : 'bg-gray-600 hover:bg-gray-500'}`}>
          {isCameraOff ? <VideoOff size={24} /> : <Video size={24} />}
        </button>
        <button onClick={onLeave} className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition-colors">
          <PhoneOff size={24} />
        </button>
      </div>
    </div>
  );
};

export default VideoChatRoom;