import Image from "next/image";
import MainLayout from "./layouts/MainLayout";
import ClientOnly from "./components/ClientOnly";
import PostMain from "./components/PostMain";

export default function Home() {
  return (
    <>
      <MainLayout>
        <div className="mt-[80px] w -[calc(100%-90px)] min-w-[33%] mx-auto">
          <ClientOnly>
            <PostMain post={{
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
            }} />
            <PostMain post={{
              id:"123",
              user_id: "456",
              video_url: "./images/anime.mp4",
              text: "this is some description",
              created_at: "2024-07-01",
              profile: {
                user_id: "456",
                name: "Promise Okechukwu",
                username: "pr0mzzy",
                image: "https://placehold.co/100"

              }
            }} />
            <PostMain post={{
              id:"123",
              user_id: "456",
              video_url: "./images/nezuko.mp4",
              text: "this is some description",
              created_at: "2024-07-01",
              profile: {
                user_id: "456",
                name: "Promise Okechukwu",
                username: "pr0mzzy",
                image: "https://placehold.co/100"

              }
            }} />
          </ClientOnly>
        </div>
      </MainLayout>
    </>
  );
}
