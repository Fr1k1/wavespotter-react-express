import db from "../models/index.js";

class CountryService {
  async getCountries() {
    try {
      const countries = await db.models.Country.findAll({});
      return countries;
    } catch (error) {
      return [];
    }
  }
}

export default new CountryService();
