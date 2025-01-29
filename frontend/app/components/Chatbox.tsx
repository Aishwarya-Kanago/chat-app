import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MdOutlineImage } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import ChatContainer from "./ChatContainer";
import { User } from "../store/authSlice";
import { sendMessage, socket } from "../lib/socketConnection";
import { UserMessages } from "../lib/types";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type ChatboxProps = {
  selectedUser: User | undefined;
  serverMessages: UserMessages;
  setServerMessages: Dispatch<React.SetStateAction<UserMessages>>;
};

const Chatbox = ({
  selectedUser,
  serverMessages,
  setServerMessages,
}: ChatboxProps) => {
  const [message, setMessage] = useState<string>("");

  const user = useSelector((state: RootState) => state.auth);

  const onChangeHandler = (e: any) => {
    setMessage(e.target.value);
  };

  const onclickHandler = () => {
    if (!selectedUser?._id) return;

    sendMessage({ message: message }, selectedUser?._id);
    setServerMessages((prevMessages) => [
      ...prevMessages,
      {
        message: message,
        senderId: user._id,
        receiverId: selectedUser?._id,
        createdAt: new Date().toISOString(),
      },
    ]);

    setMessage("");
  };

  useEffect(() => {
    if (!selectedUser) return;

    const handleMessage = (
      responseMessage: string,
      senderUserId: string,
      senderSocketId: string
    ) => {
      setServerMessages((prevMessages) => [
        ...prevMessages,
        {
          message: responseMessage,
          senderId: senderUserId,
          receiverId: user._id,
          createdAt: new Date().toISOString(),
        },
      ]);
    };

    socket.on("responseMessage", handleMessage);

    return () => {
      socket.off("responseMessage", handleMessage);
    };
  }, []);

  return (
    <div className="flex flex-1 flex-col justify-between">
      <div>
        <div className="flex gap-2 items-center p-2 cursor-pointer hover:bg-slate-500">
          <img
            src={selectedUser?.profilePic || "/default-profile.png"}
            alt="user-img"
            className="h-10 rounded-full w-10"
          />
          <div>
            <p className="text-lg font-semibold">{selectedUser?.fullName}</p>
            <p>Online/Offline</p>
          </div>
        </div>
      </div>
      <ChatContainer
        selectedUser={selectedUser}
        serverMessages={serverMessages}
      />
      <div className="bg-custom-grey flex items-center gap-4">
        <input
          type="textarea"
          placeholder="Type a Message"
          className="p-4 rounded-lg m-3 w-[80%]"
          value={message}
          onChange={onChangeHandler}
        />
        <MdOutlineImage className="text-3xl" />
        <IoIosSend className="text-3xl" onClick={onclickHandler} />
      </div>
    </div>
  );
};

export default Chatbox;
