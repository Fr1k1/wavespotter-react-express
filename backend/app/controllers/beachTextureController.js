import beachTextureService from "../services/beachTextureService.js";

class BeachTextureController {
  async getBeachTextures(req, res) {
    try {
      const response = await beachTextureService.getBeachTextures();

      res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new BeachTextureController();
