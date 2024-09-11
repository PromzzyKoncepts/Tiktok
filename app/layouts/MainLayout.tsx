"use client"


import { usePathname } from "next/navigation";
import React from "react";
import TopNav from "./includes/TopNav";
import SideNavMain from "./includes/SideNavMain";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  return (
    <>
      <div
        className={` flex justify-between mx-auto lg:px-2.5 w-full px-0 ${
          pathName === "/" ? "max-w-[1500x]" : ""
        }`}
      >
        <TopNav />
        <SideNavMain />
        {children}
      </div>
    </>
  );
}
