import conversationService from "../services/conversationService.js";

class ConversationController {
  async createConversation(req, res) {
    try {
      const { title } = req.body;
      const newConv = await conversationService.addConversation({ title });

      res.status(201).json({
        success: true,
        message: "New conversation created successfully",
        data: newConv,
      });
    } catch (error) {
      console.error("Error in createConversation controller:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while creating conversation",
        error: error.message,
      });
    }
  }

  async getConversation(req, res) {
    try {
      const { id } = req.params;

      const conversation = await conversationService.getConversation(id);

      if (!conversation) {
        return res.status(404).json({
          success: false,
          message: "Conversation not found",
        });
      }

      res.json({
        success: true,
        data: conversation,
      });
    } catch (error) {
      console.error("Error in getConversation controller:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching conversation",
        error: error.message,
      });
    }
  }
}

export default new ConversationController();
