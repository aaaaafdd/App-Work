import { useState, ReactNode } from 'react';
import { RoomContext } from '../contexts/RoomContext';

export const RoomProvider = ({ children }: { children: ReactNode }) => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [roomName, setRoomName] = useState<string | null>(null);

  const updateRoomId = (newRoomId: string) => {
    setRoomId(newRoomId);
  };

  const updateRoomName = (newRoomName: string) => {
    setRoomName(newRoomName);
  };

  return (
    <RoomContext.Provider value={{ roomId, roomName, updateRoomId, updateRoomName }}>
      {children}
    </RoomContext.Provider>
  );
};