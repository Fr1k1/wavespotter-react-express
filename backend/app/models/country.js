export default (sequelize, DataTypes) => {
  const Country = sequelize.define(
    "countries",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
