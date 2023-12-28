import React, {useEffect, useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {RealmProvider} from '@realm/react';
import {UserSchemaRO} from './db/schemas/UserSchema';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useAppDispatch} from 'likeminds_chat_reactnative_integration/ChatSX/store';
// import { Credentials } from "./credentials";
// import { INIT_API_SUCCESS, STORE_MY_CLIENT } from "./store/types/types";
import notifee from '@notifee/react-native';
// import { getRoute } from "./notifications/routes";
import * as RootNavigation from './RootNavigation';
// import { setupPlayer } from "./audio";
import {LMChatClient} from '@likeminds.community/chat-rn';

interface LMProviderProps {
  myClient: any;
  children: React.ReactNode;
}

export const LMChatProvider = ({myClient, children}: LMProviderProps) => {
  //To navigate onPress notification while android app is in background state / quit state.
  //   useEffect(() => {
  //     async function bootstrap() {
  //       const initialNotification = await notifee.getInitialNotification();

  //       if (initialNotification) {
  //         const routes = getRoute(initialNotification?.notification?.data?.route);
  //         setTimeout(() => {
  //           RootNavigation.navigate(routes.route, routes.params);
  //         }, 1000);
  //       }
  //     }
  //     bootstrap();
  //   }, []);

  // to initialise track player
  //   useEffect(() => {
  //     async function setup() {
  //       await setupPlayer();
  //     }
  //     setup();
  //   }, []);

  // to get dispatch
  const dispatch = useAppDispatch();

  console.log('asdsad');

  useEffect(() => {
    console.log('myClient ==>', myClient);

    // storing myClient followed by community details
    const callInitApi = async () => {
      console.log('aduasj');

      dispatch({
        type: 'STORE_MY_CLIENT',
        body: {myClient: myClient},
      });

      const payload = {
        uuid: 'ajhdhjasd', // uuid
        userName: 'jhashjsa', // user name
        isGuest: false,
      };

      const response = await myClient?.initiateUser(payload);

      console.log('response', response);

      dispatch({
        type: 'INIT_API_SUCCESS',
        body: {community: response?.data?.community},
      });
      console.log('1234');
    };
    callInitApi();
  }, []);

  return (
    <RealmProvider schema={[UserSchemaRO]}>
      <GestureHandlerRootView style={styles.flexStyling}>
        <View style={styles.flexStyling}>{children}</View>
      </GestureHandlerRootView>
    </RealmProvider>
  );
};

const styles = StyleSheet.create({
  flexStyling: {
    flex: 1,
  },
});
