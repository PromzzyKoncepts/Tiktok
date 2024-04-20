"use client";

import ClientOnly from "@/app/components/ClientOnly";
import Comments from "@/app/components/post/Comments";
import CommentsHeader from "@/app/components/post/CommentsHeader";
import { postPageTypes } from "@/app/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const Post = ({ params }: postPageTypes) => {
  const router = useRouter();

  const loopThroughPostsUp = () => {
    console.log("loop through");
  };
  const loopThroughPostsDown = () => {
    console.log("loop through");
  };

  const postById = {
    id:"123",
    user_id: "456",
    video_url: "https://cdn.pixabay.com/vimeo/849610807/ocean-173530.mp4?width=360&hash=de6ae525ac689219f1ab32778c2da557e12a4070",
    text: "this is some description",
    created_at: "2024-07-01",
    profile: {
      user_id: "456",
      name: "Promise Okechukwu",
      username: "pr0mzzy",
      image: "https://placehold.co/100"

    }
  }

  return (
    <div>
      <div id="PostPage" className="w-full h-screen bg-black overflow-auto justify-between lg:flex">
        <div className="h-full relative lg:w-[calc(100%-540px)]">
          <Link
            href={`/profile/${params?.userId}`}
            className="absolute z-20 m-5 rounded-full text-white bg-gray-700 p-1.5  hover:bg-gray-800"
          >
            <AiOutlineClose size={25} color="#ffffff"/>
          </Link>

          <div>
            <button
              onClick={() => loopThroughPostsUp()}
              className="flex justify-center items-center right-4 top-4 text-center absolute z-20 rounded-full p-1.5 bg-gray-700 hover:bg-gray-800"
            >
              <BiChevronUp color="#ffffff" size={30} />
            </button>
            <button
              onClick={() => loopThroughPostsDown()}
              className="flex justify-center items-center right-4 top-20 text-center absolute z-20 rounded-full p-1.5 bg-gray-700 hover:bg-gray-800"
            >
              <BiChevronDown color="#ffffff" size={30} />
            </button>
          </div>
          <img
            src="/images/tiktok-logo-small.png"
            width={40}
            className="absolute z-20 top-[18px] left-[70px] rounded-full  lg:mx-0 mx-auto"
            alt="video background image"
          />

          <ClientOnly>{postById?.video_url ? <video src="https://cdn.pixabay.com/vimeo/849610807/ocean-173530.mp4?width=360&hash=de6ae525ac689219f1ab32778c2da557e12a4070" className="fixed object-cover my-auto w-full z-0 h-screen"></video> : null}
          
          <div className="bg-black bg-opacity-70 lg:min-w-[480px] z-10 relative">
            {true ? (
              
              <video autoPlay loop controls muted 
              className="h-screen mx-auto" 
              src="https://cdn.pixabay.com/vimeo/849610807/ocean-173530.mp4?width=360&hash=de6ae525ac689219f1ab32778c2da557e12a4070"/>

            ) : null}

          </div>
          </ClientOnly>
        </div>

        <div id="InfoSection" className="lg:max-w-[550px] relative w-full bg-white h-full">
          <div className="py-7"></div>

          <ClientOnly>
            {postById?.video_url ? (
              <CommentsHeader post={postById} params={params} />
            ) : ( null)}
          </ClientOnly>
          <Comments params={params}/>
        </div>
      </div>
    </div>
  );
};

export default Post;
