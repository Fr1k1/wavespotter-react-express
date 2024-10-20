import db from "../models/index.js";

class BeachTypeService {
  async getBeachTypes() {
    try {
      const beach_types = await db.models.BeachType.findAll({});
      return beach_types;
    } catch (error) {
      return [];
    }
  }
}

export default new BeachTypeService();
