"use client";
import React from "react";
import { Icons } from "@/constant/Icons";
import Link from "next/link";

const menu = [
  {
    icon: <Icons.GoHomeFill />,
    path: "/",
  },
  {
    icon: <Icons.MdOutlineSubscriptions />,
    path: "/subscription",
  },
  {
    icon: <Icons.IoMdAdd />,
    path: "/video/create",
  },
  {
    icon: <Icons.GoVideo />,
    path: "/my-videos",
  },
  {
    icon: <Icons.VscAccount />,
    path: "/profile",
  },
];

const BottomNavbar = () => {
  return (
    <div className="w-full sm:hidden block fixed bg-black bottom-0 z-20 ">
      <div className="flex w-full justify-between px-2 py-2 text-2xl text-white">
        {menu.map((item) => (
          <Link href={item?.path} key={item.path + item.icon}>
            <div className="hover:bg-white/[0.15] rounded-full p-2">
              <span>{item?.icon}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNavbar;
