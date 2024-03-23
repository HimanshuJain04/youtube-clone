import React from "react";

const IconHover = ({ Icon, handler }) => {
  return (
    <div
      onClick={handler}
      className="rounded-full p-4 text-white text-2xl transition-all duration-200 ease-in-out
       hover:bg-[white]/[0.15] cursor-pointer"
    >
      <Icon />
    </div>
  );
};

export default IconHover;
