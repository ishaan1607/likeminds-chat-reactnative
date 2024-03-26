import React from 'react';
import FileUploadScreen from '.';
import {InputBoxContextProvider} from '@likeminds.community/chat-rn-core/ChatSX/context/InputBoxContext';
import {ChatroomContextProvider} from '@likeminds.community/chat-rn-core/ChatSX/context';

function FileUploadScreenWrapper() {
  return (
    <ChatroomContextProvider>
      <FileUploadScreen />
    </ChatroomContextProvider>
  );
}

export default FileUploadScreenWrapper;
