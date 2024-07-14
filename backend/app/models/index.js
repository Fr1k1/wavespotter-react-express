import { Sequelize } from "sequelize";
import User from "./user.js";
import sequelizeConnection from "../../sequelize.js";

const db = {};

db.sequelize = sequelizeConnection;
db.models = {};

db.models.User = User(sequelizeConnection, Sequelize.DataTypes);

export default db;
