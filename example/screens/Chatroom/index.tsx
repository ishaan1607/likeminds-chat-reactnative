import React from 'react';
import {
  ChatRoom,
  ChatroomHeader,
  MessageList,
  MessageInput,
} from 'likeminds_chat_reactnative_integration';

const ChatroomScreen = ({navigation, route}: any) => {
  return (
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
