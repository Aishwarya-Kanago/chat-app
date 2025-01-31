"use client";

import React, { useState } from "react";
import { MdEmail, MdLock } from "react-icons/md";
import Link from "next/link";
import { IoEye } from "react-icons/io5";
import { IoIosEyeOff } from "react-icons/io";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { setUserInfo } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { socket } from "../lib/socketConnection";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { push } = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await axiosInstance
      .post("/auth/login", formData)
      .then((res) => {
        const response = res.data;
        if (res.status === 200) {
          dispatch(setUserInfo(response));
          socket.emit("newActiveUser", response);
          push("/");
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.message;
        toast.error(`${message}`);
      });
  };

  return (
    <>
      <div className="flex h-[80vh] justify-center items-center mx-28 rounded-xl">
        <div className="flex flex-col flex-1">
          <div className="flex flex-col justify-center items-center mb-4">
            <h1 className="text-2xl lg:text-5xl font-semibold text-custom-purple">
              Welcome Back
            </h1>
            <p className="mb:2 lg:mb-4 text-lg">Sign in to your account</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5 justify-center items-center w-full ">
              <div className="flex flex-col gap-1 lg:w-[60%]  bg-custom-grey rounded-md p-2">
                <label className="text-gray-700 font-light">Email</label>
                <div className="flex items-center p-1 gap-2">
                  <MdEmail />
                  <input
                    type="email"
                    placeholder="JohnDae@gmail.com"
                    className="focus:outline-none bg-custom-grey w-full"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 lg:w-[60%]  bg-custom-grey rounded-md p-2">
                <label className="text-gray-700 font-light">Password</label>
                <div className="flex items-center p-1 gap-2 relative">
                  <MdLock />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="......"
                    className="focus:outline-none  bg-custom-grey"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="absolute right-0 mr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <IoIosEyeOff className="" />
                    ) : (
                      <IoEye className="" />
                    )}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="bg-custom-purple text-white p-3 rounded-md lg:w-[30%] lg:mt-6 mt-1"
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="text-center m-5">
            <p className="text-sm lg:text-lg font-medium">
              Don't have an account?
              <Link href="/signup" className="text-custom-purple p-1">
                Create Account
              </Link>
            </p>
          </div>
        </div>
        <div className="flex-1 relative hidden lg:block">
          <img src="/Vector-icons.png" className="mt-auto absolute top-0 " />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
