"use client";

import { verifyTokenCookie } from "@/helper/verifyToken";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Context = createContext({});

export function AppContext({ children }: { children: React.ReactNode }) {
  const [category, setCategory] = useState("Home");
  const [showSideBar, setShowSideBar] = useState(true);
  const [user, setUser] = useState(null);

  async function getUserByToken() {
    try {
      const data = await axios.get("/api/auth/verify-cookie");
      setUser(data.data.data);
    } catch (error) {
      setUser(null);
      console.log("Error when verifying cookie: ", error);
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
        setShowSideBar,
        setUser,
        user,
      }}
    >
      {children}
    </Context.Provider>
  );
}
