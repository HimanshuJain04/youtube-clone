"use client";

import { createContext, useState } from "react";

export const Context = createContext({});

export function AppContext({ children }: { children: React.ReactNode }) {
  
  const [category, setCategory] = useState("Home");
  const [showSideBar, setShowSideBar] = useState(true);
  const [search, setSearch] = useState("");

  return (
    <Context.Provider
      value={{
        category,
        setCategory,
        showSideBar,
        setShowSideBar,
        search,
        setSearch,
      }}
    >
      {children}
    </Context.Provider>
  );
}
