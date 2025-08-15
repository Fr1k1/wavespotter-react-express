import db from "../models/index.js";

class MessageService {
  async addMessage(data) {
    try {
      const { conversationId, isUser, content } = data;

      if (!conversationId || typeof isUser !== "boolean" || !content?.trim()) {
        throw new Error("Missing required fields");
      }

      await db.models.Conversation.update(
        { updated_at: new Date() },
        { where: { id: conversationId } }
      );

      const message = await db.models.Message.create({
        conversationId,
        content: content.trim(),
        isUser,
      });

      return message;
    } catch (error) {
      console.error("Error in addMessage service:", error);
      throw error;
    }
  }

  async getMessagesByConversationId(conversationId) {
    try {
      return await db.models.Message.findAll({
        where: { conversationId },
        order: [["created_at", "ASC"]],
      });
    } catch (error) {
      console.error("Error getting messages:", error);
      throw error;
    }
  }
}

export default new MessageService();
