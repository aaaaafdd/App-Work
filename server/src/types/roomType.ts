export default interface RoomAttributes {
    id?: string;
    id_admin: string;
    roomName: string;
    description: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}