export default (sequelize, DataTypes) => {
  const Beach_Characteristic = sequelize.define(
    "beach_has_characteristics",
    {},
    {
      underscored: true,
      timestamps: false,
      freezeTableName: true,
    }
  );

  return Beach_Characteristic;
};
