/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {
  NavigationContainer,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './RootNavigation';
import {
  CarouselScreen,
  ChatRoom,
  CreatePollScreen,
  FileUpload,
  ImageCropScreen,
  LMChatProvider,
  PollResult,
  VideoPlayer,
} from 'likeminds_chat_reactnative_integration';
import {Provider as ReduxProvider} from 'react-redux';
import {myClient} from '.';
import {store} from 'likeminds_chat_reactnative_integration';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const userName = '';
  const userUniqueId = '';

  return (
    <ReduxProvider store={store}>
      <LMChatProvider
        myClient={myClient}
        userName={userName}
        userUniqueId={userUniqueId}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <NavigationContainer ref={navigationRef} independent={true}>
            <Stack.Navigator>
              <Stack.Screen
                name="ChatRoom"
                component={ChatRoom}
                initialParams={{
                  chatroomID: '3844534',
                  isInvited: false,
                  myClient: myClient,
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
                // options={{headerShown: false, gestureEnabled: false}}
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
        </KeyboardAvoidingView>
      </LMChatProvider>
    </ReduxProvider>
  );
}

export default App;
