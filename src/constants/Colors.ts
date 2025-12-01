/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4'
const tintColorDark = '#FFFFFF'

const defaultColors = {
  black: '#2E2739',
  white: '#FFFFFF',
  darkGray: '#827D88',
  lightBlue: '#61C3F2',
  gray: '#DBDBDF',
  teal: '#15D2BC',
  pink: '#E26CA5',
  purple: '#564CA3',
  yellow: '#CD9D0F',
}

export const Colors = {
  light: {
    ...defaultColors,
    text: '#202C43',
    background: '#F2F2F6',
    card: '#FFFFFF',
    tint: tintColorLight,
    icon: '#827D88',
    tabIconDefault: '#687076',
    tabIconSelected: '#FFFFFF',
  },
  dark: {
    ...defaultColors,
    text: '#202C43',
    background: '#F2F2F6',
    card: '#FFFFFF',
    tint: tintColorDark,
    icon: '#827D88',
    tabIconDefault: '#687076',
    tabIconSelected: '#FFFFFF',
  },
}
