"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoIosContacts } from "react-icons/io";
import { User } from "../store/authSlice";
import { getMessages, socket } from "../lib/socketConnection";
import { UserMessages } from "../lib/types";

type SidebarProps = {
  setSelectedUser: Dispatch<SetStateAction<User | undefined>>;
  setServerMessages: Dispatch<SetStateAction<UserMessages>>;
  userData: User[];
  selectedUser: User | undefined;
};

const Sidebar = ({
  userData,
  setSelectedUser,
  setServerMessages,
  selectedUser,
}: SidebarProps) => {
  const [activeUsers, setActiveUsers] = useState<string[]>([]);

  useEffect(() => {
    const handleNewActiveUserResponse = (activeUsersList: string[]) => {
      setActiveUsers(activeUsersList);
    };

    socket.on("newActiveUserResponse", handleNewActiveUserResponse);

    return () => {
      socket.off("newActiveUserResponse", handleNewActiveUserResponse);
    };
  }, [socket, activeUsers]);

  const handleSelectedUser = async (user: User) => {
    setSelectedUser(user);
    const selectedUserMessages = await getMessages(user._id);
    setServerMessages(selectedUserMessages);
    console.log(selectedUserMessages, "messagessssssss alllll");
  };


  // Separate active users from inactive users
  const activeUserList = userData.filter((user) =>
    activeUsers.includes(user._id)
  );
  const inactiveUserList = userData.filter(
    (user) => !activeUsers.includes(user._id)
  );


  return (
    <div className="bg-white flex-2 border-r-2 border-slate-200 lg:w-[25%]">

      <div className="m-4">
        {/* <h3 className="text-xl font-bold mb-2 p-3">Chats</h3> */}
        <div className="flex items-center gap-1 lg:m-3">
          <IoIosContacts className="lg:size-10 size-8" />
          <span className="hidden lg:block lg:text-xl">Contacts</span>
        </div>

        <hr className="border-r-2 border-slate-200 m-3" />
        <ul>
          {userData.map((user: User) => (
            <li key={user._id} onClick={() => handleSelectedUser(user)}>
              <div className="mb-2 lg:flex lg:gap-2 lg:items-center lg:p-2 cursor-pointer hover:bg-slate-500">
                <div className="relative">
                  <img
                    src={user.profilePic || "/default-profile.png"}
                    alt="user-img"
                    className="size-8 lg:size-10 rounded-full object-cover"
                  />

                  {activeUsers.some(
                    (activeUser) => activeUser === user._id
                  ) && (
                    <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                  )}
                </div>

                <div>
                  <p className="hidden lg:block lg:text-lg lg:font-semibold">
                    {user.fullName}
                  </p>
                  <p
                    className={`hidden lg:block lg:${
                      activeUsers.some((activeUser) => activeUser === user._id)
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                  >
                    {activeUsers.some((activeUser) => activeUser === user._id)
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
