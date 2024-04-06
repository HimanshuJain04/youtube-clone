"use client";

import FormVideo from "@/components/form/FormVideo";

export default function CreateVideo() {
  return (
    <div className="min-h-screen  pb-10 pt-5 bg-black flex justify-center items-center">
      <FormVideo
        InitialFormValues={{
          title: "",
          description: "",
          isAgeRestricted: false,
          tags: [],
          thumbnailFile: "",
          videoFile: "",
          status: "",
          category: "",
        }}
        TYPE="CREATE"
      />
    </div>
  );
}
