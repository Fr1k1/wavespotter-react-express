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

  async getBeachByType(req, res) {
    try {
      const { id } = req.params;
      const response = await beachService.getBeachesByType(id);
      if (response.length == 0) {
        res.status(404).json({ error: `No beaches found for provided type` });
      } else {
        res.status(200).json(response);
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getBeachById(req, res) {
    try {
      const { id } = req.params;
      const response = await beachService.getBeachById(id);
      if (!response) {
        return res
          .status(404)
          .json({ error: `No beaches found for provided id` });
      } else {
        return res.status(200).json(response);
      }
    } catch (error) {
      console.error("Error fetching beach by id:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getBeachImages(req, res) {
    try {
      const { id } = req.params;
      const response = await beachService.getBeachImages(id);

      return res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching beach images by id:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getBeaches(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 12;
      const approved = parseInt(req.query.approved);
      const response = await beachService.getBeaches(page, pageSize, approved);

      res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateBeach(req, res) {
    try {
      const { id } = req.params;
      const updatedBeach = await beachService.updateBeach(id, req.body);
      res.status(200).json({
        success: true,
        message: "Beach updated successfully",
        data: updatedBeach,
      });
    } catch (error) {
      console.error("Error in updateBeach controller:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while updating the beach",
        error: error.message,
      });
    }
  }

  async getBeachGeoDataById(req, res) {
    try {
      const { id } = req.params;
      const response = await beachService.getBeachGeoDataById(id);
      if (!response) {
        return res
          .status(404)
          .json({ error: `No beaches geodata for provided id` });
      } else {
        return res.status(200).json(response);
      }
    } catch (error) {
      console.error("Error fetching beach geodata by id:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new BeachController();
