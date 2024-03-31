"use client";

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { createVideo, updateVideo } from "@/actions/video";
import { CovertIntoFormData } from "@/utils/FormDataConvertor";
import { Context } from "@/app/context";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Icons } from "@/constant/Icons";

interface FileData {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

interface InitialFormValuesProps {
  title: String;
  description: String;
  isAgeRestricted: Boolean;
  tags: String[];
  thumbnailFile: FileData | String;
  videoFile: FileData | String;
}

interface Props {
  InitialFormValues: InitialFormValuesProps;
  TYPE: String;
}

export default function FormVideo({ InitialFormValues, TYPE }: Props) {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const { user }: any = useContext(Context);

  const [formValues, setFormValues] = useState({
    title: InitialFormValues.title,
    description: InitialFormValues.description,
    isAgeRestricted: InitialFormValues.isAgeRestricted,
    tags: InitialFormValues.tags,
    thumbnailFile: InitialFormValues.thumbnailFile,
    videoFile: InitialFormValues.videoFile,
    status: InitialFormValues.status,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async () => {
    try {
      const fd = CovertIntoFormData(formValues);

      fd.append("userId", user.id);

      if (TYPE === "CREATE") {
        const result = await createVideo(fd);
        console.log("result: ", result);
      } else if (TYPE === "UPDATE") {
        fd.append("videoId", InitialFormValues.videoId);
        const result = await updateVideo(fd);
        console.log("result: ", result);
      }
      
      toast.success("Video Uploaded Successfully!");
      router.push("/");
    } catch (error) {
      toast.error("Video Upload Failed !");
      console.log("Something went wrong! ", error);
    }
  };

  return (
    <div className="p-5 w-[60vw] bg-white/[0.15] rounded-xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10 font-medium text-white justify-start items-start"
      >
        {/* media */}
        <div className="flex w-full justify-center gap-5 items-center">
          {/* Thumbnail File */}
          <div className="w-full h-[250px] cursor-pointer  border-white/[0.3]  rounded-md border-2 flex justify-center items-center">
            <div className="text-white/[0.5] flex flex-col gap-3 justify-center items-center text-xl font-semibold">
              <Icons.FaRegImage className="text-5xl" />
              <p>Drop Thumbnail Here</p>
            </div>
            <input
              type="file"
              name="thumbnailFile"
              hidden
              id="thumbnailFile"
              onChange={(e) =>
                setFormValues((prevValues) => ({
                  ...prevValues,
                  thumbnailFile: e?.target?.files?.[0],
                }))
              }
            />
          </div>

          {/* Video File */}
          <div className="w-full h-[250px] border-2 cursor-pointer border-white/[0.3] rounded-md flex justify-center items-center">
            <div className="text-white/[0.5] flex gap-3 flex-col justify-center items-center text-xl font-semibold">
              <Icons.FaFileVideo className="text-5xl" />
              <p>Drop Video Here</p>
            </div>
            <input
              type="file"
              name="videoFile"
              id="videoFile"
              hidden
              onChange={(e) =>
                setFormValues((prevValues) => ({
                  ...prevValues,
                  videoFile: e?.target?.files?.[0],
                }))
              }
            />
          </div>
        </div>

        {/* Title */}
        <div className="w-full">
          <label htmlFor="title" className="block text-white mb-2">
            <p>Title</p>
          </label>
          <input
            {...register("title")}
            name="title"
            value={formValues.title}
            id="title"
            onChange={handleChange}
            placeholder="Title"
            className="w-full px-3 py-2 rounded-lg border-2 border-transparent outline-none focus-within:border-white/[0.3] bg-white/[0.1] "
          />
        </div>

        {/* Tags (assuming it's an array of strings) */}
        <div className="w-full">
          <label
            htmlFor="tags"
            className="flex gap-2 items-center text-white mb-2"
          >
            <p>Tags</p>
            <p className="text-sm font-normal text-white/[0.3]">
              sepearted by comma
            </p>
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            value={formValues.tags}
            onChange={handleChange}
            placeholder="Tags"
            className="w-full px-3 py-2 rounded-lg border-2 border-transparent outline-none focus-within:border-white/[0.3] bg-white/[0.1] "
          />
        </div>

        <div className="w-full flex gap-5">
          {/* Checkbox for Age Restriction */}
          <div className="w-full flex justify-start items-center border-2 rounded-lg p-2 border-white/[0.15] gap-3">
            <label htmlFor="isAgeRestricted" className="block text-white mb-2">
              Age Restricted
            </label>
            <input
              type="checkbox"
              name="isAgeRestricted"
              id="isAgeRestricted"
              checked={formValues.isAgeRestricted}
              onChange={handleChange}
              className="p-2"
            />
          </div>

          {/* status */}
          <div className="w-full  flex justify-start items-center border-2 rounded-lg p-2 border-white/[0.15] gap-3">
            <label htmlFor="status" className="block text-white mb-2">
              Status
            </label>
            <select
              className="outline-none px-5 py-1 rounded-md bg-white/[0.1]"
              name="status"
              id="status"
            >
              <option className="bg-white/[0.5] text-black" value="">
                Select Status
              </option>
              <option className="bg-white/[0.5] text-black" value="Public">
                Public
              </option>
              <option className="bg-white/[0.5] text-black" value="Private">
                Private
              </option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="w-full">
          <label htmlFor="description" className="block text-white mb-2">
            <p>Description</p>
          </label>
          <textarea
            {...register("description")}
            name="description"
            value={formValues.description}
            id="description"
            onChange={handleChange}
            placeholder="Description"
            className="w-full px-3 py-2 resize-none h-[200px] rounded-lg border-2 border-transparent outline-none focus-within:border-white/[0.3] bg-white/[0.1] "
          />
        </div>

        {/* Submit Button */}
        <div className="w-full">
          <button
            type="submit"
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
