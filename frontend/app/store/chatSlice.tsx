import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserMessages } from "../lib/types";
import { User } from "./authSlice";

export interface Chat {
  selectedUser: User | undefined;
  userData: User[];
  serverMessages: UserMessages[];
  activeUsers: string[];
}

const initialState: Chat = {
  selectedUser: undefined,
  userData: [],
  serverMessages: [],
  activeUsers: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedUser(state, action: PayloadAction<User>) {
      state.selectedUser = action.payload;
    },
    setUserData(state, action: PayloadAction<User[]>) {
      state.userData = action.payload;
    },
    setServerMessages(state, action: PayloadAction<UserMessages[]>) {
      state.serverMessages = action.payload;
    },
    appendToServerMessages(state, action: PayloadAction<UserMessages>) {
      state.serverMessages = [...state.serverMessages, action.payload];
    },
    setActiveUsers(state, action: PayloadAction<string[]>) {
      state.activeUsers = action.payload;
    },
  },
});

export const {
  setSelectedUser,
  setUserData,
  setServerMessages,
  appendToServerMessages,
  setActiveUsers,
} = chatSlice.actions;
export default chatSlice.reducer;
