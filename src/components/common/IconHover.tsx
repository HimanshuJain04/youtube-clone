import React from "react";

const IconHover = ({ Icon, handler, css }) => {
  return (
    <div
      onClick={handler}
      className={` rounded-full p-3 text-white text-xl transition-all duration-200 ease-in-out
       hover:bg-[white]/[0.15] cursor-pointer ${css}`}
    >
      <Icon />
    </div>
  );
};

export default IconHover;
