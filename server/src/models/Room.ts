import { DataTypes, Model, Association } from 'sequelize';
import sequelize from '../database/database';
import RoomAttributes from '../types/roomType';
import User from './User'

class Room extends Model<RoomAttributes> implements RoomAttributes {
    public id!: string;
    public id_admin!: string;
    public roomName!: string;
    public description!: string | null;
    public readonly createdAt!: Date;
    public readonly updateAt!: Date;

    public addUser!: (user: User) => Promise<void>;
    public getUsers!: (options?: any) => Promise<User[]>;
  
    public static associations: {
      users: Association<Room, User>;
    };
}

Room.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    id_admin: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    roomName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'room',
    timestamps: true,
    }
);

export default Room;