import db from "../models/index.js";

class CityService {
  //treba mi za mapu na homepage
  async getCities() {
    try {
      const Cities = await db.models.City.findAll({});
      return Cities;
    } catch (error) {
      return [];
    }
  }

  async getCitiesByCountryId(id) {
    try {
      const Cities = await db.models.City.findByPk(id);
      return Cities;
    } catch (error) {
      return [];
    }
  }
}

export default new CityService();
