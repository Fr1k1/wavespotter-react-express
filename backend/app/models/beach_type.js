export default (sequelize, DataTypes) => {
  const BeachType = sequelize.define(
    "beach_types",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: { type: DataTypes.STRING(45), allowNull: false, unique: true },
    },
    {
      underscored: true,
      timestamps: false,
      freezeTableName: true,
    }
  );

  return BeachType;
};
