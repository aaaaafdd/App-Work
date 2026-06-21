import sequelize from '../database/database'

export async function connectToDatabase(): Promise<void>{
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Error to connect with database', error);
      }
}

export async function closeDatabaseConnection(): Promise<void>{
    try {
        await sequelize.close();
        console.log('Connection closed successfully.');
      } catch (error) {
        console.error('Error to close connection with database', error);
      }
}


