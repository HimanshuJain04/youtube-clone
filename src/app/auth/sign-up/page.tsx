"use client";
import { signup } from "@/actions/auth";
import React from "react";

const page = () => {
  async function signupHandler() {
    const obj = {
      name: "himanshu jain",
      email: "amanjain9551@gmail.com",
      passsword: "himanshuJain",
      userName: "Himanshu Jain",
    };

    const res = await signup(obj);

    console.log(res);
  }

  return (
    <div className="bg-red-600">
      <button className="text-white" onClick={signupHandler}>
        Sign-up
      </button>
    </div>
  );
};

export default page;
