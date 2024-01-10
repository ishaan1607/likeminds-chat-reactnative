import {
  View,
  Text,
  Pressable,
  Image,
  ScrollViewProps,
  ActivityIndicator,
} from "react-native";
import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { FlashList } from "@shopify/flash-list";
import Swipeable from "../Swipeable";
import Messages from "../Messages";
import { decode, generateGifString } from "../../commonFuctions";
import { ChatroomType, DocumentType, GetConversationsType } from "../../enums";
import { useAppDispatch, useAppSelector } from "../../store";
import STYLES from "../../constants/Styles";
import {
  GET_CONVERSATIONS_SUCCESS,
  SET_POSITION,
} from "../../store/types/types";
import { styles } from "./styles";
import {
  paginatedConversations,
  paginatedConversationsEnd,
  paginatedConversationsStart,
} from "../../store/actions/chatroom";
import { GetConversationsRequestBuilder } from "@likeminds.community/chat-rn";
import { Conversation } from "@likeminds.community/chat-rn/dist/shared/responseModels/Conversation";
import { CAPITAL_GIF_TEXT, VOICE_NOTE_STRING } from "../../constants/Strings";
import { getCurrentConversation } from "../../utils/chatroomUtils";
import { useLMChatStyles } from "../../lmChatProvider";
import { Client } from "../../client";
import {
  ChatroomContextValues,
  useChatroomContext,
} from "../../context/ChatroomContext";
import LinearGradient from "react-native-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import {
  MessageListContextProvider,
  useMessageListContext,
} from "../../context/MessageListContext";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const MessageList = () => {
  return (
    <MessageListContextProvider>
      <MessageListComponent />
    </MessageListContextProvider>
  );
};

