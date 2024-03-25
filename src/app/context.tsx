"use client";

import { createContext, useState } from "react";

export const Context = createContext({});

export function AppContext({ children }: { children: React.ReactNode }) {
  const [category, setCategory] = useState("Home");
  const [showSideBar, setShowSideBar] = useState(true);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  return (
    <Context.Provider
      value={{
        category,
        setCategory,
        showSideBar,
        setShowSideBar,
        search,
        setUser,
        user,
        setSearch,
      }}
    >
      {children}
    </Context.Provider>
  );
}
