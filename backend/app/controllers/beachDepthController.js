import beachDepthService from "../services/beachDepthService.js";

class BeachDepthController {
  async getBeachDepths(req, res) {
    try {
      const response = await beachDepthService.getBeachDepths();

      res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new BeachDepthController();
