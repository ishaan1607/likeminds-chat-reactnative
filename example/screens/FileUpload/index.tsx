import {View, Text} from 'react-native';
import React from 'react';
import {
  FileUpload,
  useInputBoxContext,
} from '@likeminds.community/chat-rn-core';

const FileUploadScreen = () => {
  const {handleGallery, handleDoc, handleCamera, onEdit} = useInputBoxContext();

  const customHandleGallery = async () => {
    console.log('before custom handle gallery');
    await handleGallery();
    console.log('after custom handle gallery');
  };
  const customHandleCamera = async () => {
    console.log('before custom handle camera');
    await handleCamera();
    console.log('after custom handle camera');
  };
  const customHandleDoc = async () => {
    console.log('before custom handle doc');
    await handleDoc();
    console.log('after custom handle doc');
  };
  const customOnEdit = async () => {
    console.log('before custom on edit');
    await onEdit();
    console.log('after custom on edit');
  };
  return (
    <FileUpload
      handleGallery={customHandleGallery}
      handleCamera={customHandleCamera}
      handleDoc={customHandleDoc}
      onEdit={customOnEdit}
    />
  );
};

export default FileUploadScreen;
