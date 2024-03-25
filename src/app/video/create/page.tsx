import React from "react";
// import { useForm } from "react-hook-form";
// import { Input } from "@/components/ui/input";

export interface FormValues {
  firstName: string;
  lastName: string;
}

export default function CreatVideo() {
  // const { register } = useForm<FormValues>();

  return (
    <div>
      {/* <form>
        <input {...register("firstName")} placeholder="First name" />
        <input {...register("lastName")} placeholder="Last name" />
        <button type="submit">Send</button>
      </form> */}
    </div>
  );
}
