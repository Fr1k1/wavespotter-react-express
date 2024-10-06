export default (sequelize, DataTypes) => {
  const BeachDepth = sequelize.define(
    "beach_depths",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      description: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: true,
      },
    },
    {
      underscored: true,
      timestamps: false,
      freezeTableName: true,
    }
  );

  return BeachDepth;
};
