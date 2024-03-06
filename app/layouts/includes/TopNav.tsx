import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiSearch, BiUser } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";

const TopNav = () => {
  const pathName = usePathname();
  const router = useRouter();

  const handleSearchChange = (event: { target: { value: string } }) => {
    console.log(event.target.value);
  };

  const goTo = () => {
    console.log("here");
  };
  return (
    <>
      <div
        id="TopNav"
        className="fixed bg-white z-30 flex items-center w-full border-b h-[60px]"
      >
        <div
          className={`flex items-center justify-between gap-6 w-full px-4 mx-auto ${
            pathName === "/" ? "max-w-[1150x]" : ""
          }`}
        >
          <Link href="/">
            <img
              className="min-w-[115px] w-[115px]"
              src="/images/tiktok-logo.png"
              alt=""
            />
          </Link>
          <div className="hidden relative md:flex items-center justify-end bg-[#f1f1f2] p-1 rounded-full  max-w-[430px] w-full hover:text-[#282828] hover:shadow">
            <input
              type="text"
              onChange={handleSearchChange}
              className="w-full my-2 pl-3 bg-transparent placeholder-[#838383] hover:placeholder-black text-[15px] focus:outline-none"
              placeholder="Search"
            />

            <div className="bg-white absolute max-w-[910px] h-auto w-full z-20 left-0 top-12 shadow-md p-1">
              <div className="p-1">
                <Link
                  href={`/profile/1`}
                  className="flex items-center w-full justify-between hover:bg-[#f12856] cursor-pointer p-1 px-2 hover:text-white"
                >
                  <div className="items-center flex">
                    <img
                      className="rounded-md "
                      src="https://placehold.co/40"
                      alt=""
                      width={40}
                    />
                    <div className="truncate ml-2">Promise Okechukwu</div>
                  </div>
                </Link>
              </div>
            </div>

            <div className="px-3 border-l border-l-gray-300 flex items-center text-[#a1a2a7] hover:text-[#282828]  py-1 ">
              <BiSearch size={22} />
            </div>
          </div>

          <div className="flex items-center gap-3 ">
            <button
              onClick={goTo}
              className="flex items-center border rounded-sm py-[6px] hover:bg-gray-100 pl-1.5"
            >
              <AiOutlinePlus color="#000000" size={22} />
              <span className="px-2 font-medium text-[15px]">Upload</span>
            </button>

            {true ? (
              <div className="flex items-center gap-3">
                <button className="flex items-center bg-[#f02c56] text-white border py-[6px] px-3 rounded-sm">
                  <span className="whitespace-nowrap mx-4 text-[15px] font-medium">
                    {" "}
                    Log in
                  </span>
                </button>

                <BsThreeDotsVertical size={25} color="#161724" />
              </div>
            ) : (
              <div className="flex items-center ">
                <div className="relative">
                  <button className="border mt-1 rounded-full border-gray-200">
                    <img
                      src="https://placehold.co/35"
                      alt=""
                      className="rounded-full w-[35px]"
                    />
                  </button>

                  <div className="absolute bg-white rounded-lg py-1.5 w-[200px] shadow-xl  border  top-[40px]  right-0">
                    <button className="flex justify-start items-center w-full px-3 py-2 hover:bg-gray-100 cursor-pointer">
                        <BiUser size={20} />
                        <span className="text-sm font-semibold pl-2" >Profile</span>
                    </button>
                    <button className="flex justify-start items-center w-full px-3 py-2 hover:bg-gray-100 cursor-pointer">
                        <FiLogOut size={20} />
                        <span className="text-sm font-semibold pl-2" >Log out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNav;
