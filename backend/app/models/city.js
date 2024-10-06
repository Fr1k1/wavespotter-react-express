export default (sequelize, DataTypes) => {
  const City = sequelize.define(
    "cities",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: { type: DataTypes.STRING(70), allowNull: false, unique: true },
      latitude: { type: DataTypes.DECIMAL(10, 8), allowNull: false }, //precision and scale in decimal type
      longitude: { type: DataTypes.DECIMAL(10, 8), allowNull: false },
    },
    {
      underscored: true,
      timestamps: false,
      freezeTableName: true,
    }
  );

  return City;
};
