export default interface RoomMessageAttributes {
    id?: string,
    content: string,
    senderId: string,
    roomId: string,
    createdAt?: Date;
    updatedAt?: Date;
}