import db from "../models/index.js";

class BeachTextureService {
  async getBeachTextures() {
    try {
      const beachTextures = await db.models.BeachTexture.findAll({});
      return beachTextures;
    } catch (error) {
      return [];
    }
  }
}

export default new BeachTextureService();
