import db from "./models/index.js";

export const createAssociations = () => {
  //1:N

  db.models.Country.hasMany(db.models.City, {
    foreignKey: { allowNull: false },
  });
  db.models.City.belongsTo(db.models.Country);
  //----------------------------------------------
  db.models.BeachTexture.hasMany(db.models.Beach, {
    foreignKey: { allowNull: false },
  });
  db.models.Beach.belongsTo(db.models.BeachTexture);
  //----------------------------------------------
  db.models.BeachType.hasMany(db.models.Beach, {
    foreignKey: { allowNull: false },
  });
  db.models.Beach.belongsTo(db.models.BeachType);

  //----------------------------------------------

  db.models.BeachDepth.hasMany(db.models.Beach, {
    foreignKey: { allowNull: false },
  });
  db.models.Beach.belongsTo(db.models.BeachDepth);

  //----------------------------------------------

  db.models.Image.belongsTo(db.models.Beach);
  db.models.Beach.hasMany(db.models.Image, {
    foreignKey: { allowNull: false },
  });

  //----------------------------------------------

  db.models.City.hasMany(db.models.Beach, {
    foreignKey: { allowNull: false },
  });
  db.models.Beach.belongsTo(db.models.City);

  //----------------------------------------------
  db.models.User.hasMany(db.models.Review, {
    foreignKey: { allowNull: false },
  });

  db.models.Review.belongsTo(db.models.User);

  //----------------------------------------------
  db.models.Beach.hasMany(db.models.Review, {
    foreignKey: { allowNull: false },
  });

  db.models.Review.belongsTo(db.models.Beach);

  //----------------------------------------------

  db.models.User.hasMany(db.models.Beach, {
    foreignKey: { allowNull: false },
  });

  db.models.Beach.belongsTo(db.models.User);

  //----------------------------------------------

  // M:N relationship setup
  db.models.Characteristic.belongsToMany(db.models.Beach, {
    through: db.models.BeachHasCharacteristic,
  });
  db.models.Beach.belongsToMany(db.models.Characteristic, {
    through: db.models.BeachHasCharacteristic,
  });
};
