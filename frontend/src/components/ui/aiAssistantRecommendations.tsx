import { UseFormReturn } from "react-hook-form";
import AiAssistantRecommendationCard from "./aiAssistantRecommendationCard";
import { BeachBall, Island, Waves } from "@phosphor-icons/react";
import { z } from "zod";

interface AiAssistantRecommendationsProps {
  isExpanded: boolean;
  isFullscreen: boolean;
  form: UseFormReturn<FormData>;
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
}

const formSchema = z.object({
  content: z.string().min(1, {
    message: "Message cannot be empty.",
  }),
});

type FormData = z.infer<typeof formSchema>;

const AiAssistantRecommendations = ({
  isExpanded,
  isFullscreen,
  form,
  onSubmit,
}: AiAssistantRecommendationsProps) => {
  const handleRecommendationClick = (text: string) => {
    form.setValue("content", text);
    form.handleSubmit(onSubmit);
  };

  return (
    <div
      className={`grid gap-2 w-full md:my-auto overflow-hidden max-h-[336px] ${
        isFullscreen ? "grid-cols-1 sm:grid-cols-2 max-w-5xl" : "grid-cols-1"
      }`}
    >
      <AiAssistantRecommendationCard
        text="A river beach with free parking near Kupa in Karlovac with rich wildlife"
        icon={<Waves size={32} weight="fill" color="#347EB3" />}
        isVisible={isExpanded || isFullscreen}
        onClick={handleRecommendationClick}
      />
      <AiAssistantRecommendationCard
        text="All beaches in Makarska, Croatia"
        icon={<Island size={32} weight="fill" color="#347EB3" />}
        isVisible={isExpanded || isFullscreen}
        onClick={handleRecommendationClick}
      />
      <AiAssistantRecommendationCard
        text="All pet friendly beaches with sand and volleyball in Croatia"
        icon={<BeachBall size={32} weight="fill" color="#347EB3" />}
        isVisible={isExpanded || isFullscreen}
        onClick={handleRecommendationClick}
      />
      {isFullscreen && (
        <>
          <AiAssistantRecommendationCard
            text="Secluded cove with crystal clear water and snorkeling opportunities"
            icon={<Waves size={32} weight="fill" color="#347EB3" />}
            isVisible={isExpanded || isFullscreen}
            className="hidden sm:flex"
            onClick={handleRecommendationClick}
          />
          <AiAssistantRecommendationCard
            text="Family-friendly beach with shallow water and playgrounds nearby"
            icon={<Island size={32} weight="fill" color="#347EB3" />}
            isVisible={isExpanded || isFullscreen}
            className="hidden sm:flex"
            onClick={handleRecommendationClick}
          />
          <AiAssistantRecommendationCard
            text="Sunset beach with beachside cafes and romantic atmosphere"
            icon={<BeachBall size={32} weight="fill" color="#347EB3" />}
            isVisible={isExpanded || isFullscreen}
            className="hidden sm:flex"
            onClick={handleRecommendationClick}
          />
        </>
      )}
    </div>
  );
};

export default AiAssistantRecommendations;
