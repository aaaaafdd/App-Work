import { DataTypes, Model} from 'sequelize';
import sequelize from '../database/database';
import { PrivateMessageAttributes } from '../types/privateMessageType';


class PrivateMessage extends Model<PrivateMessageAttributes> implements PrivateMessageAttributes {
    public id!: string;
    public content!: string;
    public senderId!: string;
    public receiverId!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

PrivateMessage.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senderId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    receiverId: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    sequelize,
    timestamps: true,
    modelName: 'private_messages'
})

export default PrivateMessage;