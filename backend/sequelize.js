import { Sequelize } from "sequelize";
import "dotenv/config"; //needed for work with env files

const sequelizeConnection = new Sequelize(process.env.SEQUELIZE_URL);

sequelizeConnection
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
    throw error;
  });

export default sequelizeConnection;
