import { SingleCommentCompTypes } from "@/app/types";
import Link from "next/link";
import React, { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";

const SingleComment = ({ comment, params }: SingleCommentCompTypes) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const deleteThisComment = () => {
    const res = confirm("are you sure you want to delete this comment");
    if (!res) {
      return;
    }
  };
  return (
    <>
      <div
        id="SingleComment"
        className="flex items-center justify-between px-8 mt-4"
      >
        <div className="relative w-full items-center">
          <Link href={`/profile/${comment?.profile.user_id}`}>
            <img
              src={comment?.profile.image}
              width={40}
              alt=""
              className="absolute top-0 rounded-full lg:mx-0 mx-auto"
            />
          </Link>

          <div className="ml-14 pt-0.5 w-full">
            <div className="font-semibold flex text-lg justify-between items-center">
              <span className="items-center flex justify-center">
                {comment?.profile?.name} -{" "}
                <span className="text-[12px] text-gray-600 font-light ml-1">
                  {comment?.created_at}
                </span>
              </span>

              {true && (
                <button
                  disabled={isDeleting}
                  onClick={() => deleteThisComment()}
                >
                  {isDeleting ? (
                    <BiLoaderCircle className="animate-spin" size={18} />
                  ) : (
                    <BsTrash3 className="cursor-pointer" size={18} />
                  )}
                </button>
              )}
            </div>

            <p className="font-light text-[15px]">{comment?.text} </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleComment;
