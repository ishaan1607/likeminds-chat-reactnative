import {
  View,
  Pressable,
  Image,
  Text,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {LMChatTextInput, LMChatTextView} from 'likeminds_chat_reactnative_ui';
import {detectMentions, replaceLastMention} from './utils';
import {myClient} from '../..';
import {styles} from './styles';
import {FlashList} from '@shopify/flash-list';
import Styles from 'likeminds_chat_reactnative_ui/components/constants/Styles';
import {decode} from '../commonFunctions';
import LinkPreviewInputBox from '../linkPreviewInputBox';

interface ChatroomProps {
  previousMessage: string;
  isUploadScreen: boolean;
  isEditable: boolean;
}

export const Chatroom = ({
  previousMessage = '',
  isUploadScreen,
  isEditable,
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

  //pagination loader in the footer
  const renderFooter = () => {
    return isLoading ? (
      <View style={{paddingVertical: 20}}>
        <ActivityIndicator size="large" color={Styles.$COLORS.SECONDARY} />
      </View>
    ) : null;
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

  return (
    <View>
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
                  <Image
                    source={
                      !!imageUrl
                        ? {uri: imageUrl}
                        : require('../assets/images/default_pic.png')
                    }
                    style={styles.avatar}
                  />

                  <View
                    style={[
                      styles.infoContainer,
                      {
                        borderBottomWidth: 0.2,
                        gap: isIOS ? 5 : 0,
                      },
                    ]}>
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
            <Image
              style={styles.replyCloseImg}
              source={require('../assets/images/close_icon.png')}
            />
          </TouchableOpacity>
        </View>
      ) : null}

      {/* text input */}
      <LMChatTextInput
        placeholderText="Type here..."
        placeholderTextColor="#0F1E3D66"
        inputTextStyle={{
          marginHorizontal: 15,
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
      />
    </View>
  );
};
