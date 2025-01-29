import React from "react";

interface MessageSkeletonProps {
  message: string;
}

const MessageSkeleton = ({ message }: MessageSkeletonProps) => {
  return (
    <>
      <div className="flex items-end gap-2 m-5">
        <img
          src="/default-profile.png"
          alt="img"
          className="size-10 rounded-full"
        />
        <div>
          <p className="">2:00</p>

          <p className=" bg-slate-500 w-fit p-2 px-3 rounded-md text-white">
            {message}
          </p>
        </div>
      </div>
    </>
  );
};

export default MessageSkeleton;
