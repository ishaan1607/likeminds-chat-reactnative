import {Chat} from '@likeminds.community/chat-rn-core';
import React from 'react';
import {ChatroomScreen} from './ChatroomScreen';

interface ChatroomScreenWrapperProps {
  lmChatInterface?: any;
}

function ChatroomScreenWrapper({lmChatInterface}: ChatroomScreenWrapperProps) {
  return (
    <Chat>
      <ChatroomScreen lmChatInterface={lmChatInterface} />
    </Chat>
  );
}

export default ChatroomScreenWrapper;
