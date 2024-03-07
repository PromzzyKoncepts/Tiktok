""

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import MenuItem from "./MenuItem";
import ClientOnly from "@/app/components/ClientOnly";
import MenuItemFollow from "@/app/layouts/includes/MenuItemFollow";

const SideNavMain = () => {
  const pathName = usePathname();
  const currentYear: number = new Date().getFullYear()
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div
        id="SideNavMain"
        className={`fixed z-20 pt-[70px] h-full bg-white lg:border-r-0 border-r w-[75px] hover:overflow-scroll ${
          pathName === "/" ? "lg:w-[250px]" : "lg:w-[220px]"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ overflowY: isHovered ? "scroll" : "hidden" }}
      >
        <div className="lg:w-full w-[55px] mx-auto">
          <Link href="/" className="">
            <MenuItem
              iconString="For You"
              colorString={pathName == "/" ? "#f02c56" : ""}
              sizeString="25"
            />
          </Link>
          <Link href="/following">
            <MenuItem
              iconString="Following"
              colorString={pathName == "/" ? "#f02c56" : ""}
              sizeString="25"
            />
          </Link>
          <Link href="/friends">
            <MenuItem
              iconString="Friends"
              colorString={pathName == "/" ? "#f02c56" : ""}
              sizeString="25"
            />
          </Link>
          <Link href="/explore">
            <MenuItem
              iconString="Explore"
              colorString={pathName == "/" ? "#f02c56" : ""}
              sizeString="25"
            />
          </Link>
          <Link href="/live">
            <MenuItem
              iconString="LIVE"
              colorString={pathName == "/" ? "#f02c56" : ""}
              sizeString="25"
            />
          </Link>
          <Link href="/@">
            <MenuItem
              iconString="Profile"
              colorString={pathName == "/" ? "#f02c56" : ""}
              sizeString="25"
            />
          </Link>

          <div className="border-b lg:ml-2  mt-2"></div>
          <h3 className="hidden lg:block text-xs text-gray-600 font-semibold pb-2 px-2 pt-4">
            Suggested accounts
          </h3>

          <div className="block pt-3 lg:hidden" />
          <ClientOnly>
            <div className="cursor-pointer">
              <MenuItemFollow
                user={{
                  id: "1",
                  name: "test user",
                  username: "test",
                  image: "https://placehold.co/50",
                  verified: true,
                }}
              />
              <MenuItemFollow
                user={{
                  id: "1",
                  name: "Promise Okechukwu",
                  username: "pr0mzzy",
                  image: "https://placehold.co/50",
                  verified: true,
                }}
              />
              <MenuItemFollow
                user={{
                  id: "1",
                  name: "Maxwell",
                  username: "maxwell055",
                  image: "https://placehold.co/50",
                  verified: false,
                }}
              />
            </div>
          </ClientOnly>

          <button className="lg:block hidden text-[#f02c56] pt-1.5 pl-2 text-[12px]">
            See all
          </button>
          {!true ? (
            <div>
              <div className="border-b lg:ml-2  mt-2"></div>
              <h3 className="hidden lg:block text-xs text-gray-600 font-semibold pb-2 px-2 pt-4">
                following accounts
              </h3>

              <div className="block pt-3 lg:hidden" />
              <ClientOnly>
                <div className="cursor-pointer">
                  <MenuItemFollow
                    user={{
                      id: "1",
                      name: "Promise Okechukwu",
                      username: "pr0mzzy",
                      image: "https://placehold.co/50",
                      verified: true,
                    }}
                  />
                  <MenuItemFollow
                    user={{
                      id: "1",
                      name: "Maxwell",
                      username: "maxwell055",
                      image: "https://placehold.co/50",
                      verified: false,
                    }}
                  />
                </div>
              </ClientOnly>

              <button className="lg:block hidden text-[#f02c56] pt-1.5 pl-2 text-[12px]">
                See more
              </button>
            </div>
          ) : (
            <div className="pt-1.5 lg:block hidden pl-2 pr-2">
              <p className="text-gray-600 text-[14px]">
                Log in to follow creators, like videos, and view comments.
              </p>
              <button className="text-[#f02c56] font-bold p-3 border mt-2 border-[#f02c56] w-[13rem]">
                Log in
              </button>
            </div>
          )}

          <div className="lg:block hidden text-[12px] text-gray-500">
            <p className="pt-4 px-2">
              About   Newsroom   TikTok Shop    Contact Careers
            </p>
            <p className="pt-4 px-2">
              TikTok for Good Advertise Developers Transparency TikTok Rewards
              TikTok Browse TikTok Embeds
            </p>
            <p className="pt-4 px-2">
              Help Safety Terms Privacy Creator Portal Community Guidelines
            </p>
            <p className="pt-4 px-2">© {currentYear} TikTok</p>
          </div>

          <div className="pb-14"></div>
        </div>
      </div>
    </>
  );
};

export default SideNavMain;
