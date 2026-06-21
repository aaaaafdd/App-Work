import  RoomMessageAttributes from '../types/roomMessageType';
import { DataTypes, Model} from 'sequelize';
import sequelize from '../database/database';

class RoomMessage extends Model<RoomMessageAttributes> implements RoomMessageAttributes {
    public id!: string;
    public content!: string;
    public senderId!: string;
    public roomId!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

RoomMessage.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    senderId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    roomId: {
        type: DataTypes.UUID,
        allowNull: false,
    }
}, {
    sequelize,
    timestamps: true,
    modelName: "room_messages"
})

export default RoomMessage