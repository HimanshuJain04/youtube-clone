"use client";
import { subscribeUnsubscribeHandler } from "@/actions/channel";
import { Context } from "@/app/context";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoIosNotifications } from "react-icons/io";

async function subscribeButtonHandler(
  channelId: string,
  userId: string,
  setIsSubscribed: any
) {
  const data = await subscribeUnsubscribeHandler(channelId, userId);
  if (!data) {
    toast.error("Something went wrong");
    return;
  }

  setIsSubscribed(data.status);
  toast.success(
    data.status ? "Subscribe successfull" : "Unsubscribe successfull"
  );
}

const SubscribeButton = ({ channelId }: any) => {
  const { user } = useContext(Context);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const isPresent = user?.subscribesTo?.some(
      (item: any) => item.id === channelId
    );

    setIsSubscribed(isPresent);
  }, [user, channelId]);

  return (
    <div
      onClick={() =>
        subscribeButtonHandler(channelId, user.id, setIsSubscribed)
      }
    >
      <button
        className={`px-5 py-2 rounded-full border-2 font-semibold ${
          isSubscribed
            ? "bg-black text-white border-white/[0.7] "
            : "bg-white text-black border-black "
        }`}
      >
        {isSubscribed ? (
          <span className="text-white flex justify-center items-center gap-1">
            <p>Subscribed</p>
            <IoIosNotifications className="text-2xl" />
          </span>
        ) : (
          <p>Subscribe</p>
        )}
      </button>
    </div>
  );
};

export default SubscribeButton;
