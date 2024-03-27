"use client"

import Image from "next/image"
import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "@/app/context";
import { NavIcons } from "@/constant/Icons";
import IconHover from "@/components/common/IconHover";
import Button from "@/components/Button";
import Link from "next/link";
import { useRouter } from 'next/navigation';


export default function Navbar() {

  const [showSeachBar, setShowSeachBar] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { setShowSideBar, showSideBar } = useContext(Context);
  const { push } = useRouter();

  const { user } = useContext(Context)

  return (
    <div className="w-full flex sticky mb-3 top-0 z-10 bg-black justify-center items-start overflow-hidden">
      <div className="text-white flex items-center justify-between pt-2 pb-5 h-[60px] w-full px-5">

        {/* Logo and Hamburger */}
        <div className={`justify-center gap-5 items-center flex`}>
          <IconHover Icon={NavIcons.RxHamburgerMenu} handler={() => { setShowSideBar(!showSideBar) }} />

          <Link href="/" className="cursor-pointer select-none flex relative justify-center items-center">
            <Image src={NavIcons.ytLogo} alt="youtube-logo" className="h-[25px] w-auto object-contain" />
            <p className="lg:block hidden font-bold  text-[20px]">
              YouTube
            </p>
          </Link>
        </div>

        {/* SearchBar and Mic */}
        <div className={` flex justify-center h-full items-center gap-3`}>

          {/* searchBar */}
          <div className="flex flex-row h-[40px] group justify-center items-center rounded-full w-full">

            <div className="border-[1px] relative w-full group-focus-within:border-blue-500 h-full border-white/[0.2] flex justify-center items-center rounded-l-full">
              <input
                type="text"
                placeholder="Search"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="rounded-l-full w-[600px] outline-none bg-transparent h-full text-lg px-5"
              />

              {
                inputValue.length > 0 &&
                <div className="absolute z-10 right-0 top-[50%] translate-y-[-50%]">
                  <IconHover Icon={NavIcons.RxCross1} css={"text-md p-2 "} handler={() => { setInputValue("") }} />
                </div>

              }
            </div>

            {/* right side of bar */}
            <div
              onClick={() => { console.log(search) }}
              className="sm:flex px-5 h-full border-y-[1px] border-r-[1px] border-white/[0.1] bg-[white]/[0.15] relative cursor-pointer hidden justify-center items-center rounded-r-full"
            >
              <NavIcons.AiOutlineSearch className="text-2xl" />
            </div>

          </div>


          {/* Mic */}
          <IconHover Icon={NavIcons.BsFillMicFill} css={" bg-white/[0.15] hover:bg-white/[0.2]"} handler={() => { console.log("Mic") }} />

        </div>

        {/* Responsive SearchBar for Phone */}
        <div className="flex sm:hidden justify-center h-full items-center">
          <div
            onClick={() => {
              setShowSeachBar(!showSeachBar);
            }}
            className={
              `hover:bg-[white]/[0.15] p-2 rounded-full ` + (showSeachBar ? " hidden" : " flex")
            }
          >
            <NavIcons.AiOutlineSearch className="text-2xl " />
          </div>

        </div>

        {/* CreateVideo ,Notification and Profile  */}
        <div className=" md:flex hidden justify-center text-2xl items-center gap-2">
          {/* Create */}
          <IconHover Icon={NavIcons.AiOutlineVideoCameraAdd} handler={() => push("/video/create")} />
          {/* Bell */}
          <IconHover Icon={NavIcons.FaRegBell} handler={() => push("/notifications")} />
          {/* Profile */}
          {/* <IconHover Icon={NavIcons.VscAccount} handler={() => push("/profile")} /> */}

          {
            !user ?
              <>
                <Button text={"Sign-in"} path={"/auth/sign-in"} />
              </> : (
                <>
                  <div className="text-sm w-[40px] h-[40px] cursor-pointer rounded-full overflow-hidden">
                    <Image
                      src={user.profileImage}
                      width={40}
                      height={40}
                      className="rounded-full object-contain"
                      alt="User-profile"
                    />
                  </div>
                </>
              )
          }
        </div>
      </div>
    </div>
  );
}
