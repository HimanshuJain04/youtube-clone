"use client";

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Context = createContext({});

export function AppContext({ children }: { children: React.ReactNode }) {
  const [category, setCategory] = useState("Home");
  const [showSideBar, setShowSideBar] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getUserByToken() {
    setLoading(true);
    try {
      const data = await axios.get("/api/auth/verify-cookie");
      setUser(data.data.data);
      
    } catch (error) {
      setUser(null);
      console.log("Error when verifying cookie: ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserByToken();
  }, []);

  return (
    <Context.Provider
      value={{
        category,
        setCategory,
        showSideBar,
        loading,
        setLoading,
        setShowSideBar,
        setUser,
        user,
      }}
    >
      {children}
    </Context.Provider>
  );
}
