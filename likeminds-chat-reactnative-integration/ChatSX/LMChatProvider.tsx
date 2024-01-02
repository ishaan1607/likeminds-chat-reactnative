import React, {
  createContext,
  ReactNode,
  useMemo,
  useState,
  useContext,
  useEffect,
} from "react";
import STYLES from "./constants/Styles";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAppDispatch } from "./store";
import { Credentials } from "./credentials";
import {
  INIT_API_SUCCESS,
  PROFILE_DATA_SUCCESS,
  STORE_MY_CLIENT,
  UPDATE_FILE_UPLOADING_OBJECT,
} from "./store/types/types";
import notifee from "@notifee/react-native";
import { getRoute } from "./notifications/routes";
import * as RootNavigation from "./RootNavigation";
import { setupPlayer } from "./audio";
import { LMChatClient } from "@likeminds.community/chat-rn";
import { GiphySDK } from "@giphy/react-native-sdk";
import { GIPHY_SDK_API_KEY } from "./awsExports";
import { Client } from "./client";
import { FAILED } from "./constants/Strings";

interface ReactionListStylesProps {
  reactionSize?: number;
  reactionLeftItemStroke?: string;
  reactionRightItemStroke?: string;
  reactionItemBorderRadius?: number;
  gap?: number;
  selectedMessageBackgroundColor?: string;
}

interface TextStyles {
  fontSize: number;
  fontStyle: string;
  fontFamily: string;
}

interface ChatBubbleStylesProps {
  borderRadius?: number;
  sentMessageBackgroundColor?: string;
  receivedMessageBackgroundColor?: string;
  selectedBackgroundColor?: string;
  selectedMessageBackgroundColor?: string;
  textStyles?: TextStyles;
  linkTextColor?: string;
  taggingTextColor?: string;
  stateMessagesBackgroundColor?: string;
  stateMessagesTextStyles?: TextStyles;
  deletedMessagesTextStyles?: TextStyles;
}

interface InputBoxStyles {
  placeholderTextColor?: string;
  inputTextStyle?: {
    width?: string;
    height?: number;
    elevation?: number;
    backgroundColor?: string;
  };
  selectionColor?: string;
  partsTextStyle?: {
    color?: string;
  };
  sendIconStyles?: {
    width?: number;
    height?: number;
    resizeMode?: string;
    marginLeft?: number;
  };
  attachmentIconStyles?: {
    width?: number;
    height?: number;
    resizeMode?: string;
  };
  micIconStyles?: {
    width?: number;
    height?: number;
    resizeMode?: string;
  };
  cameraIconStyles?: {
    width?: number;
    height?: number;
    resizeMode?: string;
  };
  galleryIconStyles?: {
    width?: number;
    height?: number;
    resizeMode?: string;
  };
  documentIconStyles?: {
    width?: number;
    height?: number;
    resizeMode?: string;
  };
  pollIconStyles?: {
    width?: number;
    height?: number;
    resizeMode?: string;
  };
}

interface ThemeStyles {
  hue?: number;
  fontColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  lightBackgroundColor?: string;
}

// Define the context type
export interface ThemeContextProps {
  reactionListStyles?: ReactionListStylesProps;
  chatBubbleStyles?: ChatBubbleStylesProps;
  inputBoxStyles?: InputBoxStyles;
}

// Create the theme context
export const LMChatStylesContext = createContext<ThemeContextProps | undefined>(
  undefined
);

//PropTypes for the LMChatProvider component
interface LMProviderProps {
  myClient: LMChatClient;
  children: React.ReactNode;
  userName: string;
  userUniqueId: string;
  reactionListStyles?: ReactionListStylesProps;
  chatBubbleStyles?: ChatBubbleStylesProps;
  inputBoxStyles?: InputBoxStyles;
  themeStyles?: ThemeStyles;
}

// Create a context for LMChatProvider
const LMChatContext = createContext<LMChatClient | undefined>(undefined);

// Create a hook to use the LMChatContext
export const useLMChat = () => {
  const context = useContext(LMChatContext);
  if (!context) {
    throw new Error("useLMChat must be used within an LMChatProvider");
  }
  return context;
};

export const useLMChatStyles = () => {
  const context = useContext(LMChatStylesContext);
  if (!context) {
    throw new Error("useLMChatStyles must be used within an LMChatProvider");
  }
  return context;
};

export const LMChatProvider = ({
  myClient,
  children,
  userName,
  userUniqueId,
  reactionListStyles,
  chatBubbleStyles,
  inputBoxStyles,
  themeStyles,
}: LMProviderProps): JSX.Element => {
  //To navigate onPress notification while android app is in background state / quit state.
  useEffect(() => {
    async function bootstrap() {
      const initialNotification = await notifee.getInitialNotification();

      if (initialNotification) {
        const routes = getRoute(initialNotification?.notification?.data?.route);
        setTimeout(() => {
          RootNavigation.navigate(routes.route, routes.params);
        }, 1000);
      }
    }
    bootstrap();
  }, []);

  // to initialise track player
  useEffect(() => {
    async function setup() {
      await setupPlayer();
    }
    setup();
  }, []);

  // to configure gifphy sdk
  useEffect(() => {
    GiphySDK.configure({ apiKey: GIPHY_SDK_API_KEY });
  }, []);

  useEffect(() => {
    const func = async () => {
      const res: any = await myClient?.getAllAttachmentUploadConversations();
      if (res) {
        const len = res.length;
        if (len > 0) {
          for (let i = 0; i < len; i++) {
            const data = res[i];
            const uploadingFilesMessagesSavedObject = JSON.parse(data?.value);
            dispatch({
              type: UPDATE_FILE_UPLOADING_OBJECT,
              body: {
                message: {
                  ...uploadingFilesMessagesSavedObject,
                  isInProgress: FAILED,
                },
                ID: data?.key,
              },
            });
          }
        }
      }
    };

    func();
  }, []);

  // to get dispatch
  const dispatch = useAppDispatch();

  useEffect(() => {
    //setting client in Client class
    Client.setMyClient(myClient);

    // storing myClient followed by community details
    const callInitApi = async () => {
      const payload = {
        uuid: userUniqueId, // uuid
        userName: userName, // user name
        isGuest: false,
      };

      Credentials.setCredentials(userName, userUniqueId);

      const response = await myClient?.initiateUser(payload);

      dispatch({
        type: INIT_API_SUCCESS,
        body: { community: response?.data?.community },
      });

      const response1 = await myClient?.getMemberState();

      dispatch({
        type: PROFILE_DATA_SUCCESS,
        body: {
          member: response1?.data?.member,
          memberRights: response1?.data?.memberRights,
        },
      });
    };
    callInitApi();
  }, []);

  useMemo(() => {
    if (themeStyles) {
      STYLES.setTheme(themeStyles);
    }
  }, []);

  return (
    <LMChatContext.Provider value={myClient}>
      <LMChatStylesContext.Provider
        value={{ reactionListStyles, chatBubbleStyles, inputBoxStyles }}
      >
        <GestureHandlerRootView style={styles.flexStyling}>
          <View style={styles.flexStyling}>{children}</View>
        </GestureHandlerRootView>
      </LMChatStylesContext.Provider>
    </LMChatContext.Provider>
  );
};

const styles = StyleSheet.create({
  flexStyling: {
    flex: 1,
  },
});
