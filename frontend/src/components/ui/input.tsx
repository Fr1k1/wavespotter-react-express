import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  iconClassName?: string;
  onSuffixClick?: () => void;
  suffixClickable?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      prefixIcon,
      suffixIcon,
      iconClassName,
      onSuffixClick,
      suffixClickable = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className="relative flex items-center">
        {prefixIcon && (
          <div
            className={cn(
              "absolute left-3 text-gray-500 pointer-events-none z-10 flex items-center justify-center",
              iconClassName
            )}
          >
            {prefixIcon}
          </div>
        )}

        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-white file:text-sm file:font-medium placeholder-gray-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            prefixIcon && "pl-10",
            suffixIcon && "pr-10",
            className
          )}
          ref={ref}
          {...props}
        />

        {suffixIcon && (
          <div
            className={cn(
              "absolute right-3 text-gray-500 flex items-center justify-center",
              suffixClickable || onSuffixClick
                ? "cursor-pointer hover:text-gray-700 transition-colors"
                : "pointer-events-none",
              iconClassName
            )}
            onClick={onSuffixClick}
          >
            {suffixIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };
