import React from "react";

const NoChatSelected = () => {
  return (
    <div className="flex flex-1 w-full">
      <div className="flex flex-col justify-center items-center gap-3">
        <img
          className="h-10 mix-blend-multiply"
          src="/chat-app-logo.png"
          alt="chat-app-img"
        />
        <h1 className="text-5xl font-semibold text-custom-purple">
          Welcome to Chattify
        </h1>
        <p className="mb-4 text-lg">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
