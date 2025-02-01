"use client";

import React, { useEffect } from "react";
import { IoIosContacts } from "react-icons/io";
import { setUserInfo, User } from "../store/authSlice";
import { getMessages, socket } from "../lib/socketConnection";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { axiosInstance } from "../lib/axios";
import {
  setActiveUsers,
  setSelectedUser,
  setServerMessages,
  setUserData,
} from "../store/chatSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Sidebar = () => {
  const chat = useSelector((state: RootState) => state.chat);
  const dispatch = useDispatch();
  const { push } = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    const getSidebarUsers = async () => {
      await axiosInstance.get("/messages/users").then((res) => {
        const response = res.data;
        dispatch(setUserData(response));
      });
    };

    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      push("/login");
    } else {
      dispatch(setUserInfo(JSON.parse(savedUser)));
      getSidebarUsers();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const handleNewActiveUserResponse = (activeUsersList: string[]) => {
      console.log(activeUsersList, "activeUsersList");
      dispatch(setActiveUsers(activeUsersList));
    };

    socket?.on("newActiveUserResponse", handleNewActiveUserResponse);

    return () => {
      socket?.off("newActiveUserResponse", handleNewActiveUserResponse);
    };
  }, [socket, chat.activeUsers]);

  const handleSelectedUser = async (user: User) => {
    dispatch(setSelectedUser(user));
    const selectedUserMessages = await getMessages(user._id);
    dispatch(setServerMessages(selectedUserMessages));
    console.log(selectedUserMessages, "messagessssssss alllll");
  };

  return (
    <div className="bg-white flex-2 border-r-2 border-slate-200 lg:w-[25%]">
      <div className="m-4">
        <div className="flex items-center gap-1 lg:m-3">
          <IoIosContacts className="lg:size-10 size-8" />
          <span className="hidden lg:block lg:text-xl">Contacts</span>
        </div>

        <hr className="border-r-2 border-slate-200 m-3" />
        <ul>
          {chat.userData.map((user: User) => (
            <li key={user._id} onClick={() => handleSelectedUser(user)}>
              <div className="mb-2 lg:flex lg:gap-2 lg:items-center lg:p-2 cursor-pointer hover:bg-slate-500">
                <div className="relative">
                  <Image
                    src={user.profilePic || "/default-profile.png"}
                    alt="user-img"
                    className="size-8 lg:size-10 rounded-full object-cover"
                    height={40}
                    width={40}
                  />

                  {chat.activeUsers.some(
                    (activeUser) => activeUser === user._id
                  ) && (
                    <span className="absolute bottom-0 right-0 size-2 lg:size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                  )}
                </div>

                <div>
                  <p className="hidden lg:block lg:text-lg lg:font-semibold">
                    {user.fullName}
                  </p>
                  <p
                    className={`hidden lg:block lg:${
                      chat.activeUsers.some(
                        (activeUser) => activeUser === user._id
                      )
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                  >
                    {chat.activeUsers.some(
                      (activeUser) => activeUser === user._id
                    )
                      ? "Online"
                      : "Offline"}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
