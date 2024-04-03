import { Context } from "@/app/context";
import Link from "next/link";
import React, { useContext } from "react";

const SidebarCard = ({ item }: any) => {
  const { category, setCategory, showSideBar } = useContext(Context);

  return (
    <Link
      href={item?.path}
      onClick={() => {
        setCategory(item.name);
      }}
      className={
        `flex  select-none justify-start  transition-all duration-150 ease-in-out cursor-pointer hover:bg-[white]/[0.15] rounded-xl ` +
        (category === item.name ? " bg-[white]/[0.15] " : " ") +
        (showSideBar
          ? "font-normal py-2 px-3 text-base flex-row items-start gap-5"
          : "text-[10px] flex-col px-1 mb-2 py-5 items-center gap-1")
      }
    >
      <div className="font-bold text-2xl">{item.icon}</div>
      <p>{item.name}</p>
    </Link>
  );
};

export default SidebarCard;
