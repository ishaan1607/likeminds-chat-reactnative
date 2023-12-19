/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {LMChatClient} from '@likeminds.community/chat-rn';

console.log('2321');

const myClient = LMChatClient.setApiKey('c9a0a9cc-4844-4088-8fda-3146c61979a8')
  .setPlatformCode('rn')
  .setVersionCode(parseInt('22'))
  .build();

const payload = {
  uuid: 'arnavRanjan', // uuid
  userName: 'ranjanDas123', // user name
  isGuest: false,
};

const response = myClient?.initiateUser(payload);

console.log('o99o9o', response);

AppRegistry.registerComponent(appName, () => App);

export {myClient};
