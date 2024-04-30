'use client'
import Image from "next/image";
import MainLayout from "./layouts/MainLayout";
import ClientOnly from "./components/ClientOnly";
import PostMain from "./components/PostMain";
import { usePostStore } from "./store/post";
import { useEffect } from "react";

export default function Home() {
  let { allPosts, setAllPosts } = usePostStore();
  useEffect(() => {
    setAllPosts();
  }, []);
  return (
    <>
      <MainLayout>
        <div className="mt-[80px] w -[calc(100%-90px)] min-w-[33%] mx-auto">
          <ClientOnly>
            {allPosts.map((post, index) => (
              <PostMain post={post} key={index} />

            ))}
            
          </ClientOnly>
        </div>
      </MainLayout>
    </>
  );
}
