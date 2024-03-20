/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './RootNavigation';
import {
  CarouselScreen,
  CreatePollScreen,
  FileUpload,
  ImageCropScreen,
  PollResult,
  VideoPlayer,
  LMOverlayProvider,
  LMChatCallbacks,
  LMChatroomCallbacks,
  NavigateToProfileParams,
  NavigateToGroupDetailsParams,
} from '@likeminds.community/chat-rn-core';
import {myClient} from '.';
import ChatroomScreen from './screens/Chatroom';
import {setStyles} from './styles';

const Stack = createNativeStackNavigator();

// Override callBacks with custom logic
class CustomCallbacks implements LMChatCallbacks, LMChatroomCallbacks {
  navigateToProfile(params: NavigateToProfileParams) {
    // Override navigateToProfile with custom logic
  }

  navigateToHomePage() {
    // Override navigateToHomePage with custom logic
  }

  onEventTriggered(eventName: string, eventProperties?: Map<string, string>) {
    // Override onEventTriggered with custom logic
  }

  navigateToGroupDetails(params: NavigateToGroupDetailsParams) {
    // Override navigateToGroupDetails with custom logic
  }
}

const lmChatInterface = new CustomCallbacks();

function App(): React.JSX.Element {
  const userName = '';
  const userUniqueId = '';
  const chatroomId = '';
  const profileImageUrl = '';

  useEffect(() => {
    setStyles();
  }, []);

  return (
    <LMOverlayProvider
      myClient={myClient}
      userName={userName}
      userUniqueId={userUniqueId}
      profileImageUrl={profileImageUrl}
      lmChatInterface={lmChatInterface}>
      <NavigationContainer ref={navigationRef} independent={true}>
        <Stack.Navigator>
          <Stack.Screen
            name="ChatRoom"
            component={ChatroomScreen}
            initialParams={{
              chatroomID: chatroomId,
              isInvited: false,
            }}
          />
          <Stack.Screen
            options={{gestureEnabled: Platform.OS === 'ios' ? false : true}}
            name={'FileUpload'}
            component={FileUpload}
          />
          <Stack.Screen name={'VideoPlayer'} component={VideoPlayer} />
          <Stack.Screen
            options={{gestureEnabled: false}}
            name={'CarouselScreen'}
            component={CarouselScreen}
          />
          <Stack.Screen
            options={{gestureEnabled: false}}
            name={'PollResult'}
            component={PollResult}
          />
          <Stack.Screen
            name={'CreatePollScreen'}
            component={CreatePollScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name={'ImageCropScreen'}
            component={ImageCropScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LMOverlayProvider>
  );
}

export default App;
