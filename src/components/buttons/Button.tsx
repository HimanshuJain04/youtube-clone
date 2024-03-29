import React from "react";
import Link from "next/link";

const Button = (props: any) => {
  const text: String = props.text;
  const path: any = props.path;

  return (
    <Link href={path}>
      <button className="text-lg rounded-full px-7 py-[3px] border-2 text-blue-500 hover:border-whitet border-blue-800 transition-all duration-200 ease-in-out">
        <p>{text}</p>
      </button>
    </Link>
  );
};

export default Button;
