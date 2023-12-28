/**
 * @format
 */
if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
import {initMyClient} from 'likeminds_chat_reactnative_integration/ChatSX/setup';
import {LMChatClient} from '@likeminds.community/chat-rn';

// const myClient = initMyClient('c9a0a9cc-4844-4088-8fda-3146c61979a8');

const myClient = LMChatClient.setApiKey('1ba9ef67-ff68-4b6c-b0ee-32dd4f77d881')
  .setPlatformCode('rn')
  .setVersionCode(parseInt('23'))
  .build();

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => playbackService);

export {myClient};
