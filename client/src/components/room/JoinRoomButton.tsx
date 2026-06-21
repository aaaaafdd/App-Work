import {useState, useEffect} from 'react'
import Button from '../ui/Button';
import useSocket from '../../hooks/useSocket';

type JoinRoomButtonProps = {
    roomId: number | undefined;  
}

export default function JoinRoomButton({roomId}: JoinRoomButtonProps) {

    const [userId, setUserId] = useState<number | null>(null);
    const { socket } = useSocket();
    const url = import.meta.env.VITE_REACT_URL_API

    useEffect(() => {
        const user = localStorage.getItem('user');
        const userId = user ? JSON.parse(user).id : null;

        if(userId){
            setUserId(userId);
        } else {
            console.error('User ID not found in local Storage')
        }
    }, [])

    const handleOnClick = () => {
        if(userId){
            fetch(`${url}/room/joinRoom`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_user: userId,
                    id_room: roomId
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.status === 'success'){
                    console.log('User added to room successfully')
                    socket?.emit('join_room', roomId, userId);   
                } else {
                    console.error(data.error || 'An error occurred')
                }
            })
        } else {
            console.error('User ID not found')
        }
    }

    return (
        <>
            <Button type="button" label="Join" disabled={false} onClick={handleOnClick} />
        </>
    );
}

