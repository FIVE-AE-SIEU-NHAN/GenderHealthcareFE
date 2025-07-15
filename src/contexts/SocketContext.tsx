// src/contexts/SocketContext.tsx

import React, { createContext, useContext, useEffect } from 'react';
import { socket } from '@/utils/socket'; // Import our socket instance
import { useAuth } from './AuthContext';

const SocketContext = createContext(socket);

// Custom hook to easily access the socket instance in any component
export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  useEffect(() => {
    if (user && !socket.connected) {
      // BE expects the user_id in `socket.handshake.auth`.
      socket.auth = { userId: user.user_id };
      
      socket.connect();
    }

    // --- Cleanup function ---
    // Run when the user logs out (the `user` object changes)
    // or when the component unmounts.
    return () => {
      if (socket.connected) {
        socket.disconnect();
        console.log('Socket disconnected.');
      }
    };
  }, [user]); // Re-runs whenever the user object changes (e.g., login/logout)

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};