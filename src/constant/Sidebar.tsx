"use client";

import { GoHomeFill, GoHistory, GoVideo, GoReport } from "react-icons/go";
import {
  MdOutlineVideoLibrary,
  MdOutlinedFlag,
  MdOutlineWatchLater,
  MdOutlineSubscriptions,
} from "react-icons/md";
import { BiLike, BiHelpCircle } from "react-icons/bi";
import { TfiCup } from "react-icons/tfi";
import { ImYoutube2 } from "react-icons/im";
import { TbBrandYoutubeKids } from "react-icons/tb";
import { AiOutlineBulb } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { GiHanger } from "react-icons/gi";
import {
  SiYoutubegaming,
  SiYoutubemusic,
  SiYoutubestudio,
} from "react-icons/si";
import { HiSignal } from "react-icons/hi2";
import { PiMusicNoteBold, PiFilmSlate } from "react-icons/pi";
import { BsFillFilePlayFill, BsFire, BsNewspaper } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LiaShoppingBagSolid } from "react-icons/lia";

export const categories = [
  [
    { name: "Home", icon: <GoHomeFill /> },
    { name: "Shorts", icon: <BsFillFilePlayFill /> },
    { name: "Subscriptions", icon: <MdOutlineSubscriptions /> },
  ],
  [
    { name: "Library", icon: <MdOutlineVideoLibrary /> },
    { name: "History", icon: <GoHistory /> },
    { name: "Your videos", icon: <GoVideo /> },
    { name: "Watch Later", icon: <MdOutlineWatchLater /> },
    { name: "Like", icon: <BiLike /> },
    { name: "Show More", icon: <IoIosArrowDown /> },
  ],
  [
    { name: "Trending", icon: <BsFire /> },
    { name: "Shopping", icon: <LiaShoppingBagSolid /> },
    { name: "Music", icon: <PiMusicNoteBold /> },
    { name: "Films", icon: <PiFilmSlate /> },
    { name: "Live", icon: <HiSignal /> },
    { name: "Gaming", icon: <SiYoutubegaming /> },
    { name: "News", icon: <BsNewspaper /> },
    { name: "Sport", icon: <TfiCup /> },
    { name: "Learning", icon: <AiOutlineBulb /> },
    { name: "Fashion & beauty", icon: <GiHanger /> },
  ],
  [
    { name: "Youtube Premium", icon: <ImYoutube2 className="text-red-500" /> },
    {
      name: "Youtube Studio",
      icon: <SiYoutubestudio className="text-red-500" />,
    },
    {
      name: "Youtube Music",
      icon: <SiYoutubemusic className="text-red-500" />,
    },
    {
      name: "Youtube Kids",
      icon: <TbBrandYoutubeKids className="text-red-500" />,
    },
  ],
  [
    { name: "Setting", icon: <FiSettings /> },
    { name: "Report History", icon: <MdOutlinedFlag /> },
    { name: " Help", icon: <BiHelpCircle /> },
    { name: "Send Feedback", icon: <GoReport /> },
  ],
];
