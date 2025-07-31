import AiAssistantImg from "../../assets/assistant-logo.jpg";

const AiAssistantLogo = ({ className }: { className?: string }) => {
  return (
    <div className="p-1 flex justify-center items-center transition-all duration-500">
      <img
        src={AiAssistantImg}
        alt="wavespotter AI assistant logo"
        className={`transition-all duration-500 w-14 h-14 ${className}`}
      />
    </div>
  );
};

export default AiAssistantLogo;
