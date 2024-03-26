"use client";

import { signin } from "@/actions/auth";
import { Context } from "@/app/context";
import React, { useContext } from "react";

const Page = () => {
  const { setUser } = useContext(Context);

  async function signinHandler() {
    const obj = {
      userNameOrEmail: "amanjain9551@gmail.com",
      password: "himanshuJain",
    };
    const res = await signin(obj);
    setUser(res);
  }

  return (
    <div>
      <button onClick={signinHandler} className="text-white">
        Login
      </button>
    </div>
  );
};

export default Page;
