import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { ActivityIndicator, View } from "react-native";
import Layout from "../constants/Layout";
import STYLES from "../constants/Styles";
import {
  GET_HOMEFEED_CHAT_SUCCESS,
  SET_DM_PAGE,
  SET_INITIAL_DMFEED_CHATROOM,
  SET_INITIAL_GROUPFEED_CHATROOM,
  SET_PAGE,
} from "../store/types/types";
import {
  getInvites,
  updateDMFeedData,
  updateHomeFeedData,
  updateInvites,
} from "../store/actions/homefeed";
import { fetchFCMToken, requestUserPermission } from "../notifications";
import { paginatedSyncAPI } from "../utils/syncChatroomApi";
import { onValue, ref } from "@firebase/database";
import { LMChatAnalytics } from "../analytics/LMChatAnalytics";
import { Events, Keys, Sources } from "../enums";
import { useAppDispatch, useAppSelector } from "../store";
import { Client } from "../client";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SHOW_LIST_REGEX } from "../commonFuctions";

export interface HomeFeedContextProps {
  children?: ReactNode;
}

export interface HomeFeedContext {
  isLoading: any;
  shimmerIsLoading: any;
  invitePage: any;
  FCMToken: any;
  navigation: any;
  groupFeedChatrooms: any;
  unseenCount: any;
  totalCount: any;
  isLoadingDM: any;
  shimmerIsLoadingDM: any;
  showDM: any;
  showList: any;
  FCMTokenDM: any;
  chatroomsDM: any;
  dmFeedChatrooms: any;

  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setShimmerIsLoading: Dispatch<SetStateAction<boolean>>;
  setInvitePage: any;
  setFCMToken: Dispatch<SetStateAction<string>>;
  getExploreTabCount: any;
  getChatroomFromLocalDB: any;
  getAppConfig: any;
  handleLoadMore: any;
  renderFooter: any;
  setIsLoadingDM: Dispatch<SetStateAction<boolean>>;
  setShimmerIsLoadingDM: Dispatch<SetStateAction<boolean>>;
  setShowDM: Dispatch<SetStateAction<boolean>>;
  setShowList: any;
  setFCMTokenDM: any;
  getChatroomFromLocalDBDM: any;
  getAppConfigDM: any;
  updateDataDM: any;
  loadDataDM: any;
  handleLoadMoreDM: any;
  renderFooterDM: any;
}

const HomeFeedContext = createContext<HomeFeedContext | undefined>(undefined);

export const useHomeFeedContext = () => {
  const context = useContext(HomeFeedContext);
  if (!context) {
    throw new Error(
      "useHomeFeedContext must be used within an HomeFeedContextProvider"
    );
  }
  return context;
};

