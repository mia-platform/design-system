import type { Preview } from "@storybook/react"

import backgrounds from "./addons/backgrounds"
import themeSwitcher from "./addons/theme"
import withTheme from "./decorators/theme"

const preview: Preview = {
  parameters: {
    actions: { 
      argTypesRegex: "^on[A-Z].*" 
    },
    backgrounds,
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  },
  globalTypes: {
    theme: themeSwitcher
  },
  decorators: [withTheme]
}

export default preview
