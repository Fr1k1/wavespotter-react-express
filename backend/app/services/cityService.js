import db from "../models/index.js";

class CityService {
  //treba mi za mapu na homepage
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
      //tu treba find all je findByPk vraca samo jedan item!!
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
