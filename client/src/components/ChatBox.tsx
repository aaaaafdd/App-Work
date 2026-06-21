import { useState, useEffect } from 'react';
import useSocket from '../hooks/useSocket'; // asegúrate de importar correctamente
import Button from './ui/Button';
import MessageAttributes from '../types/messageType';
import PrivateMessageAttributes from '../types/privateMessageType';
import Message from './ui/Message';
import FormField from './ui/FormField';
import { useRoom } from '../hooks/useRoom';

export default function ChatBox() {
  const { socket } = useSocket();
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState<MessageAttributes[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const { roomId, roomName } = useRoom();
  const url = import.meta.env.VITE_REACT_URL_API

  useEffect(() => {
    if (!roomId) return;

    const fetchMessages = async () => {
      const user = localStorage.getItem('user');
      if (!user) return;

      const parsedUser = JSON.parse(user);
      const isPrivate = roomId.includes('_'); 
      setCurrentUser(parsedUser.username);
      try {
        const endpoint = isPrivate
          ? `${url}/private/${parsedUser.id}/${roomId.split('_').find(id => id !== parsedUser.id)}`
          : `${url}/room_chat/${roomId}`;

        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();

        if(!isPrivate){
            const messages = data.messages.map((msg: MessageAttributes) => ({
            content: msg.content,
            receivedUserRoom: {
              id: msg.receivedUserRoom.id,
              username: msg.receivedUserRoom.username
            }
          }));
          setMessageList(messages)
        } else {
          const messages = data.messages.map((msg: PrivateMessageAttributes) => ({
            content: msg.content,
            receivedUserRoom: {
              id: msg.sentUser?.id,
              username: msg.sentUser?.username,
            }
          }));
          setMessageList(messages)
        }

        
        
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    };

    fetchMessages();
  }, [roomId, url]);

  // Manejo de sockets
  useEffect(() => {
    if (!socket || !roomId) return;

    socket.emit('join_room', roomId, roomName);
    const handleMessage = (newMessage: { 
      content: string; 
      username: string; 
      senderId: string;
      isPrivate: boolean;
    }) => {
      setMessageList(prev => [...prev, {
        content: newMessage.content,
        receivedUserRoom: {
          id: newMessage.senderId,
          username: newMessage.username
        }
      }]);
    };

    socket.on('receive_message', handleMessage);

    return () => {
      socket.off('receive_message', handleMessage);
    };

    
  }, [socket, roomId, roomName]);

  // Auto-scroll
  useEffect(() => {
    const container = document.querySelector('.overflow-y-auto');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messageList]);

  const sendMessage = () => {
    if (!roomId || !message.trim()) return;

    const user = localStorage.getItem('user');
    if (!user) return;

    const parsedUser = JSON.parse(user);
    const isPrivate = roomId.includes('_');

    const messageData = {
      roomId,
      content: message,
      username: parsedUser.username,
      senderId: parsedUser.id,
      isPrivate,
      receiverId: isPrivate ? roomId.split('_').find(id => id !== parsedUser.id) : undefined
    };

    socket?.emit('send_message', messageData);
    setMessage('');
    
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden h-96">
      {/* Chat Header */}
      <div className="bg-amber-500 px-4 py-3 flex items-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 text-white mr-2" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" 
            clipRule="evenodd" 
          />
        </svg>
        <h3 className="text-white font-semibold">
          {roomId ? `Room: ${roomName}` : "Select a room to chat"}
        </h3>
      </div>

      {/* Messages Container */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
        {messageList.length > 0 ? (
          messageList.map((msg, index) => (
            <Message 
              key={index} 
              receivedUserRoom={msg.receivedUserRoom} 
              content={msg.content} 
              isCurrentUser={msg.receivedUserRoom.username === currentUser} 
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 mb-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1} 
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
              />
            </svg>
            <p>No messages yet. Start the conversation!</p>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex space-x-2">
          <div className="flex-1">
            <FormField 
              label="" 
              type="text" 
              name="message" 
              value={message} 
              onChange={handleChange}
            />
          </div>
          <Button 
            label="Send" 
            type="button" 
            disabled={!message.trim()} 
            onClick={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}
