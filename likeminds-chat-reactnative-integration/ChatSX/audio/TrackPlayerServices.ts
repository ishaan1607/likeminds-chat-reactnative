import AudioPlayer from "../optionalDependecies/AudioPlayer";

export async function setupPlayer() {
  let isSetup = false;
  try {
    AudioPlayer ? await AudioPlayer?.default?.getActiveTrack() : null;
    isSetup = true;
    return isSetup;
  } catch {
    AudioPlayer ? await AudioPlayer?.default?.setupPlayer() : null;
    AudioPlayer ? await AudioPlayer?.default?.updateOptions() : null;

    isSetup = true;
    return isSetup;
  } finally {
    return isSetup;
  }
}

export async function playbackService() {
  // to pause audio from notification
  AudioPlayer
    ? AudioPlayer?.default?.addEventListener(
        AudioPlayer?.Event.RemotePause,
        () => {
          AudioPlayer?.default?.pause();
        }
      )
    : null;

  // to play audio from notification
  AudioPlayer
    ? AudioPlayer?.default?.addEventListener(
        AudioPlayer?.Event.RemotePlay,
        () => {
          AudioPlayer?.default?.play();
        }
      )
    : null;
}
