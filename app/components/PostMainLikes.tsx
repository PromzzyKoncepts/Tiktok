import { useState, useEffect } from "react";
import { Comment, Like, postMainLikesCompTypes } from "../types";
import { AiFillHeart } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { FaBookmark, FaCommentDots, FaShare } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import { useUser } from "../context/user";
import { useGeneralStore } from "../store/General";
import useGetCommentsByPostId from "../hooks/useGetCommentsByPostId";
import useGetLikesByPostId from "../hooks/useGetLikesByPostId";
import useIsLiked from "../hooks/useIsLiked";
import useCreateLike from "../hooks/useCreateLike";
import useDeleteLike from "../hooks/useDeleteLike";

export default function PostMainLikes({ post }: postMainLikesCompTypes) {
  
  const router = useRouter()
  let {setIsLoginOpen} = useGeneralStore()
  const contextUser = useUser()

  const [hasClickedLike, setHasClickedLike] = useState<boolean>(false)
  const [likes, setLikes] = useState<Like[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [userLiked, setUserLiked] = useState<boolean>(false)

  useEffect(() => {
    getAllLikesByPost()
    getAllCommentsByPost()
  }, [post])

  useEffect(() => {
    hasUserLikedPost()
  }, [likes, contextUser])

  const hasUserLikedPost = () => {
    if(!contextUser){
      return
    }

    if(likes.length < 1 || !contextUser?.user?.id){
      setUserLiked(false)
      return
    }

    let res = useIsLiked(contextUser?.user?.id, post?.id, likes)
    setUserLiked(res? true : false)
  }
  
  
    const getAllCommentsByPost = async() => {
      let result = await useGetCommentsByPostId(post?.id)
      setComments(result)
    }
    const getAllLikesByPost = async() => {
      let result = await useGetLikesByPostId(post?.id)
      setLikes(result)
    }


  const like = async () => {
    try{
      setHasClickedLike(true)
      await useCreateLike(contextUser?.user?.id || '', post?.id, )
      await getAllLikesByPost()
      hasUserLikedPost()
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
      await getAllLikesByPost()
      hasUserLikedPost()
      setHasClickedLike(false)
    }catch(error){
      console.error(error)
      setHasClickedLike(false)
    }
  }


  const likeOrUnlike = () => {
    if(!contextUser?.user?.id) return setIsLoginOpen(true)
      let res = useIsLiked(contextUser?.user?.id, post?.id, likes)
    if(!res){
      like()
    }else{
      likes.forEach(like => {
        if(contextUser?.user?.id && contextUser.user.id == like.user_id && like.post_id == post?.id){
          unlike(like.id)
        }
      })
    }
  };


 


  function formatNumber(num:number, precision:number = 2) {
    const map = [
      { suffix: 'T', threshold: 1e12 },
      { suffix: 'B', threshold: 1e9 },
      { suffix: 'M', threshold: 1e6 },
      { suffix: 'K', threshold: 1e3 },
      { suffix: '', threshold: 1 },
    ];
  
    const found = map.find((x) => Math.abs(num) >= x.threshold);
    if (found) {
      const formatted = (num / found.threshold).toFixed(precision) + found.suffix;
      return formatted;
    }
  
    return num;
  }
  

  return (
    <div id={`PostMainLike-${post?.id} `} className="relative mr-[75px]">
      <div className="absolute bottom-0 pl-2">
        <div className="text-center pb-4">
          <button className="rounded-full hover:text-red-600 bg-gray-200 cursor-pointer p-2" disabled={hasClickedLike} onClick={() => likeOrUnlike()}>
            {!hasClickedLike ? (
              < AiFillHeart size={22} color={likes?.length > 0 && userLiked ? 'ff2626' : ""}/>
            ) :(
              <BiLoaderCircle className="animate-spin" size={25}/>
            )}

          </button>
          <span className="text-xs text-gray-800 font-semibold">{formatNumber(likes?.length, 0)}</span>
        </div>

        <button className="pb-4 text-center" onClick={() => router.push(`/post/${post?.id}/${post?.profile?.user_id}`)}>
              <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
                <FaCommentDots size={20} />
              </div>
                <span className="text-xs text-gray-800 font-semibold">
                  {formatNumber(comments?.length, 0)}
                </span>
        </button>



        <button className=" text-center" >
              <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
                <FaBookmark size={20} />
              </div>
                <span className="text-xs text-gray-800 font-semibold">
                  {0}
                </span>
        </button>



        <button className=" text-center" >
              <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
                <IoMdShareAlt size={25} />
              </div>
                <span className="text-xs text-gray-800 font-semibold">
                  {0}
                </span>
        </button>
      </div>
      
    </div>
  );
}
