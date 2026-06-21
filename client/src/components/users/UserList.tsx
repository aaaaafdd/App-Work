import {useState, useEffect} from 'react';
import UserCardProps from "../../types/userType";
import UserCard from "../ui/UserCard";
import Button from '../ui/Button';
import useSocket from '../../hooks/useSocket';

const UserList = () => {

    const [users, setUsers] = useState<UserCardProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)
    const {socket} = useSocket()
    const url = import.meta.env.VITE_REACT_URL_API

    useEffect(() => {
        const fetchUsers = async () => {

            const user = localStorage.getItem('user')
            const parsedUser = user ? JSON.parse(user) : null
            if(!parsedUser) {
                setError('User not found')
                return
            }

            try {
                const response = await fetch(`${url}/user/${parsedUser.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data.users);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
                setError(errorMessage);
                console.log(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        if(socket){
            socket?.on('update_contact', fetchUsers)

            return () => {
                socket?.off('update_contact', fetchUsers)
            }
        }
        
        fetchUsers();
    }, [socket, url])

    const addContact = async (id: string | undefined) => {
        const user = localStorage.getItem('user')
        const parsedUser = user ? JSON.parse(user) : null
        if(!parsedUser || !id) {
            return
        }
            try {
                const response = await fetch(`${url}/contact`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        id_user: parsedUser.id,
                        id_contact: id
                    })
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                socket?.emit('add_contact')
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
                console.log(errorMessage);
            } 

    }

    return (
        <div className="bg-amber-50 rounded-xl p-5 shadow-inner">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center border-b border-amber-200 pb-3">
                Users List
            </h2>
            {users.length > 0 ? (
                <div className="space-y-4">
                    {users.map((user) => (                      
                            <UserCard key={user.id} username={user.username} status={user.status} id={user.id}>
                                <Button label="Add" type="button" onClick={() => addContact(user.id ? user.id : undefined)}/>
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
};

export default UserList;