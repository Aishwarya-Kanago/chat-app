"use client";

import React, { useState } from "react";
import { MdPerson, MdEmail, MdLock } from "react-icons/md";
import Link from "next/link";
import { IoEye } from "react-icons/io5";
import { IoIosEyeOff } from "react-icons/io";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../store/authSlice";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const { push } = useRouter();

  const validateform = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return toast.error("Invalid email format");
    }
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const success = validateform();

    if (success === true) {
      await axiosInstance
        .post("/auth/signup", formData)
        .then((res) => {
          const response = res.data;
          if (res.status === 201) {
            dispatch(setUserInfo(response));
            push("/");
          }
        })
        .catch((error) => {
          const message = error?.response?.data?.message;
          toast.error(`${message}`);
        });
    }
  };

  return (
    <>
      <div className="flex h-[80vh] justify-center items-center mx-28 rounded-xl">
        <div className="flex flex-col flex-1">
          <div className="flex flex-col justify-center items-center mb-4 ">
            <h1 className="text-5xl font-semibold text-custom-purple">
              Create Account
            </h1>
            <p className="mb-4 text-lg">Get Started with your free account</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5 justify-center items-center w-full ">
              <div className="flex flex-col gap-1 lg:w-[60%]  bg-custom-grey rounded-md p-2">
                <label className="text-gray-700 font-light">Full Name</label>
                <div className="flex items-center p-1 gap-2">
                  <MdPerson />
                  <input
                    type="text"
                    placeholder="John Dae"
                    className="focus:outline-none bg-custom-grey w-full"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                </div>
              </div>
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
                className="bg-custom-purple text-white p-3 rounded-md lg:w-[30%] mt-6"
              >
                Create Account
              </button>
            </div>
          </form>
          <div className="text-center m-5">
            <p className="text-lg font-medium">
              Already have an account?
              <Link href="/login" className="text-custom-purple p-1">
                Sign in
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

export default SignupPage;
