"use client";

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { createVideo } from "@/actions/video";
import { CovertIntoFormData } from "@/utils/FormDataConvertor";
import { Context } from "@/app/context";

interface FileData {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

// interface FormValuesTypes {
//   description: string;
//   title: string;
//   isAgeRestricted: boolean;
//   tags: string[];
//   thumbnailFile: Blob;
//   videoFile: Blob;
// }

export default function CreatVideo() {
  const { register, handleSubmit } = useForm();

  const { user } = useContext(Context);

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    isAgeRestricted: false,
    tags: [],
    thumbnailFile: null,
    videoFile: null,
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
      const result = await createVideo(fd);
      console.log("Video created! ", result);
    } catch (error) {
      console.log("Something went wrong! ", error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      <form
        className="bg-gray-800 p-4 rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-white mb-2">
            <p>Title</p>
          </label>
          <input
            {...register("title")}
            name="title"
            value={formValues.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-900 text-white"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-white mb-2">
            <p>Description</p>
          </label>
          <input
            {...register("description")}
            name="description"
            value={formValues.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-900 text-white"
          />
        </div>

        {/* Checkbox for Age Restriction */}
        <div className="mb-4">
          <label htmlFor="isAgeRestricted" className="block text-white mb-2">
            <input
              type="checkbox"
              name="isAgeRestricted"
              checked={formValues.isAgeRestricted}
              onChange={handleChange}
              className="mr-2"
            />
            Age Restricted
          </label>
        </div>

        {/* Tags (assuming it's an array of strings) */}
        <div className="mb-4">
          <label htmlFor="tags" className="block text-white mb-2">
            <p>Tags</p>
          </label>
          <input
            type="text"
            name="tags"
            value={formValues.tags}
            onChange={handleChange}
            placeholder="Tags"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-900 text-white"
          />
        </div>

        {/* Thumbnail File */}
        <div className="mb-4">
          <label htmlFor="thumbnailFile" className="block text-white mb-2">
            <p>Thumbnail File</p>
          </label>
          <input
            type="file"
            name="thumbnailFile"
            onChange={(e) =>
              setFormValues((prevValues) => ({
                ...prevValues,
                thumbnailFile: e.target.files[0],
              }))
            }
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-900 text-white"
          />
        </div>

        {/* Video File */}
        <div className="mb-4">
          <label htmlFor="videoFile" className="block text-white mb-2">
            <p>Video File</p>
          </label>
          <input
            type="file"
            name="videoFile"
            onChange={(e) =>
              setFormValues((prevValues) => ({
                ...prevValues,
                videoFile: e.target.files[0],
              }))
            }
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-900 text-white"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
