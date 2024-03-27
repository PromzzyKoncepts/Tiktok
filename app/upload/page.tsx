"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { UploadError } from "../types";
import UploadLayout from "../layouts/UploadLayout";
import { BiLoaderCircle, BiSolidCloudUpload } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { PiKnifeLight } from "react-icons/pi";

const page = () => {
  const router = useRouter();

  let [fileDisplay, setFileDisplay] = useState<string>("");
  let [caption, setCaption] = useState<string>("");
  let [file, setFile] = useState<File | null>(null);
  let [error, setError] = useState<UploadError | null>(null);
  let [isUploading, setIsUploading] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const fileUrl = URL.createObjectURL(file);
      setFileDisplay(fileUrl); //save the converted file url in the filedisplay state
      setFile(file); // save the original file in the file state manager
    }
  };

  const clearVideo = () => {
    setFileDisplay("");
    setFile(null);
  };

  const discard = () => {
    setFileDisplay("");
    setFile(null);
    setCaption("");
  };
  const createNewPost = () => {
    console.log("post has been created");
  };

  return (
    <div>
      <UploadLayout>
        <div className="w-full mt-[80px] mb-[40px] bg-white shadow-lg rounded-md py-6 md:px-10 px-4">
          <div className="h1">
            <h1 className="font-semibold text-[23px]">Upload video</h1>
            <h2 className="mt-1 text-gray-400">Post a video to your account</h2>
          </div>

          <div className="md:flex gap-6 mt-8">
            {!fileDisplay ? (
              <label
                htmlFor="fileInput"
                className="md:mx-0
            mx-auto
            mt-4
            mb-6
            flex 
            flex-col 
            items-center 
            justify-center 
            w-full 
            max-w-[260px] 
            h-[470px] 
            text-center 
            p-3 
            border-2 
            border-dashed 
            border-gray-300 
            rounded-lg 
            hover:bg-gray-100 
            cursor-pointer"
              >
                <BiSolidCloudUpload size={40} color="#b3b3b1" />
                <p className="mt-4 text-[17px] ">Select Video to Upload</p>
                <p className="mt-1.5 text-gray-800 text-[13px]">
                  Or Drag and Drop a File
                </p>
                <p className="mt-12 text-gray-500 text-sm ">MP4 or WebM</p>
                <p className="mt-12 text-gray-500 text-sm ">
                  720x1280 resolution or higher{" "}
                </p>
                <p className="mt-2 text-[#FE2C55] text-[13px] font-medium ">
                  Up to 10 minutes
                </p>
                <p className="mt-2 text-gray-500 text-[13px] ">
                  Less than 10gb
                </p>
                <label
                  htmlFor="fileInput"
                  className="px-2 py-1.5 mt-8 text-white text-[15px] w-[80%] bg-[#FE2C55] rounded-sm "
                >
                  Select the File
                </label>
                <input
                  type="file"
                  name=""
                  id="fileInput"
                  onChange={handleChange}
                  hidden
                  accept=".mp4"
                />
              </label>
            ) : (
              <div className="md:mx-0 md:mb-12 mx-auto mb-16 mt-4 flex  items-center w-full max-w-[260px] p-3 cursor-pointer rounded-2xl relative h-[540px]">
                {isUploading ? (
                  <div className="absolute flex items-center justify-center bg-black z-10 h-full w-full bg-opacity-40 rounded-[50px] ">
                    <div className="mx-auto flex items-center flex-col justify-center gap-1 ">
                      <BiLoaderCircle
                        className="animate-spin "
                        color="#f12b56"
                        size={40}
                      />
                      <div className="font-semibold animate-pulse text-white">
                        Uploading...
                      </div>
                    </div>
                  </div>
                ) : null}

                <img
                  src="/images/mobile-case.png"
                  className="pointer-events-none z-20 absolute"
                  alt="mobile case"
                />

                <img
                  src="/images/tiktok-logo-white.png"
                  width={90}
                  alt="tiktok logo"
                  className="absolute right-4 bottom-6 z-20"
                />

                <video
                  src={fileDisplay}
                  className="absolute z-10 object-cover rounded-xl p-[13px] w-full h-full"
                  autoPlay
                  loop
                  controls
                  muted
                ></video>
                <div className="absolute -bottom-12 rounded-xl flex items-center justify-between z-50 border border-gray-300 w-full p-2">
                  <div className="flex truncate gap-9 items-center">
                    <div className="flex gap-2 items-center">
                      <AiOutlineCheckCircle
                        size={16}
                        color=""
                        className="min-w-[16px]"
                      />
                      <p className="truncate text-[11px] text-ellipsis">
                        {file?.name}
                      </p>
                    </div>

                    <button
                      onClick={() => clearVideo()}
                      className="text-[11px] ml-2 font-semibold hover:underline hover:text-[#FE2C55]"
                    >
                      Change Video
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="mb-6 mt-4">
              <div className="flex bg-[#f8f8f8] px-6 py-4">
                <div>
                  <PiKnifeLight size={20} className="mr-4" />
                </div>
                <div>
                  <div className="font-semibold text-[15px] mb-1.5">
                    Divide videos and edit
                  </div>
                  <div className="font-semibold text-[13px] text-gray-400">
                    You can quickly divide video into multiple parts, remove
                    redundant parts and turn landscale videos into portrait
                    videos
                  </div>
                </div>
                <div className="flex items-center justify-end my-auto w-full h-full text-center max-w-[130px]">
                  <button className="text-white py-1.5 px-8 rounded-sm text-[15px] bg-[#FE2C55]">
                    Edit
                  </button>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <div className="mb-1 text-[15px] ">Caption</div>
                  <div
                    className={`text-gray-400 text-[15px] ${
                      caption.length == 150
                        ? "text-[#FE2C55] font-semibold animate-bounce"
                        : ""
                    } `}
                  >
                    {caption?.length}/150
                  </div>
                </div>
                <input
                  type="text"
                  name=""
                  maxLength={150}
                  className="w-full border p-2.5 rounded focus:outline-none"
                  id=""
                  value={caption}
                  onChange={(event) => setCaption(event.target.value)}
                  placeholder="Caption should be maximum of 150 characters"
                />
              </div>
              <div className="flex gap-3">
                <button
                  disabled={isUploading}
                  onClick={() => discard()}
                  className="px-10 py-2.5 mt-8 hover:bg-gray-100 rounded-sm text-[16px] disabled:text-gray-400 border"
                >
                  Discard
                </button>
                <button
                  disabled={isUploading}
                  onClick={() => createNewPost()}
                  className="px-10 py-2.5 mt-8 rounded-sm text-[16px] disabled:text-gray-400 bg-[#FE2C55] text-white border"
                >
                  {isUploading ? (
                    <BiLoaderCircle
                      className="animate-spin"
                      size={25}
                      color="#ffffff"
                    />
                  ) : (
                    "Post"
                  )}
                </button>
              </div>
              {error && (
                <div className="mt-4 text-red-600">{error.message}</div>
              )}
            </div>
          </div>
        </div>
      </UploadLayout>
    </div>
  );
};

export default page;
