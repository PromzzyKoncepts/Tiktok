"use client";

import { MenuitemTypes } from "@/app/types";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsCameraVideo, BsPeople, BsPerson } from "react-icons/bs";
import { MdOutlineExplore } from "react-icons/md";
import { RiGroupLine, RiHome4Line } from "react-icons/ri";

const MenuItem = ({ iconString, colorString, sizeString }: MenuitemTypes) => {
  const icons = () => {
    if (iconString === "For You") return <RiHome4Line color={colorString} size={sizeString} />;
    if (iconString === "Following") return <RiGroupLine color={colorString} size={sizeString} />;
    if (iconString === "LIVE") return <BsCameraVideo color={colorString} size={sizeString} />;
    if (iconString === "Friends") return <BsPeople color={colorString} size={sizeString} />;
    if (iconString === "Profile") return <BsPerson color={colorString} size={sizeString} />;
    if (iconString === "Explore") return <MdOutlineExplore color={colorString} size={sizeString} />;
  };
  return (
    <div className="w-full flex items-center hover:bg-gray-100 p-2.5 rounded-md">
      <div className="flex items-center lg:mx-0 mx-auto">{icons()}
      <p className={`hidden lg:block pl-[9px] font-semibold mt-0.5  text-[17px] text-[${colorString}`}>{iconString}</p>
      </div>
    </div>
  );
};

export default MenuItem;
