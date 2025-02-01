"use client";

import React from "react";
import { MdOutlineLogout } from "react-icons/md";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { axiosInstance } from "../lib/axios";
import { logout } from "../store/authSlice";
import toast from "react-hot-toast";
import Image from "next/image";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    await axiosInstance
      .post("/auth/logout")
      .then((res) => {
        if (res.status === 200) {
          dispatch(logout());
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.message;
        toast.error(`${message}`);
      });
  };

  return (
    <div className="flex justify-between m-3 mb-5 lg:mx-6">
      <Link href="/">
        <div className="flex items-center lg:gap-2 gap-1">
          <Image
            className="h-6 lg:h-10 mix-blend-multiply"
            src="/chat-app-logo.png"
            alt="chat-app-img"
          />
          <span className="text-base lg:text-3xl font-bold">Chattify</span>
        </div>
      </Link>
      <div className="flex items-center gap-8">
        {user.isLoggedIn && (
          <div className="flex justify-center items-center gap-2 lg:gap-5">
            <Link href="/profile">
              <div className="flex items-center gap-2">
                <Image
                  src={user?.profilePic || "/default-profile.png"}
                  alt={user?.fullName}
                  className="size-5 lg:size-8 rounded-full"
                />
                <span className="text-base lg:text-xl font-medium">
                  {user?.fullName}
                </span>
              </div>
            </Link>

            <button onClick={logoutHandler}>
              <div className="flex items-center gap-1">
                <MdOutlineLogout className="size-4 lg:size-8" />
                <span className="text-base lg:text-xl font-medium">Logout</span>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
