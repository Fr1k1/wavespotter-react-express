import characteristicService from "../services/characteristicService.js";

class CharacteristicController {
  async getCharacteristics(req, res) {
    try {
      const response = await characteristicService.getCharacteristics();

      res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new CharacteristicController();
