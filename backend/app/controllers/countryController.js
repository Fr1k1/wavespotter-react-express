import countryService from "../services/countryService.js";

class CountryController {
  async getCountries(req, res) {
    try {
      const response = await countryService.getCountries();
      if (response.length == 0) {
        res.status(404).json({ error: `No countries found` });
      } else {
        res.status(200).json(response);
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new CountryController();
