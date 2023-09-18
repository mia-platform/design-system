import React from 'react'
import { Title, Subtitle, Description, Primary, Controls, Stories } from '@storybook/blocks'

/**
 * The documentation page configuration for Storybook.
 */
const docs = {
  page: () => (
    <>
      <Title />
      <Subtitle />
      <Description />
      <Primary />
      <Controls />
      <Stories includePrimary={false} />
    </>
  ),
}

export default docs
