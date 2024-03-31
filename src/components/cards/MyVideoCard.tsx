import { getTime, getViews } from "@/utils/videoUtils";
import React from "react";
import { Icons } from "@/constant/Icons";

const MyVideoCard = ({ video }: any) => {
  return (
    <div>
      <div className="w-full flex justify-between items-start p-5">
        {/* video | title */}
        <div>
          <div></div>
          <div>
            <p>{video.title}</p>
          </div>
        </div>

        {/* visibility */}
        <div></div>

        {/* restriction */}
        <div>
          <p>{video.isAgeRestricted ? "Yes" : "No"}</p>
        </div>

        {/* date */}
        <div>
          <p>{getTime(video.createdAt)}</p>
        </div>

        {/* views */}
        <div>
          <p>{getViews(video.viewsCount)}</p>
        </div>

        {/* Likes */}
        <div>
          <p>{getViews(video.likesCount)}</p>
        </div>
        {/* edit and delete */}
        <div>
          <span>
            <Icons.FaEdit />
          </span>
          <span>
            <Icons.RiDeleteBin6Line />
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyVideoCard;
