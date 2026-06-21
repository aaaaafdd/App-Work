import {Socket} from 'socket.io'
import { socketRoom } from './socketRoom';
import { socketUser } from './socketUser';

export function socketConnect(io: any){
    io.on('connection', (socket: Socket) => {        
        socketRoom(socket, io);
        socketUser(socket, io)
        socket.on('disconnect', () => {
            console.log('User disconnected', socket.id)
        })
    })
}