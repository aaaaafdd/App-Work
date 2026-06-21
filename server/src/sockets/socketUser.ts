export function socketUser(socket: any, io: any) {
    socket.on('add_contact', () => {
        io.emit('update_contact')
    })

    socket.on('register_user', (userId: string) => {
        console.log('Register user escuchado', userId)
        socket.userId = userId;
        socket.join(userId); 
    });
}