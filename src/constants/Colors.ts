/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

const defaultColors = {
    black: '#2E2739',
    white: '#F6F6FA',
    darkGray: '#827D88',
    lightBlue: '#61C3F2',
    gray: '#DBDBDF',
    teal: '#15D2BC',
    pink: '#E26CA5',
    purple: '#564CA3',
    yellow: '#CD9D0F'
}

export const Colors = {
  light: {
    ...defaultColors,
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    ...defaultColors,
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
