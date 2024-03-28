"use client";

import ClientOnly from "@/app/components/ClientOnly";
import PostUser from "@/app/components/Profile/PostUser";
import MainLayout from "@/app/layouts/MainLayout";
import { profilePageCompTypes } from "@/app/types";
import { BsPencil } from "react-icons/bs";

export default function Profile({ params }: profilePageCompTypes) {
  const currentProfile = {
    id: "12345",
    user_id: "12345",
    username: "pr0mzzy",
    name: "Promise Okechukwu",
    image: "https://placehold.co/100",
    bio: "I am the creator of this clone of tiktok",
    followers: 10000000,
    following: 1000,
    totalLikes: 230000000,
  };

  function formatNumber(num: number, precision: number = 1) {
    const map = [
      { suffix: "T", threshold: 1e12 },
      { suffix: "B", threshold: 1e9 },
      { suffix: "M", threshold: 1e6 },
      { suffix: "K", threshold: 1e3 },
      { suffix: "", threshold: 1 },
    ];

    const found = map.find((x) => Math.abs(num) >= x.threshold);
    if (found) {
      const formatted =
        (num / found.threshold).toFixed(precision) + found.suffix;
      return formatted;
    }

    return num;
  }

  return (
    <>
      <MainLayout>
        <div className="2xl:mx-auto pt-[90px] ml-[90px] 2xl:pl-[225px] lg:pl-[160px] lg:pr-0 w-[calc(100% - 250px)] pr-3 max-w-[1800px]">
          <div className="flex w-[calc(100vw-250px)]">
            <ClientOnly>
              {true ? (
                <img
                  src={currentProfile.image}
                  alt=""
                  className="w-[120px] min-w-[120px] rounded-full"
                />
              ) : (
                <div className="rounded-full max-w-[150px] h-[120px] bg-gray-200"></div>
              )}
            </ClientOnly>

            <div className="ml-5 w-full">
              <ClientOnly>
                {currentProfile?.name ? (
                  <div>
                    <p className="text-[30px] font-bold truncate">
                      {currentProfile.name}
                    </p>
                    <p className="text-[18px] truncate">
                      @{currentProfile.username}
                    </p>
                  </div>
                ) : (
                  <div className="h-[60px]"></div>
                )}
              </ClientOnly>

              {true ? (
                <button className="border hover:bg-gray-100 flex items-center rounded-md py-1.5 mt-3 px-3.5 font-semibold text-[13px]">
                  <BsPencil className="mt-0.5 mr-1" size={18} />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <button className="flex items-center mt-3 text-[15px] font-semibold text-white rounded-md py-1.5 px-8 bg-[#FE2C55]">
                  Follow
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center pt-4">
            <div className="mr-4 flex items-center gap-2">
              <p className="font-semibold text-gray-500">
                {formatNumber(currentProfile?.following)}
                <span className="font-light"> Following</span>
              </p>
              <p className="font-semibold ">
                {formatNumber(currentProfile?.followers)}{" "}
                <span className="font-light">Followers</span>
              </p>
              <p className="font-semibold ">
                {formatNumber(currentProfile?.totalLikes || 0)}{" "}
                <span className="font-light">Likes</span>
              </p>
            </div>
          </div>
          <ClientOnly>
            <p className="pt-4 text-[15px] mr-4 text-gray-500 max-w-[500px]  font-light">
              {currentProfile?.bio}
            </p>
          </ClientOnly>

          <ul className="w-full border-b flex items-center pt-4">
            <li className="min-w-[20%] px-2 text-center py-2 font-semibold border-b-black border-b-2 text-[17px]">
              Videos
            </li>
            <li className="min-w-[20%] px-2 text-center py-2 font-semibold hover:border-b-black  border-b-2 text-[17px]">
              Favorites
            </li>
            <li className="min-w-[20%]  px-2 text-center py-2 font-semibold  hover:border-b-black border-b-2 text-[17px]">
              Likes
            </li>
          </ul>

          <ClientOnly>
            <div className="grid mt-3 2xl:grid-cols-6 xl:grid-cols-5  lg:grid-cols-4  md:grid-cols-3 grid-cols-2 gap-3">
              <PostUser
                post={{
                  id: "123",
                  user_id: "456",
                  video_url:
                    "https://cdn.pixabay.com/vimeo/849610807/ocean-173530.mp4?width=360&hash=de6ae525ac689219f1ab32778c2da557e12a4070",
                  text: "this is some description for this app jfdosjf",
                  views: 100000,
                  created_at: "2024-07-01",
                }}
              />
            </div>
          </ClientOnly>
        </div>
      </MainLayout>
    </>
  );
}
