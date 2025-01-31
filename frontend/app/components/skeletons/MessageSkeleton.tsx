import { User } from "@/app/store/authSlice";
import React from "react";

interface MessageSkeletonProps {
  message: string;
  messageCreatedAt: string;
  isSender: boolean;
  profilePic: string;
}

const formatDate = (isoString: string) => {
  return new Date(isoString).toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const MessageSkeleton = ({
  message,
  messageCreatedAt,
  isSender,
  profilePic,
}: MessageSkeletonProps) => {
  return (
    <>
      <div className="flex items-end gap-2 m-5">
        <img
          src={profilePic || "/default-profile.png "}
          alt="img"
          className="size-10 rounded-full object-cover"
        />
        <div>
          <p className="text-[12px]">{formatDate(messageCreatedAt)}</p>

          <p
            className={`${
              isSender ? "bg-custom-purple" : "bg-slate-500"
            } w-fit p-2 px-3 rounded-md text-white`}
          >
            {message}
          </p>
        </div>
      </div>
    </>
  );
};

export default MessageSkeleton;
