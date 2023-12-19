import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';

// to check if device version greater than or equal to 13 or not
export const atLeastAndroid13 = (): boolean => {
  return Platform.OS === 'android' && Platform.Version >= 33;
};

//this function detect "@" mentions/tags while typing.
export function detectMentions(input: string) {
  const mentionRegex = /(?:^|\s)@(\w+)/g;
  const matches = [];
  let match;

  while ((match = mentionRegex.exec(input)) !== null) {
    const startIndex = match.index;
    const endIndex = mentionRegex.lastIndex;
    const nextChar = input.charAt(endIndex);

    if (nextChar !== '@') {
      matches.push(match[1]);
    }
  }

  const myArray = input.split(' ');
  const doesExists = myArray.includes('@');

  {
    /* It basically checks that for the below four conditions:
     1. if '@' is at end preceded by a whitespace
     2. if input only contains '@'
     3. if '@' occurs at new line
     4. doesExists checks whether '@' has been typed between two strings
     If any of the above condition is true, it pushes it in the matches list which indicates that member list has to be shown 
    */
  }
  if (
    input.endsWith(' @') ||
    input === '@' ||
    input.endsWith('\n@') ||
    (doesExists && !input.endsWith(' '))
  ) {
    matches.push('');
  }

  return matches;
}

// this function replaces the last @mention from the textInput if we have clicked on a tag from suggestion
export function replaceLastMention(
  input: string,
  taggerUserName: string,
  mentionUsername: string,
  UUID: string,
) {
  let mentionRegex: RegExp;

  if (taggerUserName === '') {
    mentionRegex = /(?<=^|\s)@(?=\s|$)/g;
  } else {
    mentionRegex = new RegExp(
      `@${taggerUserName}\\b(?!.*@${taggerUserName}\\b)`,
      'gi',
    );
  }
  const replacement = `@[${mentionUsername}](${UUID}) `;
  const replacedString = input?.replace(mentionRegex, replacement);
  return replacedString;
}

// function checks if we have access of storage in Android.
export async function requestStoragePermission() {
  if (Platform.OS === 'android') {
    let OSVersion = Platform.constants['Release'];

    if (Number(OSVersion) < 13) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs permission to access your storage',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          Alert.alert(
            'Storage Permission Required',
            'App needs access to your storage to read files. Please go to app settings and grant permission.',
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'Open Settings', onPress: Linking.openSettings},
            ],
          );
        } else {
          return false;
        }
      } catch (err) {
        return false;
      }
    } else {
      try {
        const grantedImageStorage = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]);
        if (
          grantedImageStorage['android.permission.READ_MEDIA_IMAGES'] &&
          grantedImageStorage['android.permission.READ_MEDIA_VIDEO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          return true;
        } else if (
          grantedImageStorage['android.permission.READ_MEDIA_IMAGES'] ===
            PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||
          grantedImageStorage['android.permission.READ_MEDIA_VIDEO'] ===
            PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
        ) {
          Alert.alert(
            'Storage Permission Required',
            'App needs access to your storage to read files. Please go to app settings and grant permission.',
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'Open Settings', onPress: Linking.openSettings},
            ],
          );
          return false;
        } else {
          return false;
        }
      } catch (err) {
        return false;
      }
    }
  }
}

export async function requestCameraPermission() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs permission to access your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          'Camera Permission Required',
          'App needs access to your camera to capture photos. Please go to app settings and grant permission.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: Linking.openSettings},
          ],
        );
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
}

export async function requestAudioRecordPermission() {
  if (Platform.OS === 'android') {
    try {
      let isAtLeastAndroid13 = atLeastAndroid13();
      const permissions = isAtLeastAndroid13
        ? [
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
          ]
        : [
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          ];
      const grants = await PermissionsAndroid.requestMultiple(permissions);

      if (isAtLeastAndroid13) {
        if (
          grants['android.permission.READ_MEDIA_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          return true;
        } else if (
          grants['android.permission.READ_MEDIA_AUDIO'] ===
          PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
        ) {
          Alert.alert(
            'Read Storage Permission Required',
            'App needs read access to your storage. Please go to app settings and grant permission.',
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'Open Settings', onPress: Linking.openSettings},
            ],
          );
        } else if (
          grants['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
        ) {
          Alert.alert(
            'Microphone Permission Required',
            'App needs microphone access to record audio. Please go to app settings and grant permission.',
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'Open Settings', onPress: Linking.openSettings},
            ],
          );
        } else {
          return false;
        }
      } else {
        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          return true;
        } else if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
        ) {
          Alert.alert(
            'Write Storage Permission Required',
            'App needs write access to your storage. Please go to app settings and grant permission.',
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'Open Settings', onPress: Linking.openSettings},
            ],
          );
        } else if (
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
        ) {
          Alert.alert(
            'Read Storage Permission Required',
            'App needs read access to your storage. Please go to app settings and grant permission.',
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'Open Settings', onPress: Linking.openSettings},
            ],
          );
        } else if (
          grants['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
        ) {
          Alert.alert(
            'Microphone Permission Required',
            'App needs microphone access to record audio. Please go to app settings and grant permission.',
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'Open Settings', onPress: Linking.openSettings},
            ],
          );
        } else {
          return false;
        }
      }
    } catch (err) {
      return;
    }
  }
}
