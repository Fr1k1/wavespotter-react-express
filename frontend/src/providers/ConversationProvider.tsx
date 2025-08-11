import { ConversationContext } from "@/context/ConversationContext";
import useConversation from "@/hooks/useConversation";
import { ConversationProviderProps } from "@/types/Conversation";

export const ConversationProvider = ({
  children,
}: ConversationProviderProps) => {
  const conversation = useConversation();

  return (
    <ConversationContext.Provider value={conversation}>
      {children}
    </ConversationContext.Provider>
  );
};
