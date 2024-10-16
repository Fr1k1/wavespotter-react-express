import db from "../models/index.js";

class BeachService {
  async addBeach(beachData) {
    try {
      const beach = await db.models.Beach.create(beachData);
      return beach;
    } catch (error) {
      console.log("Error is", error);
      return [];
    }
  }
}

export default new BeachService();
