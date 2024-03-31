"use client"

import React from "react";
import { categories } from "@/constant/Sidebar";
import { useContext } from "react";
import { Context } from "@/app/context";
import Link from "next/link";
import { v4 as uuid } from "uuid"

function SideBar() {

    const { category, setCategory, showSideBar } = useContext(Context);

    return (
        <div className={`relative bg-black flex justify-start items-center text-white h-screen
         ${showSideBar ? " w-[300px] block " : " w-[80px]  md:block hidden"}`}>

            <div className={`overflow-y-auto h-[calc(100vh-80px)] ${showSideBar ? "px-3 w-[250px] " : "px-2 w-[80px] "}  top-14  left-0  z-[8] fixed scroll-smooth bg-black transition-all duration-200 ease-in-out`}>
                {
                    categories.map((set, index) => (

                        <div key={index * Math.random()} className={`border-b-2 border-[white]/[0.3] pt-3 pb-5 ` + (showSideBar ? " " : (index < 1 ? " " : " hidden"))}>
                            {set.map((item, index) => (
                                <>
                                    <Link href={item?.path}
                                        onClick={() => {
                                            setCategory(item.name);
                                        }}
                                        key={item.path + index + item.name}
                                        className={`flex  select-none justify-start  transition-all duration-150 ease-in-out cursor-pointer hover:bg-[white]/[0.15] rounded-xl ` + (
                                            category === item.name ? " bg-[white]/[0.15] " : " ") + (showSideBar ? "font-normal py-2 px-3 text-base flex-row items-start gap-5" :
                                                "text-[10px] flex-col px-1 mb-2 py-5 items-center gap-1"
                                            )}
                                    >
                                        <div className="font-bold text-2xl">{item.icon}</div>
                                        <p>{item.name}</p>
                                    </Link>
                                </>

                            ))}
                        </div>
                    ))
                }

                <div className={`py-10 flex-col justify-start items-center font-bold ` + (showSideBar ? " text-lg" : " text-sm")}>
                    <p className="pb-5 text-center">Himanshu jain</p>
                </div>
            </div >

        </div >
    );
}

export default SideBar;
