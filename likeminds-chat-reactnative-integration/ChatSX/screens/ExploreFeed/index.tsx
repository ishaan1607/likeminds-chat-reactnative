import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import ExploreFeedFilters from "../../components/ExploreFeedFilters";
import ExploreFeedItem from "../../components/ExploreFeedItem";
import ToastMessage from "../../components/ToastMessage";
import STYLES from "../../constants/Styles";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  getExploreFeedData,
  updateExploreFeedData,
} from "../../store/actions/explorefeed";
import { SET_EXPLORE_FEED_PAGE } from "../../store/types/types";
import styles from "./styles";
import { FlashList } from "@shopify/flash-list";
import { LoaderComponent } from "../../components/LoaderComponent";
import {
  ExploreFeedContextProvider,
  useExploreFeedContext,
} from "../../context/ExploreFeedContext";
import { useNavigation } from "@react-navigation/native";

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

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerShadowVisible: false,
      headerLeft: () => (
        <View style={styles.headingContainer}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Image
              source={require("../../assets/images/back_arrow3x.png")}
              style={styles.backBtn}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: STYLES.$COLORS.FONT_PRIMARY,
              fontSize: STYLES.$FONT_SIZES.XL,
              fontFamily: STYLES.$FONT_TYPES.BOLD,
            }}
          >
            Explore Chatrooms
          </Text>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.page}>
      <FlashList
        data={chats}
        ListHeaderComponent={() => <ExploreFeedFilters />}
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
