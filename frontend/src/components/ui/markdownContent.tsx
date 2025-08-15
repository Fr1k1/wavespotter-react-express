import { FC } from "react";

interface MarkdownContentProps {
  content: string;
}

const MarkdownContent: FC<MarkdownContentProps> = ({ content }) => {
  const formatText = (text: string) => {
    const formatted = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    return formatted;
  };

  const lines = content.split("\n");

  return (
    <div className="space-y-2">
      {lines.map((line, index) => {
        const trimmedLine = line.trim();

        if (!trimmedLine) {
          return <div key={index} className="h-2"></div>;
        }

        if (trimmedLine.startsWith("## ")) {
          const headerText = trimmedLine.replace("## ", "");
          return (
            <h2 key={index} className="text-lg font-bold mt-4 mb-2 first:mt-0">
              {headerText}
            </h2>
          );
        }

        if (trimmedLine.startsWith("# ")) {
          const headerText = trimmedLine.replace("# ", "");
          return (
            <h1 key={index} className="text-xl font-bold mt-4 mb-2 first:mt-0">
              {headerText}
            </h1>
          );
        }

        if (trimmedLine.startsWith("*   ") || trimmedLine.startsWith("* ")) {
          const bulletText = trimmedLine.replace(/^\*\s+/, "");
          return (
            <div key={index} className="flex items-start gap-2 ml-4">
              <span className="text-gray-600 mt-1">•</span>
              <div
                className="text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatText(bulletText) }}
              />
            </div>
          );
        }

        if (trimmedLine.startsWith("---")) {
          return <hr key={index} className="my-4 border-gray-200" />;
        }

        return (
          <div
            key={index}
            className="text-sm leading-relaxed mb-2"
            dangerouslySetInnerHTML={{ __html: formatText(trimmedLine) }}
          />
        );
      })}
    </div>
  );
};

export default MarkdownContent;
