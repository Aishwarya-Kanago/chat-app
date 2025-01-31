"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineImage } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import ChatContainer from "./ChatContainer";
import { sendMessage, socket } from "../lib/socketConnection";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { appendToServerMessages } from "../store/chatSlice";
import NoChatSelected from "./NoChatSelected";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const Chatbox = () => {
  const [message, setMessage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null); // Reference for file input

  const user = useSelector((state: RootState) => state.auth);
  const chat = useSelector((state: RootState) => state.chat);
  const dispatch = useDispatch();

  const onChangeHandler = (e: any) => {
    setMessage(e.target.value);
  };

  const onclickHandler = () => {
    if (!chat.selectedUser?._id) return;

    if (!message) return;

    sendMessage({ message: message }, chat.selectedUser?._id);
    dispatch(
      appendToServerMessages({
        message: message,
        senderId: user._id,
        receiverId: chat.selectedUser?._id,
        createdAt: new Date().toISOString(),
      })
    );

    setMessage("");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      if (!chat.selectedUser?._id) return;
      const base64Image = reader.result;
      if (typeof base64Image === "string") {
        sendMessage({ image: base64Image }, chat.selectedUser?._id);
        dispatch(
          appendToServerMessages({
            image: base64Image,
            senderId: user._id,
            receiverId: chat?.selectedUser?._id,
            createdAt: new Date().toISOString(),
          })
        );
      }
    };
  };

  useEffect(() => {
    const handleMessage = (
      responseMessage: string,
      imageUrl: string,
      senderUserId: string
    ) => {
      console.log(responseMessage, "responseMessage");

      dispatch(
        appendToServerMessages({
          message: responseMessage,
          image: imageUrl,
          senderId: senderUserId,
          receiverId: user._id,
          createdAt: new Date().toISOString(),
        })
      );
    };

    socket.on("responseMessage", handleMessage);

    return () => {
      socket.off("responseMessage", handleMessage);
    };
  }, []);

  return (
    <>
      {chat.selectedUser ? (
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <div className="flex gap-2 items-center p-2 cursor-pointer hover:bg-slate-500">
              <img
                src={chat.selectedUser?.profilePic || "/default-profile.png"}
                alt="user-img"
                className="size-8 lg:size-10 rounded-full"
              />
              <div>
                <p className="text-base lg:text-lg font-semibold">
                  {chat.selectedUser?.fullName}
                </p>
                <p
                  className={`${
                    chat.activeUsers.some(
                      (activeUser) => activeUser === chat.selectedUser?._id
                    )
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {chat.activeUsers.some(
                    (activeUser) => activeUser === chat.selectedUser?._id
                  )
                    ? "Online"
                    : "Offline"}
                </p>
              </div>
            </div>
          </div>
          <ChatContainer />
          <div className="bg-custom-grey flex items-center gap-1 lg:gap-4">
            <input
              type="textarea"
              placeholder="Type a Message"
              className="p-2 lg:p-4 rounded-lg m-1 mb-2 lg:m-3 w-[80%]"
              value={message}
              onChange={onChangeHandler}
            />
            <label htmlFor="imageUpload" className="cursor-pointer relative">
              <MdOutlineImage className="lg:size-8" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageUpload}
                id="imageUpload"
              />
            </label>
            <IoIosSend className="lg:size-8" onClick={onclickHandler} />
          </div>
        </div>
      ) : (
        <NoChatSelected />
      )}
    </>
  );
};

export default Chatbox;
