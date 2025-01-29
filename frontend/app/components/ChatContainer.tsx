import React from "react";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { User } from "../store/authSlice";
import { UserMessages } from "../lib/types";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

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

  return (
    <div className="bg-custom-grey flex-1 overflow-y-scroll">
      {selectedUser &&
        serverMessages?.map((message, index) => {
          const isSender = message.senderId === user._id;
          return (
            <div
              key={index}
              className={`flex ${isSender ? "justify-end " : "justify-start"}`}
            >
              <MessageSkeleton
                message={message.message}
                key={index}
                isSender={isSender}
              />
            </div>
          );
        })}
    </div>
  );
};

export default ChatContainer;
