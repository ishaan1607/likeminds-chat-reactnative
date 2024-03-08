import React from "react";
import { ChatroomContextProvider } from "./ChatroomContext";

function Chat({ children }: any) {
  return <ChatroomContextProvider>{children}</ChatroomContextProvider>;
}

export default Chat;
