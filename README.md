<!-- markdownlint-disable MD033 -->

# VESS

This application allows to perform a Visual Evaluation of Soil Structure (VESS) test [Ball et al. 2007, Guimaraes et al. 2011].

<img src="/docs/vess-icon.png" width="200">

## Installation

First, install ionic:

Look at the documentation :[ionic framework](https://ionicframework.com/getting-started#cli)

Clone repository:

`git clone https://github.com/MichaelPolla/VESS.git`

Install npm package:
`npm install`

For Mac, if you have this message ´gyp: No Xcode or CLT version detected!´, you to need to execute this command line before `npm install`:
`sudo xcode-select -switch /Applications/Xcode.app/Contents/Developer/`

Execute code:

`ionic serve --lab` (in browser)
OR
`ionic run android --livereload` (for emulator)
OR
`ionic run android --device` (for connected device)

Running the app

`cd app`

Android: `ionic cordova run android`  
  
Browser (not all functionalities): `ionic serve`

### Android build

For complete instructions, see the Cordova [Android Platform Guide](https://cordova.apache.org/docs/en/8.x/guide/platforms/android/).  
In summary:

1. Install [Java Development Kit (JDK) 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

2. Install [Gradle](https://gradle.org/install).
3. Install [Android Studio](https://developer.android.com/studio/). This will also install the Android SDK.
4. Run: `ionic cordova run android`. This will build and run the app on a connected device, or will start the Android emulator.

### iOS build

XCode must be installed.

Install ios-deploy: `npm install -g ios-deploy`  
Build and run on emulator or connected device: `ionic cordova run ios`

## Troubleshooting

### Android build error

Android build: if you keep getting the following message although Android Studio is already installed:

```
UnhandledPromiseRejectionWarning: CordovaError: Could not find an installed version of Gradle either in Android Studio,
or on your system to install the gradle wrapper. Please include gradle
in your path, or install Android Studio
```

Install gradle: https://gradle.org/install

### iOS build error

if `npm install ios-deploy -g` fails, run: `sudo npm install --global --unsafe-perm ios-deploy` (as suggested [here](https://github.com/ios-control/ios-deploy/issues/109#issuecomment-92589783))

If you need to completely clean XCode cache, delete all the content of `Library/Developer/Xcode/DeriveData/`

## Color palette

<img src="/docs/colorApp.png" width="200px">
