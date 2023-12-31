/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
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
import {RealmProvider} from '@realm/react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {UserSchemaRO} from './UserSchema';
import {Provider as ReduxProvider} from 'react-redux';
import {myClient} from '.';
import {store} from 'likeminds_chat_reactnative_integration';
import {GiphySDK} from '@giphy/react-native-sdk';
import {GIPHY_SDK_API_KEY} from 'likeminds_chat_reactnative_integration/ChatSX/awsExports';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // to configure gifphy sdk
  useEffect(() => {
    GiphySDK.configure({apiKey: GIPHY_SDK_API_KEY});
  }, []);

  return (
    <ReduxProvider store={store}>
      <LMChatProvider myClient={myClient}>
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

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
