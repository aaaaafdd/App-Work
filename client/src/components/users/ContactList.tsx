import { useState, useEffect } from "react";
import UserCardProps from "../../types/userType";
import UserCard from "../ui/UserCard";
import Button from "../ui/Button";
import { useRoom } from "../../hooks/useRoom";
import useSocket from '../../hooks/useSocket';

export default function ContactList() {
  const [contacts, setContacts] = useState<UserCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {socket} = useSocket()
  const { updateRoomId, updateRoomName } = useRoom(); 
  const url = import.meta.env.VITE_REACT_URL_API

  const startConversation = (contactId: string | undefined, contactName: string) => {
    const user = localStorage.getItem('user');
    if (!user || !contactId) return;

    const parsedUser = JSON.parse(user);
    const myId = parsedUser.id;

    const privateRoomId = [myId, contactId].sort().join('_');

    updateRoomId(privateRoomId);
    updateRoomName(`Private chat with ${contactName}`);
    socket?.emit('join_room', privateRoomId, myId); 
  };

  useEffect(() => {
    const fetchContacts = async () => {
        try {
            const user = localStorage.getItem('user')
            const parsedUser = user ? JSON.parse(user) : null
            if(!parsedUser) {
                setError('User not found')
                return
            }
           const response = await fetch(`${url}/contact/${parsedUser.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
           if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        console.log(response)
           const data = await response.json();
           if(data.error) {
            setError(data.error)
            return
           } 
           setContacts(data.contacts);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }
    fetchContacts();
  }, [url])


  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
        My Contacts
      </h2>
      {contacts.length > 0 ? (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <UserCard
              key={contact.id}
              username={contact.username}
              status={contact.status}
            >
              <Button label="Start Conversation" type="button" onClick={() => startConversation(contact.id ? contact.id : undefined, contact.username)}/>
            </UserCard>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <p>No users found</p>
          )}
        </div>
      )}
    </div>
  );
}
