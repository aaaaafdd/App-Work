import {useState, useEffect} from 'react'
import RoomData from "../../types/roomDataType";
import FormField from "../ui/FormField"
import useSocket from '../../hooks/useSocket';
import Button from '../ui/Button';

export default function CreateRoomForm(){

    const [formData, setFormData] = useState<RoomData>({id_admin: 0, roomName: '', description: ''})
    const { socket } = useSocket();
    const url = import.meta.env.VITE_REACT_URL_API
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {id_admin, roomName, description} = formData
        const response = await fetch(`${url}/room/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_admin, roomName, description}),
        })
        const data = await response.json();
        if(data.status === 'success'){
            socket?.emit('created_room')
            setFormData((prevData) => ({...prevData, roomName: '', description: ''}))
        } else if (data.status === 'error'){
            console.log(data.error)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({...prevData, [name]: value}))
    }

    useEffect(() => {
        const user = localStorage.getItem('user');

        if (user){
            const parsedUser = JSON.parse(user)
            setFormData((prevData) => ({...prevData, id_admin: parsedUser.id}))
        }
    }, [])

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-amber-500 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
              />
            </svg>
            Create New Room
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="hidden" 
              value={formData.id_admin} 
            />
            
            <FormField 
              label="Room Name" 
              type="text" 
              name="roomName" 
              value={formData.roomName} 
              onChange={handleChange} 
            />
            
            <FormField 
              label="Description" 
              type="text" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
            />
            
            <div className="pt-2">
              <Button 
                type="submit" 
                disabled={!formData.roomName}
                label="Create Room"
              />
            </div>
          </form>
        </div>
      );
}