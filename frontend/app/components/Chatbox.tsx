import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { MdOutlineImage } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import ChatContainer from "./ChatContainer";
import { User } from "../store/authSlice";
import { sendMessage, socket } from "../lib/socketConnection";
import { UserMessages } from "../lib/types";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { formatDistanceToNow } from "date-fns";

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
  const [image, setImage] = useState<string | null>(null); // Store image preview
  const fileInputRef = useRef<HTMLInputElement>(null); // Reference for file input

  const user = useSelector((state: RootState) => state.auth);

  const onChangeHandler = (e: any) => {
    setMessage(e.target.value);
  };

  const onclickHandler = () => {
    if (!selectedUser?._id) return;

    if (!message) return;

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

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl); // Set image preview
    }
  };

  const loadImageHandler = () => {
    fileInputRef.current?.click();
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

  const formatLastSeen = (lastSeen: string) => {
    if (!lastSeen) return "Never";
    return formatDistanceToNow(new Date(lastSeen)) + " ago";
  };

  return (
    <div className="flex flex-1 flex-col justify-between">
      <div>
        <div className="flex gap-2 items-center p-2 cursor-pointer hover:bg-slate-500">
          <img
            src={selectedUser?.profilePic || "/default-profile.png"}
            alt="user-img"
            className="size-8 lg:size-10 rounded-full"
          />
          <div>
            <p className="text-base lg:text-lg font-semibold">
              {selectedUser?.fullName}
            </p>
            <p> Last seen: {formatLastSeen(selectedUser?.lastSeen || "")}</p>
          </div>
        </div>
      </div>
      <ChatContainer
        selectedUser={selectedUser}
        serverMessages={serverMessages}
      />
      <div className="bg-custom-grey flex items-center gap-1 lg:gap-4">
        <input
          type="textarea"
          placeholder="Type a Message"
          className="p-2 lg:p-4 rounded-lg m-1 mb-2 lg:m-3 w-[80%]"
          value={message}
          onChange={onChangeHandler}
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={onImageChange}
        />
        <MdOutlineImage className="lg:size-8" onClick={loadImageHandler} />
        <IoIosSend className="lg:size-8" onClick={onclickHandler} />
      </div>
    </div>
  );
};

export default Chatbox;
