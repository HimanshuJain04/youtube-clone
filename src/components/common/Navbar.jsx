"use client"

import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import ytLogo from "../assets/yt.png";
import { AiOutlineSearch, AiOutlineVideoCameraAdd } from "react-icons/ai";
import { CiBellOn } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import { BsFillMicFill } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "../Context";
import { GiHidden } from "react-icons/gi";
import Image from "next"


function Navbar() {
  const [showSeachBar, setShowSeachBar] = useState(false);
  const { setShowSideBar, setSearch, search, showSideBar } = useContext(Context);

  function getUserQuery(event) {
    setSearch(event.target.value);
  }


  return (
    <div className="w-full  text-white h-[60px] flex justify-center  items-center">
      <nav className="flex bg-black justify-between h-full  items-center w-full px-2 sm:px-7">

        {/* Logo and Hamburger */}
        <div className={`justify-center items-center ` + (!showSeachBar ? " flex" : " hidden")}>
          <div onClick={() => { setShowSideBar(!showSideBar) }} className="p-3  rounded-full transition-all duration-200 ease-in-out hover:bg-[white]/[0.2] cursor-pointer">
            <RxHamburgerMenu className="text-xl " />
          </div>
          <div className="cursor-pointer select-none h-[65px] flex relative justify-center items-center">
            <Image src={ytLogo} className="h-full " />
            <p className="lg:block hidden font-bold absolute text-xl left-16">
              YouTube
            </p>
          </div>
        </div>

        {/* SearchBar and Mic */}
        <div className={`sm:flex  justify-center w-full sm:w-[75vw] md:w-[50vw] items-center gap-5 ` + (showSeachBar ? " flex" : " hidden")}>

          {/* SearchBar */}

          <div className="flex items-center w-full justify-between h-[40px]">

            {/* SearchBar */}
            <div className="flex justify-center w-full group relative items-center h-full pl-5 focus-within:border-purple-900 border-0 focus-within:border-[1px] rounded-full  sm:rounded-r-none">
              <div className="group-focus-within:flex hidden ">
                <AiOutlineSearch className=" text-2xl " />
              </div>
              <input
                onChange={getUserQuery}
                className="rounded-full sm:rounded-r-none focus:border-none border-2 h-full outline-none border-[white]/[0.15]  bg-black text-base pl-3 pr-10 w-full"
                placeholder="Search"
                type="text"
                value={search}
              ></input>

              {/* Cross Button */}
              <div className="absolute cursor-pointer right-2 group-focus-within:block hidden hover:bg-[white]/[0.15] rounded-full p-2">
                <RxCross1 />
              </div>
            </div>

            {/* Right Side button  */}
            <div onClick={() => { console.log(search) }} className="sm:flex px-5 bg-[white]/[0.15] relative group  cursor-pointer  h-full hidden justify-center items-center rounded-r-full">
              <AiOutlineSearch className="text-2xl" />
              <span className="absolute -bottom-14 group-hover:flex hidden text-sm font-semibold p-2 rounded-md bg-[white]/[0.3] text-white">
                Search
              </span>
            </div>
          </div>


          {/* Mic */}
          <div className="cursor-pointer text-xl group relative p-3 bg-[white]/[0.15]  hover:bg-[white]/[0.25] rounded-full transition-all duration-200 ease-in-out">
            <BsFillMicFill />
            <span className="absolute  -bottom-14 -left-[50%]  group-hover:block hidden text-sm font-semibold p-2 rounded-md bg-[white]/[0.3] text-white">
              <p className="w-[150px]">Search with your voice</p>
            </span>
          </div>
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
            <AiOutlineSearch className="text-2xl " />
          </div>

        </div>

        {/* CreateVideo ,Notification and Profile  */}
        <div className=" md:flex hidden justify-center text-2xl items-center gap-2">
          {/* Create */}
          <div className="cursor-pointer group relative p-3 hover:bg-[white]/[0.15] rounded-full transition-all duration-200 ease-in-out">
            <AiOutlineVideoCameraAdd />
            <span className="absolute -bottom-14  group-hover:flex hidden text-sm font-semibold p-2 rounded-md bg-[white]/[0.3] text-white">
              Create
            </span>
          </div>
          {/* Bell */}
          <div className="cursor-pointer group relative p-3 hover:bg-[white]/[0.15] rounded-full transition-all duration-200 ease-in-out">
            <CiBellOn />
            <span className="absolute -bottom-14 -left-[50%] group-hover:flex hidden text-sm font-semibold p-2 rounded-md bg-[white]/[0.3] text-white">
              Notifications
            </span>
          </div>
          {/* Profile */}
          <div className="cursor-pointer p-3">
            <VscAccount />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;