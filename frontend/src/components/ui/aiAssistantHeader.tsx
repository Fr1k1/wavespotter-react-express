import AiAssistantLogo from "./aiAssistantLogo";

interface AiAssistantHeaderProps {
  isExpanded: boolean;
  isFullscreen: boolean;
}

const AiAssistantHeader = ({
  isExpanded,
  isFullscreen,
}: AiAssistantHeaderProps) => {
  return (
    <div
      className={`flex flex-col gap-0 items-center pt-1 ${
        isFullscreen && "md:pt-20"
      }`}
    >
      <AiAssistantLogo
        className={`${
          isFullscreen ? "w-24 h-24 lg:w-36 lg:h-36" : isExpanded && "w-14 h-14"
        }`}
      />
      <div className={`flex flex-col gap-1 ${isFullscreen && "md:my-4"}`}>
        <p
          className={`${
            isFullscreen
              ? "hidden md:block text-base lg:text-lg text-gray-600 text-center"
              : "hidden"
          }`}
        >
          Hi, I am Waive
        </p>
        <h4
          className={`animate-in font-semibold text-center text-gray-800  leading-5 ${
            isFullscreen
              ? "text-xl max-w-80 md:my-2 md:text-2xl lg:text-3xl "
              : "text-lg max-w-60"
          }`}
        >
          Describe the beach of your dreams.
        </h4>
        <p
          className={`text-gray-600 text-center mb-2 ${
            isFullscreen ? "text-base lg:text-lg" : "text-sm"
          }`}
        >
          I will find it for you.
        </p>
      </div>
    </div>
  );
};

export default AiAssistantHeader;
