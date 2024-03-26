"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SigninPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  function changeHandler(e: any) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  async function login() {
    try {
      setLoading(true);

      const response = await axios.post("/api/user/login", user);
      console.log(response.data);
      router.push("/profile");
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
        <div>Loading...</div>
      ) : (
        <div className="flex w-10/12 bg-[white]/[0.1] py-20 rounded-md flex-col mt-20 justify-start items-center gap-8">
          <h2 className="font-semibold text-4xl">Login</h2>
          <hr />

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
              onClick={login}
            >
              Login
            </button>
          </div>

          {/* link for singup page */}
          <Link
            className="text-blue-500 text-sm focus:underline "
            href="/signup"
          >
            Visit signup page
          </Link>
        </div>
      )}
    </div>
  );
}
