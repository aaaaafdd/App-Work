import { DataTypes, Model} from 'sequelize';
import sequelize from '../database/database';
import ContactAttributes from '../types/contactType';

class Contact extends Model<ContactAttributes> implements ContactAttributes {
    public id!: string;
    public id_user!: string;
    public id_contact!: string;
    public contactUser?: { username: string; status: string; } | undefined;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Contact.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        id_user: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        id_contact: {
            type: DataTypes.UUID,
            allowNull: false,
        }
    }, 
    {
        sequelize,
        modelName: 'contact',
        timestamps: true,
    }
)

export default Contact;