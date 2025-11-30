import 'react-native-reanimated'
import { DarkTheme, DefaultTheme } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import * as React from 'react'
import { useColorScheme } from 'react-native'

import { Colors } from './constants/Colors'
import { Navigation } from './navigation'

SplashScreen.preventAutoHideAsync()

export function App() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
    PoppinsBlack: require('./assets/fonts/Poppins-Black.ttf'),
    PoppinsBlackItalic: require('./assets/fonts/Poppins-BlackItalic.ttf'),
    PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
    PoppinsBoldItalic: require('./assets/fonts/Poppins-BoldItalic.ttf'),
    PoppinsExtraBold: require('./assets/fonts/Poppins-ExtraBold.ttf'),
    PoppinsExtraBoldItalic: require('./assets/fonts/Poppins-ExtraBoldItalic.ttf'),
    PoppinsExtraLight: require('./assets/fonts/Poppins-ExtraLight.ttf'),
    PoppinsExtraLightItalic: require('./assets/fonts/Poppins-ExtraLightItalic.ttf'),
    PoppinsItalic: require('./assets/fonts/Poppins-Italic.ttf'),
    PoppinsLight: require('./assets/fonts/Poppins-Light.ttf'),
    PoppinsLightItalic: require('./assets/fonts/Poppins-LightItalic.ttf'),
    PoppinsMedium: require('./assets/fonts/Poppins-Medium.ttf'),
    PoppinsMediumItalic: require('./assets/fonts/Poppins-MediumItalic.ttf'),
    PoppinsRegular: require('./assets/fonts/Poppins-Regular.ttf'),
    PoppinsSemiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsSemiBoldItalic: require('./assets/fonts/Poppins-SemiBoldItalic.ttf'),
    PoppinsThin: require('./assets/fonts/Poppins-Thin.ttf'),
    PoppinsThinItalic: require('./assets/fonts/Poppins-ThinItalic.ttf'),
  })

  if (!loaded) {
    // Async font loading only occurs in development.
    return null
  }

  const theme =
    colorScheme === 'dark'
      ? {
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
            primary: Colors[colorScheme ?? 'dark'].tabIconSelected,
            background: Colors[colorScheme ?? 'dark'].background,
          },
        }
      : {
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            primary: Colors[colorScheme ?? 'light'].tabIconSelected,
            background: Colors[colorScheme ?? 'light'].background,
          },
        }

  return (
    <Navigation
      theme={theme}
      linking={{
        enabled: 'auto',
        prefixes: [
          // Change the scheme to match your app's scheme defined in app.json
          'helloworld://',
        ],
      }}
      onReady={() => {
        SplashScreen.hideAsync()
      }}
    />
  )
}
