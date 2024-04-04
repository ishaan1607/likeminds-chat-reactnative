import { setupPlayer } from "./TrackPlayerServices";
import { AUDIO_NOTIFICATION_TITLE } from "../constants/Strings";
import { AudioPlayer, AddTrack } from "../optionalDependecies/Audio";

// to add track in queue so that we can play it
export async function addTracks(track: typeof AddTrack) {
  AudioPlayer ? await AudioPlayer?.default?.add([track]) : null;
}

// to start audio player
export const startPlay = async (path: string, url: string) => {
  const isSetup = await setupPlayer();

  const track = {
    id: "1",
    url: path,
    title: AUDIO_NOTIFICATION_TITLE,
    externalUrl: url,
  };
  if (isSetup) {
    AudioPlayer ? await AudioPlayer?.default?.reset() : null;
    await addTracks(track);

    AudioPlayer ? await AudioPlayer?.default?.play() : null;

    return true;
  } else {
    return false;
  }
};

// to stop playing audio recording
export const stopPlay = async () => {
  AudioPlayer ? await AudioPlayer?.default?.stop() : null;
  AudioPlayer ? await AudioPlayer?.default?.reset() : null;
  return false;
};

// to pause playing audio recording
export const onPausePlay = async () => {
  AudioPlayer ? await AudioPlayer?.default?.pause() : null;
  return false;
};

// to resume playing audio recording
export const onResumePlay = async () => {
  AudioPlayer ? await AudioPlayer?.default?.play() : null;
  return true;
};

// seek to player on provided seconds
export const onSeekTo = async (seconds: number) => {
  AudioPlayer ? await AudioPlayer?.default?.seekTo(seconds) : null;
};
