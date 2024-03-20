import React from "react";
import { ChatroomContextProvider } from "./ChatroomContext";
import { MessageListContextProvider } from "./MessageListContext";
import { ExploreFeedContextProvider } from "./ExploreFeedContext";

interface ChatProps {
  children: React.ReactNode;
}

function Chat({ children }: ChatProps) {
  return (
    <ChatroomContextProvider>
      <MessageListContextProvider>
        <ExploreFeedContextProvider>{children}</ExploreFeedContextProvider>
      </MessageListContextProvider>
    </ChatroomContextProvider>
  );
}

export default Chat;
