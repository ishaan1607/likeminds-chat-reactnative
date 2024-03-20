import notifee, { EventType } from "@notifee/react-native";
import getNotification from "./notifications";
import { getRoute } from "./notifications/routes";
import * as RootNavigation from "./RootNavigation";
import messaging from "@react-native-firebase/messaging";
import TrackPlayer from "react-native-track-player";
import { playbackService } from "./audio";
import { ConversationState, LMChatClient } from "@likeminds.community/chat-rn";
import { Client } from "./client";

export const initMyClient = (
  apiKey: string,
  filterStateMessage: ConversationState[]
) => {
  const myClient = LMChatClient.setApiKey(apiKey)
    .setfilterStateConversation(filterStateMessage)
    .build();

  Client.setMyClient(myClient);

  TrackPlayer.registerPlaybackService(() => playbackService);

  return myClient;
};
