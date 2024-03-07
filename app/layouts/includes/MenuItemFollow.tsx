// this will be a wrapper compoent for anything we want to render on the client side

import { MenuItemFollowCompTypes } from "@/app/types";
import Link from "next/link";
import { AiOutlineCheck } from "react-icons/ai";

export default function MenuItemFollow({ user }: MenuItemFollowCompTypes) {
  return (
    <>
      <Link
        href={`/profile/${user?.id}`}
        className="flex items-center hover:bg-gray-100 rounded-md w-full px-2 py-1.5"
      >
        <img
          src={user?.image}
          className="mx-auto lg:mx-0 rounded-full"
          width={35}
          alt=""
        />
        <div className="hidden lg:block lg:pl-2.5">
          <div className="flex items-center">
            <p className="truncate font-semibold text-[14px]">{user?.name}</p>
            {user?.verified && (
              <p className="relative rounded-full ml-1 bg-[#58d5ec] h-[14px]">
                <AiOutlineCheck
                  color="#fff"
                  size={15}
                  className="relative p-[3px]"
                />
              </p>
            )}
          </div>
          <p className="font-light text-[12px] text-gray-600">
            @{user?.username}
          </p>
        </div>
      </Link>
    </>
  );
}
