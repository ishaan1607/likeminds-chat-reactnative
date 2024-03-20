import { chatroomReducer } from "./store/reducers/chatroomReducer";
import { explorefeedReducer } from "./store/reducers/explorefeedReducer";
import { homefeedReducer } from "./store/reducers/homefeedReducer";
import { loader } from "./store/reducers/loader";
import { fileUploadReducer } from "./store/reducers/fileUploadReducer";
import { useContextState } from "./contextStore";

// Combine multiple reducers into one
const combineReducers = (reducers) => (state, action) => {
  return Object.keys(reducers).reduce((nextState, key) => {
    nextState[key] = reducers[key](state[key], action);
    return nextState;
  }, {});
};

export const rootReducer = combineReducers({
  homefeed: homefeedReducer,
  chatroom: chatroomReducer,
  explorefeed: explorefeedReducer,
  loader: loader,
  upload: fileUploadReducer,
});

export const useAppSelector = (selector) => {
  const { state } = useContextState();
  return selector(state);
};

export const useAppDispatch = () => {
  const { dispatch } = useContextState();
  return dispatch;
};
