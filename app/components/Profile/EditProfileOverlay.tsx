import { Cropper } from "react-advanced-cropper";
import 'react-advanced-cropper/dist/style.css';
import { CropperImageTypes, showErrorObject } from "@/app/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import TextInput from "./TextInput";
import { BiLoaderCircle } from "react-icons/bi";

const EditProfileOverlay = () => {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [cropper, setCropper] = useState<CropperImageTypes | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | "">(
    "https://placehold.co/400"
  );
  const [userName, setUserName] = useState<string | "">("");
  const [userBio, setUserBio] = useState<string | "">("");
  const [isUpdating, setIsUpdating] = useState<boolean | false>(false);
  const [error, setError] = useState<showErrorObject | null>(null);

  const getUploadedImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0]

    if(selectedFile){
      setFile(selectedFile)
      setUploadedImage(URL.createObjectURL(selectedFile))
    }
    else {
      setFile(null)
      setUploadedImage(null)
    }
    
  };

  const cropAndUpdateImage = () => {
    console.log("uploaded")
  }


  const showError = (type: string) => {
    if (error && Object.entries(error).length > 0 && error?.type == type) {
      return error.message;
    }
    return "";
  };

  return (
    <div>
      <div
        id="EditProfileOverlay"
        className="pt-14 flex  justify-center fixed md:pt-[105px] h-full w-full z-50 top-0 left-0 bg-black bg-opacity-50 overflow-auto"
      >
        <div
          className={`relative bg-white w-full sm:h-[580px] h-[655px] max-w-[700px] mx-3 rounded-lg mb-10 p-4 ${
            !uploadedImage ? "h-[655px]" : "h-[580px]"
          }`}
        >
          <div className="border-b absolute flex items-center p-5 w-full justify-between left-0 top-0 border-b-gray-300">
            <h1 className="font-medium text-[22px]">Edit Profile</h1>
            <button
              disabled={isUpdating}
              className="hover:bg-gray-200 p-1 rounded-full"
            >
              <AiOutlineClose size={25} />
            </button>
          </div>

          <div>
            <div
              className={`h-[calc(500px-200px)] ${
                !uploadedImage ? "mt-16" : "mt-[58px]"
              }`}
            >
              {!uploadedImage ? (
                <div>
                  <div
                    id="ProfilePhotoSection"
                    className=" flex flex-col border-b  sm:h-[118px] h-[145px] w-full px-1.5 py-2"
                  >
                    <h3 className="font-semibold text-[15px] sm:mb-0 mb-1  text-gray-700  sm:w-[160px]  sm:text-left text-center ">
                      Profile Photo
                    </h3>

                    <div className="flex items-center justify-center sm:-mt-6">
                      <label
                        htmlFor="image"
                        className="relative cursor-pointer"
                      >
                        <img
                          src={userImage}
                          alt=""
                          className="rounded-full"
                          width={95}
                        />
                        <button className="absolute border-gray-300 right-0 bottom-0 p-1 shadow-xl inline-block rounded-full w-[32px] bg-white h-[32px]">
                          <BsPencil size={17} color="red" className="ml-0.5" />
                        </button>
                      </label>
                      <input
                        type="file"
                        className="hidden"
                        id="image"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={getUploadedImage}
                      />
                    </div>
                  </div>

                  <div
                    id="UserNameSection"
                    className="flex flex-col  border-b px-1.5 mt-1.5 py-2 w-full sm:h-[118px]"
                  >
                    <h3 className="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:text-left text-center">
                      Name
                    </h3>

                    <div className="flex items-center sm:-mt-6 justify-center">
                      <div className="w-full sm:w-[60%] max-w-md">
                        <TextInput
                          string={userName}
                          placeholder="Username"
                          onUpdate={setUserName}
                          inputType="text"
                          error={showError("userName")}
                          name="name"
                        />

                        <p
                          className={`relative text-gray-500 text-sm ${
                            error ? "mt-1" : "mt-1"
                          }`}
                        >
                          Username can only contain letters, numbers,
                          underscores, and periods. Changing your profile name
                          will also change your profile link
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    id="UserBioSection"
                    className="flex flex-col sm:h-[120px] px-1.5 py-2  mt-2  w-full"
                  >
                    <h3 className="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:text-left text-center">
                      Bio
                    </h3>

                    <div className="justify-center flex sm:-mt-6">
                      <div className="w-full sm:w-[60%] max-w-md">
                        <textarea
                          name=""
                          id=""
                          cols={30}
                          rows={4}
                          maxLength={100}
                          value={userBio || ""}
                          onChange={(e) => setUserBio(e.target.value)}
                          className="w-full resize-none bg-[#f1f1f2] text-gray-800 border border-gray-300 py-2.5 rounded-md px-3 focus:outline-none"
                        />
                        <p className={`text-11px text-gray-500 ${userBio.length === 100 ? "text-red-500" : ""}`}>{userBio ? userBio.length : 0}/100</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (<div className="circle-stencil bg-black max-h-[420px] mx-auto w-full ">
                <Cropper 
                stencilProps={{aspectRatio : 1, lines:false}} // remove this to make it croppable in any ratio
                className="h-[400px] "
                onChange={(cropper) => setCropper(cropper.getCanvas())}
                src={uploadedImage}
                />
                </div>)}

            </div>

            <div id="ButtonSection" className="absolute bottom-0 p-5 left-0 border-t border-t-gray-300 w-full">{!uploadedImage ? (
              <div id="UpdateInfoButton" className="flex items-center justify-end">
                <button disabled={isUpdating} className="flex items-center border px-3 rounded-sm  py-[6px] hover:bg-gray-100">
                  <span className="px-2 font-medium text-[15px]">Cancel</span>

                </button>
                <button disabled={isUpdating} className="flex items-center border px-3 rounded-md ml-3  py-[6px] hover:shadow-md bg-[#f02c56] text-white ">
                  <span className="px-2 font-medium text-[15px]">{isUpdating ? <BiLoaderCircle color="#ffffff" size={30} className="animate-spin mx-2.5 my-1"/> : "Save"}</span>

                </button>
              </div>
            ) : (
              <div id="CropperButton" className="flex items-center justify-end">
                <button onClick={() => setUploadedImage(null)} className="flex items-center border px-3 rounded-sm  py-[6px] hover:bg-gray-100">
                  <span className="px-2 font-medium text-[15px]">Cancel</span>

                </button>
                <button onClick={() => cropAndUpdateImage()} className="flex items-center border px-3 rounded-md ml-3  py-[6px] hover:shadow-md bg-[#f02c56] text-white ">
                  <span className="px-2 font-medium text-[15px]">{isUpdating ? <BiLoaderCircle color="#ffffff" size={30} className="animate-spin mx-2.5 my-1"/> : "Apply"}</span>

                </button>
              </div>
            )
            
            }</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileOverlay;
