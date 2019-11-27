# Movie List

This is my first ever React Native App. It displays a list of movies fetched from a local JSON and allows the user to add comments to said movies. I'm using [Expo](https://expo.io/) and the commenting backend is powered by Google's [Firebase](https://firebase.google.com/).  

## Prerequisites

First you need to have installed the expo-cli and some package manager such as Yarn or Npm. Next, you should create a firebase account and follow the steps on how to use it. Then you should rename the [firebaseConfigExample.js](https://github.com/actulio/first-rn-app/blob/master/src/constants/firebaseConfigExample.js) file to firebaseConfig.js and add your own credentials.

## How to run

Install the dependencies with:

`yarn install` or `npm install`

Run the code with: 

`yarn start` or `npm start`

Scan the Qrcode provided by the expo-cli or have an emulator up and running.

---

**Known issue:** The code in the fixTimerBug.js file is a fix to a problem where firebase uses a timeout too long and react native doesn't like it. The workaround was found at this [github issue](https://github.com/facebook/react-native/issues/12981), as well as the discussion regarding the subject. 
