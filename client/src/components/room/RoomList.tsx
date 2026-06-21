import {useState, useEffect} from 'react'
import RoomData from "../../types/roomDataType";
import useSocket from '../../hooks/useSocket';
import JoinRoomButton from './JoinRoomButton';
import Room from '../ui/Room';

export default function RoomList() {
    const [room, setRoom] = useState<RoomData[]>([])
    const { socket } = useSocket();
    const url = import.meta.env.VITE_REACT_URL_API

    useEffect(() => {
        const user = localStorage.getItem('user');
        const userId = user ? JSON.parse(user).id : null;

        if(!userId){
            console.error('User ID not found in local Storage')
        }

        const fetchRooms = async () => {
            const response = await fetch(`${url}/room/all/${userId}`)
            const data = await response.json()
            if (data.status === 'success') {
                setRoom(data.rooms)
            } else if (data.status === 'error') {
                console.log(data.error)
            }
        }
        
        if (socket) {
            socket.on('room_created', fetchRooms);

            return () => {
                socket.off('room_created', fetchRooms);
            };
        }     
        fetchRooms()
    }, [socket, url])

    return (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-amber-500 mr-2" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                >
                    <path 
                        fillRule="evenodd" 
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" 
                        clipRule="evenodd" 
                    />
                </svg>
                Available Rooms
            </h2>

            {room.length > 0 ? (
                <div className="grid gap-4">
                    {room.map((r) => (
                        <div 
                            key={r.id} 
                            className="group relative transition-all duration-150"
                        >
                            <Room roomName={r.roomName} description={r.description} />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                <JoinRoomButton roomId={r.id} />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No rooms available yet</p>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-12 w-12 mx-auto text-gray-300" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={1} 
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                        />
                    </svg>
                </div>
            )}
        </div>
    );
}
