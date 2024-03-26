"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function VerifyTokenPage() {
  const [isVerified, setIsVerified] = useState(false);
  const [token, setToken] = useState("");

  async function verifyToken() {
    try {
      await axios.post("api/user/verifyToken", { token });
      setIsVerified(true);
    } catch (err) {
      toast.error("Email Verification Failed");
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    console.log("TOken: ", urlToken);
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyToken();
    }
  }, [token]);

  return (
    <div>
      <div className="flex flex-col gap-14 justify-center items-center min-h-screen p-10 bg-[white]/[0.2]">
        <h2 className="text-4xl font-semibold">Verifiy Email</h2>
        {isVerified ? (
          <div className="flex flex-col gap-14 ">
            <h4 className="bg-orange-500 text-black font-semibold p-5">
              Verified Successfull
            </h4>
            <Link
              href="/login"
              className="text-blue-500 text-sm focus:underline "
            >
              Login
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-14 ">
            <h4 className="bg-orange-500 text-black font-semibold p-5">
              Verification.....
            </h4>
          </div>
        )}
      </div>
    </div>
  );
}
