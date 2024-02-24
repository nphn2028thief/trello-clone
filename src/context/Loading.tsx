"use client";

import { createContext, useState, ReactNode } from "react";

import OverlayLoading from "@/components/OverlayLoading";

export interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setIsLoading: () => {},
});

const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const setIsLoading = (value: boolean) => setLoading(value);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading ? <OverlayLoading /> : null}
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
