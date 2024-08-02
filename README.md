<div align="center">

<a href=https://www.mia-platform.eu/>
<img alt="logo" src="./src/assets/mia-platform-logo.png" height="96">
</a>

# Mia Platform Design System

React graphical components designed by Mia Platform

[![NPM publish CI][action-status-svg]][github-action]
[![javascript style guide][standard-mia-svg]][standard-mia]  
[![Coverage Status][coverall-svg]][coverall-io]
[![Storybook][storybook-svg]][storybook]

Explore our graphical components using [Storybook][storybook].

</div>

## Install

> :warning: At the moment, the package is published only internally in Mia-Platform. We will release it on public npm soon.

```bash
yarn add @mia-platform-internal/console-design-system-react
```

## Usage

```jsx
import React from 'react'
import {Button} from '@mia-platform-internal/console-design-system-react'

const Example = () => {
  return (
    <Button />
  )
}
```

## Local Development

For local development, you can run:

```bash
yarn install # install all dependencies
```

Then, run Storybook:

```bash
yarn storybook
```

To run tests:

```bash
yarn test
```

## Update the themes

The themes are generated from the `theme-generator.json` file exported from Figma and they are coupled in each of different folder in `src/themes/files/`.

If a `theme-generator.json` file is changed, it is required to regenerate the new theme lauching the command:

```bash
yarn update-themes
```

## Icons

Icons are shipped in the `@mia-platform-internal/console-design-system-react/icons` sub-package. The SVG components can be created and placed in the `/icons` directory running:

```bash
yarn build-icons
```

This command launches a script that copies a set of icon packs from the dist of the [react-icons](https://github.com/react-icons/react-icons) dependency and build the set of Mia-Platform icons from the files contained in `/src/assets/icons`. To add a new icon you just need to place a new `.svg` file here (and don't forget to update the `/src/assets/icons/icons.stories.mdx` story file).

Given the high number of files, the script is pretty slow: Therefore, in CI it is run only on tags.

## License

All files under the src folder must have the license boilerplate attached to files. This is checked by CI.
To automate it, you can install [addlicense](https://github.com/google/addlicense) and run:

```sh
yarn addlicense
```

<!-- Links -->

[action-status-svg]: https://github.com/mia-platform/design-system/actions/workflows/test.yml/badge.svg
[github-action]: https://github.com/mia-platform/design-system/actions/workflows/test.yml
[standard-mia-svg]: https://img.shields.io/badge/code_style-standard--mia-orange.svg
[standard-mia]: https://github.com/mia-platform/eslint-config-mia
[coverall-svg]: https://coveralls.io/repos/github/mia-platform/design-system/badge.svg
[coverall-io]: https://coveralls.io/github/mia-platform/design-system
[storybook-svg]: https://img.shields.io/badge/graphical_components-Storybook-deeppink
[storybook]: https://mia-platform.github.io/design-system/
