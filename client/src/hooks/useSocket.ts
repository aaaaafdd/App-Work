import {useState, useEffect} from 'react'
import { io, Socket } from "socket.io-client";

export default function useSocket(){
    const [socket, setSocket] = useState<Socket | null>(null)
    const [token, setToken] = useState<string | null>('')
    const url = import.meta.env.VITE_REACT_URL_SOCKET

    useEffect(() => {
        setToken(localStorage.getItem('token'))
        const newSocket = io(url, {
            auth: {
                token
            }
        })
        setSocket(newSocket)

        return () => {
            newSocket.disconnect();
        }
    }, [token, url])

    return { socket }
}