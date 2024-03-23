"use client"

import React from 'react';
import image from "/public/fake.jpeg";
import Image from "next/image"

function HomeCard() {
    const title = "Title tile title Title tile title Title Title tile title Title tile title Title tile title Title tile title ";

    function navigateToChannel() {
        console.log("go to Channel page ");
    }

    // Iss div pr hover hone pr video play krna hai
    return (
        <div className='flex flex-col relative  text-white w-[250px] h-[280px] sm:w-[325px]  sm:h-[320px]'>

            {/* Image || Video */}
            <div className='relative cursor-pointer'>
                <div className='sm:h-[200px] w-[100%] h-[150px]'>
                    <Image loading='lazy' alt='thumbnail' className='rounded-md w-full h-full' src={image} />
                </div>
                <span className='absolute right-2 px-1 font-semibold rounded-md text-sm bg-black bottom-3'>{"4:17"}</span>
            </div>

            <div className='flex gap-3 cursor-pointer justify-start items-start mt-3'>
                {/* Channel Logo */}
                <div onClick={navigateToChannel} className='mt-1 max-w-[36px] max-h-[36px]'>
                    <Image alt='channel-logo' loading='lazy' className='min-w-[36px] min-h-[36px] bg-contain rounded-full' src={image} />
                </div>

                {/* Video Related Data */}
                <div className='flex flex-col w-[(calc(100%-40px))]'>

                    {/* Title of video */}
                    <p className="sm:text-[17px] text-sm font-semibold"> {`${title.substring(0, 78)}..`}</p>

                    {/* Channel Name */}
                    <p onClick={navigateToChannel} className='sm:text-[15px] text-[13px] hover:text-white transition-all duration-150 ease-in-out  text-[white]/[0.8]'>Channel Name</p>

                    {/* View And Time */}
                    <div className='flex justify-start items-center text-[white]/[0.7] text-[13px] sm:text-[15px] '>
                        {/* Views */}
                        <p><span>{"50k"}</span> views</p>
                        <p className='text-center'>-</p>
                        {/* Time */}
                        <p><span>{"2 month"}</span> ago</p>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default HomeCard