// "use client";

// import { useEffect } from "react";
// import { useAuthStore } from "../store/store";
// import { Loader } from "lucide-react";

// const AuthStatus = () => {
//   const { checkAuth, isCheckingAuth, authUser, onLineUsers } = useAuthStore();

//   useEffect(() => {
//     checkAuth();
//   }, [checkAuth]);

//   if (isCheckingAuth && !authUser)
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Loader className="size-10 animate-spin" />
//       </div>
//     );
//   return null;
// };

// export default AuthStatus;

import React from "react";

const AuthStatus = () => {
  return <div></div>;
};

export default AuthStatus;
