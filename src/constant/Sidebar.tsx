import { Icons } from "@/constant/Icons";
import { v4 as uuidv4 } from "uuid";

export const HomeCategory = [
  { id: uuidv4(), name: "Home", icon: <Icons.GoHomeFill />, path: "/" },
  {
    id: uuidv4(),
    name: "Shorts",
    icon: <Icons.BsFillFilePlayFill />,
    path: "/shorts",
  },
  {
    id: uuidv4(),
    name: "Subscriptions",
    icon: <Icons.MdOutlineSubscriptions />,
    path: "/subscriptions",
  },
  {
    id: uuidv4(),
    name: "Profile",
    icon: <Icons.CgProfile />,
    path: "/profile",
  },
];

export const videosCategory = [
  {
    id: uuidv4(),
    name: "History",
    icon: <Icons.GoHistory />,
    path: "/video/history",
  },
  {
    id: uuidv4(),
    name: "Your videos",
    icon: <Icons.GoVideo />,
    path: "/my-videos",
  },
  {
    id: uuidv4(),
    name: "Watch Later",
    icon: <Icons.MdOutlineWatchLater />,
    path: "/video/watch-later",
  },
  {
    id: uuidv4(),
    name: "Liked videos",
    icon: <Icons.BiLike />,
    path: "/video/liked-videos",
  },
];

export const settingCategory = [
  {
    id: uuidv4(),
    name: "Setting",
    icon: <Icons.FiSettings />,
    path: "/setting",
  },
  {
    id: uuidv4(),
    name: "Report History",
    icon: <Icons.MdOutlinedFlag />,
    path: "/report",
  },
  { id: uuidv4(), name: "Help", icon: <Icons.BiHelpCircle />, path: "/help" },
  {
    id: uuidv4(),
    name: "Send Feedback",
    icon: <Icons.GoReport />,
    path: "/feedback",
  },
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
