import { Message } from "@/types/Message";
import { format } from "date-fns";
import { FC } from "react";
import MarkdownContent from "./markdownContent";

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: FC<MessageBubbleProps> = ({ message }) => {
  return (
    <div
      className={`flex items-start gap-3 mb-6 ${
        message.isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div
        className={`max-w-2xl px-4 py-3 rounded-2xl shadow-sm ${
          message.isUser
            ? "bg-primary-700 text-white rounded-tr-md"
            : "bg-white text-gray-800 rounded-tl-md border border-gray-200"
        }`}
      >
        <div className={message.isUser ? "text-gray-100" : "text-gray-800"}>
          <MarkdownContent content={message.content} />
        </div>

        {message.timestamp && (
          <p
            className={`text-xs mt-2 ${
              message.isUser ? "text-gray-200" : "text-gray-400"
            }`}
          >
            {format(new Date(message.timestamp), "HH:mm")}
          </p>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
