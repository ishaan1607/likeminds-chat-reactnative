export class CallBack {
  private static _lmChatInterface;

  static setLMChatInterface(lmChatInterface): void {
    CallBack._lmChatInterface = lmChatInterface;
  }

  static get lmChatInterface() {
    return CallBack._lmChatInterface;
  }
}
