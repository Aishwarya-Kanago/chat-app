import { UserMessages } from "@/app/lib/types";
import { User } from "@/app/store/authSlice";
import React from "react";

interface MessageSkeletonProps {
  serverMessage: UserMessages;
  isSender: boolean;
  profilePic: string | undefined;
}

const formatDate = (isoString: string) => {
  return new Date(isoString).toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const MessageSkeleton = ({
  serverMessage,
  isSender,
  profilePic,
}: MessageSkeletonProps) => {
  return (
    <>
      <div className="flex items-end gap-2 m-5">
        <img
          src={profilePic || "/default-profile.png "}
          alt="img"
          className="size-8 lg:size-10 rounded-full object-cover"
        />
        <div>
          <p className="text-[10px] lg:text-[12px] text-gray-700">
            {formatDate(serverMessage?.createdAt)}
          </p>

          {serverMessage.message ? (
            <p
              className={`${
                isSender ? "bg-custom-purple" : "bg-slate-500"
              } w-fit p-2 px-3 rounded-md text-white`}
            >
              {serverMessage.message}
            </p>
          ) : (
            <img
              src={serverMessage.image}
              alt="user message image"
              className="size-28 md:size-48 rounded-sm object-cover"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MessageSkeleton;
