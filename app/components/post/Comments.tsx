import { CommentsCompTypes } from "@/app/types";
import React, { useState } from "react";
import ClientOnly from "../ClientOnly";
import SingleComment from "./SingleComment";
import { BiLoaderCircle } from "react-icons/bi";
import { useCommentStore } from "@/app/store/comment";
import { useUser } from "@/app/context/user";
import { useGeneralStore } from "@/app/store/General";
import useCreateComment from "@/app/hooks/useCreateComment";

const Comments = ({ params }: CommentsCompTypes) => {
  let {commentsByPost, setCommentsByPost} = useCommentStore()
  let {setIsLoginOpen} = useGeneralStore()
  const contextUser = useUser()

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [inputFocused, setInputFocused] = useState<boolean>(false);


  const addComment = async () => {
    if(!contextUser?.user) {
      return setIsLoginOpen(true)
    }
    try{
      setIsUploading(true),
      await useCreateComment(contextUser.user.id, params.postId, comment)
      setCommentsByPost(params?.postId)
      setComment('')
      setIsUploading(false)

    }catch(error) {
      console.error(error)
      throw error
    }
    
    
  }
  return (
    <>
      <div
        id="Comments"
        className="relative bg-[f8f8f8] z-0 w-full h-[calc(100%-273px)] border-t-2 overflow-auto"
      >
        <div className="pt-2" />
        <ClientOnly>
          {commentsByPost.length < 1 ? (
            <div className="text-center mt-6 text-xl text-gray-500">
              No comments added yet...
            </div>
          ) : (
            <div>
              {commentsByPost.map((comment, index) => (
                <SingleComment key={index} comment={comment} params={params} />
              ))}
            </div>
          )}
        </ClientOnly>

        <div className="mb-28"></div>
      </div>

      <div
        id="CreateComment"
        className="items-center flex absolute justify-between w-full border-t-2  bottom-0 lg:max-w-[550px] py-5 px-8 bg-white h-[65px]"
      >
        <div
          className={`bg-[#f1f1f2] flex items-center rounded-lg w-full lg:max-[420px] ${
            inputFocused
              ? "border-2 border-gray-400"
              : "border-2 border-[#f1f1f2]"
          }`}
        >
            <input type="text" 
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)} 
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder="add comment..."
            className="bg-[#f1f1f2] text-sm focus:outline-none w-full p-2 rounded-lg lg:max-[420px]"
             />
        </div>

        {!isUploading ? (
            <button disabled={!comment} onClick={addComment} className={`font-semibold text-sm ml-5 pr-1 disabled:cursor-not-allowed ${comment ? 'text-[#f02c56] cursor-pointer' : 'text-gray-400'}`}>Post</button>
        ) : (
            <BiLoaderCircle className="animate-spin" size={18}  />
        )}
      </div>
    </>
  );
};

export default Comments;
