import db from "../models/index.js";

class UserService {
  async getUsers() {
    try {
      const users = await db.models.User.findAll();
      return users;
    } catch (error) {
      return [];
    }
  }
}

export default new UserService();
