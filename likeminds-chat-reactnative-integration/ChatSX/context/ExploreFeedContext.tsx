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
import { useAppDispatch, useAppSelector } from "../store";
import { SET_EXPLORE_FEED_PAGE } from "../store/types/types";
import {
  getExploreFeedData,
  updateExploreFeedData,
} from "../store/actions/explorefeed";
import { ActivityIndicator, View } from "react-native";
import STYLES from "../constants/Styles";

interface ExploreFeedContextProps {
  children: ReactNode;
}

interface ExploreFeedContextValues {
  exploreChatrooms: any[];
  pinnedChatroomsCount: number;
  chats: any[];
  filterState: number;
  isPinned: boolean;
  isLoading: boolean;
  setIsPinned: Dispatch<SetStateAction<boolean>>;
  setFilterState: Dispatch<SetStateAction<number>>;
  setChats: Dispatch<SetStateAction<any[]>>;
  handleLoadMore: () => void;
  renderFooter: () => React.JSX.Element | null;
}

const ExploreFeedContext = createContext<ExploreFeedContextValues | undefined>(
  undefined
);

export const useExploreFeedContext = () => {
  const context = useContext(ExploreFeedContext);
  if (!context) {
    throw new Error(
      "useExploreFeedContext must be used within an ExploreFeedContextProvider"
    );
  }
  return context;
};

export const ExploreFeedContextProvider = ({
  children,
}: ExploreFeedContextProps) => {
  const {
    exploreChatrooms = [],
    page,
    pinnedChatroomsCount,
  }: any = useAppSelector((state) => state.explorefeed);
  const [chats, setChats] = useState<any[]>([]);
  const [filterState, setFilterState] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchData();
  }, [filterState]);

  async function fetchData() {
    dispatch({ type: SET_EXPLORE_FEED_PAGE, body: 1 });
    const payload = {
      orderType: filterState,
      page: 1,
    };
    const response = await dispatch(getExploreFeedData(payload, true) as any);
    return response;
  }

  async function updateData(newPage: number) {
    const payload = {
      orderType: filterState,
      page: newPage,
    };
    const response = await dispatch(updateExploreFeedData(payload) as any);
    return response;
  }

  useEffect(() => {
    fetchData();
  }, [filterState]);

  useEffect(() => {
    if (isPinned) {
      const pinnedChats = exploreChatrooms.filter((item: any) =>
        item?.isPinned ? item : null
      );
      setChats(pinnedChats);
    } else {
      setChats(exploreChatrooms);
    }
  }, [exploreChatrooms]);

  const loadData = async (newPage: number) => {
    setIsLoading(true);
    const res: any = await updateData(newPage);
    if (res) {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!isLoading) {
      if (chats.length > 0 && chats.length % 10 === 0) {
        const newPage = page + 1;
        dispatch({ type: SET_EXPLORE_FEED_PAGE, body: newPage });
        loadData(newPage);
      }
    }
  };

  const renderFooter = () => {
    return isLoading ? (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color={STYLES.$COLORS.SECONDARY} />
      </View>
    ) : null;
  };

  const contextValues: ExploreFeedContextValues = {
    exploreChatrooms,
    pinnedChatroomsCount,
    chats,
    filterState,
    isPinned,
    isLoading,
    setIsPinned,
    setFilterState,
    setChats,
    handleLoadMore,
    renderFooter,
  };

  return (
    <ExploreFeedContext.Provider value={contextValues}>
      {children}
    </ExploreFeedContext.Provider>
  );
};
