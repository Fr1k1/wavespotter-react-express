import db from "../models/index.js";

class CharacteristicService {
  async getCharacteristics() {
    try {
      const characteristics = await db.models.Characteristic.findAll({});
      return characteristics;
    } catch (error) {
      return [];
    }
  }
}

export default new CharacteristicService();
