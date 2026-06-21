import { ReactNode } from "react";

export default interface UserCardProps {
    id?: string;
    username: string;
    status: 'online' | 'offline'
    children?: ReactNode
}