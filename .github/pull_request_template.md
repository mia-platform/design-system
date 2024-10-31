### Description

<!-- Please provide a brief description of your changes. Summarize the rationale and impact on the codebase. E.g.

##### <Changed component name>
    - change 1
    - change 2
    - ...
-->

### Addressed issue

<!-- Link to the issue, if present. E.g. 
    Closes #XYZ
-->

### [IMPORTANT] PR Checklist

- [ ] I am aware of standards and conventions adopted in this repository, defined in the [CONTRIBUTING.md file](https://github.com/mia-platform/design-system/blob/main/CONTRIBUTING.md)

#### PR conventions

Please make sure your PR complies with the following rules before submitting it.

- [ ] PR title follows the `<type>(<scope>): <subject>` structure
- [ ] The PR has been labeled according to the type of changes (e.g. enhancement, new component, bug).

    > **NOTE**  
    > Some labels are used to generate release note entries: you can find the complete mapping between PR labels and release note categories [here](https://github.com/mia-platform/design-system/blob/main/.github/release.yml).

#### Additional code checks

Based on your changes, some of these checks may not apply. Please make sure to check the relevant items in the list.

- [ ] Changes are covered by tests 
- [ ] Changes to components are accessible and documented in the Storybook
- [ ] Typings have been updated
- [ ] New components are exported from the `index` file
- [ ] New files include the Apache 2.0 License disclaimer
- [ ] The browser console does not contain errors
