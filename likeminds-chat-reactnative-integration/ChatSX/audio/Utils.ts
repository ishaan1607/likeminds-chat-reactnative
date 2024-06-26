import AudioRecorder from "../optionalDependecies/AudioRecorder";
import AudioSet from "../optionalDependecies/AudioSet";

export function generateVoiceNoteName() {
  const currentDate = new Date();
  const timestamp = currentDate
    .toISOString()
    .replace(/[-T:]/g, "")
    .slice(0, -5); // Remove dashes, colons, and seconds

  return `VOC_${timestamp}`; // You can change the file extension or format as needed
}

export function generateAudioSet() {
  const audioSet: typeof AudioSet = {
    AudioEncoderAndroid: AudioRecorder
      ? AudioRecorder?.AudioEncoderAndroidType.AAC
      : null,
    AudioSourceAndroid: AudioRecorder
      ? AudioRecorder?.AudioSourceAndroidType.MIC
      : null,
    AVModeIOS: AudioRecorder
      ? AudioRecorder?.AVModeIOSOption.measurement
      : null,
    AVEncoderAudioQualityKeyIOS: AudioRecorder
      ? AudioRecorder?.AVEncoderAudioQualityIOSType.high
      : null,
    AVNumberOfChannelsKeyIOS: 2,
    AVFormatIDKeyIOS: AudioRecorder
      ? AudioRecorder?.AVEncodingOption.aac
      : null,
  };
  return audioSet;
}
