"use client";

import moment from "moment";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { BsChatDots, BsTrash3 } from "react-icons/bs";
import Link from "next/link";
import { ImMusic } from "react-icons/im";
import { CommentsHeaderCompTypes } from "@/app/types";
import ClientOnly from "../ClientOnly";
import { AiFillHeart } from "react-icons/ai";
import { useLikeStore } from "@/app/store/like";
import { useGeneralStore } from "@/app/store/General";
import useIsLiked from "@/app/hooks/useIsLiked";
import useCreateLike from "@/app/hooks/useCreateLike";
import { useUser } from "@/app/context/user";
import { useCommentStore } from "@/app/store/comment";
import useDeleteLike from "@/app/hooks/useDeleteLike";
import useDeletePostById from "@/app/hooks/useDeletePostById";
import UseCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";


const CommentsHeader = ({ post, params }: CommentsHeaderCompTypes) => {
  const router = useRouter();
  let{setLikesByPost, likesByPost} = useLikeStore()
  let {commentsByPost, setCommentsByPost} = useCommentStore()
  let{setIsLoginOpen} = useGeneralStore()
  const contextUser = useUser()

  
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [hasClickedLike, setHasClickedLike] = useState<boolean>(false);
  const [userLiked, setUserLiked] = useState<boolean>(false);
  
  
  useEffect(() => {
    setCommentsByPost(params?.postId)
    setLikesByPost(params?.postId)
  }, [post])
  useEffect(() => {
    hasUserLikedPost()
  }, [likesByPost])

  const hasUserLikedPost = () => {
    if(likesByPost.length < 1 || !contextUser?.user?.id){
      setUserLiked(false)
      return
    }

    let res = useIsLiked(contextUser?.user?.id, params?.postId, likesByPost)
    setUserLiked(res? true : false)
  }

  const like = async () => {
    try{
      setHasClickedLike(true)
      await useCreateLike(contextUser?.user?.id || '', params?.postId, )
      setLikesByPost(params?.postId)
      setHasClickedLike(false)
    }catch(error){
      console.error(error)
      setHasClickedLike(false)
    }
  }

  const unlike = async (id:string) => {
    try{
      setHasClickedLike(true)
      await useDeleteLike(id)
      setLikesByPost(params?.postId)
      setHasClickedLike(false)
    }catch(error){
      console.error(error)
      setHasClickedLike(false)
    }
  }

  const likeOrUnlike = () => {
    if(!contextUser?.user?.id) return setIsLoginOpen(true)
      let res = useIsLiked(contextUser?.user?.id, params.postId, likesByPost)
    if(!res){
      like()
    }else{
      likesByPost.forEach(like => {
        if(contextUser?.user?.id && contextUser.user.id == like.user_id && like.post_id == params?.postId){
          unlike(like.id)
        }
      })
    }
  };


  const deletePost = async () => {
    let res = confirm('Are you sure you want to delete this post?')
    if (!res) return

    setIsDeleting(true)

    try {
        await useDeletePostById(params?.postId, post?.video_url)
        router.push(`/profile/${params.userId}`)
        setIsDeleting(false)
    } catch (error) {
        console.log(error)
        setIsDeleting(false)
        alert(error)
    }
}
  
  return (
    <>
      <div className="flex items-center justify-between px-8">
        <div className="flex items-center">
          <Link href={`/profile/${post?.user_id}`} className="">
            {post?.profile.image ? (
              <img
                src={UseCreateBucketUrl(post?.profile.image)}
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
              {post?.profile.name}
              <span className="relative -top-[2px] text-3xl pl-1 pr-0.5">
                .
              </span>
              <span className="font-medium text-xs">{moment(post?.created_at).fromNow()}</span>
            </div>
          </div>
        </div>

        {/* remember to remove this true and null ternary operators, its irrelevant here */}
        {contextUser?.user?.id == post?.user_id && (
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
        ) }
      </div>

      <p className="px-8 mt-4 text-sm"> {post?.text}</p>

      <p className="flex items-center font-bold mt-4 text-sm gap-2 px-8">
        <ImMusic size={17} />
        original music - {post?.profile?.name}
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
                <AiFillHeart size={22}  color={likesByPost?.length > 0 && userLiked ? 'ff2626' : ""} />
              ) : (
                <BiLoaderCircle size={22} className="animate-spin" />
              )}
            </button>
            <span className="text-xs pl-2 pr-4 text-gray-800 font-semibold">{likesByPost?.length}</span>
          </div>
        </ClientOnly>

        <div className="pb-4 text-center items-center flex">
          <div className="rounded-full bg-gray-200 cursor-pointer">
            <BsChatDots size="22" />
          </div>
          <span className="text-xs pl-2 text-gray-600 font-semibold">{commentsByPost?.length}</span>
        </div>
      </div>
    </>
  );
};

export default CommentsHeader;
