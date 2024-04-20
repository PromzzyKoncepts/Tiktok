"use client";

import { CommentsHeaderCompTypes } from "@/app/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { BsChatDots, BsTrash3 } from "react-icons/bs";
import { ImMusic } from "react-icons/im";
import ClientOnly from "../ClientOnly";
import { AiFillHeart } from "react-icons/ai";

const CommentsHeader = ({ post, params }: CommentsHeaderCompTypes) => {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [hasClickedLike, setHasClickedLike] = useState<boolean>(false);
  const [userLiked, setUserLiked] = useState<boolean>(false);

  const deletePost = () => {
    console.log("user has deleted post");
  };

  const likeOrUnlike = () => {
    console.log("üser has liekd or unliked");
  };

  return (
    <>
      <div className="flex items-center justify-between px-8">
        <div className="flex items-center">
          <Link href={`/profile/${post?.user_id}`} className="">
            {post?.profile.image ? (
              <img
                src={post?.profile.image}
                width="40"
                alt="profile image"
                className="rounded-full lg:mx-0 mx-auto"
              />
            ) : (
              <div className="w-[40px] bg-gray-200 rounded-full h-[40px]"></div>
            )}
          </Link>

          <div className="ml-3 p-0.5">
            <Link
              href={`/profile/${post?.user_id}`}
              className="z-10 font-semibold hover:underline text-[17px] relative"
            >
              {post?.profile.name}
            </Link>

            <div className="relative z-0 text-sm -mt-5 font-light">
              {post?.profile.username}
              <span className="relative -top-[2px] text-3xl pl-1 pr-0.5">
                .
              </span>
              <span className="font-medium text-xs">{post?.created_at}</span>
            </div>
          </div>
        </div>

        {/* remember to remove this true and null ternary operators, its irrelevant here */}
        {true ? (
          <div className="">
            {isDeleting ? (
              <BiLoaderCircle size={25} className="animate-spin" />
            ) : (
              <button
                className=""
                disabled={isDeleting}
                onClick={() => deletePost()}
              >
                <BsTrash3
                  className="cursor-pointer hover:text-[#f02C56]"
                  size={22}
                />
              </button>
            )}
          </div>
        ) : null}
      </div>

      <p className="px-8 mt-4 text-sm"> {post?.text}</p>

      <p className="flex items-center font-bold mt-4 text-sm gap-2 px-8">
        <ImMusic size={17} />
        original music - {post?.profile.username}
      </p>

      <div className="flex items-center px-8 mt-8">
        <ClientOnly>
          <div className="text-center flex  items-center pb-4">
            <button
              className="rounded-full cursor-pointer p-2 bg-gray-200"
              disabled={hasClickedLike}
              onClick={likeOrUnlike}
            >
              {!hasClickedLike ? (
                <AiFillHeart color="#f02c56" size={22} />
              ) : (
                <BiLoaderCircle size={22} className="animate-spin" />
              )}
            </button>
            <span className="text-xs pl-2 pr-4 text-gray-800 font-semibold">124</span>
          </div>
        </ClientOnly>

        <div className="pb-4 text-center items-center flex">
          <div className="rounded-full bg-gray-200 cursor-pointer">
            <BsChatDots size="22" />
          </div>
          <span className="text-xs pl-2 text-gray-600 font-semibold">4</span>
        </div>
      </div>
    </>
  );
};

export default CommentsHeader;
