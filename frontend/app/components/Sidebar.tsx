"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoIosContacts } from "react-icons/io";
import { User } from "../store/authSlice";
import { getMessages, socket } from "../lib/socketConnection";
import { UserMessages } from "../lib/types";

type SidebarProps = {
  setSelectedUser: Dispatch<SetStateAction<User | undefined>>;
  setServerMessages: Dispatch<SetStateAction<UserMessages>>;
  userData: User[];
};

const Sidebar = ({
  userData,
  setSelectedUser,
  setServerMessages,
}: SidebarProps) => {
  const [activeUsers, setActiveUsers] = useState<string[]>([]);

  useEffect(() => {
    const handleNewActiveUserResponse = (activeUsersList: string[]) => {
      setActiveUsers(activeUsersList);
    };

    socket.on("newActiveUserResponse", handleNewActiveUserResponse);

    return () => {
      socket.off("newActiveUserResponse", handleNewActiveUserResponse);
    };
  }, [socket, activeUsers]);

  const handleSelectedUser = async (user: User) => {
    setSelectedUser(user);
    const selectedUserMessages = await getMessages(user._id);
    setServerMessages(selectedUserMessages);
    console.log(selectedUserMessages, "messagessssssss alllll");
  };

  return (
    <div className="bg-white flex-2 border-r-2 border-slate-200">
      <div className="m-4">
        {/* <h3 className="text-xl font-bold mb-2 p-3">Chats</h3> */}
        <div className="flex items-center gap-1 m-3">
          <IoIosContacts className="h-10 w-10" />
          <span className="text-xl">Contacts</span>
        </div>

        <hr className="border-r-2 border-slate-200" />
        <ul>
          {userData.map((user: User) => (
            <li key={user._id} onClick={() => handleSelectedUser(user)}>
              <div className=" flex gap-2 items-center p-2 cursor-pointer hover:bg-slate-500">
                <div className="relative">
                  <img
                    src={user.profilePic || "/default-profile.png"}
                    alt="user-img"
                    className="h-10 rounded-full w-10"
                  />

                  {activeUsers.some(
                    (activeUser) => activeUser === user._id
                  ) && (
                    <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                  )}
                </div>

                <div>
                  <p className="text-lg font-semibold">{user.fullName}</p>
                  <p
                    className={`${
                      activeUsers.some((activeUser) => activeUser === user._id)
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                  >
                    {activeUsers.some((activeUser) => activeUser === user._id)
                      ? "Online"
                      : "Offline"}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

// import React, { useEffect } from "react";
// import { useChatStore } from "../store/useChatStore";
// import SidebarSkeleton from "./skeletons/SidebarSkeleton";
// import { IoIosContacts } from "react-icons/io";
// import { Dispatch, SetStateAction, useState } from "react";

// import { Data, User } from "./Data";

// type SidebarProps = {
//   setSelectedUser: Dispatch<SetStateAction<User | null>>;
// };

// const Sidebar = () => {
//   const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
//     useChatStore();
//   const onlineUsers = [];
//   useEffect(() => {
//     getUsers();
//   }, [getUsers]);

//   if (isUsersLoading) return <SidebarSkeleton />;
//   return (
//     <aside>
//       <div className="flex items-center gap-1 m-5">
//         <IoIosContacts className="h-10 w-10" />
//         <span className="text-xl">Contacts</span>
//       </div>

//       <div className="m-5">
//         <ul>
//           {Data.map((user) => (
//             <li key={user.id} onClick={() => setSelectedUser(user)}>
//               <div className="flex gap-2 items-center p-2 cursor-pointer hover:bg-slate-500">
//                 <img
//                   src={user.image}
//                   alt="user-img"
//                   className="h-10 rounded-full w-10"
//                 />
//                 <div>
//                   <p className="text-lg font-semibold">{user.name}</p>
//                   <p>{user.text}</p>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;
