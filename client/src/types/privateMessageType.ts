export default interface PrivateMessageAttributes {
    content: string;
    receivedUser: {
        id: string;
        username: string;
    }
    sentUser?: {
        id: string;
        username: string;
    }
    isCurrentUser?: boolean;
}