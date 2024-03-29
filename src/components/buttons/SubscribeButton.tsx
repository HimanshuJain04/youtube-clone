"use client";
import { subscribeUnsubscribeHandler } from "@/actions/channel";
import { Context } from "@/app/context";
import React, { useContext } from "react";
import toast from "react-hot-toast";

async function subscribeButtonHandler(channelId: string, userId: string) {
  if (await subscribeUnsubscribeHandler(channelId, userId)) {
    toast.success("channel subscribe Success");
  }
}

const SubscribeButton = ({ channelId }: any) => {
  const { user } = useContext(Context);

  // const isAlreadySubscribed = user.subsbribesTo;
  console.log("Subs: ", user);

  return (
    <div onClick={() => subscribeButtonHandler(channelId, user.id)}>
      <button className="px-5 py-2 bg-white text-black rounded-full font-semibold">
        Subscribe
      </button>
    </div>
  );
};

export default SubscribeButton;
