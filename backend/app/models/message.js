export default (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "messages",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      isUser: {
        type: DataTypes.BOOLEAN(),
        allowNull: false,
      },
    },
    {
      underscored: true,
      timestamps: true,
      freezeTableName: true,
    }
  );

  return Review;
};
