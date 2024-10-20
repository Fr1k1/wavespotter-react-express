export default (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "images",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      path: {
        allowNull: false,
        type: DataTypes.TEXT,
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
