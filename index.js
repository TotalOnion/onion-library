import VideoController from './onion-videocontroller/onion-videocontroller.js';
import ModalController from './onion-modalcontroller/onion-modalcontroller.js';
export * from './onion-utils.mjs';
export * from './entry-animation-observer.js';

export default VideoController;
export { VideoController, ModalController };
export { default as modalController } from './onion-modalcontroller/onion-modalcontroller.js';
export { default as videoController } from './onion-videocontroller/onion-videocontroller.js';
export { default as onionLoader } from './onion-loader.js';
