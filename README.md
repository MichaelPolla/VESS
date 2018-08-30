<!-- markdownlint-disable MD033 -->

# VESS

Visual Evaluation of Soil Structure (VESS)

<img src="/docs/vess-icon.png" width="200">


## Installation
First, install ionic:

Look at the documentation :[ionic framework](https://ionicframework.com/getting-started#cli)

Clone repository:

`git clone https://github.com/MichaelPolla/VESS.git`

Install npm package:
`npm install`

For Mac, you need to need to execute this command line before the command `npm install`:
`sudo xcode-select -switch /Applications/Xcode.app/Contents/Developer/`

Execute code:

`ionic serve --lab` (in browser)
OR
ionic run android --livereload` (for emulator)
OR
`ionic run android --device` (for connected device)


Running the app

`cd app`

Android: `ionic cordova run android`  
  
Browser (not all functionalities): `ionic serve`

## Troubleshooting

### Android build error

Android build: if you keep getting the following message although Android Studio is already installed:

```
UnhandledPromiseRejectionWarning: CordovaError: Could not find an installed version of Gradle either in Android Studio,
or on your system to install the gradle wrapper. Please include gradle 
in your path, or install Android Studio
```

Install gradle: https://gradle.org/install

## Color palette

<img src="/docs/colorApp.png" width="200">

## Overview (fr)

<img src="docs/Vue d'ensemble.png" width="100%">
