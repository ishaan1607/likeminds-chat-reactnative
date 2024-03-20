import React, { useLayoutEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import ExploreFeedFilters from "../../components/ExploreFeedFilters";
import ExploreFeedItem from "../../components/ExploreFeedItem";
import STYLES from "../../constants/Styles";
import { useAppSelector } from "../../store";
import styles from "./styles";
import { FlashList } from "@shopify/flash-list";
import { LoaderComponent } from "../../components/LoaderComponent";
import {
  ExploreFeedContextProvider,
  useExploreFeedContext,
} from "../../context/ExploreFeedContext";
import { useNavigation, useRoute } from "@react-navigation/native";

interface Props {
  navigation: any;
}

const ExploreFeed = () => {
  return (
    <ExploreFeedContextProvider>
      <ExploreFeedComponent />
    </ExploreFeedContextProvider>
  );
};

const ExploreFeedComponent = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    backIconPath,
    filterIconPath,
    participantsIconPath,
    totalMessagesIconPath,
    joinButtonPath,
    joinedButtonPath,
  } = route.params as {
    backIconPath: string;
    filterIconPath: string;
    participantsIconPath: string;
    totalMessagesIconPath: string;
    joinButtonPath: string;
    joinedButtonPath: string;
  };

  const {
    exploreChatrooms,
    pinnedChatroomsCount,
    chats,
    filterState,
    isPinned,
    setIsPinned,
    setFilterState,
    setChats,
    handleLoadMore,
    renderFooter,
  } = useExploreFeedContext();
  const { count } = useAppSelector((state) => state.loader);

  const exploreChatroomStyles = STYLES.$EXPLORE_CHATROOM_STYLE;
  const header = exploreChatroomStyles?.header;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerShadowVisible: false,
      headerLeft: () => (
        <View style={styles.headingContainer}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Image
              source={
                backIconPath
                  ? backIconPath
                  : require("../../assets/images/back_arrow3x.png")
              }
              style={styles.backBtn}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: header?.color
                ? header?.color
                : STYLES.$COLORS.FONT_PRIMARY,
              fontSize: header?.fontSize
                ? header?.fontSize
                : STYLES.$FONT_SIZES.XL,
              fontFamily: header?.fontFamily
                ? header?.fontFamily
                : STYLES.$FONT_TYPES.BOLD,
            }}
          >
            {header?.placeHolderText
              ? header?.placeHolderText
              : "Explore Chatrooms"}
          </Text>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.page}>
      <FlashList
        data={chats}
        ListHeaderComponent={() => (
          <ExploreFeedFilters filterIconPath={filterIconPath} />
        )}
        renderItem={({ item }: any) => {
          const exploreFeedProps = {
            header: item?.header,
            title: item?.title!,
            avatar: item?.chatroomImageUrl,
            lastMessage: item?.lastConversation?.answerText!,
            lastMessageUser: item?.lastConversation?.member?.name!,
            isJoined: item?.followStatus,
            pinned: item?.isPinned,
            participants: item?.participantsCount,
            messageCount: item?.totalResponseCount,
            externalSeen: item?.externalSeen,
            isSecret: item?.isSecret,
            chatroomID: item?.id,
            filterState: filterState,
            navigation: navigation,
            participantsIconPath,
            totalMessagesIconPath,
            joinButtonPath,
            joinedButtonPath,
          };
          return (
            <View>
              <ExploreFeedItem {...exploreFeedProps} />
            </View>
          );
        }}
        extraData={{
          value: [filterState, chats, exploreChatrooms, isPinned],
        }}
        estimatedItemSize={15}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        keyExtractor={(item: any) => (item?.id ? item?.id?.toString() : null)}
      />
      {count > 0 && <LoaderComponent />}
    </View>
  );
};

export default ExploreFeed;
