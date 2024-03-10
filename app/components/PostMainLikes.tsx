import { useState } from "react";
import { Comment, Like, postMainLikesCompTypes } from "../types";
import { AiFillHeart } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { FaBookmark, FaCommentDots, FaShare } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";

export default function PostMainLikes({ post }: postMainLikesCompTypes) {
  
  const router = useRouter()


  const [hasClickedLike, setHasCLickedLike] = useState<boolean>(false)
  const [likes, setLikes] = useState<Like[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [userLiked, setUserLiked] = useState<boolean>(false)

  const likeOrUnlike = () => {

  }


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
          <span className="text-xs text-gray-800 font-semibold">{formatNumber(likes?.length, 2)}</span>
        </div>

        <button className="pb-4 text-center" onClick={() => router.push(`/post/${post?.id}/${post?.profile?.user_id}`)}>
              <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
                <FaCommentDots size={20} />
              </div>
                <span className="text-xs text-gray-800 font-semibold">
                  {formatNumber(comments?.length, 2)}
                </span>
        </button>



        <button className=" text-center" >
              <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
                <FaBookmark size={20} />
              </div>
                <span className="text-xs text-gray-800 font-semibold">
                  {formatNumber(comments?.length, 2)}
                </span>
        </button>



        <button className=" text-center" >
              <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
                <IoMdShareAlt size={25} />
              </div>
                <span className="text-xs text-gray-800 font-semibold">
                  {formatNumber(comments?.length, 2)}
                </span>
        </button>
      </div>
      
    </div>
  );
}
