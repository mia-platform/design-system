<div align="center">

<a href=https://www.mia-platform.eu/>
<img alt="logo" src="https://github.com/mia-platform/design-system/assets/9254840/cd4ae258-3b90-451d-be5f-d7665a4c2be9" height="96">
</a>

# Mia Platform Design System

React graphical components designed by Mia Platform

[![NPM publish CI][action-status-svg]][github-action]
[![javascript style guide][standard-mia-svg]][standard-mia]  
[![Coverage Status][coverall-svg]][coverall-io]
  
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

## Dependencies

The Mia Platform Design System has a dependency on Ant Design version 5. However, we understand that different projects might use various versions of Ant Design. To accommodate this flexibility, we've made it possible for you to manage the version of Ant Design used within your own consumer packages.

### Renaming "antd-5" Dependency

In the package.json of your consumer package, you should rename the "antd" dependency as follows to use version 5.x.x of Ant Design:

```json
{
  "dependencies": {
    "antd-5": "npm:antd@5.x.x"
  }
}
```

## Local Development

For local development, you can run:

```bash
yarn install # to install all dependencies
yarn dev
```

To run storybook:

```bash
yarn storybook
```

## License

All files under the src folder must have the license boilerplate attached to files. This is checked by CI.
To automate it, you can install [addlicense](https://github.com/google/addlicense) and run:

```sh
yarn addlicense
```

<!-- Links -->

[action-status-svg]: https://github.com/mia-platform/design-system/actions/workflows/npm-publish.yml/badge.svg
[github-action]: https://github.com/mia-platform/design-system/actions/workflows/npm-publish.yml
[standard-mia-svg]: https://img.shields.io/badge/code_style-standard--mia-orange.svg
[standard-mia]: https://github.com/mia-platform/eslint-config-mia
[coverall-svg]: https://coveralls.io/repos/github/mia-platform/design-system/badge.svg
[coverall-io]: https://coveralls.io/github/mia-platform/design-system

