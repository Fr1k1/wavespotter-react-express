import db from "../models/index.js";

class ConversationService {
  async addConversation(conversationData) {
    try {
      const conversation = await db.models.Conversation.create({
        title: conversationData?.title || "New Conversation",
      });
      return conversation;
    } catch (error) {
      console.error("Error in addConversation service:", error);
      throw error;
    }
  }

  async getConversation(conversationId) {
    try {
      const conversation = await db.models.Conversation.findByPk(
        conversationId,
        {
          include: [
            {
              model: db.models.Message,
              as: "messages",
              order: [["created_at", "ASC"]],
            },
          ],
        }
      );
      return conversation;
    } catch (error) {
      console.error("Error in getConversation service:", error);
      throw error;
    }
  }

  async conversationExists(conversationId) {
    try {
      const conversation = await db.models.Conversation.findByPk(
        conversationId
      );
      return !!conversation;
    } catch (error) {
      console.error("Error checking conversation existence:", error);
      return false;
    }
  }
}

export default new ConversationService();
