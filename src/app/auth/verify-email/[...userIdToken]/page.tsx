"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function VerifyTokenPage() {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  async function verifyToken() {
    try {
      setLoading(true);
      const res = await axios.patch("/api/auth/verify-token", data);
      console.log(res);
      setIsVerified(true);
      toast.success("Email Verified!");
    } catch (err) {
      toast.error("Email Verification Failed");
      setIsVerified(false);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = window.location.pathname.split("/").at(-1);
    const id = window.location.pathname.split("/").at(-2);

    setData({
      verificationToken: token,
      userId: id,
    });
  }, []);

  useEffect(() => {
    if (data) {
      verifyToken();
    }
  }, [data]);

  return (
    <div className="w-full min-h-[calc(100vh-100px)] flex justify-center items-center">
      <div className="flex flex-col gap-10 justify-center p-5 items-center rounded-lg  bg-[white]/[0.1]">
        <h2 className="text-4xl font-semibold text-white">
          Email Verification
        </h2>

        <div className="text-white">
          {loading ? (
            <>Loading...</>
          ) : (
            <div>
              {isVerified ? (
                <>
                  <div className="flex flex-col justify-center items-center gap-9">
                    <p className="text-orange-400 text-2xl font-semibold">
                      Email Verified
                    </p>
                    <div className="text-white text-sm flex-col font-semibold justify-center items-center flex">
                      <p>Go to login page</p>
                      <Link
                        className="text-blue-500  hover:underline"
                        href="/auth/sign-in"
                      >
                        Login
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-red-500 font-semibold text-lg">
                    Email Verification failed!
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
