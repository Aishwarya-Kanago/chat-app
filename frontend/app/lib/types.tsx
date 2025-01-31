export type UserMessages = {
  message?: string;
  receiverId: string;
  senderId: string;
  createdAt: string;
  image?: string;
};

export type messagePayloadType = {
  message?: string;
  image?: string;
};
