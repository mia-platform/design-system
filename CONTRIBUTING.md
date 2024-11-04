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

Are you in the contributors section inside the `package.json`? Add yourself!

##### Pull Request Title

Pull Request titles should follow the `<type>(<scope/component>): <summary of introduced changes>` structure. Pull Request titles are automatically used as **entries in the release note** when a new release is published, so they should effectively summarize the introduced change, specifying the type of change and the affected component (if possible).

##### Pull Request Labels

Always remember to **label your Pull Requests** so they get categorized correctly in the release note.

- Some of the available labels are used to categorize entries in the release note. You can find the complete mapping between PR labels and RN categories [here](https://github.com/mia-platform/design-system/blob/main/.github/release.yml). Unlabeled PRs will be automatically assigned the `Other changes` category in the release note.
- Here is a **non-exhaustive** list of the most common labels:

  - `<Name> component`: indicates the component affected by the PR changes. If a PR modifies N components, it should be labeled with N labels of this type. When creating a new label of this kind, please use the standard color `#08AD40`.
  - `breaking`: indicates that the PR introduces a breaking change.
  - `bug`: indicates that the PR introduces a bug fix.
  - `documentation`: indicates that the PR introduces a documentation change (e.g. README update, CONTRIBUTING update, PR template update, etc.).
  - `enhancement`: indicates that the PR introduces a new feature.
  - `hook`: indicates that the PR introduces changes strictly related to custom react hooks.
  - `new component`: indicates that the PR introduces a new component. This label is more specific than the `new feature` label.
  - `new feature`: indicates that the PR introduces a new feature.
  - `refactor`: indicates that the PR introduces refactoring changes.
  - `security`: indicates that the PR introduces a security fix.
  - `Storybook`: indicates that the PR introduces changes in the Storybook.

## How to tag

In order to tag the repository, use the following command:

```sh
npm version <patch|minor|major>
```

Pushing the tag will automatically trigger a new release.