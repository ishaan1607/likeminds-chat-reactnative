import React from "react";
import { ChatroomContextProvider } from "./ChatroomContext";
import { MessageListContextProvider } from "./MessageListContext";
import { ExploreFeedContextProvider } from "./ExploreFeedContext";

function Chat({ children }: any) {
  return (
    <ChatroomContextProvider>
      <MessageListContextProvider>
        <ExploreFeedContextProvider>{children}</ExploreFeedContextProvider>
      </MessageListContextProvider>
    </ChatroomContextProvider>
  );
}

export default Chat;
