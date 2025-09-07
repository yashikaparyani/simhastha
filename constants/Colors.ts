/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// Brand palette: white base, blue accents/borders, selective orange highlights
const brandBlue = '#1E3A8A'; // primary blue (600)
const brandBlueLight = '#3B82F6'; // accent blue (500)
const brandOrange = '#F59E0B'; // accent orange (500)
const neutralTextLight = '#0F172A';
const neutralTextDark = '#E5E7EB';
const surfaceLight = '#FFFFFF';
const surfaceDark = '#0B1220';
const borderLight = '#D1D5DB';
const borderDark = '#334155';

const tintColorLight = brandBlueLight;
const tintColorDark = '#ffffff';

export const Colors = {
  light: {
    text: neutralTextLight,
    background: surfaceLight,
    tint: tintColorLight,
    icon: brandBlue,
    tabIconDefault: brandBlue,
    tabIconSelected: tintColorLight,
    border: borderLight,
    card: '#F8FAFC',
    accentBlue: brandBlue,
    accentOrange: brandOrange,
  },
  dark: {
    text: neutralTextDark,
    background: surfaceDark,
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    border: borderDark,
    card: '#0F172A',
    accentBlue: brandBlueLight,
    accentOrange: brandOrange,
  },
};
