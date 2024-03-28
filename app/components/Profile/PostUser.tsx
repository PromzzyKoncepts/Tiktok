"use client";

import { useEffect } from "react";
import { PostUserCompTypes } from "../../types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";
import { CiPlay1 } from "react-icons/ci";

const PostUser = ({ post }: PostUserCompTypes) => {
  useEffect(() => {
    const video = document.getElementById(
      `video${post.id}`
    ) as HTMLVideoElement;

    setTimeout(() => {
      video.addEventListener("mouseenter", () => {
        video.play();
      });
      video.addEventListener("mouseleave", () => {
        video.pause();
      });
    }, 50);
  }, []);

  function formatNumber(num: number, precision: number = 1) {
    const map = [
      { suffix: "T", threshold: 1e12 },
      { suffix: "B", threshold: 1e9 },
      { suffix: "M", threshold: 1e6 },
      { suffix: "K", threshold: 1e3 },
      { suffix: "", threshold: 1 },
    ];

    const found = map.find((x) => Math.abs(num) >= x.threshold);
    if (found) {
      const formatted =
        (num / found.threshold).toFixed(precision) + found.suffix;
      return formatted;
    }

    return num;
  }

  return (
    <div className="relative  brightness-75 hover:brightness-[1.1] cursor-pointer">
      {!post.video_url ? (
        <div className="absolute flex items-center justify-center top-0 left-0 aspect-[3/4] object-cover w-full  rounded-md bg-black">
          <AiOutlineLoading3Quarters
            className="animate-spin ml-1"
            size={80}
            color="#ffffff"
          />
        </div>
      ) : (
        <Link href={`/post/${post?.id}/${post?.user_id}`} className="relative">
          <video
            src={post.video_url}
            id={`video${post.id}`}
            muted
            loop
            className=" aspect-[3/4] rounded-md object-cover"
          ></video>
          <div className="flex items-center absolute bottom-4 left-2 gap-1 text-white font-semibold text-sm">
              <CiPlay1
                className=""
                size={20}
                color="#ffffff"
              />
            <div>{formatNumber(post.views, 0)}</div>
          </div>
        </Link>
      )}
      <div className="px-1">
        <p className="text-gray-700 text-[15px] truncate pt-1">{post.text}</p>
      </div>
    </div>
  );
};

export default PostUser;
