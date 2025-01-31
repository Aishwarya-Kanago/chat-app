"use client";

import React from "react";
import { MdSettings, MdOutlineLogout } from "react-icons/md";
import Link from "next/link";
import { HiMiniUserCircle } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { axiosInstance } from "../lib/axios";
import { logout } from "../store/authSlice";
import toast from "react-hot-toast";

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
    <div className="flex justify-between m-3 mx-6">
      <Link href="/">
        <div className="flex items-center gap-2">
          <img
            className="h-10 mix-blend-multiply"
            src="/chat-app-logo.png"
            alt="chat-app-img"
          />
          <span className="text-3xl font-bold">Chattify</span>
        </div>
      </Link>
      <div className="flex items-center gap-8">
        {/* <Link href="/settings">
          <div className="flex items-center gap-1">
            <MdSettings className="text-3xl" />
            <span className="text-lg font-bold">Settings</span>
          </div>
        </Link> */}

        {user.isLoggedIn && (
          <>
            <Link href="/profile">
              <div className="flex items-center gap-1">
                <img
                  src={user?.profilePic || "/default-profile.png"}
                  alt={user?.fullName}
                  className="size-8 rounded-full"
                />
                <span className="text-lg font-bold">{user?.fullName}</span>
              </div>
            </Link>

            <button onClick={logoutHandler}>
              <div className="flex items-center gap-1">
                <MdOutlineLogout className="text-3xl" />
                <span className="text-lg font-bold">Logout</span>
              </div>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
