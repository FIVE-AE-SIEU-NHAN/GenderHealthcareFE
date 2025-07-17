// src/contexts/SocketContext.tsx

import React, { createContext, useContext, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query'; // Import this
import { socket } from '@/utils/socket';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

const SocketContext = createContext(socket);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (user && !socket.connected) {
      socket.auth = { userId: user.user_id };
      socket.connect();
    }

    // --- GLOBAL LISTENER FOR NOTIFICATION ---
    const onNewNotification = (data: { notification_id: string; content: string }) => {
      toast.info("You have a new notification!", { description: data.content });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    };

    socket.on('notify:send', onNewNotification);
    
    return () => {
      socket.off('notify:send', onNewNotification); // Clean up the listener
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [user, queryClient]); 

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};