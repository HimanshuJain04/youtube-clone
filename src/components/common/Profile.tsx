import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Context } from "@/app/context";
import toast from "react-hot-toast";
import axios from "axios";
import { Icons } from "@/constant/Icons";

const Profile = () => {
  const { user, setUser }: any = useContext(Context);
  const profileRef = useRef(null);

  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function logoutHandler() {
    try {
      await axios.get("/api/auth/logout");
      setUser(null);
      toast.success("Logout Successfully!");
    } catch (error) {
      console.log("Error logoutHandler : ", error);
      toast.error("Logout Failed!");
    }
  }

  const handleClickOutside = (event: any) => {
    if (profileRef.current && !profileRef.current?.contains(event.target)) {
      setShowProfile(false);
    }
  };

  return (
    <div
      onClick={() => setShowProfile(!showProfile)}
      ref={profileRef}
      className="relative"
    >
      <div className="text-sm w-[40px] relative h-[40px] cursor-pointer rounded-full overflow-hidden">
        <Image
          src={user?.profileImage}
          fill
          className="rounded-full object-contain"
          alt="User-profile"
        />
      </div>

      {showProfile && (
        <div className="w-[150px] font-semibold absolute top-12 right-2 text-lg rounded-xl p-2 z-[10] text-white  bg-[#3a3838]">
          <button
            onClick={logoutHandler}
            className=" w-full flex px-2 py-1 items-center gap-3 hover:bg-white/[0.1] rounded-lg cursor-pointer"
          >
            <Icons.FiLogOut />
            <p>Logout</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
