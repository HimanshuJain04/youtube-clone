"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function Watch() {
  const videoId = usePathname().split("/").at(-1);

  console.log(videoId);

  return (
    <div>
      <div className="min-h-screen w-full">
        {/* video part */}
        <div></div>

        {/* recommendation */}
        <div>
          
        </div>
      </div>
    </div>
  );
}
