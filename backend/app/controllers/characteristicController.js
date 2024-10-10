import characteristicService from "../services/characteristicService.js";

class CharacteristicController {
  async getCharacteristics(req, res) {
    try {
      const response = await characteristicService.getCharacteristics();
      if (response.length == 0) {
        res.status(404).json({ error: `No characteristics found` });
      } else {
        res.status(200).json(response);
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new CharacteristicController();
