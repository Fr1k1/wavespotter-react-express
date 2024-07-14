import service from "../services/userService.js";

class UserController {
  async getUsers(req, res) {
    const response = await service.getUsers();
    if (response == undefined) {
      res.status(404).json({ error: "No users found" });
    } else {
      res.status(200).json(response);
    }
  }
}

export default new UserController();
