// this will be a wrapper compoent for anything we want to render on the client side
"use client";

import { VideoHTMLAttributes, useEffect } from "react";
import { postMainCompTypes } from "../types";
import Link from "next/link";
import { profile } from "console";
import { ImMusic } from "react-icons/im";
import { AiFillHeart } from "react-icons/ai";
import PostMainLikes from "./PostMainLikes";
import UseCreateBucketUrl from "../hooks/useCreateBucketUrl";

export default function PostMain({ post }: postMainCompTypes) {
  useEffect(() => {
    const video = document.getElementById(
      `video-${post?.id}`
    ) as HTMLVideoElement;
    const postMainElement = document.getElementById(`PostMain-${post?.id}`);

    if (postMainElement) {
      let observer = new IntersectionObserver(
        (entries) => {
          entries[0].isIntersecting ? video.play() : video.pause();
        },
        { threshold: [0.6] }
      );

      observer.observe(postMainElement);
    }
  }, []);

  return (
    <>
      <div id={`PostMain-${post.id}`} className="flex  border-b py-6">
        <div className="cursor-pointer">
          <img
            src={
              UseCreateBucketUrl(post?.profile?.image) ||
              "/images/placeholder-user.jpg"
            }
            alt=""
            className="rounded-full max-h-[60px]"
            width={60}
          />
        </div>

        <div className="pl-3 px-4 w-full">
          <div className="flex justify-between items-center pb-0.5">
            <Link href={`/profile/${post?.profile?.user_id}`}>
              <span className="cursor-pointer">{post.profile.name}</span>
            </Link>

            <button className="border text-[15px] px-[21px] py-0.5 border-[#F02C56] text-[#F02C56] hover:bg-[#ffeef2] font-semibold rounded-md">
              Follow
            </button>
          </div>

          <p className="text-[15px] pb-0.5 break-words md:max-w-[400px] max-w-[300px]">
            {post.text}
          </p>
          <p className="text-[11px] text-gray-500 pb-0.5">
            #fun #cool #SuperAwesome
          </p>
          <p className="text-[14px] pb-0.5 flex items-center font-semibold">
            <ImMusic size="10" />
            <span className="px-1 text-sm">
              original sound - {post?.profile?.name}
            </span>
            <AiFillHeart size="13" />
          </p>

          <Link
            href={`/post/${post?.id}/${post?.profile?.user_id}`}
            className="h-full"
          >
            <div className="mt-2.5 flex">
              <div className="relative min-h-[480px] max-h-[580px] max-w-[260px] flex items-center  bg-black rounded-xl cursor-pointer">
                <video
                  id={`video-${post.id}`}
                  loop
                  controls
                  className="rounded-xl object-cover mx-auto h-full"
                  src={UseCreateBucketUrl(post?.video_url)}
                />
              </div>

              <PostMainLikes post={post} />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