const MessageListComponent = () => {
  const {
    navigation,
    conversations,
    chatroomID,
    user,
    selectedMessages,
    currentChatroomTopic,
    chatroomType,
    shimmerIsLoading,
    chatroomName,
    refInput,

    removeReaction,
    handleLongPress,
    handleClick,
    onTapToUndo,
    handleFileUpload,
  }: ChatroomContextValues = useChatroomContext();

  const {
    flatlistRef,
    isFound,
    flashListMounted,

    setIsFound,
    setFlashListMounted,
    handleOnScroll,
    renderFooter,
    getIconAttachment,
  } = useMessageListContext();

  const LMChatContextStyles = useLMChatStyles();
  const chatBubbleStyles = LMChatContextStyles?.chatBubbleStyles;

  //styling props
  const selectedBackgroundColor = chatBubbleStyles?.selectedBackgroundColor;

  const SELECTED_BACKGROUND_COLOR = selectedBackgroundColor
    ? selectedBackgroundColor
    : STYLES.$COLORS.SELECTED_BLUE;
  // styling props ended

  const { stateArr }: any = useAppSelector((state) => state.chatroom);
  const { uploadingFilesMessages }: any = useAppSelector(
    (state) => state.upload
  );
  const dispatch = useAppDispatch();

  return (
    <>
      {shimmerIsLoading ? (
        <View style={{ marginTop: 10 }}>
          <View
            style={{
              backgroundColor: "#e8e8e877",
              width: 200,
              paddingLeft: 8,
              paddingVertical: 15,
              borderTopRightRadius: 12,
              borderTopLeftRadius: 12,
              borderBottomRightRadius: 12,
            }}
          >
            <ShimmerPlaceHolder
              style={{ width: 150, height: 10, borderRadius: 5 }}
            />
            <ShimmerPlaceHolder
              style={{
                width: 120,
                height: 10,
                marginTop: 10,
                borderRadius: 5,
              }}
            />
          </View>

          <View
            style={{
              backgroundColor: "#e8e8e877",
              alignSelf: "flex-end",
              width: 200,
              paddingLeft: 8,
              paddingVertical: 15,
              borderTopRightRadius: 12,
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
              marginTop: 10,
            }}
          >
            <ShimmerPlaceHolder
              style={{ width: 150, height: 10, borderRadius: 5 }}
            />
            <ShimmerPlaceHolder
              style={{
                width: 120,
                height: 10,
                marginTop: 10,
                borderRadius: 5,
              }}
            />
          </View>

          <View
            style={{
              backgroundColor: "#e8e8e877",
              width: 200,
              paddingLeft: 8,
              paddingVertical: 15,
              borderTopRightRadius: 12,
              borderTopLeftRadius: 12,
              borderBottomRightRadius: 12,
              marginTop: 10,
            }}
          >
            <ShimmerPlaceHolder
              style={{ width: 150, height: 10, borderRadius: 5 }}
            />
            <ShimmerPlaceHolder
              style={{
                width: 120,
                height: 10,
                marginTop: 10,
                borderRadius: 5,
              }}
            />
          </View>

          <View
            style={{
              backgroundColor: "#e8e8e877",
              alignSelf: "flex-end",
              width: 200,
              paddingLeft: 8,
              paddingVertical: 15,
              borderTopRightRadius: 12,
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
              marginTop: 10,
            }}
          >
            <ShimmerPlaceHolder
              style={{ width: 150, height: 10, borderRadius: 5 }}
            />
            <ShimmerPlaceHolder
              style={{
                width: 120,
                height: 10,
                marginTop: 10,
                borderRadius: 5,
              }}
            />
          </View>
        </View>
      ) : (
        <>
          <FlashList
            ref={flatlistRef}
            data={conversations}
            keyExtractor={(item: any, index) => {
              const isArray = Array.isArray(item);
              return isArray ? `${index}` : `${item?.id}`;
            }}
            extraData={{
              value: [
                selectedMessages,
                uploadingFilesMessages,
                stateArr,
                conversations,
              ],
            }}
            estimatedItemSize={250}
            renderItem={({ item: value, index }: any) => {
              const uploadingFilesMessagesIDArr = Object.keys(
                uploadingFilesMessages
              );
              let item = { ...value };
              if (uploadingFilesMessagesIDArr.includes(value?.id?.toString())) {
                item = uploadingFilesMessages[value?.id];
              }

              const isStateIncluded = stateArr.includes(item?.state);

              let isIncluded = selectedMessages.some(
                (val: any) => val?.id === item?.id && !isStateIncluded
              );

              if (isFound && item?.id == currentChatroomTopic?.id) {
                isIncluded = true;
              }

              return (
                <View>
                  {index < conversations?.length &&
                  conversations[index]?.date !==
                    conversations[index + 1]?.date ? (
                    <View style={[styles.statusMessage]}>
                      <Text
                        style={{
                          color: STYLES.$COLORS.FONT_PRIMARY,
                          fontSize: STYLES.$FONT_SIZES.SMALL,
                          fontFamily: STYLES.$FONT_TYPES.LIGHT,
                        }}
                      >
                        {item?.date}
                      </Text>
                    </View>
                  ) : null}

                  <Swipeable
                    onFocusKeyboard={() => {
                      refInput?.current?.focus();
                    }}
                    item={item}
                    isStateIncluded={isStateIncluded}
                  >
                    <Pressable
                      onLongPress={(event) => {
                        const { pageX, pageY } = event.nativeEvent;
                        dispatch({
                          type: SET_POSITION,
                          body: { pageX: pageX, pageY: pageY },
                        });
                        handleLongPress(
                          isStateIncluded,
                          isIncluded,
                          item,
                          selectedMessages
                        );
                      }}
                      delayLongPress={200}
                      onPress={function (event) {
                        const { pageX, pageY } = event.nativeEvent;
                        dispatch({
                          type: SET_POSITION,
                          body: { pageX: pageX, pageY: pageY },
                        });
                        handleClick(
                          isStateIncluded,
                          isIncluded,
                          item,
                          false,
                          selectedMessages
                        );
                      }}
                      style={
                        isIncluded
                          ? selectedBackgroundColor
                            ? { backgroundColor: SELECTED_BACKGROUND_COLOR }
                            : {
                                backgroundColor:
                                  STYLES.$COLORS.SELECTED_CHAT_BUBBLE,
                              }
                          : null
                      }
                    >
                      <Messages
                        chatroomName={chatroomName}
                        chatroomID={chatroomID}
                        chatroomType={chatroomType}
                        onScrollToIndex={(index: any) => {
                          flatlistRef.current?.scrollToIndex({
                            animated: true,
                            index,
                          });
                        }}
                        isIncluded={isIncluded}
                        item={item}
                        navigation={navigation}
                        openKeyboard={() => {
                          handleClick(
                            isStateIncluded,
                            isIncluded,
                            item,
                            true,
                            selectedMessages
                          );
                        }}
                        longPressOpenKeyboard={() => {
                          handleLongPress(
                            isStateIncluded,
                            isIncluded,
                            item,
                            selectedMessages
                          );
                        }}
                        removeReaction={(
                          item: any,
                          reactionArr: any,
                          removeFromList?: any
                        ) => {
                          removeReaction(item, reactionArr, removeFromList);
                        }}
                        handleTapToUndo={() => {
                          onTapToUndo();
                        }}
                        handleFileUpload={handleFileUpload}
                      />
                    </Pressable>
                  </Swipeable>
                </View>
              );
            }}
            onScroll={handleOnScroll}
            ListHeaderComponent={renderFooter}
            ListFooterComponent={renderFooter}
            keyboardShouldPersistTaps={"handled"}
            inverted
          />

          {/* Chatroom Topic */}
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
                  currentChatroomTopic?.attachments[0]?.type !==
                    DocumentType.PDF &&
                  currentChatroomTopic?.attachments[0]?.type !==
                    DocumentType.VOICE_NOTE ? (
                    <Image
                      source={{
                        uri:
                          currentChatroomTopic?.attachments[0]?.type ==
                          DocumentType.IMAGE
                            ? currentChatroomTopic?.attachments[0]?.url
                            : currentChatroomTopic?.attachments[0]
                                ?.thumbnailUrl,
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
        </>
      )}
    </>
  );
};

export default MessageList;
