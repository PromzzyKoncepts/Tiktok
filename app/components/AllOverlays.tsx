// this will be a wrapper compoent for anything we want to render on the client side
"use client";

import { useGeneralStore } from "../store/General";
import AuthOverlay from "./AuthOverlay";
import ClientOnly from "./ClientOnly";
import EditProfileOverlay from "./Profile/EditProfileOverlay";

export default function AllOverlays() {
    let{isLoginOpen, isEditProfileOpen} = useGeneralStore()

  return (
    <>
      <ClientOnly>
        {isLoginOpen && <AuthOverlay/> }
        {isEditProfileOpen && <EditProfileOverlay />}
      </ClientOnly>
    </>
  );
}
