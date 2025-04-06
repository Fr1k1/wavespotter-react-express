import cityService from "../services/cityService.js";

class CityController {
  async getCities(req, res) {
    try {
      const response = await cityService.getCities();
      if (response.length == 0) {
        res.status(404).json({ error: `No cities found` });
      } else {
        res.status(200).json(response);
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getCitiesByCountryId(req, res) {
    try {
      const { id } = req.params;
      const response = await cityService.getCitiesByCountryId(id);

      res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new CityController();
