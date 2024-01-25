import { LMChatroomCallbacks, LMChatCallbacks, NavigateToProfileParams} from 'likeminds_chat_reactnative_integration'
  
// Override callBacks with custom logic
export class CustomCallbacks implements LMChatCallbacks, LMChatroomCallbacks {
  navigateToProfile(params: NavigateToProfileParams) {
      // Override navigateToProfile with custom logic
  }
  
  navigateToHomePage() {
      // Override navigateToHomePage with custom logic
  }

  onEventTriggered(eventName: string, eventProperties?: Map<string, string>) {
      // Override onEventTriggered with custom logic
  }
}