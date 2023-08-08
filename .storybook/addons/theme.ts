import {Themes, isBrowserTheme} from "../../src/utils/theme"

/**
 * The theme switcher configuration for Storybook.
 */
const themeSwitcher = {
  name: "Theme",
  title: "Theme",
  description: "Theme for your components",
  toolbar: {
    icon: "paintbrush",
    items: [
      { value: "light", icon: 'circlehollow', title: "Light Theme" },
      { value: "dark", icon: 'circle', title: "Dark Theme" },
    ],
  },
  defaultValue: isBrowserTheme(Themes.dark) ?
    Themes.dark :
    Themes.light
}

export default themeSwitcher
