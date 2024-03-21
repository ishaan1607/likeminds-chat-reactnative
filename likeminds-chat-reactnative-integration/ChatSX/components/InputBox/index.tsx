import {
  View,
  TouchableOpacity,
  Platform,
  Modal,
  Pressable,
  Keyboard,
  Vibration,
  ImageStyle,
  TextStyle,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import { useAppDispatch } from "../../store";
import {
  CLEAR_SELECTED_VOICE_NOTE_FILES_TO_UPLOAD,
  SELECTED_MESSAGES,
  SELECTED_VOICE_NOTE_FILES_TO_UPLOAD,
  SET_EDIT_MESSAGE,
  SET_IS_REPLY,
  SET_REPLY_MESSAGE,
} from "../../store/types/types";
import { ReplyBox } from "../ReplyConversations";
import { CREATE_POLL_SCREEN } from "../../constants/Screens";
import STYLES from "../../constants/Styles";
import SendDMRequestModal from "../../customModals/SendDMRequest";
import {
  CAMERA_TEXT,
  CAPITAL_GIF_TEXT,
  DOCUMENTS_TEXT,
  PHOTOS_AND_VIDEOS_TEXT,
  POLL_TEXT,
  SLIDE_TO_CANCEL,
  TAP_AND_HOLD,
  VOICE_NOTE_TEXT,
} from "../../constants/Strings";
import { replaceLastMention } from "../../commonFuctions";
import { FlashList } from "@shopify/flash-list";
import { ChatroomChatRequestState, Events, Keys } from "../../enums";
import { ChatroomType } from "../../enums";
import { InputBoxProps, VoiceNotesPlayerProps, VoiceNotesProps } from "./models";
import Animated, { Easing } from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
import LinkPreviewInputBox from "../linkPreviewInputBox";
import { GiphyDialog } from "@giphy/react-native-sdk";
import {
  LMChatIcon,
  LMChatTextInput,
  LMChatTextView,
} from "../../uiComponents";
import Layout from "../../constants/Layout";
import {
  InputBoxContextProvider,
  useInputBoxContext,
} from "../../context/InputBoxContext";
import { useCustomisableMethodsContext } from "../../context/CustomisableMethodsContext";
import {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { generateAudioSet, generateVoiceNoteName } from "../../audio";
import ReactNativeBlobUtil from "react-native-blob-util";
import { LMChatAnalytics } from "../../analytics/LMChatAnalytics";
import AudioRecorderPlayer from "react-native-audio-recorder-player";

const InputBox = (props: InputBoxProps) => {
  return (
    <InputBoxContextProvider {...props}>
      <InputBoxComponent />
    </InputBoxContextProvider>
  );
};

const audioRecorderPlayerAttachment = new AudioRecorderPlayer();

interface CustomisableMethodsContext {
  handleGalleryProp?: () => void;
  handleCameraProp?: () => void;
  handleDocProp?: () => void;
  onEditProp?: () => void;
}

const InputBoxComponent = () => {
  const {
    handleGalleryProp,
    handleCameraProp,
    handleDocProp,
    onEditProp,
  }: CustomisableMethodsContext = useCustomisableMethodsContext();
  const [isDraggable, setIsDraggable] = useState(true);
  const [isLongPressedState, setIsLongPressedState] = useState(false);
  const [voiceNotesPlayer, setVoiceNotesPlayer] =
    useState<VoiceNotesPlayerProps>({
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: "",
      duration: "",
    });
  const [voiceNotesLink, setVoiceNotesLink] = useState("");
  const [isVoiceResult, setIsVoiceResult] = useState(false);
  const [isVoiceNotePlaying, setIsVoiceNotePlaying] = useState(false);
  const [isVoiceNoteRecording, setIsVoiceNoteRecording] = useState(false);
  const [isRecordingLocked, setIsRecordingLocked] = useState(false);
  const [stopRecording, setStopRecording] = useState(false);
  const [isDeleteAnimation, setIsDeleteAnimation] = useState(false);

  const {
    isVoiceNoteIconPress,
    hideDMSentAlert,
    selectGallery,
    selectDoc,
    handleModalClose,
    sendDmRequest,
    handleCamera,
    handleGallery,
    handleDoc,
    onSend,
    handleLoadMore,
    renderFooter,
    handleInputChange,
    onEdit,
    askPermission,
    setModalVisible,
    chatroomType,
    DMSentAlertModalVisible,
    message,
    inputBoxStyles,
    isKeyBoardFocused,
    isIOS,
    isUploadScreen,
    isReply,
    isUserTagging,
    isEditable,
    ogTagsState,
    userTaggingList,
    userTaggingListHeight,
    groupTags,
    taggedUserName,
    setMessage,
    setUserTaggingList,
    setGroupTags,
    setIsUserTagging,
    replyMessage,
    chatroomName,
    showLinkPreview,
    closedOnce,
    setShowLinkPreview,
    setClosedOnce,
    setClosedPreview,
    editConversation,
    setIsEditable,
    isDoc,
    isGif,
    chatRequestState,
    inputHeight,
    setInputHeight,
    myRef,
    MAX_LENGTH,
    isPrivateMember,
    isRecordingPermission,
    setIsVoiceNoteIconPress,
    modalVisible,
    navigation,
    chatroomID,
    conversations,
    voiceNotes,
    setVoiceNotes
  } = useInputBoxContext();
  const dispatch = useAppDispatch();

    // this useEffect is to stop audio player when going out of chatroom, if any audio is running
    useEffect(() => {
      return () => {
        stopRecord();
        stopPlay();
      };
    }, []);

    // Animation

    const pressed = useSharedValue(false);
    const x = useSharedValue(0);
    const y = useSharedValue(0);
    const lockOffset = useSharedValue(4);
    const upChevronOffset = useSharedValue(3);
    const micIconOpacity = useSharedValue(1); // Initial opacity value
    const isLongPressed = useSharedValue(false);
  
    // lock icon animation styles
    const lockAnimatedStyles = useAnimatedStyle(() => ({
      transform: [{ translateY: lockOffset.value }],
    }));
  
    // up chevron animated styles
    const upChevronAnimatedStyles = useAnimatedStyle(() => ({
      transform: [{ translateY: upChevronOffset.value }],
    }));
  
    // recorder mic icon animation effect
    useEffect(() => {
      micIconOpacity.value = withRepeat(
        withTiming(0, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        -1, // Infinite repetition (-1)
        true // Reverse the animation direction after each iteration
      );
    }, []);
  
    // lock icon animation useEffect
    useEffect(() => {
      lockOffset.value = withRepeat(
        withTiming(-lockOffset.value, { duration: 800 }),
        -1, // Infinite repetition (-1)
        true // Reverse the animation direction after each iteration
      );
    }, []);
  
    // up chevron animation useEffect
    useEffect(() => {
      upChevronOffset.value = withRepeat(
        withTiming(-upChevronOffset.value, { duration: 400 }),
        -1,
        true
      );
    }, []);
  
    // to hide delete animation
    useEffect(() => {
      if (isDeleteAnimation) {
        setTimeout(() => {
          setIsDeleteAnimation(false);
          setIsVoiceResult(false);
        }, 2200);
      }
    }, [isDeleteAnimation]);
  
    // to stop the recorder
    useEffect(() => {
      setTimeout(async () => {
        if (!isLongPressedState && isVoiceNoteRecording && !isRecordingLocked) {
          await stopRecord();
          setIsVoiceResult(true);
        }
      }, 300);
    }, [isLongPressedState, isRecordingLocked]);
  
    // to start Recorder
    useEffect(() => {
      if (isLongPressedState && !isVoiceNoteRecording) {
        Vibration.vibrate(0.5 * 100);
        startRecord();
      }
    }, [isLongPressedState]);
  
    // long press gesture
    const longPressGesture = Gesture.LongPress()
      .runOnJS(true)
      .minDuration(250)
      .onStart(() => {
        isLongPressed.value = true;
        setIsLongPressedState(true);
      });
  
    // this method handles onUpdate callback of pan gesture
    const onUpdatePanGesture = (
      event: GestureUpdateEvent<PanGestureHandlerEventPayload>
    ) => {
      "worklet";
      if (isLongPressed.value) {
        if (Math.abs(x.value) >= 120) {
          x.value = withSpring(0);
          if (isDraggable) {
            stopRecord();
            setIsDraggable(false);
            setIsDeleteAnimation(true);
            clearVoiceRecord();
            setIsDraggable(true);
            isLongPressed.value = false;
          }
          pressed.value = false;
          isLongPressed.value = false;
        } else if (Math.abs(y.value) >= 100) {
          y.value = withSpring(0);
          if (isDraggable) {
            setIsDraggable(false);
            setIsDraggable(true);
            setIsRecordingLocked(true);
            setIsLongPressedState(false);
            isLongPressed.value = false;
          }
        } else if (Math.abs(x.value) > 5) {
          x.value = event.translationX;
        } else if (Math.abs(y.value) > 5) {
          y.value = event.translationY;
        } else {
          x.value = event.translationX;
          y.value = event.translationY;
        }
      }
    };
  
    // this method handles onEnd callback of pan gesture
    const onEndPanGesture = () => {
      "worklet";
      if (
        (Math.abs(x.value) > 5 && Math.abs(x.value) < 120) ||
        (Math.abs(y.value) > 5 && Math.abs(y.value) < 100)
      ) {
        setIsRecordingLocked(false);
        handleStopRecord();
      }
      x.value = withSpring(0);
      y.value = withSpring(0);
      pressed.value = false;
      isLongPressed.value = false;
      setIsLongPressedState(false);
    };
  
    // draggle mic pan gesture on x-axis and y-axis
    const panGesture = Gesture.Pan()
      .runOnJS(true)
      .enabled(isDraggable)
      .onUpdate(onUpdatePanGesture)
      .onEnd(onEndPanGesture)
      .onFinalize(() => {
        "worklet";
        pressed.value = false;
        isLongPressed.value = false;
        setIsLongPressedState(false);
        setIsDraggable(true);
      })
      .onTouchesCancelled(() => {
        setIsDraggable(true);
      })
      .simultaneousWithExternalGesture(longPressGesture);
  
    const composedGesture = Gesture.Simultaneous(longPressGesture, panGesture);
  
    // draggle mic panGesture styles
    const panStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateX: x.value,
          },
          {
            translateY: y.value,
          },
          { scale: withTiming(isLongPressed.value ? 1.5 : 1) },
        ],
      };
    }, [x, y]);
  
    // Animation stop

      // Audio and play section

  // to stop recorder after 15 min
  useEffect(() => {
    (async function stopRecorder() {
      if (isVoiceNoteRecording) {
        await handleStopRecord();
      }
    })();
  }, [stopRecording]);

  // to start audio recording
  const startRecord = async () => {
    if (!isVoiceNoteRecording) {
      const audioSet = generateAudioSet();

      const name = generateVoiceNoteName();
      const path =
        Platform.OS === "android"
          ? `${ReactNativeBlobUtil.fs.dirs.CacheDir}/${name}.mp3`
          : `${name}.m4a`;

      const result = await audioRecorderPlayerAttachment.startRecorder(
        path,
        audioSet
      );
      setIsVoiceNoteRecording(true);
      setVoiceNotesLink(result);
      audioRecorderPlayerAttachment.addRecordBackListener((e) => {
        const seconds = Math.floor(e.currentPosition / 1000);
        if (seconds >= 900) {
          setStopRecording(!stopRecording);
        }
        setVoiceNotes({
          recordSecs: e.currentPosition,
          recordTime: audioRecorderPlayerAttachment
            .mmssss(Math.floor(e.currentPosition))
            .slice(0, 5),
          name: name,
        });
        return;
      });
    }
  };

  // to stop audio recording
  const stopRecord = async () => {
    if (isVoiceNoteRecording) {
      await audioRecorderPlayerAttachment.stopRecorder();
      audioRecorderPlayerAttachment.removeRecordBackListener();

      // if isVoiceResult is true we show audio player instead of audio recorder
      const voiceNote = {
        uri: voiceNotesLink,
        type: VOICE_NOTE_TEXT,
        name: `${voiceNotes.name}.${isIOS ? "m4a" : "mp3"}`,
        duration: Math.floor(voiceNotes.recordSecs / 1000),
      };
      dispatch({
        type: SELECTED_VOICE_NOTE_FILES_TO_UPLOAD,
        body: {
          audio: [voiceNote],
        },
      });

      setIsVoiceNoteRecording(false);

      LMChatAnalytics.track(
        Events.VOICE_NOTE_RECORDED,
        new Map<string, string>([
          [Keys.CHATROOM_TYPE, chatroomType?.toString()],
          [Keys.CHATROOM_ID, chatroomID?.toString()],
        ])
      );
    }
  };

  const handleStopRecord = async () => {
    // to give some time for initiating the start recorder, then only stop it
    setTimeout(async () => {
      await stopRecord();
      setIsVoiceResult(true);
      setIsRecordingLocked(false);
    }, 500);
  };

  // to reset all the recording data we had previously
  const clearVoiceRecord = async () => {
    if (isVoiceNoteRecording) {
      await stopRecord();
    } else if (isVoiceNotePlaying) {
      await stopPlay();
    }
    setVoiceNotes({
      recordSecs: 0,
      recordTime: "",
      name: "",
    });
    setVoiceNotesPlayer({
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: "",
      duration: "",
    });
    setVoiceNotesLink("");
    setIsRecordingLocked(false);

    dispatch({
      type: CLEAR_SELECTED_VOICE_NOTE_FILES_TO_UPLOAD,
    });

    // if isVoiceResult is false we show audio recorder instead of audio player
    setIsVoiceResult(false);

    LMChatAnalytics.track(
      Events.VOICE_NOTE_CANCELED,
      new Map<string, string>([
        [Keys.CHATROOM_TYPE, chatroomType?.toString()],
        [Keys.CHATROOM_ID, chatroomID?.toString()],
      ])
    );
  };

  // to start playing audio recording
  const startPlay = async (path: string) => {
    await audioRecorderPlayerAttachment.startPlayer(path);
    audioRecorderPlayerAttachment.addPlayBackListener((e) => {
      const playTime = audioRecorderPlayerAttachment.mmssss(
        Math.floor(e.currentPosition)
      );
      const duration = audioRecorderPlayerAttachment.mmssss(
        Math.floor(e.duration)
      );
      setVoiceNotesPlayer({
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: audioRecorderPlayerAttachment
          .mmssss(Math.floor(e.currentPosition))
          .slice(0, 5),
        duration: audioRecorderPlayerAttachment
          .mmssss(Math.floor(e.duration))
          .slice(0, 5),
      });

      // to reset the player after audio player completed it duration
      if (playTime === duration) {
        setIsVoiceNotePlaying(false);
        setVoiceNotesPlayer({
          currentPositionSec: 0,
          currentDurationSec: 0,
          playTime: "",
          duration: "",
        });
      }
      return;
    });

    LMChatAnalytics.track(
      Events.VOICE_NOTE_PREVIEWED,
      new Map<string, string>([
        [Keys.CHATROOM_TYPE, chatroomType?.toString()],
        [Keys.CHATROOM_ID, chatroomID?.toString()],
      ])
    );
    setIsVoiceNotePlaying(true);
  };

  // to stop playing audio recording
  const stopPlay = async () => {
    await audioRecorderPlayerAttachment.stopPlayer();
    setIsVoiceNotePlaying(false);
  };

  // to pause playing audio recording
  const onPausePlay = async () => {
    await audioRecorderPlayerAttachment.pausePlayer();
    setIsVoiceNotePlaying(false);
  };

  // to resume playing audio recording
  const onResumePlay = async () => {
    await audioRecorderPlayerAttachment.resumePlayer();
    setIsVoiceNotePlaying(true);
  };

  return (
    <View>
      {/* shows message how we record voice note */}
      {isVoiceNoteIconPress && (
        <View
          style={[
            styles.tapAndHold,
            {
              bottom: isKeyBoardFocused ? (isIOS ? 65 : 110) : isIOS ? 80 : 70,
            },
          ]}
        >
          <LMChatTextView textStyle={styles.tapAndHoldStyle}>
            {TAP_AND_HOLD}
          </LMChatTextView>
        </View>
      )}

      <View
        style={[
          styles.inputContainer,
          !isUploadScreen
            ? {
                marginBottom: isKeyBoardFocused
                  ? Platform.OS === "android"
                    ? 5
                    : 5
                  : isIOS
                  ? 20
                  : 5,
              }
            : null,
        ]}
      >
        <View
          style={
            (isReply && !isUploadScreen) ||
            isUserTagging ||
            isEditable ||
            Object.keys(ogTagsState).length !== 0
              ? [
                  styles.replyBoxParent,
                  {
                    borderTopWidth:
                      isReply && !isUploadScreen && !isUserTagging ? 0 : 0,
                    borderTopLeftRadius:
                      isReply && !isUploadScreen && !isUserTagging ? 10 : 20,
                    borderTopRightRadius:
                      isReply && !isUploadScreen && !isUserTagging ? 10 : 20,
                    backgroundColor: isUploadScreen ? "black" : "white",
                  },
                ]
              : null
          }
        >
          {userTaggingList && isUserTagging ? (
            <View
              style={[
                styles.taggableUsersBox,
                {
                  backgroundColor: isUploadScreen ? "black" : "white",
                  height: userTaggingListHeight,
                },
              ]}
            >
              <FlashList
                data={[...groupTags, ...userTaggingList]}
                renderItem={({ item, index }: any) => {
                  const description = item?.description;
                  const imageUrl = item?.imageUrl;
                  return (
                    <Pressable
                      onPress={() => {
                        const uuid = item?.sdkClientInfo?.uuid;
                        const res = replaceLastMention(
                          message,
                          taggedUserName,
                          item?.name,
                          uuid ? `user_profile/${uuid}` : uuid
                        );
                        setMessage(res);
                        setUserTaggingList([]);
                        setGroupTags([]);
                        setIsUserTagging(false);
                      }}
                      style={styles.taggableUserView}
                    >
                      {imageUrl ? (
                        <LMChatIcon
                          iconUrl={imageUrl}
                          iconStyle={styles.avatar}
                        />
                      ) : (
                        <LMChatIcon
                          assetPath={require("../../assets/images/default_pic.png")}
                          iconStyle={styles.avatar}
                        />
                      )}
                      <View
                        style={[
                          styles.infoContainer,
                          {
                            borderBottomWidth: Layout.normalize(0.2),
                            gap: isIOS ? Layout.normalize(5) : 0,
                          },
                        ]}
                      >
                        <LMChatTextView
                          textStyle={{
                            ...styles.title,
                            color: isUploadScreen
                              ? STYLES.$COLORS.TERTIARY
                              : STYLES.$COLORS.PRIMARY,
                          }}
                          maxLines={1}
                        >
                          {item?.name}
                        </LMChatTextView>
                        {description ? (
                          <LMChatTextView
                            textStyle={{
                              ...styles.subTitle,
                              color: isUploadScreen
                                ? STYLES.$COLORS.TERTIARY
                                : STYLES.$COLORS.PRIMARY,
                            }}
                            maxLines={1}
                          >
                            {description}
                          </LMChatTextView>
                        ) : null}
                      </View>
                    </Pressable>
                  );
                }}
                extraData={{
                  value: [message, userTaggingList],
                }}
                estimatedItemSize={50}
                keyboardShouldPersistTaps={"handled"}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={1}
                bounces={false}
                ListFooterComponent={renderFooter}
                keyExtractor={(item: any, index) => {
                  return index?.toString();
                }}
              />
            </View>
          ) : null}

          {isReply && !isUploadScreen && (
            <View style={styles.replyBox}>
              <ReplyBox
                isIncluded={false}
                item={replyMessage}
                chatroomName={chatroomName}
              />
              <TouchableOpacity
                onPress={() => {
                  dispatch({ type: SET_IS_REPLY, body: { isReply: false } });
                  dispatch({
                    type: SET_REPLY_MESSAGE,
                    body: { replyMessage: "" },
                  });
                }}
                style={styles.replyBoxClose}
              >
                <LMChatIcon
                  assetPath={require("../../assets/images/close_icon.png")}
                  iconStyle={styles.replyCloseImg}
                />
              </TouchableOpacity>
            </View>
          )}

          {Object.keys(ogTagsState).length !== 0 &&
          showLinkPreview &&
          !closedOnce ? (
            <View
              style={[
                styles.taggableUsersBox,
                {
                  backgroundColor: isUploadScreen ? "black" : "white",
                },
              ]}
            >
              <LinkPreviewInputBox ogTags={ogTagsState} />
              <TouchableOpacity
                onPress={() => {
                  setShowLinkPreview(false);
                  setClosedOnce(true);
                  setClosedPreview(true);
                }}
                style={styles.replyBoxClose}
              >
                <LMChatIcon
                  assetPath={require("../../assets/images/close_icon.png")}
                  iconStyle={styles.replyCloseImg}
                />
              </TouchableOpacity>
            </View>
          ) : null}

          {isEditable ? (
            <View style={styles.replyBox}>
              <ReplyBox
                isIncluded={false}
                item={editConversation}
                chatroomName={chatroomName}
              />
              <TouchableOpacity
                onPress={() => {
                  setIsEditable(false);
                  setMessage("");
                  dispatch({
                    type: SET_EDIT_MESSAGE,
                    body: {
                      editConversation: "",
                    },
                  });
                  dispatch({
                    type: SELECTED_MESSAGES,
                    body: [],
                  });
                }}
                style={styles.replyBoxClose}
              >
                <LMChatIcon
                  assetPath={require("../../assets/images/close_icon.png")}
                  iconStyle={styles.replyCloseImg}
                />
              </TouchableOpacity>
            </View>
          ) : null}

          <View
            style={[
              styles.textInput,
              !(isEditable || isReply) ? styles.inputBoxWithShadow : null,
              {
                backgroundColor: isUploadScreen
                  ? STYLES.$BACKGROUND_COLORS.DARK
                  : STYLES.$BACKGROUND_COLORS.LIGHT,
              },
              (isReply && !isUploadScreen) || isEditable || isUserTagging
                ? {
                    borderWidth: 0,
                    margin: isIOS ? 0 : Layout.normalize(2),
                  }
                : null,
            ]}
          >
            {!!isUploadScreen && !isDoc && !isGif ? (
              <TouchableOpacity
                style={styles.addMoreButton}
                onPress={() => {
                  selectGallery();
                }}
              >
                <LMChatIcon
                  assetPath={require("../../assets/images/addImages3x.png")}
                  iconStyle={styles.emoji}
                />
              </TouchableOpacity>
            ) : !!isUploadScreen && !!isDoc && !isGif ? (
              <TouchableOpacity
                style={styles.addMoreButton}
                onPress={() => {
                  selectDoc();
                }}
              >
                <LMChatIcon
                  assetPath={require("../../assets/images/add_more_docs3x.png")}
                  iconStyle={styles.emoji}
                />
              </TouchableOpacity>
            ) : isUploadScreen ? (
              <View style={styles.paddingHorizontal} />
            ) : null}

            {isDeleteAnimation ? (
              <View
                style={[
                  styles.voiceNotesInputParent,
                  styles.voiceRecorderInput,
                  {
                    paddingVertical: 0,
                    marginVertical: 0,
                    marginHorizontal: Layout.normalize(10),
                  },
                ]}
              >
                <View style={styles.alignItems}>
                  <LottieView
                    source={require("../../assets/lottieJSON/delete.json")}
                    style={{ height: 40, width: 40 }}
                    autoPlay
                    // loop
                  />
                </View>
              </View>
            ) : !!voiceNotes?.recordTime && !isVoiceResult ? (
              <View
                style={[
                  styles.voiceNotesInputParent,
                  styles.voiceRecorderInput,
                ]}
              >
                <View style={styles.alignItems}>
                  <Animated.View style={[{ opacity: micIconOpacity }]}>
                    <LMChatIcon
                      assetPath={require("../../assets/images/record_icon3x.png")}
                      iconStyle={styles.emoji}
                    />
                  </Animated.View>
                  <LMChatTextView textStyle={styles.recordTitle}>
                    {voiceNotes.recordTime}
                  </LMChatTextView>
                </View>
                {isRecordingLocked ? (
                  <View style={styles.alignItems}>
                    <TouchableOpacity onPress={handleStopRecord}>
                      <LMChatIcon
                        assetPath={require("../../assets/images/stop_recording_icon3x.png")}
                        iconStyle={styles.emoji}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={clearVoiceRecord}>
                      <LMChatIcon
                        assetPath={require("../../assets/images/cross_circle_icon3x.png")}
                        iconStyle={styles.emoji}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.alignItems}>
                    <LMChatIcon
                      assetPath={require("../../assets/images/left_chevron_icon3x.png")}
                      iconStyle={styles.chevron}
                    />
                    <LMChatTextView textStyle={styles.recordTitle}>
                      {SLIDE_TO_CANCEL}
                    </LMChatTextView>
                  </View>
                )}
              </View>
            ) : isVoiceResult ? (
              <View
                style={[
                  styles.voiceNotesInputParent,
                  styles.voiceRecorderInput,
                ]}
              >
                <View style={styles.alignItems}>
                  {isVoiceNotePlaying ? (
                    <TouchableOpacity
                      onPress={() => {
                        onPausePlay();
                      }}
                    >
                      <LMChatIcon
                        assetPath={require("../../assets/images/pause_icon3x.png")}
                        iconStyle={styles.emoji}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        if (voiceNotesPlayer?.playTime !== "") {
                          onResumePlay();
                        } else {
                          startPlay(voiceNotesLink);
                        }
                      }}
                    >
                      <LMChatIcon
                        assetPath={require("../../assets/images/play_icon3x.png")}
                        iconStyle={styles.emoji}
                      />
                    </TouchableOpacity>
                  )}
                  {isVoiceNotePlaying || voiceNotesPlayer?.playTime ? (
                    <LMChatTextView textStyle={styles.recordTitle}>
                      {voiceNotesPlayer?.playTime}
                    </LMChatTextView>
                  ) : (
                    <LMChatTextView textStyle={styles.recordTitle}>
                      {voiceNotes?.recordTime}
                    </LMChatTextView>
                  )}
                </View>
                <TouchableOpacity
                  onPress={clearVoiceRecord}
                  style={styles.alignItems}
                >
                  <LMChatIcon
                    assetPath={require("../../assets/images/cross_circle_icon3x.png")}
                    iconStyle={styles.emoji}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={[
                  styles.inputParent,
                  isUploadScreen
                    ? {
                        marginHorizontal: Layout.normalize(5),
                      }
                    : { marginHorizontal: Layout.normalize(15) },
                ]}
              >
                {!isUploadScreen &&
                !(
                  chatRequestState === ChatroomChatRequestState.INITIATED ||
                  chatRequestState === null
                ) &&
                !isEditable &&
                !voiceNotes?.recordTime &&
                !isDeleteAnimation ? (
                  <TouchableOpacity
                    style={styles.gifView}
                    onPress={() => GiphyDialog.show()}
                  >
                    <LMChatTextView textStyle={styles.gifText}>
                      {CAPITAL_GIF_TEXT}
                    </LMChatTextView>
                  </TouchableOpacity>
                ) : null}
                <LMChatTextInput
                  placeholderText={
                    inputBoxStyles?.placeholderText
                      ? inputBoxStyles?.placeholderText
                      : "Type a message"
                  }
                  placeholderTextColor={inputBoxStyles?.placeholderTextColor}
                  plainTextStyle={[
                    inputBoxStyles?.plainTextStyle,
                    {
                      color: isUploadScreen
                        ? STYLES.$BACKGROUND_COLORS.LIGHT
                        : STYLES.$BACKGROUND_COLORS.DARK,
                    },
                  ]}
                  style={
                    [
                      styles.input,
                      inputBoxStyles?.inputTextStyle,
                      {
                        height: Math.max(25, inputHeight),
                        color: isUploadScreen
                          ? STYLES.$BACKGROUND_COLORS.LIGHT
                          : STYLES.$BACKGROUND_COLORS.DARK,
                      },
                    ] as TextStyle
                  }
                  onContentSizeChange={(event) => {
                    setInputHeight(event.nativeEvent.contentSize.height);
                  }}
                  multilineField
                  inputRef={myRef}
                  onType={handleInputChange}
                  autoFocus={false}
                  selectionColor={inputBoxStyles?.selectionColor}
                  partTypes={[
                    {
                      trigger: "@",
                      textStyle: inputBoxStyles?.partsTextStyle, // The mention style in the input
                    },
                  ]}
                  inputText={message}
                  maxLength={
                    chatRequestState === 0 || chatRequestState === null
                      ? MAX_LENGTH
                      : undefined
                  }
                />
              </View>
            )}

            {!isUploadScreen &&
            !(chatRequestState === 0 || chatRequestState === null) &&
            !isEditable &&
            !voiceNotes?.recordTime &&
            !isDeleteAnimation ? (
              <TouchableOpacity
                style={[
                  styles.emojiButton,
                  { marginLeft: Layout.normalize(15) },
                ]}
                onPress={() => {
                  Keyboard.dismiss();
                  setModalVisible(true);
                }}
              >
                <LMChatIcon
                  assetPath={require("../../assets/images/open_files3x.png")}
                  iconStyle={
                    [
                      styles.emoji,
                      inputBoxStyles?.attachmentIconStyles,
                    ] as ImageStyle
                  }
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        {/* Send message and send voice notes UI */}

        {/* {
          is message ||
          is voice recorded ||
          is File upload screen ||
          is recording locked ||
          is first DM message
        } */}
        {!!message ||
        isVoiceResult ||
        isUploadScreen ||
        isRecordingLocked ||
        (chatroomType === 10 && chatRequestState === null) ? (
          <TouchableOpacity
            onPressOut={async () => {
              if (
                chatroomType === ChatroomType.DMCHATROOM && // if DM
                chatRequestState === null &&
                isPrivateMember // isPrivateMember = false when none of the member on both sides is CM.
              ) {
                sendDmRequest();
              } else {
                if (isEditable) {
                  onEditProp ? onEditProp() : onEdit();
                } else {
                  const voiceNote = [
                    {
                      uri: voiceNotesLink,
                      type: VOICE_NOTE_TEXT,
                      name: `${voiceNotes.name}.${isIOS ? "m4a" : "mp3"}`,
                      duration: Math.floor(voiceNotes.recordSecs / 1000),
                    },
                  ];
                  if (isVoiceNoteRecording) {
                    await stopRecord();
                    onSend(message, voiceNote, true);
                  } else if (isVoiceNotePlaying) {
                    await stopPlay();
                    onSend(message, voiceNote, true);
                  } else {
                    onSend(message);
                  }
                }
              }
            }}
            style={styles.sendButton}
          >
            <LMChatIcon
              assetPath={require("../../assets/images/send_button3x.png")}
              iconStyle={
                [styles.send, inputBoxStyles?.sendIconStyles] as ImageStyle
              }
            />
          </TouchableOpacity>
        ) : (
          <View>
            {isRecordingPermission ? (
              <GestureDetector gesture={composedGesture}>
                <Animated.View>
                  {voiceNotes.recordTime && !isRecordingLocked && (
                    <View
                      style={[styles.lockRecording, styles.inputBoxWithShadow]}
                    >
                      <Animated.View style={lockAnimatedStyles}>
                        <LMChatIcon
                          assetPath={require("../../assets/images/lock_icon3x.png")}
                          iconStyle={styles.lockIconStyle}
                        />
                      </Animated.View>
                      <Animated.View style={upChevronAnimatedStyles}>
                        <LMChatIcon
                          assetPath={require("../../assets/images/up_chevron_icon3x.png")}
                          iconStyle={styles.chevronUpStyle}
                        />
                      </Animated.View>
                    </View>
                  )}

                  <Animated.View style={[styles.sendButton, panStyle]}>
                    <Pressable
                      onPress={() => {
                        setIsVoiceNoteIconPress(true);
                        Vibration.vibrate(0.5 * 100);
                      }}
                      style={[styles.sendButton, { position: "absolute" }]}
                    >
                      <LMChatIcon
                        assetPath={require("../../assets/images/mic_icon3x.png")}
                        iconStyle={
                          [
                            styles.mic,
                            inputBoxStyles?.micIconStyles,
                          ] as ImageStyle
                        }
                      />
                    </Pressable>
                  </Animated.View>
                </Animated.View>
              </GestureDetector>
            ) : (
              <Animated.View style={[styles.sendButton, panStyle]}>
                <Pressable
                  onPress={askPermission}
                  onLongPress={askPermission}
                  style={[styles.sendButton, { position: "absolute" }]}
                >
                  <LMChatIcon
                    assetPath={require("../../assets/images/mic_icon3x.png")}
                    iconStyle={
                      [styles.mic, inputBoxStyles?.micIconStyles] as ImageStyle
                    }
                  />
                </Pressable>
              </Animated.View>
            )}
          </View>
        )}
      </View>

      {/* More features modal like select Images, Docs etc. */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable style={styles.centeredView} onPress={handleModalClose}>
          <View style={styles.modalViewParent}>
            <Pressable onPress={() => {}} style={[styles.modalView]}>
              <View style={styles.alignModalElements}>
                <View style={styles.iconContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                      setTimeout(() => {
                        handleCameraProp ? handleCameraProp() : handleCamera();
                      }, 50);
                    }}
                    style={styles.cameraStyle}
                  >
                    <LMChatIcon
                      assetPath={require("../../assets/images/camera_icon3x.png")}
                      iconStyle={
                        [
                          styles.emoji,
                          inputBoxStyles?.cameraIconStyles,
                        ] as ImageStyle
                      }
                    />
                  </TouchableOpacity>
                  <LMChatTextView textStyle={styles.iconText}>
                    {CAMERA_TEXT}
                  </LMChatTextView>
                </View>
                <View style={styles.iconContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                      setTimeout(() => {
                        handleGalleryProp
                          ? handleGalleryProp()
                          : handleGallery();
                      }, 500);
                    }}
                    style={styles.imageStyle}
                  >
                    <LMChatIcon
                      assetPath={require("../../assets/images/select_image_icon3x.png")}
                      iconStyle={
                        [
                          styles.emoji,
                          inputBoxStyles?.galleryIconStyles,
                        ] as ImageStyle
                      }
                    />
                  </TouchableOpacity>
                  <LMChatTextView textStyle={styles.iconText}>
                    {PHOTOS_AND_VIDEOS_TEXT}
                  </LMChatTextView>
                </View>
                <View style={styles.iconContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                      setTimeout(() => {
                        handleDocProp ? handleDocProp() : handleDoc();
                      }, 50);
                    }}
                    style={styles.docStyle}
                  >
                    <LMChatIcon
                      assetPath={require("../../assets/images/select_doc_icon3x.png")}
                      iconStyle={
                        [
                          styles.emoji,
                          inputBoxStyles?.documentIconStyles,
                        ] as ImageStyle
                      }
                    />
                  </TouchableOpacity>
                  <LMChatTextView textStyle={styles.iconText}>
                    {DOCUMENTS_TEXT}
                  </LMChatTextView>
                </View>
                {chatroomType !== 10 ? (
                  <View style={styles.iconContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(false);
                        navigation.navigate(CREATE_POLL_SCREEN, {
                          chatroomID: chatroomID,
                          conversationsLength: conversations.length * 2,
                        });
                      }}
                      style={styles.pollStyle}
                    >
                      <LMChatIcon
                        assetPath={require("../../assets/images/poll_icon3x.png")}
                        iconStyle={
                          [
                            styles.emoji,
                            inputBoxStyles?.pollIconStyles,
                          ] as ImageStyle
                        }
                      />
                    </TouchableOpacity>
                    <LMChatTextView textStyle={styles.iconText}>
                      {POLL_TEXT}
                    </LMChatTextView>
                  </View>
                ) : null}
              </View>
            </Pressable>
          </View>
        </Pressable>
      </Modal>

      {/* SEND DM request Modal */}
      <SendDMRequestModal
        hideDMSentAlert={hideDMSentAlert}
        DMSentAlertModalVisible={DMSentAlertModalVisible}
        onSend={onSend}
        message={message}
      />
    </View>
  );
};

export default InputBox;
