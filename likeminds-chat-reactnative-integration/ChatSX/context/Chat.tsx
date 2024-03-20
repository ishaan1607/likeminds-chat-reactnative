import React from "react";
import { ChatroomContextProvider } from "./ChatroomContext";
import { MessageListContextProvider } from "./MessageListContext";
import { InputBoxContextProvider } from "./InputBoxContext";
interface ChatProps {
  children: React.ReactNode;
}

function Chat({ children }: ChatProps) {
  return (
    <ChatroomContextProvider>
      <MessageListContextProvider>
        <InputBoxContextProvider>{children}</InputBoxContextProvider>
      </MessageListContextProvider>
    </ChatroomContextProvider>
  );
}

export default Chat;
