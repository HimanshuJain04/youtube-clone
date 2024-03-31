"use client";

import FormVideo from "@/components/form/FormVideo";

export default function CreateVideo() {
  return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      <FormVideo
        InitialFormValues={{
          title: "",
          description: "",
          isAgeRestricted: false,
          tags: [],
          thumbnailFile: "",
          videoFile: "",
          status: "",
        }}
        TYPE="CREATE"
      />
    </div>
  );
}
