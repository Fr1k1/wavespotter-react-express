import { Message, MessageDto } from "@/types/Message";
import { ReactNode } from "react";

export interface ConversationProviderProps {
  children: ReactNode;
}

export interface ConversationContextType {
  isLoading: boolean;
  messages: Message[];
  sendMessage: (payload: MessageDto) => Promise<void>;
  clearMessages: () => void;
}

export interface ConversationDto {
  title?: string;
}
