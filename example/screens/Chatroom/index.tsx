import React from 'react';
import {
  ChatRoom,
  ChatroomHeader,
  MessageList,
  MessageInput,
  useChatroomContext,
} from '@likeminds.community/chat-rn-core';
import {
  ReactionList,
  // setChatroomTopicOverwrite,
} from '../../customisableComponents/ReactionList';
// import {setChatroomTopicOverwrite} from '../../callbacks';

export function ChatroomScreen() {
  const {setChatroomTopic} = useChatroomContext();
  const setChatroomTopicOverwrite = async () => {
    console.log('before chatroom topic');
    const response = await setChatroomTopic();
    console.log('after chatroom topic', response);
  };
  // console.log('setChatroomTopicOverwrite', setChatroomTopicOverwrite());

  return (
    // TODO Make R is smallcase
    <ChatRoom setChatroomTopic={setChatroomTopicOverwrite}>
      {/* ChatroomHeader */}
      <ChatroomHeader />

      {/* Message List */}
      <MessageList />

      {/* Input Box Flow */}
      <MessageInput />
    </ChatRoom>
  );
}
