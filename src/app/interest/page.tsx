"use client";
import { fetchCategories } from "@/actions/other";
import { Icons } from "@/constant/Icons";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import { useRouter } from "next/navigation";
import { categories } from "@/constant/category";

const Page = () => {
  const [userInterest, setUserInterest] = useState<String[]>([]);
  const { user }: any = useContext(Context);
  const router = useRouter();

  function addHandler(category: String) {
    setUserInterest([...userInterest, category]);
  }

  function removeHandler(removedCategory: String) {
    const updatedList = userInterest.filter(
      (category) => category !== removedCategory
    );

    console.log(updatedList);
    // console.log(userInterest);
    setUserInterest(updatedList);
  }

  async function sumbitHandler() {
    try {
    } catch (error) {
      console.log("Error: when trying to add interest of user: ", error);
    }
  }

  useEffect(() => {
    if (!user) {
      router.push("/auth/sign-in");
      return;
    }

    if (user.interest.length > 0) {
      router.push("/profile");
      return;
    }
  }, [user]);

  return (
    <div className="bg-black w-full flex-col min-h-screen gap-5 flex justify-center items-center">
      {categories && (
        <div className="bg-white/[0.15] flex flex-wrap gap-4 max-w-[600px] p-5 rounded-lg">
          {categories?.map((category: string, index: number) => (
            <div key={index} className="relative">
              <div
                onClick={() => addHandler(category)}
                className="p-2 bg-black/[0.3] relative cursor-pointer rounded-md text-lg font-semibold text-white"
              >
                <span>{category}</span>
              </div>
              <button
                onClick={() => removeHandler(category)}
                className={`absolute -top-2 -right-2 bg-blue-400 text-sm rounded-full p-1 
                ${userInterest.includes(category) ? "block" : "hidden"}`}
              >
                <Icons.RxCross1 />
              </button>
            </div>
          ))}
        </div>
      )}

      <div>
        <button
          onClick={sumbitHandler}
          className="px-20 py-2 bg-blue-500 text-white rounded-lg font-bold"
        >
          Sumbit
        </button>
      </div>
    </div>
  );
};

export default Page;
