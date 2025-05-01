export default (sequelize, DataTypes) => {
  const Beach = sequelize.define(
    "beaches",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },

      name: { type: DataTypes.STRING(80), allowNull: false, unique: true },

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },

      address: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },

      approved: { type: DataTypes.BOOLEAN(), allowNull: false },

      best_time_to_visit: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: false,
      },

      local_wildlife: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
      },

      restaurants_and_bars_nearby: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
      },
      working_hours: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: false,
      },
    },
    {
      underscored: true,
      timestamps: false,
      freezeTableName: true,
    }
  );

  return Beach;
};
