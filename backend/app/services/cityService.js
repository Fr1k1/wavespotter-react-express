import db from "../models/index.js";

class CityService {
  async getCities() {
    try {
      const cities = await db.models.City.findAll({});
      return cities;
    } catch (error) {
      return [];
    }
  }

  async getCitiesByCountryId(id) {
    try {
      //find all required because find by pk will only return one item
      const cities = await db.models.City.findAll({
        where: { countryId: id },
      });
      return cities;
    } catch (error) {
      return [];
    }
  }
}

export default new CityService();
