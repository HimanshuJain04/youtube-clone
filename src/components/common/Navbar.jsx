"use client"

import Image from "next/image"
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "@/app/context";
import { Icons } from "@/constant/Icons";
import IconHover from "@/components/common/IconHover";
import Button from "@/components/buttons/Button";
import Link from "next/link";
import Profile from "@/components/common/Profile";
import Searchbar from "@/components/common/Searchbar";
import { useRouter } from 'next/navigation';


export default function Navbar() {

  const [showSeachBar, setShowSeachBar] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { setShowSideBar, showSideBar } = useContext(Context);
  const { push } = useRouter();
  const { user } = useContext(Context);


  return (
    <div className="w-full flex sticky mb-3 top-0 z-10 bg-black justify-center items-start ">
      <div className="text-white relative flex items-center justify-between pt-2 pb-5 h-[60px] w-full px-5">
        <>
          {/* Logo and Hamburger */}
          <div className={`justify-center shrink-0 gap-5 items-center flex`}>
            <IconHover Icon={Icons.RxHamburgerMenu} handler={() => { setShowSideBar(!showSideBar) }} />

            <Link href="/" className="cursor-pointer select-none flex relative justify-center items-center">
              <Image src={Icons.ytLogo} alt="youtube-logo" className="h-[25px] w-auto object-contain" />
              <p className="lg:block hidden font-bold  text-[20px]">
                YouTube
              </p>
            </Link>
          </div>

          {/* SearchBar and Mic */}
          <div className={`md:flex relative hidden justify-center h-full items-center gap-3`}>

            {/* searchBar */}
            <div className="flex relative flex-row h-[40px] group justify-center items-center rounded-full w-full">
              <Searchbar inputValue={inputValue} setInputValue={setInputValue} />

              {/* right side of bar */}
              <div
                onClick={() => { push(`/search?value=${inputValue}`) }}
                className="sm:flex px-5 h-full border-y-[1px] border-r-[1px] border-white/[0.1] bg-[white]/[0.15] relative cursor-pointer hidden justify-center items-center rounded-r-full"
              >
                <Icons.AiOutlineSearch className="text-2xl" />
              </div>
            </div>


            {/* Mic */}
            <IconHover Icon={Icons.BsFillMicFill} css={" bg-white/[0.15] hover:bg-white/[0.2]"} handler={() => { console.log("Mic") }} />

          </div>

          {/* Responsive SearchBar for Phone */}
          <div className="flex md:hidden justify-center h-full items-center">

            <div
              onClick={() => {
                setShowSeachBar(!showSeachBar);
              }}
              className={
                `hover:bg-[white]/[0.15] p-2 rounded-full ` + (showSeachBar ? " hidden" : " flex")
              }
            >
              <Icons.AiOutlineSearch className="text-2xl " />
            </div>

            {
              showSeachBar && (
                <div className="flex absolute left-0 top-0 bg-black px-5 mt-1 z-10 flex-row h-[40px] group justify-start items-center rounded-full w-full">

                  <span onClick={() => { setShowSeachBar(false) }} className="text-xl p-1 hover:bg-white/[0.15] rounded-full">
                    <Icons.RxCross1 />
                  </span>

                  <Searchbar inputValue={inputValue} setInputValue={setInputValue} />

                  {/* right side of bar */}
                  <div
                    onClick={() => { push(`/search?value=${inputValue}`) }}
                    className="flex shrink-0 px-5 h-full border-y-[1px] border-r-[1px] border-white/[0.1] bg-[white]/[0.15] relative cursor-pointer justify-center items-center rounded-r-full"
                  >
                    <Icons.AiOutlineSearch className="text-2xl" />
                  </div>

                </div>
              )
            }
          </div>

          {/* CreateVideo ,Notification and Profile  */}
          <div className=" md:flex hidden justify-center text-2xl items-center gap-2">
            {/* Create */}
            <IconHover Icon={Icons.AiOutlineVideoCameraAdd} handler={() => push("/video/create")} />
            {/* Bell */}
            <IconHover Icon={Icons.FaRegBell} handler={() => push("/notifications")} />
            {/* Profile */}
            {/* <IconHover Icon={Icons.VscAccount} handler={() => push("/profile")} /> */}

            {
              !user ?
                <>
                  <Button text={"Sign-in"} path={"/auth/sign-in"} />
                </> : (
                  <>
                    <Profile />
                  </>
                )
            }
          </div>
        </>
      </div>
    </div>
  );
}
