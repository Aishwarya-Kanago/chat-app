"use client";

import React, { useEffect } from "react";
import { FcCamera } from "react-icons/fc";
import { MdPerson } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useRouter } from "next/navigation";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { setUserInfo, updateProfilePic } from "../store/authSlice";
import Image from "next/image";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      if (typeof base64Image === "string") {
        await axiosInstance
          .put("/auth/update-profile", { profilePic: base64Image })
          .then((res) => {
            const response = res.data;
            if (res.status === 200) {
              dispatch(updateProfilePic(response));
              toast.success("Profile Updated Successfully!");
            }
          })
          .catch((error) => {
            const message = error?.response?.data?.message;
            toast.error(`${message}`);
          });
      }
    };
  };

  const user = useSelector((state: RootState) => state.auth);

  const { push } = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      push("/login");
    } else {
      dispatch(setUserInfo(JSON.parse(savedUser)));
    }
  }, [isLoggedIn]);

  return (
    <>
      {user?.isLoggedIn && (
        <div className="flex justify-center items-center h-[80v]">
          <div className="flex flex-col lg:w-[30%] justify-center items-center gap-4 shadow-lg p-8 m-10">
            <div className="flex flex-col items-center justify-center gap-1 lg:gap-3">
              <h1 className="text-2xl lg:text-5xl font-semibold text-custom-purple">
                Profile
              </h1>
              <p className="text-base lg:text-lg">Your profile information</p>
            </div>
            <div>
              <label
                htmlFor="avatar-upload"
                className="cursor-pointer relative"
              >
                <Image
                  src={user?.profilePic || "/default-profile.png"}
                  alt="profile-img"
                  className="size-32 rounded-full object-cover border-4"
                />
                <FcCamera className="w-5 h-5 text-base-200 absolute bottom-2 right-1 bg-base-content hover:scale-105 transition-all duration-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <div className="flex flex-col gap-1 w-full  bg-custom-grey rounded-md p-2">
              <label className="text-gray-700 font-light w-full">
                Full Name
              </label>
              <div className="flex items-center p-1 gap-2">
                <MdPerson />
                <p>{user?.fullName}</p>
              </div>
            </div>
            <div className="flex flex-col gap-1 w-full  bg-custom-grey rounded-md p-2">
              <label className="text-gray-700 font-light">Email</label>
              <div className="flex items-center p-1 gap-2">
                <MdPerson />
                <p>{user?.email}</p>
              </div>
            </div>
            <div className="flex flex-col gap-1 w-full bg-custom-grey rounded-md p-2">
              <label className="text-gray-700 font-light">
                Account Information
              </label>
              <div className="flex justify-between items-center p-1 gap-2">
                <span className="text-black font-light">Member Since</span>
                <span className="text-xs">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US")
                    : "N/A"}
                </span>
              </div>
              <hr className="border-t border-gray-300 my-2" />
              <div className="flex justify-between items-center p-1 gap-2">
                <span className="text-black font-light">Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
