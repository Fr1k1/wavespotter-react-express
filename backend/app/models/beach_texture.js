export default (sequelize, DataTypes) => {
  const BeachTexture = sequelize.define(
    "beach_textures",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: { type: DataTypes.STRING(30), allowNull: false, unique: true },
      img_url: { type: DataTypes.STRING(200), allowNull: false, unique: true },
    },
    {
      underscored: true,
      timestamps: false,
      freezeTableName: true,
    }
  );

  return BeachTexture;
};
