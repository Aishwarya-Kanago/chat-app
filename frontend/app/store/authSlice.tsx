import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { emitActiveUsers, emitRemoveActiveUser } from "../lib/socketConnection";

export interface User {
  _id: string;
  fullName: string;
  email: string;
  profilePic: string;
  isLoggedIn: boolean;
  createdAt: string;
}

const initialState: User = {
  _id: "",
  fullName: "",
  email: "",
  profilePic: "",
  isLoggedIn: false,
  createdAt: new Date().toLocaleDateString(),
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<User>) {
      state._id = action.payload._id;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.profilePic = action.payload.profilePic;
      state.isLoggedIn = true;
      if (action.payload.createdAt) {
        const parsedDate = new Date(action.payload.createdAt);
        state.createdAt = isNaN(parsedDate.getTime())
          ? new Date().toISOString() 
          : parsedDate.toISOString(); 
      } else {
        state.createdAt = new Date().toISOString(); 
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(state));
      }
      emitActiveUsers(state);
    },
    updateProfilePic(state, action: PayloadAction<User>) {
      state.profilePic = action.payload.profilePic;

      const updatedUser = { ...state, profilePic: action.payload.profilePic };
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    },
    logout(state) {
      emitRemoveActiveUser(state);
      Object.assign(state, initialState);

      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    },
  },
});

export const { setUserInfo, updateProfilePic, logout } = authSlice.actions;
export default authSlice.reducer;
