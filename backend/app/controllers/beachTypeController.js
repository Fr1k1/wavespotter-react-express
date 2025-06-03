import beachTypeService from "../services/beachTypeService.js";

class BeachTypeController {
  async getBeachTypes(req, res) {
    try {
      const response = await beachTypeService.getBeachTypes();

      res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new BeachTypeController();
