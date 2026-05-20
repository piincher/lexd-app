import { DeviceEventEmitter } from 'react-native';

export const VERSION_EVENT = 'VERSION_UPGRADE_REQUIRED';

export interface VersionUpgradeData {
  requiredVersion: string;
  currentVersion: string;
  storeUrl?: string;
}

export const emitVersionUpgradeRequired = (data: VersionUpgradeData) => {
  DeviceEventEmitter.emit(VERSION_EVENT, data);
};

export const addVersionUpgradeListener = (callback: (data: VersionUpgradeData) => void) => {
  return DeviceEventEmitter.addListener(VERSION_EVENT, callback);
};
