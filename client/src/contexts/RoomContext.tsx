import { createContext } from 'react';

export interface RoomContextType {
  roomId: string | null;
  roomName: string | null;
  updateRoomId: (roomId: string) => void;
  updateRoomName: (roomName: string) => void;
}

export const RoomContext = createContext<RoomContextType | null>(null);


