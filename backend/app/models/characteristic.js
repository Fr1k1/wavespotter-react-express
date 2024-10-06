export default (sequelize, DataTypes) => {
  const Characteristic = sequelize.define(
    "characteristics",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: { type: DataTypes.STRING(45), allowNull: false, unique: true },
      icon_url: { type: DataTypes.STRING(200), allowNull: false, unique: true },
    },
    {
      underscored: true,
      timestamps: false,
      freezeTableName: true,
    }
  );

  return Characteristic;
};
