import { createContext, ReactNode, useContext, useState } from "react";
import Loader from "../loader";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

interface LoadingProviderProps {
  children: ReactNode;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const value = { isLoading, setIsLoading };
  return (
    <LoadingContext.Provider value={value}>
      {children}
      {isLoading && <Loader />}
    </LoadingContext.Provider>
  );
}

export function useLoading(): LoadingContextType {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used in LoadingProvider");
  }
  return context;
}
