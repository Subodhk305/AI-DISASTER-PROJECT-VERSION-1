import { useState, useEffect } from 'react';
import { wsService } from '../services/websocket';

export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    wsService.connect();
    wsService.onStatusChange(setIsConnected);
    wsService.on('alert', setLastMessage);
    wsService.on('prediction', setLastMessage);

    return () => {
      wsService.off('alert');
      wsService.off('prediction');
      wsService.disconnect();
    };
  }, []);

  return { isConnected, lastMessage };
};