import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type DriverApplicationContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const DriverApplicationContext = createContext<DriverApplicationContextValue | null>(null);

export function DriverApplicationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return (
    <DriverApplicationContext.Provider value={value}>
      {children}
    </DriverApplicationContext.Provider>
  );
}

export function useDriverApplication() {
  const ctx = useContext(DriverApplicationContext);
  if (!ctx) {
    throw new Error("useDriverApplication must be used within DriverApplicationProvider");
  }
  return ctx;
}
