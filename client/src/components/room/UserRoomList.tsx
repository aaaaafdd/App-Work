import {useState, useEffect} from 'react'
import RoomData from "../../types/roomDataType";
import useSocket from '../../hooks/useSocket';
import Button from '../ui/Button';
import Room from '../ui/Room';
import { useRoom } from '../../hooks/useRoom';

export default function UserRoomList(){
    const [room, setRoom] = useState<RoomData[]>([])
    const [userId, setUserId] = useState<number | null>(null)
    const {socket} = useSocket()
    const {updateRoomId, updateRoomName} = useRoom();
    const url = import.meta.env.VITE_REACT_URL_API
    
    useEffect(() => {
        const user = localStorage.getItem('user');
        const userId = user ? JSON.parse(user).id : null;

        if(!userId){
            console.error('User ID not found in local Storage')
        }

        setUserId(userId)

        const fetchRooms = async () => {
            try {
                const response = await fetch(`${url}/user/userRooms/${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRoom(data.rooms);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        if (socket) {
            socket.on('room_created', fetchRooms);

            return () => {
                socket.off('room_created', fetchRooms);
            };
        }     

        fetchRooms();
    }, [socket, url])

    const joinRoom = (roomId: number | undefined, roomName: string) => {
        if (roomId){
            const roomIdStr = roomId.toString();
            updateRoomName(roomName)
            updateRoomId(roomIdStr);
            socket?.emit('join_room', roomIdStr, userId);    
        } 
    }

    return (
        <div className="bg-amber-50 rounded-xl p-5 shadow-inner">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center border-b border-amber-200 pb-3">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-amber-600 mr-2" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                >
                    <path 
                        fillRule="evenodd" 
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" 
                        clipRule="evenodd" 
                    />
                </svg>
                Your Rooms
            </h2>

            {room.length > 0 ? (
                <div className="space-y-4">
                    {room.map((r) => (
                        <div 
                            key={r.id} 
                            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-amber-400"
                        >
                            <Room roomName={r.roomName} description={r.description} />
                            <div className="mt-3 flex justify-end">
                                <Button 
                                    type="button" 
                                    label="Start Conversation" 
                                    onClick={() => joinRoom(r.id, r.roomName)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-6 bg-white rounded-lg shadow-sm">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-12 w-12 mx-auto text-amber-300" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={1} 
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                        />
                    </svg>
                    <p className="mt-2 text-gray-600">You haven't joined any rooms yet</p>
                    <p className="text-sm text-amber-500 mt-1">Create or join a room to start chatting!</p>
                </div>
            )}
        </div>
    );
}