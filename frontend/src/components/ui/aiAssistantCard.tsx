import { useState } from "react";
import {
  ArrowsInSimple,
  ArrowsOutSimple,
  PaperPlaneRight,
  X,
} from "@phosphor-icons/react";
import { z } from "zod";
import { notifyFailure } from "./toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./form";
import { Input } from "./input";
import AiAssistantLogo from "./aiAssistantLogo";
import AiAssistantHeader from "./aiAssistantHeader";
import AiAssistantRecommendations from "./aiAssistantRecommendations";
import AiAssistantChat from "./aiAssistantChat";
import { useConversationContext } from "@/context/ConversationContext";

const formSchema = z.object({
  message: z.string().min(1, {
    message: "Message cannot be empty.",
  }),
});

const AiAssistantCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullscreen, setIsFullScreen] = useState(false);
  const { isLoading, sendMessage, messages } = useConversationContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("onSubmit", values);
      await sendMessage(values);
      form.reset();
    } catch (error) {
      console.error("Error sending data to backend:", error);
      notifyFailure("Something went wrong");
    }
  };

  const handleSendClick = () => {
    form.handleSubmit(onSubmit)();
  };

  const handleFullScreenExpansion = () => {
    if (isFullscreen) {
      setIsFullScreen(false);
    } else {
      setIsExpanded(false);
      setIsFullScreen(true);
    }
  };

  const handleOnMouseEnter = () => {
    if (!isFullscreen) setIsExpanded(true);
  };

  const handleOnMouseLeave = () => {
    if (!isFullscreen && !isLoading) {
      setIsExpanded(false);
      const currentMessage = form.getValues("message");
      if (!currentMessage.trim()) {
        form.setValue("message", "");
      }
    }
  };

  return (
    <div
      className={`fixed right-0 z-[9999] ${
        isFullscreen
          ? "top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-primary-800/40 backdrop-blur-sm"
          : "flex justify-end items-end w-full bottom-12"
      }`}
    >
      <div
        onClick={handleOnMouseEnter}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        className={`relative bg-white rounded-l-xl shadow-lg transition-all duration-500 ease-in-out overflow-hidden border-2 border-white 
          ${
            isExpanded
              ? "h-fit max-h-[531px] w-96 overflow-hidden border-4 border-gray-200 "
              : "h-16 w-20"
          } 
        ${
          isFullscreen &&
          "w-[80vw] min-h-[90vh] h-full min-w-none border-primary-700 rounded-xl"
        }`}
      >
        <div className="h-full">
          <div className={`${isExpanded || isFullscreen ? "hidden" : ""}`}>
            <AiAssistantLogo />
          </div>
          <div
            className={`${
              isExpanded || isFullscreen
                ? "opacity-100 px-6 py-4 flex flex-col justify-between h-full items-center"
                : "opacity-0 pointer-events-none"
            }
            ${isFullscreen && "py-auto"}`}
          >
            <div className="flex w-full justify-between">
              <button
                className="absolute top-4 left-4 hover:scale-110 transition-transform duration-300"
                onClick={handleFullScreenExpansion}
              >
                {isFullscreen ? (
                  <ArrowsInSimple size={28} weight="duotone" color="#347EB3" />
                ) : (
                  <ArrowsOutSimple size={28} weight="duotone" color="#347EB3" />
                )}
              </button>
              {isFullscreen && (
                <button
                  className="absolute top-4 right-4 hover:scale-110 transition-transform duration-300"
                  onClick={handleFullScreenExpansion}
                >
                  <X size={28} color="#347EB3" />
                </button>
              )}
            </div>
            <AiAssistantHeader
              isExpanded={isExpanded}
              isFullscreen={isFullscreen}
            />
            {messages && messages.length > 0 ? (
              <AiAssistantChat />
            ) : (
              <AiAssistantRecommendations
                isExpanded={isExpanded}
                isFullscreen={isFullscreen}
                form={form}
                onSubmit={onSubmit}
              />
            )}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 max-w-5xl w-full mt-4"
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
                          onSuffixClick={handleSendClick}
                          disabled={isLoading}
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
