import beachService from "../services/beachService.js";

class BeachController {
  async addBeach(req, res) {
    try {
      const newBeach = await beachService.addBeach(req.body);
      res.status(201).json({
        success: true,
        message: "Beach added successfully",
        data: newBeach,
      });
    } catch (error) {
      console.error("Error in addBeach controller:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while adding the beach",
        error: error.message,
      });
    }
  }
}

export default new BeachController();
