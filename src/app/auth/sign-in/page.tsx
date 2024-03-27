"use client";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "@/app/context";

export default function SigninPage() {
  const router = useRouter();
  const { user, setUser } = useContext(Context);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const [formData, setFormData] = useState({
    userNameOrEmail: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function changeHandler(e: any) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function signinHandler() {
    try {
      setLoading(true);

      const response = await axios.post("/api/auth/signin", formData);
      toast.success("Login successfully!");
      setUser(response.data.data);
      router.push("/");
    } catch (err: any) {
      toast.error("Login failed!");
      toast.error(err?.respose?.data?.message);
      console.log("Login error : ", err);
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
          <h2 className="font-bold text-4xl uppercase">Login</h2>

          {/* email or username */}
          <div className="flex flex-col gap-1">
            <input
              className="outline-none border-b-2 px-2 bg-transparent  w-[300px] py-1  font-semibold"
              required
              id="userNameOrEmail"
              name="userNameOrEmail"
              type="text"
              value={formData.userNameOrEmail}
              onChange={changeHandler}
              placeholder="Enter your username or email"
            />
          </div>

          {/* password */}
          <div className="flex flex-col gap-1">
            <input
              className="outline-none border-b-2 px-2 bg-transparent  w-[300px] py-1  font-semibold"
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
              onClick={signinHandler}
            >
              Login
            </button>
          </div>

          {/* link for login page */}
          <div className="flex justify-center mt-5 items-center w-full flex-col gap-2">
            <p>Create account</p>
            <Link
              className="text-blue-500 text-sm font-semibold hover:underline"
              href="/auth/sign-up"
            >
              Signup
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
