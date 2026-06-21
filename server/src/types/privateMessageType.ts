export interface PrivateMessageAttributes {
    id?: string;
    content: string;
    senderId: string;
    receiverId: string;
    createdAt?: Date;
    updatedAt?: Date;
}