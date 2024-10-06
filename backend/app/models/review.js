export default (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "reviews",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: true,
      },

      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      underscored: true,
      timestamps: false,
      freezeTableName: true,
    }
  );

  return Review;
};
