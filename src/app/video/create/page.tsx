"use client";
import { CldUploadButton } from "next-cloudinary";

export default function Photos() {
  console.log("cloudinary");
  return (
    <div>
      <CldUploadButton
        options={{ multiple: true }}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
      >
        <span>Upload</span>
      </CldUploadButton>
    </div>
  );
}
