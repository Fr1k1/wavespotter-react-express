import { useConversationContext } from "@/context/ConversationContext";
import MessageBubble from "./messageBubble";
import TypingIndicator from "./typingIndicator";

const AiAssistantChat = () => {
  const { isLoading, messages } = useConversationContext();

  if (!messages || messages.length === 0) {
    return;
  }

  return (
    <div className="flex-1 overflow-y-auto w-full 2xl:max-w-5xl p-4 space-y-2">
      {messages.map((message, index) => (
        <MessageBubble key={message.id || index} message={message} />
      ))}
      {isLoading && <TypingIndicator />}
    </div>
  );
};

export default AiAssistantChat;
