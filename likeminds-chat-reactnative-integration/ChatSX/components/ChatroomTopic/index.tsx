import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { ChatroomType, DocumentType } from "../../enums";
import { styles } from "../MessageList/styles";
import STYLES from "../../constants/Styles";
import { decode } from "../../commonFuctions";
import {
  ChatroomContextValues,
  useChatroomContext,
} from "../../context/ChatroomContext";
import { useMessageListContext } from "../../context/MessageListContext";
import { GET_CONVERSATIONS_SUCCESS } from "../../store/types/types";
import { getCurrentConversation } from "../../utils/chatroomUtils";
import { useAppDispatch } from "../../store";

const ChatroomTopic = () => {
  const dispatch = useAppDispatch();

  const {
    conversations,
    chatroomID,
    user,
    currentChatroomTopic,
    chatroomType,
    chatroomName,
  }: ChatroomContextValues = useChatroomContext();

  const {
    flatlistRef,
    flashListMounted,

    setIsFound,
    setFlashListMounted,
    getIconAttachment,
  } = useMessageListContext();
  return (
    <View>
      {!(Object.keys(currentChatroomTopic).length === 0) &&
      chatroomType !== ChatroomType.DMCHATROOM ? (
        <Pressable
          style={styles.chatroomTop}
          onPress={async () => {
            const index = conversations.findIndex(
              (element: any) => element?.id == currentChatroomTopic?.id
            );
            if (index >= 0) {
              if (!flashListMounted) {
                setTimeout(() => {
                  flatlistRef.current?.scrollToIndex({
                    animated: true,
                    index,
                  });
                  setIsFound(true);
                  setFlashListMounted(true);
                }, 1000);
              } else {
                flatlistRef.current?.scrollToIndex({
                  animated: true,
                  index,
                });
                setIsFound(true);
              }
            } else {
              const newConversation = await getCurrentConversation(
                currentChatroomTopic,
                chatroomID?.toString()
              );
              dispatch({
                type: GET_CONVERSATIONS_SUCCESS,
                body: { conversations: newConversation },
              });
              const index = newConversation.findIndex(
                (element) => element?.id == currentChatroomTopic?.id
              );
              if (index >= 0) {
                flatlistRef.current?.scrollToIndex({
                  animated: true,
                  index,
                });
                setIsFound(true);
              }
            }
          }}
        >
          <View style={styles.chatroomTopic}>
            <View>
              <Image
                source={
                  currentChatroomTopic?.member?.imageUrl
                    ? { uri: currentChatroomTopic?.member?.imageUrl }
                    : require("../../assets/images/default_pic.png")
                }
                style={styles.chatroomTopicAvatar}
              />
            </View>
            <View style={styles.chatRoomTopicInfo}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{
                  color: STYLES.$COLORS.FONT_PRIMARY,
                  fontSize: STYLES.$FONT_SIZES.LARGE,
                  fontFamily: STYLES.$FONT_TYPES.BOLD,
                }}
              >
                Current Topic
              </Text>

              {currentChatroomTopic?.hasFiles == true ? (
                getIconAttachment(currentChatroomTopic)
              ) : currentChatroomTopic?.state === 10 ? (
                getIconAttachment(currentChatroomTopic)
              ) : currentChatroomTopic?.ogTags?.url !== null &&
                currentChatroomTopic?.ogTags ? (
                getIconAttachment(currentChatroomTopic)
              ) : (
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={2}
                  style={{
                    color: STYLES.$COLORS.MSG,
                    fontSize: STYLES.$FONT_SIZES.MEDIUM,
                    fontFamily: STYLES.$FONT_TYPES.LIGHT,
                    lineHeight: 18,
                  }}
                >
                  {decode({
                    text: currentChatroomTopic?.answer,
                    enableClick: false,
                    chatroomName: chatroomName,
                    communityId: user?.sdkClientInfo?.community,
                  })}
                </Text>
              )}
            </View>
            <View>
              {currentChatroomTopic?.attachmentCount > 0 &&
              currentChatroomTopic?.attachments.length > 0 &&
              currentChatroomTopic?.attachments[0]?.type !== DocumentType.PDF &&
              currentChatroomTopic?.attachments[0]?.type !==
                DocumentType.VOICE_NOTE ? (
                <Image
                  source={{
                    uri:
                      currentChatroomTopic?.attachments[0]?.type ==
                      DocumentType.IMAGE
                        ? currentChatroomTopic?.attachments[0]?.url
                        : currentChatroomTopic?.attachments[0]?.thumbnailUrl,
                  }}
                  style={styles.chatroomTopicAttachment}
                />
              ) : currentChatroomTopic?.ogTags?.url !== null &&
                currentChatroomTopic?.ogTags?.image !== "" &&
                currentChatroomTopic?.ogTags !== undefined &&
                currentChatroomTopic?.ogTags !== null &&
                Object.keys(currentChatroomTopic).length !== 0 ? (
                <Image
                  source={{
                    uri: currentChatroomTopic?.ogTags?.image,
                  }}
                  style={styles.chatroomTopicAttachment}
                />
              ) : null}
            </View>
          </View>
        </Pressable>
      ) : null}
    </View>
  );
};

export default ChatroomTopic;
