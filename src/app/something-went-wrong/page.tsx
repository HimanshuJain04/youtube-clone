"use client";
import React from "react";
import Image from "next/image";
import imageSrc from "/public/wrong.jpg";

const page = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="relative bg-gray-100 p-1">
        <Image
          src={imageSrc.src}
          alt="something went wrong"
          className="object-contain"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default page;
