export default interface ContactAttributes {
    id?: string;
    id_user: string;
    id_contact: string;
    contactUser?: {
        username: string,
        status: string,
    }
    createdAt?: Date;
    updatedAt?: Date;
}