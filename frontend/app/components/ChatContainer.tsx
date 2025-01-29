import React from "react";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { User } from "../store/authSlice";

interface ChatContainerProps {
  selectedUser: User | undefined;
  serverMessages: { message: string; socketId: string }[];
  currentUserId: string;
}

const ChatContainer = ({
  serverMessages,
  selectedUser,
  currentUserId,
}: ChatContainerProps) => {
  console.log(serverMessages, "serverMessages");

  return (
    <div className="bg-custom-grey flex-1 overflow-y-scroll">
      {selectedUser &&
        serverMessages?.map((message, index) => {
          const isSender = message.socketId === currentUserId;
          return (
            <div
              key={index}
              className={`flex ${isSender ? "justify-end" : "justify-start"}`}
            >
              <MessageSkeleton message={message.message} key={index} />
            </div>
          );
        })}
    </div>
  );
};

export default ChatContainer;
