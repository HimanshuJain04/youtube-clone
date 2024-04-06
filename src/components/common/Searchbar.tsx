"use client";
import React, { useEffect, useState } from "react";
import IconHover from "@/components/common/IconHover";
import { Icons } from "@/constant/Icons";
import { fetchRelatedSearch } from "@/actions/video";

const Searchbar = ({ inputValue, setInputValue }) => {
  const [searchedNames, setSearchedNames] = useState(null);
  async function getMoreRelatedSearch() {
    try {
      if (!inputValue) {
        return;
      }

      const res: any = await fetchRelatedSearch(inputValue);
      console.log(res);
      setSearchedNames(res);
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  useEffect(() => {
    getMoreRelatedSearch();
  }, [inputValue]);
  return (
    <>
      <div className="border-[1px] relative w-full group-focus-within:border-blue-500 h-full border-white/[0.2] flex justify-center items-center rounded-l-full ">
        <input
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="rounded-l-full  w-full md:w-[350px] lg:w-[450px] xl:w-[600px] outline-none bg-transparent h-full text-lg px-5"
        />

        {inputValue.length > 0 && (
          <div className="absolute z-10 right-0 top-[50%] translate-y-[-50%]">
            <IconHover
              Icon={Icons.RxCross1}
              css={"text-md p-2 "}
              handler={() => {
                setInputValue("");
              }}
            />
          </div>
        )}
      </div>

      <div className="w-10 absolute top-16 h-4 bg-red-300">
        <div>
          {searchedNames &&
            searchedNames?.map((item: any, index: number) => (
              <div key={index}>
                <p>{item}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Searchbar;
