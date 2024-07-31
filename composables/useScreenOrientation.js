// composables/useScreenOrientation.js
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation';

export const useScreenOrientation = () => {
  const lockToLandscape = () => {
    ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.LANDSCAPE)
      .then(() => console.log('Screen locked to landscape'))
      .catch((error) => console.error('Failed to lock screen orientation:', error));
  };

  const unlockOrientation = () => {
    ScreenOrientation.unlock()
      .then(() => console.log('Screen orientation unlocked'))
      .catch((error) => console.error('Failed to unlock screen orientation:', error));
  };

  return {
    lockToLandscape,
    unlockOrientation,
  };
};
