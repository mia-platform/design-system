import {Themes} from "../../src/utils/theme"

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
      { value: Themes.light, icon: 'sun', title: "Light Theme" },
      { value: Themes.dark, icon: 'moon', title: "Dark Theme" },
    ],
  },
  defaultValue: Themes.light
}

export default themeSwitcher
