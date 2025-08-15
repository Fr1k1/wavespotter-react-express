import { Message } from "@/types/Message";
import { format } from "date-fns";

const MessageBubble = ({ message }: { message: Message }) => {
  return (
    <div
      className={`flex items-start gap-3 mb-4 ${
        message.isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          message.isUser
            ? "bg-primary-700 text-white rounded-br-none"
            : "bg-gray-100 text-gray-800 rounded-bl-none"
        }`}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
        {message.timestamp && (
          <p
            className={`text-xs mt-1 ${
              message.isUser ? "text-primary-100" : "text-gray-500"
            }`}
          >
            {format(new Date(message.timestamp), "HH:mm:ss")}
          </p>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
