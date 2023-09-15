import { create } from "@storybook/theming/create"
import { Themes } from "../src/utils/theme"

export default create({
  brandTitle: "Mia Platform",
  brandUrl: "https://mia-platform.eu",
  brandImage: "mia-platform.png",
  brandTarget: "_self",
  base: Themes.light
})
