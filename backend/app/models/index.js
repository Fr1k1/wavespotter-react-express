import { Sequelize } from "sequelize";
import User from "./user.js";
import Country from "./country.js";
import BeachDepth from "./beach_depth.js";
import BeachTexture from "./beach_texture.js";
import BeachType from "./beach_type.js";
import Characteristic from "./characteristic.js";
import sequelizeConnection from "../../sequelize.js";
import Image from "./image.js";
import City from "./city.js";
import Beach from "./beach.js";
import Review from "./review.js";
import BeachHasCharacteristic from "./beach_has_characteristic.js";

const db = {};

db.sequelize = sequelizeConnection;
db.models = {};

db.models.User = User(sequelizeConnection, Sequelize.DataTypes);
db.models.Country = Country(sequelizeConnection, Sequelize.DataTypes);
db.models.BeachDepth = BeachDepth(sequelizeConnection, Sequelize.DataTypes);
db.models.BeachTexture = BeachTexture(sequelizeConnection, Sequelize.DataTypes);
db.models.BeachType = BeachType(sequelizeConnection, Sequelize.DataTypes);
db.models.Characteristic = Characteristic(
  sequelizeConnection,
  Sequelize.DataTypes
);

//tables that have secondary keys
db.models.City = City(sequelizeConnection, Sequelize.DataTypes);
db.models.Beach = Beach(sequelizeConnection, Sequelize.DataTypes);
db.models.Image = Image(sequelizeConnection, Sequelize.DataTypes);
db.models.Review = Review(sequelizeConnection, Sequelize.DataTypes);
db.models.BeachHasCharacteristic = BeachHasCharacteristic(
  sequelizeConnection,
  Sequelize.DataTypes
);

export default db;
