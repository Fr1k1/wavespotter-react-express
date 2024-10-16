import beachService from "../services/beachService.js";

class BeachController {
  async addBeach(req, res) {
    try {
      const response = await beachService.addBeach(req.body);
      if (response.length == 0) {
        res.status(400).json({ error: "Error inserting beach" });
      } else {
        console.log(response.toJSON());
      }
    } catch {
      res.status(500).send("Internal server error");
    }
  }
}

export default new BeachController();