export const HomeFeedContextProvider = ({ children }: HomeFeedContextProps) => {
  const myClient = Client.myClient;
  const [isLoading, setIsLoading] = useState(false);
  const [shimmerIsLoading, setShimmerIsLoading] = useState(true);
  const [invitePage, setInvitePage] = useState(1);
  const [FCMToken, setFCMToken] = useState("");
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<any>>();

  let {
    myChatrooms,
    unseenCount,
    totalCount,
    page,
    invitedChatrooms,
    community,
    groupFeedChatrooms,
  } = useAppSelector((state) => state.homefeed);
  const user = useAppSelector((state) => state.homefeed.user);
  const db = myClient?.firebaseInstance();

  groupFeedChatrooms = [...invitedChatrooms, ...groupFeedChatrooms];

  const INITIAL_SYNC_PAGE = 1;

  let startTime = 0;
  let endTime = 0;

  const getExploreTabCount = async () => {
    const exploreTabCount = await myClient?.getExploreTabCount();
    dispatch({ type: GET_HOMEFEED_CHAT_SUCCESS, body: exploreTabCount?.data });
  };

  useEffect(() => {
    // To get total number of chatrooms and number of unseen chatrooms
    getExploreTabCount();
  }, []);

  // Fetching already existing groupfeed chatrooms from Realm
  const getChatroomFromLocalDB = async () => {
    const existingChatrooms: any = await myClient?.getFilteredChatrooms(false);
    if (!!existingChatrooms && existingChatrooms.length != 0) {
      setShimmerIsLoading(false);
      dispatch({
        type: SET_INITIAL_GROUPFEED_CHATROOM,
        body: { groupFeedChatrooms: existingChatrooms },
      });
    }
  };

  const getAppConfig = async () => {
    const appConfig = await myClient?.getAppConfig();
    if (appConfig?.isGroupFeedChatroomsSynced === undefined) {
      startTime = Date.now() / 1000;
      setTimeout(() => {
        myClient?.initiateAppConfig();
        myClient?.setAppConfig(false);
      }, 200);
    } else {
      setShimmerIsLoading(false);
    }
  };

  useEffect(() => {
    const initiate = async () => {
      await getAppConfig();
      if (!user?.sdkClientInfo?.community) {
        return;
      }
      await paginatedSyncAPI(INITIAL_SYNC_PAGE, user, false);
      if (shimmerIsLoading == true) {
        endTime = Date.now() / 1000;
        LMChatAnalytics.track(
          Events.SYNC_COMPLETE,
          new Map<string, string>([
            [Keys.SYNC_COMPLETE, true?.toString()],
            [Keys.TIME_TAKEN, (endTime - startTime)?.toString()],
          ])
        );
      }
      setShimmerIsLoading(false);
      setTimeout(() => {
        getChatroomFromLocalDB();
      }, 500);
    };
    initiate();
  }, [user, startTime, shimmerIsLoading]);

  useEffect(() => {
    const query = ref(db, `/community/${community?.id}`);
    return onValue(query, (snapshot) => {
      if (snapshot.exists()) {
        if (!user?.sdkClientInfo?.community) {
          return;
        }
        if (isFocused) {
          paginatedSyncAPI(INITIAL_SYNC_PAGE, user, false);
          setShimmerIsLoading(false);
          setTimeout(() => {
            getChatroomFromLocalDB();
          }, 500);
        }
      }
    });
  }, [user, isFocused]);

  async function fetchData() {
    const invitesRes: any = await dispatch(
      getInvites({ channelType: 1, page: 1, pageSize: 10 }, false) as any
    );

    if (invitesRes?.userInvites) {
      if (invitesRes?.userInvites?.length < 10) {
        const payload = {
          page: 1,
        };
      } else {
        await dispatch(
          updateInvites({ channelType: 1, page: 2, pageSize: 10 }, false) as any
        );
        setInvitePage((invitePage) => {
          return invitePage + 1;
        });
      }
    }
  }

  useLayoutEffect(() => {
    fetchData();
  }, [navigation]);

  useEffect(() => {
    const token = async () => {
      const isPermissionEnabled = await requestUserPermission();
      if (isPermissionEnabled) {
        const fcmToken = await fetchFCMToken();
        if (fcmToken) {
          setFCMToken(fcmToken);
        }
      }
    };
    token();
  }, []);

  async function updateData(newPage: number) {
    const payload = {
      page: newPage,
    };
    const response = await dispatch(updateHomeFeedData(payload, false) as any);
    return response;
  }

  const loadData = async (newPage: number) => {
    setIsLoading(true);
    setTimeout(async () => {
      const res: any = await updateData(newPage);
      if (res) {
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleLoadMore = async () => {
    if (!isLoading) {
      if (
        groupFeedChatrooms?.length === 0 &&
        invitedChatrooms === 10 * invitePage
      ) {
        setIsLoading(true);
        await dispatch(
          updateInvites(
            { channelType: 1, page: invitePage + 1, pageSize: 10 },
            false
          ) as any
        );
        setInvitePage((invitePage) => {
          return invitePage + 1;
        });
        setIsLoading(false);
      } else if (
        groupFeedChatrooms?.length > 0 &&
        groupFeedChatrooms?.length % 10 === 0 &&
        groupFeedChatrooms?.length === 10 * page
      ) {
        const newPage = page + 1;
        dispatch({ type: SET_PAGE, body: newPage });
        loadData(newPage);
      }
    }
  };

  const renderFooter = () => {
    return isLoading ? (
      <View style={{ paddingVertical: Layout.normalize(20) }}>
        <ActivityIndicator size="large" color={STYLES.$COLORS.SECONDARY} />
      </View>
    ) : null;
  };

  const [isLoadingDM, setIsLoadingDM] = useState(false);
  const [shimmerIsLoadingDM, setShimmerIsLoadingDM] = useState(true);
  const [showDM, setShowDM] = useState(false);
  const [showList, setShowList] = useState<any>(null);
  const [FCMTokenDM, setFCMTokenDM] = useState("");

  const { myDMChatrooms, dmPage, dmFeedChatrooms } = useAppSelector(
    (state) => state.homefeed
  );

  const chatroomsDM = [...myDMChatrooms];
  const INITIAL_SYNC_PAGE_DM = 1;
  let startTimeDM = 0;
  let endTimeDM = 0;

  async function fetchDataDM() {
    if (community?.id) {
      const payload = {
        page: 1,
      };
      const apiRes = await myClient?.checkDMStatus({
        requestFrom: "dm_feed_v2",
      });
      const response = apiRes?.data;
      if (response) {
        const routeURL = response?.cta;
        const hasShowList = SHOW_LIST_REGEX.test(routeURL);
        if (hasShowList) {
          const showListValue = routeURL.match(SHOW_LIST_REGEX)[1];
          setShowList(showListValue);
        }
        setShowDM(response?.showDm);
      }
    }
  }

  useEffect(() => {
    if (isFocused) {
      LMChatAnalytics.track(
        Events.DM_FEED_OPENED,
        new Map<string, string>([[Keys.SOURCE, Sources.HOME_FEED]])
      );
    }
  }, [isFocused]);

  useLayoutEffect(() => {
    fetchData();
  }, [navigation, community]);

  useEffect(() => {
    const token = async () => {
      const isPermissionEnabled = await requestUserPermission();
      if (isPermissionEnabled) {
        const fcmToken = await fetchFCMToken();
        if (fcmToken) {
          setFCMToken(fcmToken);
        }
      }
    };
    token();
  }, []);

  // Fetching already existing chatrooms from Realm
  const getChatroomFromLocalDBDM = async () => {
    const existingChatrooms: any = await myClient?.getFilteredChatrooms(true);
    if (!!existingChatrooms && existingChatrooms.length !== 0) {
      setShimmerIsLoading(false);
      dispatch({
        type: SET_INITIAL_DMFEED_CHATROOM,
        body: { dmFeedChatrooms: existingChatrooms },
      });
    }
  };

  const getAppConfigDM = async () => {
    const appConfig = await myClient?.getAppConfig();
    if (appConfig?.isDmFeedChatroomsSynced === undefined) {
      startTimeDM = Date.now() / 1000;
      setTimeout(() => {
        myClient?.initiateAppConfig();
        myClient?.setAppConfig(true);
      }, 200);
    } else {
      setShimmerIsLoading(false);
    }
  };

  useEffect(() => {
    const query = ref(db, `/community/${community?.id}`);
    return onValue(query, (snapshot) => {
      if (snapshot.exists()) {
        if (!user?.sdkClientInfo?.community) {
          return;
        }
        if (isFocused) {
          paginatedSyncAPI(INITIAL_SYNC_PAGE_DM, user, true);
          setShimmerIsLoading(false);
          setTimeout(() => {
            getChatroomFromLocalDB();
          }, 500);
        }
      }
    });
  }, [user, isFocused]);

  useEffect(() => {
    const initiate = async () => {
      await getAppConfig();
      if (!user?.sdkClientInfo?.community) {
        return;
      }
      await paginatedSyncAPI(INITIAL_SYNC_PAGE_DM, user, true);
      if (shimmerIsLoading == true && isFocused) {
        endTimeDM = Date.now() / 1000;
        LMChatAnalytics.track(
          Events.SYNC_COMPLETE,
          new Map<string, string>([
            [Keys.SYNC_COMPLETE, true?.toString()],
            [Keys.TIME_TAKEN, (endTimeDM - startTimeDM)?.toString()],
          ])
        );
      }
      setShimmerIsLoading(false);
      setTimeout(() => {
        getChatroomFromLocalDB();
      }, 500);
    };
    initiate();
  }, [user, isFocused, shimmerIsLoading, startTimeDM]);

  //function calls updateDMFeedData action to update myDMChatrooms array with the new data.
  async function updateDataDM(newPage: number) {
    const payload = {
      page: newPage,
    };
    const response = await dispatch(updateDMFeedData(payload, false) as any);
    return response;
  }

  // function shows loader in between calling the API and getting the response
  const loadDataDM = async (newPage: number) => {
    setIsLoading(true);
    setTimeout(async () => {
      const res: any = await updateData(newPage);
      if (res) {
        setIsLoading(false);
      }
    }, 1500);
  };

  //function checks the pagination logic, if it verifies the condition then call loadData
  const handleLoadMoreDM = async () => {
    if (!isLoading) {
      if (
        myDMChatrooms?.length > 0 &&
        myDMChatrooms?.length % 10 === 0 &&
        myDMChatrooms?.length === 10 * dmPage
      ) {
        const newPage = dmPage + 1;
        dispatch({ type: SET_DM_PAGE, body: newPage });
        loadData(newPage);
      }
    }
  };

  const renderFooterDM = () => {
    return isLoading ? (
      <View style={{ paddingVertical: Layout.normalize(20) }}>
        <ActivityIndicator size="large" color={STYLES.$COLORS.SECONDARY} />
      </View>
    ) : null;
  };

  const contextValues: HomeFeedContext = {
    isLoading,
    shimmerIsLoading,
    invitePage,
    FCMToken,
    navigation,
    groupFeedChatrooms,
    unseenCount,
    totalCount,
    isLoadingDM,
    shimmerIsLoadingDM,
    showDM,
    showList,
    FCMTokenDM,
    chatroomsDM,
    dmFeedChatrooms,

    setIsLoading,
    setShimmerIsLoading,
    setInvitePage,
    setFCMToken,
    getExploreTabCount,
    getChatroomFromLocalDB,
    getAppConfig,
    handleLoadMore,
    renderFooter,
    setIsLoadingDM,
    setShimmerIsLoadingDM,
    setShowDM,
    setShowList,
    setFCMTokenDM,
    getChatroomFromLocalDBDM,
    getAppConfigDM,
    updateDataDM,
    loadDataDM,
    handleLoadMoreDM,
    renderFooterDM,
  };

  return (
    <HomeFeedContext.Provider value={contextValues}>
      {children}
    </HomeFeedContext.Provider>
  );
};
