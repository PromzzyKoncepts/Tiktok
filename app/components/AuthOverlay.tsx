'use client'

import { useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import Register from "./auth/Register"
import Login from "./auth/Login"


const AuthOverlay = () => {

    const[isRegistered, setIsRegistered] = useState<boolean>(false)
  return (
    <>
		<div id="AuthOverlay" className="fixed flex items-center justify-center z-50 top-0 bg-black bg-opacity-50 w-full h-full left-0 ">
			<div className="relative max-w-[470px] h-[70%] bg-white w-full p-4 rounded-lg">

				<div className="w-full justify-end flex">
					<button className="rounded-full bg-gray-500 p-1.5">

						<AiOutlineClose size={20} color="white" />
					</button>
				</div>

				{!isRegistered ? <Register /> : <Login />}
			</div>
		</div>
      
    </>
  )
}

export default AuthOverlay
