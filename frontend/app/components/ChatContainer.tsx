"use client";
import React, { useEffect, useRef } from "react";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { User } from "../store/authSlice";
import { UserMessages } from "../lib/types";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { format, isSameDay, parseISO } from "date-fns";

interface ChatContainerProps {
  selectedUser: User | undefined;
  serverMessages: UserMessages;
}

const ChatContainer = ({
  serverMessages,
  selectedUser,
}: ChatContainerProps) => {
  console.log(serverMessages, "serverMessages");

  const user = useSelector((state: RootState) => state.auth);
  let lastDate: Date | null = null;

  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [serverMessages]);

  return (
    <div className="bg-custom-grey flex-1 overflow-y-scroll">
      {selectedUser &&
        serverMessages?.map((message, index) => {
          const currentDate = parseISO(message.createdAt);
          const showDateSeparator =
            !lastDate || !isSameDay(lastDate, currentDate);

          lastDate = currentDate;
          const isSender = message.senderId === user._id;
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
                  message={message.message}
                  messageCreatedAt={message.createdAt}
                  key={index}
                  isSender={isSender}
                  profilePic={
                    isSender ? user.profilePic : selectedUser.profilePic
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
