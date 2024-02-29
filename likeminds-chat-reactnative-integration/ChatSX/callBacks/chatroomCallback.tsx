import { NavigateToProfileParams, NavigateToGroupDetailsParams } from "./type";

export interface LMChatroomCallbacks {
  navigateToProfile(params: NavigateToProfileParams): void;
  navigateToHomePage(): void;
  navigateToGroupDetails(params: NavigateToGroupDetailsParams): void;
  chatroomBackAction(): boolean;
}
