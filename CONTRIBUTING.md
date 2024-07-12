# Contribution Guidelines

## System requirements

* [nodejs >= 18](https://nodejs.org/en/)

You should run `nvm use` inside the folder to correctly setup the used node version.

## Setup

After cloning the repository, run `yarn install` from the project root directory to install dependencies.

You can see the `npm` scripts available inside the `package.json` file and use them with [`yarn`](https://yarnpkg.com/getting-started/usage).

## Conventions

##### Linting
* The library uses [Eslint](https://eslint.org/docs/) as linter;
* Make sure to run `yarn lint` before committing.

##### Commits
* Commits should follow the [Conventional Commit](https://www.conventionalcommits.org/) standard: `<type>(<scope>): <subject>` (e.g. `feat(core): Add new feature`);
* At commit time, `yarn test` command script is automatically run. To skip this step, commit with `-n` flag.

##### Documentation
* Newly introduced component properties should be accessible from the principal component story [controls](https://storybook.js.org/docs/react/essentials/controls) inside Storybook;
* Whenever a new use case is provided for a component, make sure to include an example story inside Storybook.

:warning: All changes **MUST** pass through merge request approvals.

## Before submitting a PR
 * Are you in the contributors section inside the `package.json`? Add yourself!

## How to tag

In order to tag the repository, use the following command:

```sh
npm version <patch|minor|major>
```
