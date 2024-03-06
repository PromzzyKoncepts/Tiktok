import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import MenuItem from "./MenuItem";


const SideNavMain = () => {
  const pathName = usePathname();
  
  return (
    <>
      <div id="SideNavMain" className={`fixed z-20 pt-[70px] h-full bg-white lg:border-r-0 border-r w-[75px] overflow-auto ${pathName === "/" ? "lg:w-[310px]" : "lg:w-[220px]"}`}>
        <div className="lg:w-full w-[55px] mx-auto">
          <Link href="/" className="">
            <MenuItem iconString="For You" colorString={pathName == "/" ? "#f02c56" : ""} sizeString="25"/>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideNavMain;
