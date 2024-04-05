import React from "react";
import { generateGifString } from "../../commonFuctions";
import STYLES from "../../constants/Styles";
import { useAppSelector } from "../../store";
import {
  AUDIO_TEXT,
  GIF_TEXT,
  IMAGE_TEXT,
  PDF_TEXT,
  VIDEO_TEXT,
  VOICE_NOTE_TEXT,
} from "../../constants/Strings";
import { useMessageContext } from "../../context/MessageContext";
import MessageNotSupported from "../MessageNotSupported";
import { useCustomComponentsContext } from "../../context/CustomComponentContextProvider";
import GIFPicker from "../../optionalDependecies/Gif";
import { AttachmentConversationContextProvider } from "../../context/AttachmentConversationContext";
import ImageVideoConversation from "../ImageVideoConversation";
import VoiceNoteConversation from "../VoiceNoteConversation";
import GIFConversation from "../GIFConversation";
import PDFConversation from "../PDFConversation";
import AudioPlayer from "../../optionalDependecies/AudioPlayer";
import Slider from "../../optionalDependecies/Slider";

interface AttachmentConversations {
  isReplyConversation?: any;
  isReply?: any;
}

const AttachmentConversations = ({
  isReplyConversation,
  isReply,
}: AttachmentConversations) => {
  const { item } = useMessageContext();

  const {
    customVideoImageAttachmentConversation,
    customPdfAttachmentConversation,
    customVoiceNoteAttachmentConversation,
    customGifAttachmentConversation,
    customMessageNotSupportedConversation,
  } = useCustomComponentsContext();

  let firstAttachment = item?.attachments[0];

  const isGif = firstAttachment?.type === GIF_TEXT;
  return (
    <>
      <AttachmentConversationContextProvider
        isReply={isReply}
        isReplyConversation={isReplyConversation}
      >
        {/* Message Type */}
        {firstAttachment?.type === IMAGE_TEXT ? (
          customVideoImageAttachmentConversation ? (
            customVideoImageAttachmentConversation
          ) : (
            <ImageVideoConversation />
          )
        ) : firstAttachment?.type === PDF_TEXT ? (
          customPdfAttachmentConversation ? (
            customPdfAttachmentConversation
          ) : (
            <PDFConversation />
          )
        ) : firstAttachment?.type === VIDEO_TEXT ? (
          customVideoImageAttachmentConversation ? (
            customVideoImageAttachmentConversation
          ) : (
            <ImageVideoConversation />
          )
        ) : firstAttachment?.type === AUDIO_TEXT ? (
          customMessageNotSupportedConversation ? (
            customMessageNotSupportedConversation
          ) : (
            <MessageNotSupported />
          )
        ) : firstAttachment?.type === VOICE_NOTE_TEXT ? (
          customVoiceNoteAttachmentConversation ? (
            customVoiceNoteAttachmentConversation
          ) : AudioPlayer && Slider ? (
            <VoiceNoteConversation />
          ) : null
        ) : isGif ? (
          customGifAttachmentConversation ? (
            customGifAttachmentConversation
          ) : GIFPicker ? (
            <GIFConversation />
          ) : null
        ) : null}
      </AttachmentConversationContextProvider>
    </>
  );
};

export default AttachmentConversations;
