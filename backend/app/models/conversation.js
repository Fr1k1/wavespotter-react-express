export default (sequelize, DataTypes) => {
  const Conversation = sequelize.define(
    "conversations",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      underscored: true,
      timestamps: true,
      freezeTableName: true,
    }
  );

  return Conversation;
};
