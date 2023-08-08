import type { Preview } from "@storybook/react"
import withTheme from "./decorators/theme"
import themeSwitcher from "./addons/theme"

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  globalTypes: {
    theme: themeSwitcher
  },
  decorators: [withTheme]
}

export default preview
