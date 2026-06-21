export default interface UserAttributes {
    id?: string;
    username: string;
    email: string;
    status?: 'offline' | 'online',
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}