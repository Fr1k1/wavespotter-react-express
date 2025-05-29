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

  async getCountryById(id) {
    try {
      const country = await db.models.Country.findByPk(id, {
        include: [
          {
            model: db.models.City,
            attributes: ["id", "name"],
          },
        ],
      });

      if (!country) {
        return null;
      }

      return {
        id: country.id,
        name: country.name,
        cities: country.cities || [],
      };
    } catch (error) {
      console.error("Error fetching country:", error);
      return null;
    }
  }
}

export default new CountryService();
