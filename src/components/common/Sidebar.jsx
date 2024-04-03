"use client"

import React, { useState } from "react";
import { HomeCategory, videosCategory, settingCategory } from "@/constant/Sidebar";
import { useContext } from "react";
import { Context } from "@/app/context";
import SidebarCard from "@/components/common/SidebarCard";
import { Icons } from "@/constant/Icons";


function SideBar() {

    const { category, showSideBar, user } = useContext(Context);
    const [showLibrary, setShowLibrary] = useState(false)

    return (
        <>
            <div className={` bg-black relative flex justify-start items-center text-white h-screen
         ${showSideBar ? " w-[250px] block " : " w-[80px]  md:block hidden"}`}>

                <div className={`overflow-y-auto scroll-smooth h-[calc(100vh-60px)] ${showSideBar ? "px-3 w-[250px] " : "px-2 w-[80px] "}  top-14  left-0  z-[8] fixed scroll-smooth bg-black transition-all duration-200 ease-in-out`}>

                    <div className={`border-b-2 border-[white]/[0.3] pt-3 pb-5 `}>
                        {HomeCategory.map((item, index) => (

                            <SidebarCard key={index} item={item} />
                        ))}
                    </div>

                    <div className={`border-b-2 border-[white]/[0.3] pt-3 pb-5 ${showSideBar ? "block" : "hidden"} `}>
                        {videosCategory.map((item, index) => (

                            <SidebarCard key={index} item={item} />
                        ))}

                        {/* library */}
                        <div className="flex flex-col gap-1">
                            <div
                                onClick={() => setShowLibrary(!showLibrary)}
                                className={
                                    `flex  select-none justify-start  transition-all duration-150 ease-in-out cursor-pointer hover:bg-[white]/[0.15] rounded-xl ` +
                                    (category === "Library" ? " bg-[white]/[0.15] " : " ") +
                                    (showSideBar
                                        ? "font-normal py-2 px-3 text-base flex-row items-start gap-5"
                                        : "text-[10px] flex-col px-1 mb-2 py-5 items-center gap-1")
                                }
                            >
                                <div className="font-bold text-2xl">
                                    <Icons.MdOutlineVideoLibrary />
                                </div>
                                <p>Library</p>
                            </div>

                            <div className={`pl-5 ${showLibrary ? "block" : "hidden"}  transition-all duration-500 ease-in-out `}>
                                {
                                    user && (
                                        user?.playlists?.map((playlist) => (
                                            <SidebarCard key={playlist.id} item={
                                                {
                                                    name: playlist?.title,
                                                    icon: <Icons.RiPlayList2Fill />,
                                                    path: `/playlist?playlistId=${playlist?.id}`
                                                }
                                            } />

                                        ))
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className={`border-b-2 border-[white]/[0.3] pt-3 pb-5 ${showSideBar ? "block" : "hidden"} `}>
                        {settingCategory.map((item, index) => (
                            <SidebarCard key={index} item={item} />
                        ))}
                    </div>

                    <div className={`py-10 flex-col justify-start items-center font-bold ` + (showSideBar ? " text-lg" : " text-sm")}>
                        <p className="pb-5 text-center">Himanshu jain</p>
                    </div>
                </div>

            </div>
        </>
    );
}

export default SideBar;
