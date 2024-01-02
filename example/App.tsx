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

  const themeStyles = {
    // hue: 0,
    // fontColor: 'red',
    // primaryColor: 'green',
    // secondaryColor: 'green',
    // lightBackgroundColor: '#d7f7ed',
  }

  const reactionListStyles = {
    // reactionSize: 0,
    // reactionLeftItemStroke: 'pink',
    // reactionRightItemStroke: 'yellow',
    // reactionItemBorderRadius: 5,
    // gap: 5,
  };

  const chatBubbleStyles = {
    // borderRadius: 5,
    // sentMessageBackgroundColor: 'blue',
    // receivedMessageBackgroundColor: 'pink',
    // selectedBackgroundColor: 'grey',
    // selectedMessageBackgroundColor: 'purple',
    // textStyles: {
    //   fontSize: 10,
    //   fontStyle: 'italic',
    //   fontFamily: 'SofiaPro-SemiBold',
    // },
    // linkTextColor: 'red',
    // taggingTextColor: 'yellow',
    // stateMessagesBackgroundColor: 'pink',
    // stateMessagesTextStyles:{
    //   fontSize: 10,
    //   fontStyle: 'italic',
    //   fontFamily: 'SofiaPro-SemiBold',
    // },
  };

  return (
    <ReduxProvider store={store}>
      <LMChatProvider
        myClient={myClient}
        userName={userName}
        userUniqueId={userUniqueId}
        chatBubbleStyles={chatBubbleStyles} 
        reactionListStyles={reactionListStyles} 
        themeStyles={themeStyles}>
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
