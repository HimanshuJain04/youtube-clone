"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SigninPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    userNameOrEmail: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function changeHandler(e: any) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  async function signinHandler() {
    try {
      setLoading(true);

      const response = await axios.post("/api/user/signin", user);
      console.log(response.data);
      router.push("/");
    } catch (err: any) {
      console.log("signup error : ", err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className=" flex w-full justify-center min-h-[calc(100vh-100px)] items-center">
      {loading ? (
        <div>Loading.....</div>
      ) : (
        <div className="flex text-white bg-[white]/[0.09] px-10 py-5 gap-7 rounded-md flex-col justify-start items-center">
          <h2 className="font-bold text-4xl uppercase">Login</h2>

          {/* name */}
          <div className="flex flex-col gap-1">
            <input
              className="outline-none border-b-2 bg-transparent  w-[300px] py-1  font-semibold"
              required
              id="userNameOrEmail"
              name="userNameOrEmail"
              type="text"
              value={user.userNameOrEmail}
              onChange={changeHandler}
              placeholder="Enter your username or email"
            />
          </div>

          {/* password */}
          <div className="flex flex-col gap-1">
            <input
              className="outline-none border-b-2 bg-transparent  w-[300px] py-1  font-semibold"
              required
              id="password"
              name="password"
              type="password"
              value={user.password}
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
