import { useState } from "react";
import { sendConversationMessage } from "@/api/messages";
import { Message, MessageDto } from "@/types/Message";

const useConversation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<number | null>(null);

  const addMessage = (content: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  };

  const sendMessage = async ({ content }: MessageDto) => {
    if (!content.trim()) return;

    addMessage(content, true);
    setIsLoading(true);

    try {
      const payload = {
        content,
        conversationId,
      };

      const response = await sendConversationMessage(payload);

      if (response.success) {
        if (!conversationId) {
          setConversationId(response.data.conversationId);
        }
        addMessage(response.data.aiMessage.content, false);
      } else {
        addMessage("Sorry, I encountered an error. Please try again.", false);
      }
    } catch (error: unknown) {
      console.error("Error in sending message:", error);
      addMessage("Sorry, I encountered an error. Please try again.", false);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    setConversationId(null);
  };

  return { isLoading, clearMessages, sendMessage, messages };
};

export default useConversation;
