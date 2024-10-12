import db from "../models/index.js";

class BeachDepthService {
  async getBeachDepths() {
    try {
      const beach_depths = await db.models.BeachDepth.findAll({});
      return beach_depths;
    } catch (error) {
      return [];
    }
  }
}

export default new BeachDepthService();
