import Image from "next/image";
import React from "react";

const NoChatSelected = () => {
  return (
    <div className="flex flex-1 w-full flex-col justify-center items-center gap-3">
      <Image
        className="h-10 mix-blend-multiply"
        src="/chat-app-logo.png"
        alt="chat-app-img"
        height={40}
        width={40}
      />
      <h1 className="text-xl lg:text-5xl font-semibold text-custom-purple">
        Welcome to Chattify
      </h1>
      <p className="mb-4 lg:text-lg text-sm text-center">
        Select a conversation from the sidebar to start chatting
      </p>
    </div>
  );
};

export default NoChatSelected;
