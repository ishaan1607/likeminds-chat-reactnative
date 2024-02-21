import { View, Text } from "react-native";
import React from "react";
import { styles } from "../AttachmentConversations/styles";
import { NavigateToProfileParams } from "../../callBacks/type";
import { CallBack } from "../../callBacks/callBackClass";
import STYLES from "../../constants/Styles";
import { useMessageContext } from "../../context/MessageContext";

const MessageHeader = () => {
  const { item } = useMessageContext();
  const lmChatInterface = CallBack.lmChatInterface;

  const chatBubbleStyles = STYLES.$CHAT_BUBBLE_STYLE;
  const messageReceivedHeader = chatBubbleStyles?.messageReceivedHeader;
  const senderNameStyles = messageReceivedHeader?.senderNameStyles;
  const senderDesignationStyles =
    messageReceivedHeader?.senderDesignationStyles;
  return (
    <Text
      style={[
        styles.messageInfo,
        senderNameStyles?.color ? { color: senderNameStyles?.color } : null,
        senderNameStyles?.fontSize
          ? { fontSize: senderNameStyles?.fontSize }
          : null,
        senderNameStyles?.fontFamily
          ? { color: senderNameStyles?.color }
          : null,
      ]}
      numberOfLines={1}
      onPress={() => {
        const params: NavigateToProfileParams = {
          taggedUserId: null,
          member: item?.member,
        };
        lmChatInterface.navigateToProfile(params);
      }}
    >
      {item?.member?.name}
      {item?.member?.customTitle ? (
        <Text
          style={[
            styles.messageCustomTitle,
            senderDesignationStyles?.color
              ? { color: senderDesignationStyles?.color }
              : null,
            senderDesignationStyles?.fontSize
              ? { fontSize: senderDesignationStyles?.fontSize }
              : null,
            senderDesignationStyles?.fontFamily
              ? { color: senderDesignationStyles?.color }
              : null,
          ]}
        >{` • ${item?.member?.customTitle}`}</Text>
      ) : null}
    </Text>
  );
};

export default MessageHeader;
