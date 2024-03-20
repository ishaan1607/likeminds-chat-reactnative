import React from 'react';
import {
  ChatRoom,
  ChatroomHeader,
  MessageList,
  MessageInput,
} from '@likeminds.community/chat-rn-core';

const ChatroomScreen = ({navigation, route}: any) => {
  return (
    // TODO Make R is smallcase
    <ChatRoom navigation={navigation} route={route}>
      {/* ChatroomHeader */}
      <ChatroomHeader />

      {/* Message List */}
      <MessageList />

      {/* Input Box Flow */}
      <MessageInput />
    </ChatRoom>
  );
};

export default ChatroomScreen;
