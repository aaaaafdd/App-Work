import {PrivateMessage, RoomMessage} from '../models/relations'

export function socketRoom(socket: any, io: any) {
    socket.on('join_room', (roomId: string, roomName?: string) => { 
        socket.join(roomId);
        io.emit('room_created', roomId);
    });

    socket.on('leave_room', (roomId: string, userId: number) => { 
        socket.leave(roomId);
    });

    socket.on('created_room', () => {
        io.emit('room_created')
    })

    socket.on('send_message', async (messageData: {
        roomId: string;
        content: string;
        senderId: string;
        isPrivate: boolean; 
        receiverId?: string;
        username?: string;
      }) => {
        const { roomId, content, senderId, isPrivate, receiverId, username } = messageData;
      
        if (isPrivate) {
          await PrivateMessage.create({ senderId, receiverId: receiverId!, content });
        } else {
          await RoomMessage.create({ senderId, roomId, content });
        }
      
        io.to(roomId).emit('receive_message', {
          content,
          username,
          senderId,
          isPrivate, 
        });
      });

}