"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Chatbox from "./components/Chatbox";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { useRouter } from "next/navigation";
import { axiosInstance } from "./lib/axios";
import { setUserInfo, User } from "./store/authSlice";

const page = () => {
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [userData, setUserData] = useState<User[]>([]);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { push } = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const getSidebarUsers = async () => {
      await axiosInstance.get("/messages/users").then((res) => {
        const response = res.data;
        setSelectedUser(response[0]);
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
        <div className="h-[80vh] m-10">
          <div className="flex items-center justify-center">
            <div className="shadow-lg rounded-lg w-full max-w-6xl h-[calc(100vh-8rem)]">
              <div className="flex rounded-lg w-full max-w-6xl h-[calc(100vh-8rem)] overflow-hidden ">
                <Sidebar
                  userData={userData}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
                {/* <Sidebar /> */}
                {/* <NoChatSelected />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />} */}
                <Chatbox selectedUser={selectedUser} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
