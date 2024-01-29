import { useReducer } from "react";
import apiMiddleware from "../store/apiMiddleware";
import { ContextState } from "../contextStore";

export const useReducerWithMiddleware = (
  reducer: any,
  initialState: ContextState
) => {
  const middleware = apiMiddleware;
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchUsingMiddleware: any = async (action) => {
    const response = await middleware(
      dispatch,
      typeof action === "object" ? action : action()
    );
    return response;
  };
  return [state as any, dispatchUsingMiddleware];
};
