import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { useMessageContext } from "../../context/MessageContext";
import { useChatroomContext } from "../../context/ChatroomContext";
import STYLES from "../../constants/Styles";
import { useAppSelector } from "../../store";
import { styles } from "../Messages/styles";
import { decode } from "../../commonFuctions";
import MessageFooter from "../MessageFooter";
import MessageHeader from "../MessageHeader";
import StateMessage from "../StateMessage";

const SimpleMessage = () => {
  const { user } = useAppSelector((state) => state.homefeed);
  const {
    item,
    isIncluded,
    reactionArr,
    isTypeSent,
    userIdStringified,
    isItemIncludedInStateArr,

    handleLongPress,
    handleOnPress,
  } = useMessageContext();

  const {
    chatroomName,
    customMessageHeader,
    customMessageFooter,
    customStateMessage,
  } = useChatroomContext();

  const chatBubbleStyles = STYLES.$CHAT_BUBBLE_STYLE;

  //styling props
  const borderRadius = chatBubbleStyles?.borderRadius;
  const sentMessageBackgroundColor =
    chatBubbleStyles?.sentMessageBackgroundColor;
  const receivedMessageBackgroundColor =
    chatBubbleStyles?.receivedMessageBackgroundColor;
  const selectedMessageBackgroundColor =
    chatBubbleStyles?.selectedMessageBackgroundColor;
  const textStyles = chatBubbleStyles?.textStyles;
  const linkTextColor = chatBubbleStyles?.linkTextColor;
  const taggingTextColor = chatBubbleStyles?.taggingTextColor;

  const SELECTED_BACKGROUND_COLOR = selectedMessageBackgroundColor
    ? selectedMessageBackgroundColor
    : STYLES.$COLORS.SELECTED_BLUE;
  // styling props ended
  return (
    <View>
      {isItemIncludedInStateArr ? (
        customStateMessage ? (
          customStateMessage
        ) : (
          <StateMessage />
        )
      ) : (
        <View
          style={[
            styles.alignMessage,
            {
              justifyContent: isTypeSent ? "flex-end" : "flex-start",
            },
          ]}
        >
          <View
            style={[
              styles.message,
              borderRadius ? { borderRadius: borderRadius } : null,
              isTypeSent
                ? [
                    styles.sentMessage,
                    sentMessageBackgroundColor
                      ? { backgroundColor: sentMessageBackgroundColor }
                      : null,
                  ]
                : [
                    styles.receivedMessage,
                    receivedMessageBackgroundColor
                      ? {
                          backgroundColor: receivedMessageBackgroundColor,
                        }
                      : null,
                  ],
              isIncluded
                ? { backgroundColor: SELECTED_BACKGROUND_COLOR }
                : null,
            ]}
          >
            {item?.member?.id ==
            userIdStringified ? null : customMessageHeader ? (
              customMessageHeader
            ) : (
              <MessageHeader />
            )}
            <Text>
              {decode({
                text: item?.answer,
                enableClick: true,
                chatroomName: chatroomName,
                communityId: user?.sdkClientInfo?.community,
                textStyles: textStyles,
                linkTextColor: linkTextColor,
                taggingTextColor: taggingTextColor,
              })}
            </Text>
            {customMessageFooter ? customMessageFooter : <MessageFooter />}
          </View>
          {(reactionArr.length > 0 || item?.answer?.split("").length > 100) &&
          !isTypeSent ? (
            <Pressable
              onLongPress={handleLongPress}
              delayLongPress={200}
              onPress={handleOnPress}
            >
              <Image
                style={{
                  height: 25,
                  width: 25,
                  resizeMode: "contain",
                }}
                source={require("../../assets/images/add_more_emojis3x.png")}
              />
            </Pressable>
          ) : null}
        </View>
      )}
    </View>
  );
};

export default SimpleMessage;
