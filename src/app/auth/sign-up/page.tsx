"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Context } from "@/app/context";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const { user } = useContext(Context);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userName: "",
    name: "",
  });

  const [loading, setLoading] = useState(false);

  function changeHandler(e: any) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function signupHandler() {
    try {
      setLoading(true);

      const response = await axios.post("/api/auth/signup", formData);
      toast.success("Signup successfully!");
      router.push("/auth/sign-in");
    } catch (err: any) {
      toast.error("Signup failed!");
      toast.error(err?.response?.data?.message);
      console.log("signup error : ", err?.response?.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className=" flex w-full justify-center min-h-[calc(100vh-100px)] items-center">
      {loading ? (
        <div className="text-white">Loading.....</div>
      ) : (
        <div className="flex text-white bg-[white]/[0.09] px-10 py-5 gap-7 rounded-md flex-col justify-start items-center">
          <h2 className="font-bold text-4xl uppercase">Signup</h2>

          {/* name */}
          <div className="flex flex-col gap-1">
            <input
              className="outline-none px-2 border-b-2 bg-transparent  w-[300px] py-1  font-semibold"
              required
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={changeHandler}
              placeholder="Enter your name"
            />
          </div>
          {/* username */}
          <div className="flex flex-col gap-1">
            <input
              className="outline-none px-2 border-b-2 bg-transparent  w-[300px] py-1  font-semibold"
              required
              id="userName"
              name="userName"
              type="text"
              value={formData.userName}
              onChange={changeHandler}
              placeholder="Enter your username"
            />
          </div>

          {/* email */}
          <div className="flex flex-col gap-1">
            <input
              className="outline-none px-2 border-b-2 bg-transparent  w-[300px] py-1  font-semibold"
              required
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={changeHandler}
              placeholder="Enter your email address"
            />
          </div>

          {/* password */}
          <div className="flex flex-col gap-1">
            <input
              className="outline-none px-2 border-b-2 bg-transparent  w-[300px] py-1  font-semibold"
              required
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={changeHandler}
              placeholder="Enter your password"
            />
          </div>

          {/* button */}
          <div className="mt-5 w-full">
            <button
              className=" bg-blue-600 border-2 transition-all duration-300 ease-in-out border-blue-600 hover:bg-transparent w-full font-semibold text-white rounded-md py-2 px-10"
              onClick={signupHandler}
            >
              Signup
            </button>
          </div>

          {/* link for login page */}
          <div className="flex justify-center mt-5 items-center w-full flex-col gap-2">
            <p>Account already exist</p>
            <Link
              className="text-blue-500 text-sm font-semibold hover:underline"
              href="/auth/sign-in"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
