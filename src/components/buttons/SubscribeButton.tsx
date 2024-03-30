"use client";
import { subscribeUnsubscribeHandler } from "@/actions/channel";
import { Context } from "@/app/context";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineNotificationsActive } from "react-icons/md";

const SubscribeButton = ({ channelId, setSubscribers }: any) => {
  const { user } = useContext(Context);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const isPresent = user?.subscribesTo?.some(
      (item: any) => item.id === channelId
    );

    setIsSubscribed(isPresent);
  }, [user, channelId]);

  async function subscribeButtonHandler() {
    const data = await subscribeUnsubscribeHandler(channelId, user.id);
    if (!data) {
      toast.error("Something went wrong");
      return;
    } else {
      setIsSubscribed(data.status);
      toast.success(
        data.status ? "Subscribe successfull" : "Unsubscribe successfull"
      );
      setSubscribers(data.channelSubscribers?.subscribersCount);
    }
  }

  return (
    <div onClick={subscribeButtonHandler}>
      <button
        className={`px-5 py-2 rounded-full  font-semibold ${
          isSubscribed ? "bg-white/[0.2] text-white  " : "bg-white text-black  "
        }`}
      >
        {isSubscribed ? (
          <span className="text-white flex justify-center items-center gap-1">
            <MdOutlineNotificationsActive className="text-2xl" />
            <p>Subscribed</p>
          </span>
        ) : (
          <p>Subscribe</p>
        )}
      </button>
    </div>
  );
};

export default SubscribeButton;
