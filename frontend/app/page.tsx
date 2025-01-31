"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Chatbox from "./components/Chatbox";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { useRouter } from "next/navigation";
import { axiosInstance } from "./lib/axios";
import { setUserInfo, User } from "./store/authSlice";
import NoChatSelected from "./components/NoChatSelected";
import { UserMessages } from "./lib/types";

const page = () => {
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [userData, setUserData] = useState<User[]>([]);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { push } = useRouter();
  const dispatch = useDispatch();
  const [serverMessages, setServerMessages] = useState<UserMessages>([]);

  useEffect(() => {
    const getSidebarUsers = async () => {
      await axiosInstance.get("/messages/users").then((res) => {
        const response = res.data;
        setUserData(response);
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

  return (
    <>
      {isLoggedIn && (
        <div className="h-[80vh] lg:m-10 m-2">
          <div className="flex items-center justify-center">
            <div className="shadow-xl rounded-lg w-full max-w-6xl h-[calc(100vh-8rem)]">
              <div className="flex rounded-lg w-full max-w-6xl h-[calc(100vh-8rem)] overflow-hidden ">
                <Sidebar
                  userData={userData}
                  setSelectedUser={setSelectedUser}
                  setServerMessages={setServerMessages}
                  selectedUser={selectedUser}
                />
                {!selectedUser ? (
                  <NoChatSelected />
                ) : (
                  <Chatbox
                    selectedUser={selectedUser}
                    setServerMessages={setServerMessages}
                    serverMessages={serverMessages}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
