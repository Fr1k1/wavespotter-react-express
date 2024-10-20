export default (sequelize, DataTypes) => {
  const Country = sequelize.define(
    "countries",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    },
    {
      underscored: true,
      timestamps: false,
      freezeTableName: true,
    }
  );

  return Country;
};
