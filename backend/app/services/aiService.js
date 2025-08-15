import axios from "axios";

class AIService {
  async generateResponse(userMessage) {
    try {
      const aiRequestPayload = {
        messages: [{ role: "user", content: userMessage }],
      };

      const response = await axios.post(
        `${process.env.AI_URL}/api/v1/chat`,
        aiRequestPayload,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 30000,
        }
      );

      return response.data?.content || "Sorry, I couldn't generate a response.";
    } catch (error) {
      console.error("AI Service Error:", error);
      return "I'm having trouble responding right now. Please try again.";
    }
  }
}

export default new AIService();
