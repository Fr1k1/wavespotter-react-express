import { mockAIResponses } from "@/lib/mockData";
import { Message, MessageDto } from "@/types/Message";
import { useState } from "react";

const useConversation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (text: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  };

  const sendMessage = async ({ message }: MessageDto) => {
    if (!message.trim()) return;

    console.log("sendMessage");
    setIsLoading(true);
    try {
      addMessage(message, true);
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 + Math.random() * 2000)
      );
      const payload = {
        message,
      };
      console.log("payload", payload);

      // const { data } = await sendMessage(payload);
      // console.log("data", data);

      const aiResponse =
        mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)];

      addMessage(aiResponse, false);
    } catch (error: unknown) {
      console.error("Error in sending message:", error);
      addMessage("Sorry, I encountered an error. Please try again.", false);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return { isLoading, clearMessages, sendMessage, messages };
};

export default useConversation;
