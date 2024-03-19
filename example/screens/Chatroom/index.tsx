import React from 'react';
import {
  ChatRoom,
  ChatroomHeader,
  MessageList,
  MessageInput,
  Chat,
} from '@likeminds.community/chat-rn-core';

const ChatroomScreen = ({navigation, route}: any) => {
  return (
    // TODO Make R is smallcase
    <Chat>
      <ChatRoom >
        {/* ChatroomHeader */}
        <ChatroomHeader />

        {/* Message List */}
        <MessageList />

        {/* Input Box Flow */}
        <MessageInput />
      </ChatRoom>
    </Chat>
  );
};

export default ChatroomScreen;
