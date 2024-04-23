import React, { useState } from "react";
import TextInput from "../Profile/TextInput";
import { BiLoaderCircle } from "react-icons/bi";
import { showErrorObject } from "@/app/types";
import { FaLinkedin, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import UseGetProfileByUserId from "@/app/hooks/useGetProfileByUserId";
import { useUser } from "@/app/context/user";
import { useRouter } from "next/navigation";

const Register = () => {

  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string | "">("");
  const [username, setUsername] = useState<string | "">("");
  const [email, setEmail] = useState<string | "">("");
  const [password, setPassword] = useState<string | "">("");
  const [confirmPassword, setConfirmPassword] = useState<string | "">("");
  const [error, setError] = useState<showErrorObject | null>(null);

  const contextUser = useUser();

  const showError = (type: string) => {
    if (error && Object.entries(error).length > 0 && error?.type == type) {
      return error.message;
    }
    return "";
  };

  const validate = () => {
    setError(null)

    let isError = false

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (!name) {
            setError({ type: 'name', message: 'A Name is required'})
            isError = true
        } 
        else if (!username) {
            setError({ type: 'username', message: 'username is missing'})
            isError = true
        } 
        else if (!email) {
            setError({ type: 'email', message: 'An Email is required'})
            isError = true
        } else if (!reg.test(email)) {
            setError({ type: 'email', message: 'The Email is not valid'})
            isError = true
        } else if (!password) {
            setError({ type: 'password', message: 'A Password is required'})
            isError = true
        } else if (password.length < 8) {
            setError({ type: 'password', message: 'The Password needs to be longer'})
            isError = true
        } else if (password != confirmPassword) {
            setError({ type: 'password', message: 'The Passwords do not match'})
            isError = true
        }
        return isError
  }

  const register = async() => {
    let isError = validate()
    if(isError) return

    if(!contextUser) return

    try{
      setLoading(true)
      await contextUser.register(name, username, email, password)
      setLoading(false)
      // setIsLoginOpen(false)
      router.refresh()
    }
    catch(error) {
      console.error(error)
      setLoading(false)

    }
  }

  return (
    <>
      <div>
        <h1 className="text-center text-[28px] mb-4 font-bold">
          Create Account
        </h1>
        <div className="px-6 pb-2">
          <TextInput
            string={name}
            placeholder="FullName"
            onUpdate={setName}
            inputType="text"
            error={showError("name")}
            name= "name"
          />
        </div>
        <div className="px-6 pb-2">
          <TextInput
            string={username}
            placeholder="Username"
            onUpdate={setUsername}
            inputType="text"
            error={showError("username")}
            name= "username"
          />
        </div>
        <div className="px-6 pb-2">
          <TextInput
            string={email}
            placeholder="Email address"
            onUpdate={setEmail}
            inputType="email"
            error={showError("email")}
            name= "email"
          />
        </div>
        <div className="px-6 pb-2 mt-2">
          <TextInput
            string={password}
            placeholder="enter password"
            onUpdate={setPassword}
            inputType="password"
            error={showError("password")}
            name= "password"
          />
        </div>
        <div className="px-6 pb-2">
          <TextInput
            string={confirmPassword}
            placeholder="confirm password"
            onUpdate={setConfirmPassword}
            inputType="password"
            error={showError("confirmPassword")}
            name= "password"
          />
        </div>

        <div className="px-6 mt-4">
          <button
          onClick={register}
            className={`flex items-center justify-center p-2 w-full text-lg font-semibold ${
              !email || !password || !name || !confirmPassword
                ? "bg-gray-200 text-gray-700"
                : "bg-[#f02c56] text-white"
            }`}
          >
            {loading ? (
              <BiLoaderCircle
                size={23}
                className="animate-spin"
                color="#ffffff"
              />
            ) : (
              "Create account"
            )}
          </button>
        </div>

        <div className="mt-6 flex px-6 items-center gap-4 text-sm text-gray-400">
          <span className="h-[1px] bg-gray-400 w-full"></span>
          OR
          <span className="h-[1px] bg-gray-400 w-full"></span>
        </div>

        <div className="mt-4 mx-6 p-2 border rounded-lg hover:bg-gray-200">
          <button className="flex w-full items-center text-center  gap-24 ">
            <FcGoogle size={20} />{" "}
            <span className="text-center">Continue with Google</span>
          </button>
        </div>

        <div className="mt-4 mx-6 p-2 border rounded-lg hover:bg-gray-200">
          <button className="flex w-full items-center text-center  gap-[90px] ">
            <FaFacebook size={20} color="#1877F2" />{" "}
            <span className="text-center">Continue with Facebook</span>
          </button>
        </div>

        <div className="mt-4 mx-6 p-2 border rounded-lg hover:bg-gray-200">
          <button className="flex w-full items-center text-center  gap-24 ">
            <FaLinkedin size={20} color="#0a66c2" />{" "}
            <span className="text-center">Continue with LinkedIn</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
