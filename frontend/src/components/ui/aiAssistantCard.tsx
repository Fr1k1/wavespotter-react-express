import { useState } from "react";
import {
  ArrowsOutSimple,
  BeachBall,
  Island,
  PaperPlaneRight,
  Waves,
} from "@phosphor-icons/react";
import { z } from "zod";
import { notifyFailure } from "./toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./form";
import { Input } from "./input";
import AiAssistantLogo from "./aiAssistantLogo";
import AiAssistantRecommendationCard from "./aiAssistantRecommendationCard";

const formSchema = z.object({
  message: z.string().min(1, {
    message: "Message cannot be empty.",
  }),
});

const AiAssistantCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("onSubmit", values);
    } catch (error) {
      console.error("Error sending data to backend:", error);
      notifyFailure("Something went wrong");
    }
  };

  return (
    <div className="fixed bottom-12 right-0 z-50 flex justify-end items-end">
      <div
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className={`bg-white rounded-l-xl shadow-lg transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded ? "h-fit max-h-[531px] w-96 overflow-hidden" : "h-16 w-20"
        }`}
      >
        <div className="h-full">
          <div className={`${isExpanded ? "hidden" : ""}`}>
            <AiAssistantLogo />
          </div>
          <div
            className={`${
              isExpanded
                ? "opacity-100 px-6 py-4 flex flex-col justify-between h-full"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <button className="absolute top-4 left-4 hover:scale-110 transition-transform duration-300">
              <ArrowsOutSimple size={28} weight="duotone" color="#347EB3" />
            </button>
            <div className="flex flex-col gap-1 items-center pt-1">
              <AiAssistantLogo />
              <h4 className="text-lg leading-5 font-semibold text-center max-w-60 text-gray-800">
                Describe the beach of your dreams.
              </h4>
              <p className="text-sm text-gray-600 text-center mb-2">
                I will find it for you.
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full my-12 overflow-hidden max-h-[336px]">
              <AiAssistantRecommendationCard
                text="A river beach with free parking near Kupa in Karlovac with rich wildlife"
                icon={<Waves size={32} weight="fill" color="#347EB3" />}
                isVisible={isExpanded}
              />
              <AiAssistantRecommendationCard
                text="All beaches in Makarska, Croatia"
                icon={<Island size={32} weight="fill" color="#347EB3" />}
                isVisible={isExpanded}
              />
              <AiAssistantRecommendationCard
                text="All pet friendly beaches with sand and volleyball in Croatia"
                icon={<BeachBall size={32} weight="fill" color="#347EB3" />}
                isVisible={isExpanded}
              />
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Ask me anything..."
                          {...field}
                          suffixIcon={
                            <PaperPlaneRight size={24} color="#347EB3" />
                          }
                          onSuffixClick={() => form.handleSubmit(onSubmit)()}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAssistantCard;
