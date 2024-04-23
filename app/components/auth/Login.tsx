import { showErrorObject } from "@/app/types";
import React, { useState } from "react";
import TextInput from "../Profile/TextInput";
import { BiLoaderCircle } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { useUser } from "@/app/context/user";

const Login = () => {
  const contextUser = useUser()

  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string | "">("");
  const [password, setPassword] = useState<string | "">("");
  const [error, setError] = useState<showErrorObject | null>(null);

  const validate = () => {
    setError(null);

    let isError = false;

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email) {
      setError({ type: "email", message: "An Email is required" });
      isError = true;
    } else if (!reg.test(email)) {
      setError({ type: "email", message: "The Email is not valid" });
      isError = true;
    } else if (!password) {
      setError({ type: "password", message: "A Password is required" });
      isError = true;
    }
    return isError;
  };

  const showError = (type: string) => {
    if (error && Object.entries(error).length > 0 && error?.type == type) {
      return error.message;
    }
    return "";
  };

  const login = async() => {
    let isError = validate();
    if (isError) return;

    if (!contextUser) return;

    try {
      setLoading(true);
      await contextUser.login(email, password);
      setLoading(false);
      // setIsLoginOpen(false)
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-center text-[28px] mb-4 font-bold">Log in</h1>
        <div className="px-6 pb-2">
          <TextInput
            string={email}
            placeholder="Email address"
            onUpdate={setEmail}
            inputType="email"
            error={showError("email")}
            name="email"
          />
        </div>
        <div className="px-6 pb-2">
          <TextInput
            string={password}
            placeholder="enter password"
            onUpdate={setPassword}
            inputType="password"
            error={showError("password")}
            name="password"
          />
        </div>

        <div className="px-6 mt-6">
          <button
          onClick={login}
            className={`flex items-center justify-center p-2 w-full text-lg font-semibold ${
              !email || !password
                ? "bg-gray-200 text-gray-800"
                : "bg-[#f02c56] text-white"
            }`}
          >
            {loading ? (
              <BiLoaderCircle
                size={23}
                className="animate-spin"
                color="#f02c56"
              />
            ) : (
              "Log In"
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

export default Login;
