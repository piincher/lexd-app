module.exports = {
  testRunner: 'jest',
  runnerConfig: 'e2e/config.json',
  specs: 'e2e/tests',
  apps: {
    ios: {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/ChinaLink.app',
      build: 'xcodebuild -workspace ios/ChinaLink.xcworkspace -scheme ChinaLink -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build'
    },
    android: {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build: 'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug'
    }
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 14'
      }
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_4_API_30'
      }
    }
  },
  configurations: {
    'ios.simulator': {
      device: 'simulator',
      app: 'ios'
    },
    'android.emulator': {
      device: 'emulator',
      app: 'android'
    }
  },
  behavior: {
    init: {
      reinstallApp: true,
      exposeGlobals: true
    },
    cleanup: {
      shutdownDevice: false
    }
  },
  session: {
    sessionId: 'manual-test-session'
  }
};
