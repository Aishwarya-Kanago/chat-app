"use client";
import React, { useEffect, useRef } from "react";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { User } from "../store/authSlice";
import { UserMessages } from "../lib/types";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { format, isSameDay, parseISO } from "date-fns";

const ChatContainer = () => {
  const chat = useSelector((state: RootState) => state.chat);

  const user = useSelector((state: RootState) => state.auth);
  let lastDate: Date | null = null;

  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    lastMessageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.serverMessages]);

  return (
    <div className="bg-custom-grey flex-1 overflow-y-scroll no-scrollbar">
      {chat?.selectedUser &&
        chat?.serverMessages?.map((serverMessage, index) => {
          const currentDate = parseISO(serverMessage?.createdAt);
          const showDateSeparator =
            !lastDate || !isSameDay(lastDate, currentDate);

          lastDate = currentDate;
          const isSender = serverMessage?.senderId === user._id;
          return (
            <React.Fragment key={index}>
              {showDateSeparator && (
                <div className="text-center text-gray-500 my-4">
                  <span className="bg-gray-300 px-3 py-1 rounded-md text-sm">
                    {format(currentDate, "EEEE, MMM dd, yyyy")}
                  </span>
                </div>
              )}
              <div
                className={`flex ${
                  isSender ? "justify-end " : "justify-start"
                }`}
              >
                <MessageSkeleton
                  serverMessage={serverMessage}
                  key={index}
                  isSender={isSender}
                  profilePic={
                    isSender ? user.profilePic : chat?.selectedUser?.profilePic
                  }
                />
              </div>
            </React.Fragment>
          );
        })}
      <div ref={lastMessageRef} />
    </div>
  );
};

export default ChatContainer;
