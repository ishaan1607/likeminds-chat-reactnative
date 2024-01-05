/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {initMyClient} from 'likeminds_chat_reactnative_integration';

// proivde apiKey below to initMyClient
const myClient = initMyClient('');

AppRegistry.registerComponent(appName, () => App);

export {myClient};
