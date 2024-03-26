"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [loading, setLoading] = useState(false);

  function changeHandler(e: any) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  async function signup() {
    try {
      setLoading(true);

      const response = await axios.post("/api/user/signup", user);
      console.log(response.data);
      router.push("/login");
    } catch (err: any) {
      console.log("signup error : ", err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className=" flex w-full justify-center items-center">
      {loading ? (
        <div>Loading.....</div>
      ) : (
        <div className="flex w-10/12 bg-[white]/[0.1] py-20 rounded-md flex-col mt-20 justify-start items-center gap-8">
          <h2 className="font-semibold text-4xl">Signup</h2>
          <hr />

          {/* username */}
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="font-semibold">
              Username
            </label>
            <input
              className="outline-none w-[300px] p-2 rounded-md font-semibold text-[black]/[0.6]"
              required
              id="username"
              name="username"
              type="text"
              value={user.username}
              onChange={changeHandler}
              placeholder="Enter your username"
            />
          </div>

          {/* email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email Address
            </label>
            <input
              className="outline-none p-2  w-[300px] rounded-md font-semibold text-[black]/[0.6]"
              required
              id="email"
              name="email"
              type="email"
              value={user.email}
              onChange={changeHandler}
              placeholder="Enter your email address"
            />
          </div>

          {/* password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              className="outline-none  w-[300px] p-2 rounded-md font-semibold text-[black]/[0.6]"
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
          <div>
            <button
              className=" bg-blue-600 hover:font-semibold text-white rounded-md py-2 px-10"
              onClick={signup}
            >
              Signup
            </button>
          </div>

          {/* link for login page */}
          <Link
            className="text-blue-500 text-sm focus:underline "
            href="/login"
          >
            Visit login page
          </Link>
        </div>
      )}
    </div>
  );
}
