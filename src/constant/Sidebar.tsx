"use client";

import { GoHomeFill, GoHistory, GoVideo, GoReport } from "react-icons/go";
import {
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

export const HomeCategory = [
  { name: "Home", icon: <GoHomeFill />, path: "/" },
  { name: "Shorts", icon: <BsFillFilePlayFill />, path: "/shorts" },
  {
    name: "Subscriptions",
    icon: <MdOutlineSubscriptions />,
    path: "/subscriptions",
  },
];

export const videosCategory = [
  { name: "History", icon: <GoHistory />, path: "/video/history" },
  { name: "Your videos", icon: <GoVideo />, path: "/my-videos" },
  {
    name: "Watch Later",
    icon: <MdOutlineWatchLater />,
    path: "/video/watch-later",
  },
  { name: "Liked videos", icon: <BiLike />, path: "/video/liked-videos" },
];

export const settingCategory = [
  { name: "Setting", icon: <FiSettings />, path: "/setting" },
  {
    name: "Report History",
    icon: <MdOutlinedFlag />,
    path: "/report",
  },
  { name: " Help", icon: <BiHelpCircle />, path: "/help" },
  { name: "Send Feedback", icon: <GoReport />, path: "/feedback" },
];

// extras

// [
//   {
//     name: "Youtube Premium",
//     icon: <ImYoutube2 className="text-red-500" />,
//     path: "/premium",
//   },
//   {
//     name: "Youtube Studio",
//     icon: <SiYoutubestudio className="text-red-500" />,
//     path: "/studio",
//   },
//   {
//     name: "Youtube Music",
//     icon: <SiYoutubemusic className="text-red-500" />,
//     path: "/youtube-music",
//   },
//   {
//     name: "Youtube Kids",
//     icon: <TbBrandYoutubeKids className="text-red-500" />,
//     path: "/youtube-kids",
//   },
// ],

// [
//   { name: "Trending", icon: <BsFire />, path: "/trending" },
//   { name: "Shopping", icon: <LiaShoppingBagSolid />, path: "/shopping" },
//   { name: "Music", icon: <PiMusicNoteBold />, path: "/music" },
//   { name: "Films", icon: <PiFilmSlate />, path: "/films" },
//   { name: "Live", icon: <HiSignal />, path: "/live" },
//   { name: "Gaming", icon: <SiYoutubegaming />, path: "/gaming" },
//   { name: "News", icon: <BsNewspaper />, path: "/news" },
//   { name: "Sport", icon: <TfiCup />, path: "/sports" },
//   { name: "Learning", icon: <AiOutlineBulb />, path: "/learning" },
//   { name: "Fashion & beauty", icon: <GiHanger />, path: "/fashion-beauty" },
// ],
