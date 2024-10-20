import db from "../models/index.js";

class BeachTextureService {
  async getBeachTextures() {
    try {
      const beach_textures = await db.models.BeachTexture.findAll({});
      return beach_textures;
    } catch (error) {
      return [];
    }
  }
}

export default new BeachTextureService();
