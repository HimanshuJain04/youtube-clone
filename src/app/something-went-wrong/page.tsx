"use client";
import React from "react";
import Image from "next/image";
import imageSrc from "/public/wrong.jpg";

const page = () => {
  return (
    <div className="w-screen h-screen text-white bg-black flex justify-center items-center">
      <div className="relative text-2xl font-semibold flex justify-center items-center flex-col">
        <p className="font-extrabold text-3xl">Oops!</p>
        <p>Something went wrong</p>
        <p className="text-base mt-2 text-white/[0.6]">
          Please check your internet conenction
        </p>
      </div>
    </div>
  );
};

export default page;
