import { NavigateToProfileParams } from "./type";

export interface LMChatroomCallbacks {
  navigateToProfile(params: NavigateToProfileParams): void;
  navigateToHomePage(): void;
}
