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
        <div className='flex flex-col relative  text-white w-[250px] h-[280px] sm:w-[380px]  sm:h-[300px]'>

            {/* Image || Video */}
            <div className='relative sm:h-[225px] w-full h-[150px] cursor-pointer'>
                <div className='w-full h-full'>
                    <Image loading='lazy' alt='thumbnail' className='rounded-md w-full h-full' src={image} />
                </div>
                <span className='absolute right-2 px-1 font-semibold rounded-md text-sm bg-black bottom-3'>{"4:17"}</span>
            </div>

            <div className='flex gap-3 cursor-pointer justify-start items-start mt-3'>
                {/* Channel Logo */}
                <div onClick={navigateToChannel} className='mt-1 w-[40px] rounded-full shrink-0 h-[40px]'>
                    <Image alt='channel-logo' loading='lazy' className='h-full w-full shrink-0 object-cover rounded-full' src={image} />
                </div>

                {/* Video Related Data */}
                <div className='flex gap-1 flex-col w-[(calc(100%-40px))]'>

                    {/* Title of video */}
                    <p className="sm:text-[17px] text-sm font-semibold"> {`${title.substring(0, 100)}..`}</p>


                    <div className='flex gap-0 w-full justify-start items-start flex-col'>
                        {/* Channel Name */}
                        <p onClick={navigateToChannel} className='sm:text-[15px] text-[13px] hover:text-white transition-all duration-150 ease-in-out  text-[white]/[0.8]'>Channel Name</p>

                        {/* View And Time */}
                        <div className='flex justify-start items-center gap-1 text-[white]/[0.7] text-[13px] sm:text-[15px] '>
                            {/* Views */}
                            <p><span>{"50k"}</span> views</p>
                            <p className='text-center bg-[white]/[0.7] h-[2px] w-[2px] rounded-full'></p>
                            {/* Time */}
                            <p><span>{"2 month"}</span> ago</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default HomeCard