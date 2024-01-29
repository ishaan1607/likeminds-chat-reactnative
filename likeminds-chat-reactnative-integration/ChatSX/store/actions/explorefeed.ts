import { CALL_API } from "../apiMiddleware";
import { Alert } from "react-native";
import {
  GET_EXPLORE_FEED_CHAT,
  GET_EXPLORE_FEED_CHAT_FAILED,
  GET_EXPLORE_FEED_CHAT_SUCCESS,
  UPDATE_EXPLORE_FEED_CHAT,
  UPDATE_EXPLORE_FEED_CHAT_FAILED,
  UPDATE_EXPLORE_FEED_CHAT_SUCCESS,
} from "../types/types";
import { Client } from "../../client";

const myClient = Client.myClient;

export const getExploreFeedData =
  (payload: any, showLoader?: boolean) => () => {
    try {
      return {
        type: GET_EXPLORE_FEED_CHAT_SUCCESS,
        [CALL_API]: {
          func: myClient?.getExploreFeed(payload),
          body: payload,
          types: [
            GET_EXPLORE_FEED_CHAT,
            GET_EXPLORE_FEED_CHAT_SUCCESS,
            GET_EXPLORE_FEED_CHAT_FAILED,
          ],
          showLoader: showLoader ? showLoader : false,
        },
      };
    } catch (error) {
      Alert.alert(`${error}`);
    }
  };

export const updateExploreFeedData = (payload: any) => () => {
  try {
    return {
      type: UPDATE_EXPLORE_FEED_CHAT_SUCCESS,
      [CALL_API]: {
        func: myClient?.getExploreFeed(payload),
        body: payload,
        types: [
          UPDATE_EXPLORE_FEED_CHAT,
          UPDATE_EXPLORE_FEED_CHAT_SUCCESS,
          UPDATE_EXPLORE_FEED_CHAT_FAILED,
        ],
        showLoader: false,
      },
    };
  } catch (error) {
    Alert.alert(`${error}`);
  }
};
