import React, { useEffect, useState } from "react";
import { MdOutlineImage } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import ChatContainer from "./ChatContainer";
import { io, Socket } from "socket.io-client";
import { User } from "../store/authSlice";
import { socket } from "../lib/socketConnection";

type ChatboxProps = {
  selectedUser: User | undefined;
};

const Chatbox = ({ selectedUser }: ChatboxProps) => {
  const [message, setMessage] = useState<string>("");
  const [serverMessages, setServerMessages] = useState<
    { message: string; socketId: string }[]
  >([]);

  const onChangeHandler = (e: any) => {
    setMessage(e.target.value);
  };

  const onclickHandler = () => {
    const socketId = socket.id || "unknown";
    socket.emit("sendMessage", socket.id, selectedUser?._id, message);
    setServerMessages((prevState) => {
      return [...prevState, { message, socketId }];
    });
    setMessage("");
  };

  useEffect(() => {
    const handleMessage = (responseMessage: string, socketId: string) => {
      setServerMessages((prevState) => {
        return [...prevState, { message: responseMessage, socketId }];
      });
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
        currentUserId={socket.id || "unknown"}
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
