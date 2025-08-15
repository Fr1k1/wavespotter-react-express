import axios from "axios";
import conversationService from "../services/conversationService.js";
import messageService from "../services/messageService.js";
import aiService from "../services/aiService.js";

class MessageController {
  async addMessage(req, res) {
    try {
      const { body } = req;

      if (!body.content?.trim()) {
        return res.status(400).json({
          success: false,
          message: "Message content is required",
        });
      }

      let conversationId = body.conversationId;

      if (!conversationId) {
        const createdConversation = await conversationService.addConversation({
          title: body.title || "New Conversation",
        });
        conversationId = createdConversation.id;
      }

      const userMessage = await messageService.addMessage({
        conversationId,
        content: body.content.trim(),
        isUser: true,
      });

      const aiContent = await aiService.generateResponse(body.content);

      const aiMessage = await messageService.addMessage({
        conversationId,
        content: aiContent,
        isUser: false,
      });

      res.status(201).json({
        success: true,
        message: "Message added successfully",
        data: {
          conversationId,
          userMessage,
          aiMessage,
        },
      });
    } catch (error) {
      console.error("Error in addMessage controller:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while adding the message",
        error: error.message,
      });
    }
  }
}

export default new MessageController();
