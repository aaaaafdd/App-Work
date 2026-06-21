export default interface MessageAttributes {
    content: string;
    receivedUserRoom: {
        id: string;
        username: string;
    }
    receivedUser?: {
        id: string;
        username: string;
    }
    isCurrentUser?: boolean;
}