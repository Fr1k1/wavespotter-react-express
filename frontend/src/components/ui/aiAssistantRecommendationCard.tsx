import { cn } from "@/lib/utils";
import { ReactElement, useState, useEffect } from "react";

const AiAssistantRecommendationCard = ({
  icon,
  text,
  delay = 300,
  isVisible = true,
  className,
}: {
  icon: ReactElement;
  text: string;
  delay?: number;
  isVisible?: boolean;
  className?: string;
}) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setShowText(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowText(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, isVisible]);

  return (
    <button
      className={cn(
        "border-2 border-gray-200 px-3 py-3 shadow-sm bg-gray-50 flex flex-row items-center gap-2 justify-between rounded-md w-88 min-h-[60px] sm:min-h-none sm:h-[60px] hover:bg-gray-200 transition-colors",
        className
      )}
    >
      <div>{icon}</div>
      <p
        className={`text-sm w-full text-gray-800 text-center leading-4 transition-opacity duration-500 ${
          showText ? "opacity-100" : "opacity-0"
        }`}
      >
        {text}
      </p>
    </button>
  );
};

export default AiAssistantRecommendationCard;
