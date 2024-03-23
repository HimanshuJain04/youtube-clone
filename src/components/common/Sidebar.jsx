"use client"

import React from "react";
import { categories } from "@/constant/Sidebar";
import { useContext } from "react";
import { Context } from "@/app/context";

function SideBar() {
    const { category, setCategory, showSideBar } = useContext(Context);

    return (
        <div className={`overflow-y-auto text-white  z-10 top-[60px]  fixed scroll-smooth  h-full bg-black px-2 pb-10 scrollbar-none transition-all duration-200 ease-in-out hover:scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[white]/[0.5] ` + (showSideBar ? " w-[230px] block" : " w-[100px] md:block hidden")}>
            {
                categories.map((set, index) => (

                    <div key={index} className={`border-b-2 border-[white]/[0.3] py-5 ` + (showSideBar ? " " : (index < 1 ? " " : " hidden"))}>
                        {set.map((item) => (
                            <div
                                onClick={() => {
                                    setCategory(item.name);
                                }}
                                key={item.name}
                                className={`flex  select-none  px-2 justify-start  transition-all duration-150 ease-in-out py-2 cursor-pointer hover:bg-[white]/[0.15] rounded-lg ` + (category === item.name ? " bg-[white]/[0.15] " : " ") + (showSideBar ? "  text-[15px] flex-row items-start gap-5" : " my-5 text-xs flex-col items-center gap-1")}
                            >
                                <div className="font-bold text-2xl">{item.icon}</div>
                                <p className=" ">{item.name}</p>
                            </div>
                        ))}
                    </div>
                ))}
            <div className={`py-10 flex-col justify-start items-center font-bold ` + (showSideBar ? " text-lg" : " text-sm")}>
                <p className="pb-5">Created By Himanshu jain</p>
                <p className="">Contact : 9630695842</p>
            </div>
        </div>
    );
}

export default SideBar;
