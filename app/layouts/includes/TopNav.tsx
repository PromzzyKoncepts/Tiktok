import { useUser } from "@/app/context/user";
import UseCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import useSearchProfilesByName from "@/app/hooks/useSearchProfilesByName";
import { useGeneralStore } from "@/app/store/General";
import { RandomUsers } from "@/app/types";
import debounce from "debounce";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiSearch, BiUser } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";

const TopNav = () => {
  const contextUser = useUser();
  const pathName = usePathname();
  const router = useRouter();

  let { setIsLoginOpen, setIsEditProfileOpen } = useGeneralStore();
  let [showMenu, setShowMenu] = useState<boolean>(false);
  let [searchProfiles, setSearchProfiles] = useState<RandomUsers[]>([]);

  const handleSearchName = debounce(async (event: { target: { value: string } }) => {
    if (event.target.value == "") return setSearchProfiles([])

    try {
        const result = await useSearchProfilesByName(event.target.value)
        if (result) return setSearchProfiles(result)
        setSearchProfiles([])
    } catch (error) {
        console.log(error)
        setSearchProfiles([])
        alert(error)
    }
}, 500)

  useEffect(() => {
    setIsEditProfileOpen(false);
  }, []);

  const goTo = () => {
    if (!contextUser?.user) return setIsLoginOpen(true);
    router.push("/upload", { scroll: false });
  };

  const handleLogout = async () => {
    await contextUser?.logout();
    setShowMenu(false);
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
              onChange={handleSearchName}
              className="w-full my-2 pl-3 bg-transparent placeholder-[#838383] hover:placeholder-black text-[15px] focus:outline-none"
              placeholder="Search"
            />

           {searchProfiles.length > 0 && (
             <div className="bg-white absolute max-w-[910px] h-auto w-full z-20 left-0 top-12 shadow-md p-1">
             {searchProfiles.map((profile, index) => (
                <div className="p-1" key={index}>
                  <Link 
                    href={`/profile/${profile?.id}`}
                    className="flex items-center justify-between w-full cursor-pointer hover:bg-[#F12B56] p-1 px-2 hover:text-white"
                    >
                      <div className="flex items-center">
                          <img className="rounded-md" width="40" src={UseCreateBucketUrl(profile?.image) || "/images/placeholder-user.jpg"} />
                          <div className="truncate ml-2">{ profile?.name }</div>
                      </div>
                    </Link>
                </div>
            ))}
           </div>
           )}

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

            {!contextUser?.user?.id ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="flex items-center bg-[#f02c56] text-white border py-[6px] px-3 rounded-sm"
                >
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
                  <button
                    onClick={() => setShowMenu((showMenu = !showMenu))}
                    className="border mt-1 rounded-full border-gray-200"
                  >
                    <img
                      src={UseCreateBucketUrl(contextUser?.user?.image )|| "/images/placeholder-user.jpg"}
                      alt="profile image"
                      className="rounded-full w-[35px]"
                    />
                  </button>
                  {showMenu && (
                    <div className="absolute bg-white rounded-lg py-1.5 w-[200px] shadow-xl  border  top-[40px]  right-0">
                      <button className="flex justify-start items-center w-full px-3 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => {
                        router.push(`/profile/${contextUser?.user?.id}`)
                        setShowMenu(false)
                      }}>
                        <BiUser size={20} />
                        <span className="text-sm font-semibold pl-2">
                          Profile
                        </span>
                      </button>
                      <button
                        onClick={async () => {
                          await contextUser?.logout();
                          setShowMenu(false);
                        }}
                        className="flex items-center justify-start w-full py-3 px-1.5 hover:bg-gray-100 border-t cursor-pointer"
                      >
                        <FiLogOut size={20} />
                        <span className="pl-2 font-semibold text-sm">
                          Log out
                        </span>
                      </button>
                    </div>
                  )}
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
