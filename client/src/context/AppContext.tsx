import { createContext } from "react";

export const AppContext = createContext({});

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider = (props: AppContextProviderProps) => {
  const value = {};

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
