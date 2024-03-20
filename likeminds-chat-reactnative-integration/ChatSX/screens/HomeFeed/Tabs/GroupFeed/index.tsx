import React from "react";
import { View } from "react-native";
import HomeFeedExplore from "../../../../components/HomeFeedExplore";
import HomeFeedItem from "../../../../components/HomeFeedItem";
import styles from "./styles";
import { FlashList } from "@shopify/flash-list";
import LinearGradient from "react-native-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import Layout from "../../../../constants/Layout";
import { useHomeFeedContext } from "../../../../context/HomeFeedContext";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

interface Props {
  navigation: any;
}

const GroupFeed = ({ navigation }: Props) => {
  const {
    shimmerIsLoading,
    groupFeedChatrooms,
    unseenCount,
    totalCount,
    renderFooter,
    handleLoadMore,
  } = useHomeFeedContext();

  return (
    <View style={styles.page}>
      {shimmerIsLoading ? (
        <>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: Layout.normalize(50),
            }}
          >
            <View
              style={{
                width: "20%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ShimmerPlaceHolder
                style={{
                  width: Layout.normalize(50),
                  alignItmes: "center",
                  justifyContent: "center",
                  borderRadius: Layout.normalize(50),
                  height: Layout.normalize(50),
                }}
              />
            </View>
            <View style={{ width: "100%" }}>
              <ShimmerPlaceHolder style={{ width: "70%" }} />
              <ShimmerPlaceHolder
                style={{ marginTop: Layout.normalize(10), width: "50%" }}
              />
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: Layout.normalize(50),
            }}
          >
            <View
              style={{
                width: "20%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ShimmerPlaceHolder
                style={{
                  width: Layout.normalize(50),
                  alignItmes: "center",
                  justifyContent: "center",
                  borderRadius: Layout.normalize(50),
                  height: Layout.normalize(50),
                }}
              />
            </View>
            <View style={{ width: "100%" }}>
              <ShimmerPlaceHolder style={{ width: "70%" }} />
              <ShimmerPlaceHolder
                style={{ marginTop: Layout.normalize(10), width: "50%" }}
              />
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: Layout.normalize(50),
            }}
          >
            <View
              style={{
                width: "20%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ShimmerPlaceHolder
                style={{
                  width: Layout.normalize(50),
                  alignItmes: "center",
                  justifyContent: "center",
                  borderRadius: Layout.normalize(50),
                  height: Layout.normalize(50),
                }}
              />
            </View>
            <View style={{ width: "100%" }}>
              <ShimmerPlaceHolder style={{ width: "70%" }} />
              <ShimmerPlaceHolder
                style={{ marginTop: Layout.normalize(10), width: "50%" }}
              />
            </View>
          </View>
        </>
      ) : (
        <FlashList
          data={groupFeedChatrooms}
          ListHeaderComponent={() => (
            <HomeFeedExplore
              newCount={unseenCount}
              totalCount={totalCount}
              navigation={navigation}
            />
          )}
          renderItem={({ item }: any) => {
            const lastConversation = item?.lastConversation;
            const deletedBy =
              lastConversation?.deletedByUserId !== null
                ? lastConversation?.deletedByUserId
                : lastConversation?.deletedBy;
            const homeFeedProps = {
              title: item?.header!,
              avatar: item?.chatroomImageUrl!,
              lastMessage: lastConversation?.answer!,
              lastMessageUser: lastConversation?.member?.name!,
              time: lastConversation?.createdAt!,
              unreadCount: item?.unseenCount!,
              pinned: false,
              lastConversation: lastConversation!,
              lastConversationMember: lastConversation?.member?.name!,
              chatroomID: item?.id!,
              isSecret: item?.isSecret,
              deletedBy: deletedBy,
              conversationDeletor:
                lastConversation?.deletedByMember?.sdkClientInfo?.uuid,
              conversationCreator:
                lastConversation?.member?.sdkClientInfo?.uuid,
              conversationDeletorName: lastConversation?.deletedByMember?.name,
              inviteReceiver: item?.inviteReceiver,
              chatroomType: item?.type,
              muteStatus: item?.muteStatus,
            };
            return <HomeFeedItem {...homeFeedProps} navigation={navigation} />;
          }}
          extraData={{
            value: [groupFeedChatrooms, unseenCount, totalCount],
          }}
          estimatedItemSize={15}
          ListFooterComponent={renderFooter}
          onLoad={handleLoadMore}
          keyExtractor={(item: any) => {
            return item?.id?.toString();
          }}
        />
      )}
    </View>
  );
};

export default GroupFeed;
