import { createContext, useContext } from "react";
import { ConversationContextType } from "@/types/Conversation";

export const ConversationContext =
  createContext<ConversationContextType | null>(null);

export const useConversationContext = () => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error(
      "useConversationContext must be used within a ConversationProvider"
    );
  }
  return context;
};
