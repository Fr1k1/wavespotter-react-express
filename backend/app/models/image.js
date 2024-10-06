export default (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "images",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {
      underscored: true,
      timestamps: false,
      freezeTableName: true,
    }
  );

  return Image;
};
