/*
import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Text, View, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Asset } from 'expo-asset'


SplashScreen.preventAutoHideAsync();


export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // startLoading과 동일하게 동작
          // await new Promise((resolve) => setTimeout(resolve, 5000))  // maintain a splash screen in 5seconds
            await Font.loadAsync(Ionicons.font) // preload the font
            await Asset.loadAsync(require("./React_Native_Logo.png")); // preload the file system image
            await Image.prefetch("https://reactnative.dev/img/oss_logo.svg") // preload the server image
        } catch (error) {
        // onError와 동일하게 동작
        console.warn(error);
      } finally {
        // onFinish와 동일하게 동작
        setReady(true);
      }
    }

    prepare();
  }, []);




  const onLayoutRootView = useCallback(async () => {
    if (ready) await SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) {
    return null;
  }


  return (
    <View onLayout={onLayoutRootView}>
      <Text>We are done Loading !</Text>
    </View>
  );
}
*/

//////////////////////////


/*
import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Text, View, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Asset } from 'expo-asset'


SplashScreen.preventAutoHideAsync();

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font))

const loadImages = (images) => images.map(image => {
  if(typeof image === "string") {
    return Image.prefetch(image);
  } else {
    return Asset.loadAsync(image)
  }
})


export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
            const fonts = loadFonts([Ionicons.font]);
            // console.log(fonts) // [{"_A": null, "_x": 0, "_y": 0, "_z": null}]
        
            const images = loadImages([require("./React_Native_Logo.png"), "https://reactnative.dev/img/oss_logo.svg"])
            // console.log(images); // [{"_A": null, "_x": 0, "_y": 0, "_z": null}, {"_A": null, "_x": 0, "_y": 0, "_z": null}]
            
            await Promise.all([...fonts])

          } catch (error) {
        // onError와 동일하게 동작
        console.warn(error);
      } finally {
        // onFinish와 동일하게 동작
        setReady(true);
      }
    }

    prepare();
  }, []);




  const onLayoutRootView = useCallback(async () => {
    if (ready) await SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) {
    return null;
  }


  return (
    <View onLayout={onLayoutRootView}>
      <Text>We are done Loading !</Text>
    </View>
  );
}
*/


////////////////

/*
import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Text, View, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Asset, useAssets } from 'expo-asset'


SplashScreen.preventAutoHideAsync();


export default function App() {
  const [assets] = useAssets([require("./React_Native_Logo.png"), "https://reactnative.dev/img/oss_logo.svg"])
  const [loaded] = Font.useFonts(Ionicons.font);

  if (assets && loaded) SplashScreen.hideAsync();

  return (
      <Text>We are done Loading !</Text>
  );
}
*/


////////////////////



import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Text, View, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Asset } from 'expo-asset'
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native'
import Tabs from './navigation/Tabs';

SplashScreen.preventAutoHideAsync();

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font))

const loadImages = (images) => images.map(image => {
  if(typeof image === "string") {
    return Image.prefetch(image);
  } else {
    return Asset.loadAsync(image)
  }
})


export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
            const fonts = loadFonts([Ionicons.font]);
        
            const images = loadImages([require("./React_Native_Logo.png"), "https://reactnative.dev/img/oss_logo.svg"])
            
            await Promise.all([...fonts])

          } catch (error) {
        console.warn(error);
      } finally {
        setReady(true);
      }
    }

    prepare();
  }, []);




  const onLayoutRootView = useCallback(async () => {
    if (ready) await SplashScreen.hideAsync();
  }, [ready]);

  const isDark = useColorScheme() === "dark";

  if (!ready) {
    return null;
  }


  return (
    <View onLayout={onLayoutRootView}>
      <NavigationContainer theme={ isDark ? DarkTheme : DefaultTheme }>
        <Tabs />
        <Stack />
      </NavigationContainer>
    </View>
  );
}