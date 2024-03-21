import React from 'react';
import FileUploadScreen from '.';
import {InputBoxContextProvider} from '@likeminds.community/chat-rn-core/ChatSX/context/InputBoxContext';

function FileUploadScreenWrapper() {
  return (
    <InputBoxContextProvider>
      <FileUploadScreen />
    </InputBoxContextProvider>
  );
}

export default FileUploadScreenWrapper;
