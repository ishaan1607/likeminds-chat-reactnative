import React from "react";
import { ChatroomContextProvider } from "./ChatroomContext";
import { MessageListContextProvider } from "./MessageListContext";
import { ExploreFeedContextProvider } from "./ExploreFeedContext";
import { InputBoxContextProvider } from "./InputBoxContext";

function Chat({ children }: any) {
  return (
    <ChatroomContextProvider>
      <MessageListContextProvider>
        <InputBoxContextProvider>
          <ExploreFeedContextProvider>{children}</ExploreFeedContextProvider>
        </InputBoxContextProvider>
      </MessageListContextProvider>
    </ChatroomContextProvider>
  );
}

export default Chat;
