import {
  View,
  Pressable,
  Image,
  Text,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Vibration,
  Keyboard,
  Modal,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {
  LMChatIcon,
  LMChatTextInput,
  LMChatTextView,
} from 'likeminds_chat_reactnative_ui';
import {detectMentions, replaceLastMention} from './utils';
import {myClient} from '../..';
import {styles} from './styles';
import {FlashList} from '@shopify/flash-list';
import Styles from 'likeminds_chat_reactnative_ui/components/constants/Styles';
import {decode, extractPathfromRouteQuery} from '../commonFunctions';
import LinkPreviewInputBox from '../linkPreviewInputBox';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {
  Gesture,
  GestureDetector,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  requestAudioRecordPermission,
  requestCameraPermission,
  requestStoragePermission,
} from './utils';
import {PERMISSIONS, check, request} from 'react-native-permissions';
import {
  CLEAR_SELECTED_VOICE_NOTE_FILES_TO_UPLOAD,
  EDIT_CONVERSATION,
  LONG_PRESSED,
  SELECTED_MESSAGES,
  SELECTED_VOICE_NOTE_FILES_TO_UPLOAD,
  SET_CHATROOM_TOPIC,
  SET_EDIT_MESSAGE,
  SET_FILE_UPLOADING_MESSAGES,
  SHOW_TOAST,
  STATUS_BAR_STYLE,
  UPDATE_LAST_CONVERSATION,
} from '../store/types/types';
import {useAppDispatch, useAppSelector} from '../store';
import {replaceMentionValues} from 'likeminds_chat_reactnative_ui/components/LMChatTextInput/utils';
import {
  CAMERA_TEXT,
  DOCUMENTS_TEXT,
  PHOTOS_AND_VIDEOS_TEXT,
} from '../constants/Strings';

const audioRecorderPlayerAttachment = new AudioRecorderPlayer();

interface VoiceNotesPlayerProps {
  currentPositionSec: number;
  currentDurationSec: number;
  playTime: string;
  duration: string;
}

interface VoiceNotesProps {
  recordSecs: number;
  recordTime: string;
  name: string;
}

interface ChatroomProps {
  previousMessage?: string;
  isUploadScreen?: boolean;
  isEditable?: boolean;
  chatroomType?: string;
  chatroomID?: string;
  setIsEditable?: any;
  currentChatroomTopic?: any;
}

export const Chatroom = ({
  previousMessage = '',
  isUploadScreen,
  isEditable,
  chatroomType,
  chatroomID,
  setIsEditable,
  currentChatroomTopic,
}: ChatroomProps) => {
  const [inputHeight, setInputHeight] = useState(25);
  let refInput = useRef<any>();
  const [debounceLinkPreviewTimeout, setLinkPreviewDebounceTimeout] =
    useState<any>(null);
  const [showLinkPreview, setShowLinkPreview] = useState(true);
  const [closedPreview, setClosedPreview] = useState(false);
  const [url, setUrl] = useState('');
  const [ogTagsState, setOgTagsState] = useState<any>({});
  const [message, setMessage] = useState(previousMessage);
  const [formattedConversation, setFormattedConversation] =
    useState(previousMessage);
  const [taggedUserName, setTaggedUserName] = useState('');
  const [debounceTimeout, setDebounceTimeout] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [userTaggingListHeight, setUserTaggingListHeight] = useState<any>(116);
  const [userTaggingList, setUserTaggingList] = useState<any>([]);
  const [groupTags, setGroupTags] = useState<any>([]);
  const [isUserTagging, setIsUserTagging] = useState(false);
  const isIOS = Platform.OS === 'ios' ? true : false;
  const [isKeyBoardFocused, setIsKeyBoardFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [closedOnce, setClosedOnce] = useState(false);
  const [isVoiceResult, setIsVoiceResult] = useState(false);
  const [isRecordingLocked, setIsRecordingLocked] = useState(false);
  const [voiceNotesLink, setVoiceNotesLink] = useState('');
  const [voiceNotes, setVoiceNotes] = useState<VoiceNotesProps>({
    recordSecs: 0,
    recordTime: '',
    name: '',
  });
  const [voiceNotesPlayer, setVoiceNotesPlayer] =
    useState<VoiceNotesPlayerProps>({
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '',
      duration: '',
    });
  const [isVoiceNoteRecording, setIsVoiceNoteRecording] = useState(false);
  const [isRecordingPermission, setIsRecordingPermission] = useState(false);
  const [isLongPressedState, setIsLongPressedState] = useState(false);
  const [isVoiceNoteIconPress, setIsVoiceNoteIconPress] = useState(false);
  const [isDraggable, setIsDraggable] = useState(true);
  const [isDeleteAnimation, setIsDeleteAnimation] = useState(false);
  const [isVoiceNotePlaying, setIsVoiceNotePlaying] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const {
    chatroomDetails,
    isReply,
    replyMessage,
    editConversation,
    fileSent,
    conversations = [],
  }: any = useAppSelector(state => state.chatroom);

  const dispatch = useAppDispatch();

  // function handles opening of camera functionality
  const handleCamera = async () => {
    if (isIOS) {
      // await openCamera();
    } else {
      const res = await requestCameraPermission();
      if (res === true) {
        // await openCamera();
      }
    }
  };

  // function handles the selection of images and videos
  const handleGallery = async () => {
    if (isIOS) {
      // selectGallery();
    } else {
      const res = await requestStoragePermission();
      if (res === true) {
        // selectGallery();
      }
    }
  };

  // function handles the slection of documents
  const handleDoc = async () => {
    if (isIOS) {
      // selectDoc();
    } else {
      const res = await requestStoragePermission();
      if (res === true) {
        // selectDoc();
      }
    }
  };

  // Animation
  const pressed = useSharedValue(false);
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const lockOffset = useSharedValue(4);
  const upChevronOffset = useSharedValue(3);
  const micIconOpacity = useSharedValue(1); // Initial opacity value
  const isLongPressed = useSharedValue(false);

  const stopRecord = async () => {
    if (isVoiceNoteRecording) {
      await audioRecorderPlayerAttachment.stopRecorder();
      audioRecorderPlayerAttachment.removeRecordBackListener();

      // if isVoiceResult is true we show audio player instead of audio recorder
      const voiceNote = {
        uri: voiceNotesLink,
        type: 'voice_note',
        name: `${voiceNotes.name}.${isIOS ? 'm4a' : 'mp3'}`,
        duration: Math.floor(voiceNotes.recordSecs / 1000),
      };
      dispatch({
        type: SELECTED_VOICE_NOTE_FILES_TO_UPLOAD,
        body: {
          audio: [voiceNote],
        },
      });

      setIsVoiceNoteRecording(false);
    }
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
      recordTime: '',
      name: '',
    });
    setVoiceNotesPlayer({
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '',
      duration: '',
    });
    setVoiceNotesLink('');
    setIsRecordingLocked(false);

    dispatch({
      type: CLEAR_SELECTED_VOICE_NOTE_FILES_TO_UPLOAD,
    });

    // if isVoiceResult is false we show audio recorder instead of audio player
    setIsVoiceResult(false);
  };

  // this method handles onUpdate callback of pan gesture
  const onUpdatePanGesture = (
    event: GestureUpdateEvent<PanGestureHandlerEventPayload>,
  ) => {
    'worklet';
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

  const handleStopRecord = async () => {
    // to give some time for initiating the start recorder, then only stop it
    setTimeout(async () => {
      await stopRecord();
      setIsVoiceResult(true);
      setIsRecordingLocked(false);
    }, 500);
  };

  // this method handles onEnd callback of pan gesture
  const onEndPanGesture = () => {
    'worklet';
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

  const longPressGesture = Gesture.LongPress()
    .runOnJS(true)
    .minDuration(250)
    .onStart(() => {
      isLongPressed.value = true;
      setIsLongPressedState(true);
    });

  // draggle mic pan gesture on x-axis and y-axis
  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .enabled(isDraggable)
    .onUpdate(onUpdatePanGesture)
    .onEnd(onEndPanGesture)
    .onFinalize(() => {
      'worklet';
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

  //pagination loader in the footer
  const renderFooter = () => {
    return isLoading ? (
      <View style={{paddingVertical: 20}}>
        <ActivityIndicator size="large" color={Styles.$COLORS.SECONDARY} />
      </View>
    ) : null;
  };

  // to stop playing audio recording
  const stopPlay = async () => {
    await audioRecorderPlayerAttachment.stopPlayer();
    setIsVoiceNotePlaying(false);
  };

  // function shows loader in between calling the API and getting the response
  const loadData = async (newPage: number) => {
    setIsLoading(true);
    const res = await taggingAPI({
      page: newPage,
      searchName: taggedUserName,
      chatroomId: '3844534',
      isSecret: false,
    });
    if (!!res) {
      setUserTaggingList([...userTaggingList, ...res?.communityMembers]);
      setIsLoading(false);
    }
  };

  //function checks the pagination logic, if it verifies the condition then call loadData
  const handleLoadMore = () => {
    let userTaggingListLength = userTaggingList.length;
    if (!isLoading && userTaggingListLength > 0) {
      // checking if conversations length is greater the 15 as it convered all the screen sizes of mobiles, and pagination API will never call if screen is not full messages.
      if (userTaggingListLength >= 10 * page) {
        const newPage = page + 1;
        setPage(newPage);
        loadData(newPage);
      }
    }
  };

  const LINK_PREVIEW_REGEX =
    /((?:https?:\/\/)?(?:www\.)?(?:\w+\.)+\w+(?:\/\S*)?|\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b)/i;

  async function detectLinkPreview(link: string) {
    const payload = {
      url: link,
    };
    const decodeUrlResponse = await myClient?.decodeUrl(payload);
    const ogTags = decodeUrlResponse?.data?.ogTags;
    if (ogTags !== undefined) setOgTagsState(ogTags);
  }

  const taggingAPI = async ({page, searchName, chatroomId, isSecret}: any) => {
    const res = await myClient?.getTaggingList({
      page: page,
      pageSize: 10,
      searchName: searchName,
      chatroomId: chatroomId,
      isSecret: isSecret,
    });
    return res?.data;
  };

  const handleInputChange = async (event: string) => {
    let parts = event.split(LINK_PREVIEW_REGEX);
    if (parts?.length > 1) {
      {
        parts?.map((value: string) => {
          if (LINK_PREVIEW_REGEX.test(value)) {
            clearTimeout(debounceLinkPreviewTimeout);
            const timeoutId = setTimeout(() => {
              for (let i = 0; i < parts.length; i++) {
                setShowLinkPreview(true);
                if (LINK_PREVIEW_REGEX.test(parts[i]) && !closedPreview) {
                  setShowLinkPreview(true);
                  setUrl(parts[i]);
                  detectLinkPreview(parts[i]);
                  break;
                }
              }
            }, 500);
            setLinkPreviewDebounceTimeout(timeoutId);
          }
        });
      }
    } else {
      setOgTagsState({});
      setShowLinkPreview(false);
    }
    if (false) {
    } else {
      setMessage(event);
      setFormattedConversation(event);

      // chatroomType === ChatroomType.DMCHATROOM (if DM don't detect and show user tags)
      const newMentions = detectMentions(event);

      if (newMentions.length > 0) {
        const length = newMentions.length;
        setTaggedUserName(newMentions[length - 1]);
      }

      // debouncing logic
      clearTimeout(debounceTimeout);

      let len = newMentions.length;
      if (len > 0) {
        const timeoutID = setTimeout(async () => {
          setPage(1);
          const res = await taggingAPI({
            page: 1,
            searchName: newMentions[len - 1],
            chatroomId: '3844534',
            isSecret: false,
          });
          if (len > 0) {
            let groupTagsLength = res?.groupTags?.length;
            let communityMembersLength = res?.communityMembers.length;
            let arrLength = communityMembersLength + groupTagsLength;
            if (arrLength >= 5) {
              setUserTaggingListHeight(5 * 58);
            } else if (arrLength < 5) {
              let height = communityMembersLength * 58 + groupTagsLength * 80;
              setUserTaggingListHeight(height);
            }
            setUserTaggingList(res?.communityMembers);
            setGroupTags(res?.groupTags);
            setIsUserTagging(true);
          }
        }, 500);

        setDebounceTimeout(timeoutID);
      } else {
        if (isUserTagging) {
          setUserTaggingList([]);
          setGroupTags([]);
          setIsUserTagging(false);
        }
      }
    }
  };

  // lock icon animation styles
  const lockAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{translateY: lockOffset.value}],
  }));

  // up chevron animated styles
  const upChevronAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{translateY: upChevronOffset.value}],
  }));

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
        {scale: withTiming(isLongPressed.value ? 1.5 : 1)},
      ],
    };
  }, [x, y]);

  const askPermission = async () => {
    if (!isIOS) {
      const permission = await requestAudioRecordPermission();
      setIsRecordingPermission(!!permission);
    } else {
      const permission = await request(PERMISSIONS.IOS.MICROPHONE);
      if (permission === 'granted') {
        setIsRecordingPermission(true);
      }
    }
  };

  const onEdit = async () => {
    let selectedConversation = editConversation;

    let conversationId = selectedConversation?.id;
    let previousConversation = selectedConversation;

    let changedConversation;
    let conversationText = replaceMentionValues(message, ({id, name}) => {
      // example ID = `user_profile/8619d45e-9c4c-4730-af8e-4099fe3dcc4b`
      let PATH = extractPathfromRouteQuery(id);
      if (!!!PATH) {
        return `<<${name}|route://${name}>>`;
      } else {
        return `<<${name}|route://${id}>>`;
      }
    });

    let editedConversation = conversationText;
    changedConversation = {
      ...selectedConversation,
      answer: editedConversation,
      isEdited: true,
    };

    dispatch({
      type: EDIT_CONVERSATION,
      body: {
        previousConversation: previousConversation,
        changedConversation: changedConversation,
      },
    });

    dispatch({
      type: SET_EDIT_MESSAGE,
      body: {
        editConversation: '',
      },
    });

    let index = conversations.findIndex((element: any) => {
      return element?.id == selectedConversation?.id;
    });

    if (index === 0) {
      dispatch({
        type: UPDATE_LAST_CONVERSATION,
        body: {
          lastConversationAnswer: editedConversation,
          chatroomType: chatroomType,
          chatroomID: '3844534',
        },
      });
    }
    dispatch({type: SELECTED_MESSAGES, body: []});
    dispatch({type: LONG_PRESSED, body: false});
    setMessage('');
    setInputHeight(25);
    setIsEditable(false);

    const payload = {
      conversationId: conversationId,
      text: editedConversation,
    };

    let editConversationResponse;
    if (currentChatroomTopic) {
      editConversationResponse = await myClient?.editConversation(
        payload,
        currentChatroomTopic,
      );
    } else {
      editConversationResponse = await myClient?.editConversation(payload);
    }
    if (conversationId == currentChatroomTopic?.id) {
      dispatch({
        type: SET_CHATROOM_TOPIC,
        body: {
          currentChatroomTopic: editConversationResponse?.data?.conversation,
        },
      });
    }
    await myClient?.updateConversation(
      conversationId?.toString(),
      editConversationResponse?.data?.conversation,
    );
  };

  return (
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
                backgroundColor: isUploadScreen ? 'black' : 'white',
              },
            ]
          : null
      }>
      {/* tagging view */}
      {userTaggingList && isUserTagging ? (
        <View
          style={[
            styles.taggableUsersBox,
            {
              backgroundColor: false ? 'black' : 'white',
              height: userTaggingListHeight,
            },
          ]}>
          <FlashList
            data={[...groupTags, ...userTaggingList]}
            renderItem={({item, index}: any) => {
              let description = item?.description;
              let imageUrl = item?.imageUrl;
              return (
                <Pressable
                  onPress={() => {
                    let uuid = item?.sdkClientInfo?.uuid;
                    const res = replaceLastMention(
                      message,
                      taggedUserName,
                      item?.name,
                      uuid ? `user_profile/${uuid}` : uuid,
                    );
                    setMessage(res);
                    setFormattedConversation(res);
                    setUserTaggingList([]);
                    setGroupTags([]);
                    setIsUserTagging(false);
                  }}
                  style={styles.taggableUserView}>
                  {!!imageUrl ? (
                    <LMChatIcon
                      type="png"
                      iconUrl={imageUrl}
                      iconStyle={styles.avatar}
                    />
                  ) : (
                    <LMChatIcon
                      type="png"
                      assetPath={require('../assets/images/default_pic.png')}
                      iconStyle={styles.avatar}
                    />
                  )}
                  <View
                    style={[
                      styles.infoContainer,
                      {
                        borderBottomWidth: 0.2,
                        gap: isIOS ? 5 : 0,
                      },
                    ]}>
                    {/* <LMChatTextView maxLines={1} textStyle={[
                        styles.title,
                        {
                          color: false
                            ? Styles.$COLORS.TERTIARY
                            : Styles.$COLORS.PRIMARY,
                        },
                      ]}>
                      {item?.name}
                      </LMChatTextView> */}
                    <Text
                      style={[
                        styles.title,
                        {
                          color: false
                            ? Styles.$COLORS.TERTIARY
                            : Styles.$COLORS.PRIMARY,
                        },
                      ]}
                      numberOfLines={1}>
                      {item?.name}
                    </Text>
                    {!!description ? (
                      <Text
                        style={[
                          styles.subTitle,
                          {
                            color: false
                              ? Styles.$COLORS.TERTIARY
                              : Styles.$COLORS.PRIMARY,
                          },
                        ]}
                        numberOfLines={1}>
                        {description}
                      </Text>
                    ) : null}
                  </View>
                </Pressable>
              );
            }}
            extraData={{
              value: [message, userTaggingList],
            }}
            estimatedItemSize={15}
            keyboardShouldPersistTaps={'handled'}
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

      {/* link preview view */}
      {Object.keys(ogTagsState).length !== 0 &&
      showLinkPreview &&
      !closedOnce ? (
        <View
          style={[
            styles.taggableUsersBox,
            {
              backgroundColor: false ? 'black' : 'white',
            },
          ]}>
          <LinkPreviewInputBox ogTags={ogTagsState} />
          <TouchableOpacity
            onPress={() => {
              setShowLinkPreview(false);
              setClosedOnce(true);
              setClosedPreview(true);
            }}
            style={styles.replyBoxClose}>
            <LMChatIcon
              type="png"
              assetPath={require('../assets/images/close_icon.png')}
              iconStyle={styles.replyCloseImg}
            />
          </TouchableOpacity>
        </View>
      ) : null}

      <View
        style={styles.textInput}
        // style={[
        //   styles.textInput,
        //   !(isEditable || isReply) ? styles.inputBoxWithShadow : null,
        //   {
        //     backgroundColor: !!isUploadScreen
        //       ? Styles.$BACKGROUND_COLORS.DARK
        //       : Styles.$BACKGROUND_COLORS.LIGHT,
        //   },
        //   (isReply && !isUploadScreen) || isEditable || isUserTagging
        //     ? {
        //         borderWidth: 0,
        //         margin: isIOS ? 0 : 2,
        //       }
        //     : null,
        // ]}
      >
        {/* text input */}
        <LMChatTextInput
          placeholderText="Type here..."
          placeholderTextColor="#0F1E3D66"
          inputTextStyle={{
            fontSize: 16,
            elevation: 0,
            maxHeight: 220,
            borderRadius: 50,
            backgroundColor: '#D3D3D3',
            paddingLeft: 10,
          }}
          multilineField
          inputRef={refInput}
          onType={handleInputChange}
          autoFocus={false}
          selectionColor="red"
          partTypes={[
            {
              trigger: '@',
              textStyle: {
                color: '#007AFF',
              }, // The mention style in the input
            },
          ]}
          inputText={message}
          rightIcon={{
            onTap: () => {
              Keyboard.dismiss();
              setModalVisible(true);
            },
            icon: {
              type: 'png',
              assetPath: require('../assets/images/open_files3x.png'),
            },
            placement: 'end',
            buttonStyle: styles.attachmentIcon,
          }}
        />

        {/* attachment icon */}
        {/* {!isUploadScreen &&
        !isEditable &&
        !voiceNotes?.recordTime &&
        !isDeleteAnimation ? (
          <TouchableOpacity
            style={[styles.emojiButton, {marginLeft: 15}]}
            onPress={() => {
              Keyboard.dismiss();
              setModalVisible(true);
            }}>
            <LMChatIcon
              type="png"
              iconStyle={styles.emoji}
              assetPath={require('../assets/images/open_files3x.png')}
            />
          </TouchableOpacity>
        ) : null} */}

        {/* send/voice note button */}
        {!!message || isVoiceResult || isUploadScreen || isRecordingLocked ? (
          <TouchableOpacity
            onPressOut={async () => {
              if (isEditable) {
                onEdit();
              } else {
                const voiceNote = [
                  {
                    uri: voiceNotesLink,
                    type: 'voice_note',
                    name: `${voiceNotes.name}.${isIOS ? 'm4a' : 'mp3'}`,
                    duration: Math.floor(voiceNotes.recordSecs / 1000),
                  },
                ];
                if (isVoiceNoteRecording) {
                  await stopRecord();
                  // onSend(message, voiceNote, true);
                } else if (isVoiceNotePlaying) {
                  await stopPlay();
                  // onSend(message, voiceNote, true);
                } else {
                  // onSend(message);
                }
              }
            }}
            style={styles.sendButton}>
            <LMChatIcon
              type="png"
              assetPath={require('../assets/images/send_button3x.png')}
              iconStyle={styles.send}
            />
          </TouchableOpacity>
        ) : (
          <View>
            {!!isRecordingPermission ? (
              <GestureDetector gesture={composedGesture}>
                <Animated.View>
                  {voiceNotes.recordTime && !isRecordingLocked && (
                    <View
                      style={[styles.lockRecording, styles.inputBoxWithShadow]}>
                      <Animated.View style={lockAnimatedStyles}>
                        <LMChatIcon
                          type="png"
                          assetPath={require('../assets/images/lock_icon3x.png')}
                          iconStyle={styles.lockIcon}
                        />
                      </Animated.View>
                      <Animated.View style={upChevronAnimatedStyles}>
                        <LMChatIcon
                          type="png"
                          assetPath={require('../assets/images/up_chevron_icon3x.png')}
                          iconStyle={styles.upChevron}
                        />
                      </Animated.View>
                    </View>
                  )}

                  <Animated.View style={[styles.sendButton, panStyle]}>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setIsVoiceNoteIconPress(true);
                        Vibration.vibrate(0.5 * 100);
                      }}
                      style={[styles.sendButton, {position: 'absolute'}]}>
                      <LMChatIcon
                        type="png"
                        assetPath={require('../assets/images/mic_icon3x.png')}
                        iconStyle={styles.mic}
                      />
                    </TouchableWithoutFeedback>
                  </Animated.View>
                </Animated.View>
              </GestureDetector>
            ) : (
              <Animated.View style={[styles.sendButton, panStyle]}>
                <TouchableWithoutFeedback
                  onPress={askPermission}
                  onLongPress={askPermission}
                  style={[styles.sendButton, {position: 'absolute'}]}>
                  <LMChatIcon
                    type="png"
                    assetPath={require('../assets/images/mic_icon3x.png')}
                    iconStyle={styles.mic}
                  />
                </TouchableWithoutFeedback>
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
        }}>
        <Pressable style={styles.centeredView} onPress={handleModalClose}>
          <View style={styles.modalViewParent}>
            <Pressable onPress={() => {}} style={[styles.modalView]}>
              <View style={styles.alignModalElements}>
                <View style={styles.iconContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                      setTimeout(() => {
                        handleCamera();
                      }, 50);
                    }}
                    style={styles.cameraStyle}>
                    <LMChatIcon
                      assetPath={require('../assets/images/camera_icon3x.png')}
                      type="png"
                      iconStyle={styles.emoji}
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
                        handleGallery();
                      }, 500);
                    }}
                    style={styles.imageStyle}>
                    <LMChatIcon
                      assetPath={require('../assets/images/select_image_icon3x.png')}
                      type="png"
                      iconStyle={styles.emoji}
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
                        handleDoc();
                      }, 50);
                    }}
                    style={styles.docStyle}>
                    <LMChatIcon
                      assetPath={require('../assets/images/select_doc_icon3x.png')}
                      type="png"
                      iconStyle={styles.emoji}
                    />
                  </TouchableOpacity>
                  <LMChatTextView textStyle={styles.iconText}>
                    {DOCUMENTS_TEXT}
                  </LMChatTextView>
                </View>
                {/* {chatroomType !== 10 ? (
                  <View style={styles.iconContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(false);
                        navigation.navigate(CREATE_POLL_SCREEN, {
                          chatroomID: chatroomID,
                          conversationsLength: conversations.length * 2,
                        });
                      }}
                      style={styles.pollStyle}>
                      <Image
                        source={require('../../assets/images/poll_icon3x.png')}
                        style={styles.emoji}
                      />
                    </TouchableOpacity>
                    <Text style={styles.iconText}>{POLL_TEXT}</Text>
                  </View>
                ) : null} */}
              </View>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};
