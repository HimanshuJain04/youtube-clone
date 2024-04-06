"use client";
import React, { useEffect, useRef, useState } from "react";
import IconHover from "@/components/common/IconHover";
import { Icons } from "@/constant/Icons";
import { fetchRelatedSearch } from "@/actions/video";
import { useRouter } from "next/navigation";

const Searchbar = ({ inputValue, setInputValue }) => {
  const router = useRouter();
  const [searchedNames, setSearchedNames] = useState(null);

  const divRef = useRef(null);
  const searchRef = useRef(null);
  async function getMoreRelatedSearch() {
    try {
      if (!inputValue) {
        setSearchedNames(null);
        return;
      }
      const res: any = await fetchRelatedSearch(inputValue);
      setSearchedNames(res);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: any) => {
    if (
      divRef.current &&
      !divRef.current?.contains(event.target) &&
      searchRef.current &&
      !searchRef.current?.contains(event.target)
    ) {
      setSearchedNames(null);
    }
  };

  function navigateHandler(title: string) {
    if (!title) return;
    router.push(`/search?value=${title}`);
    setSearchedNames(null);
  }

  useEffect(() => {
    getMoreRelatedSearch();
  }, [inputValue]);

  return (
    <>
      <div
        ref={searchRef}
        className="border-[1px] relative w-full group-focus-within:border-blue-500 h-full border-white/[0.2] flex justify-center items-center rounded-l-full "
      >
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

      {searchedNames && (
        <div
          ref={divRef}
          className="w-full absolute top-[44px] h-auto py-3 rounded-lg bg-[#373232]"
        >
          <div className="flex flex-col">
            {searchedNames?.map((item: any, index: number) => (
              <div
                onClick={() => navigateHandler(item?.title)}
                key={index}
                className="flex px-2 py-1 border-b-2 border-white/[0.15] cursor-pointer transition-all duration-200 ease-in-out hover:bg-white/[0.1] gap-2 justify-start items-center"
              >
                <Icons.AiOutlineSearch className="text-xl" />
                <p className="text-base font-semibold">{item?.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Searchbar;
