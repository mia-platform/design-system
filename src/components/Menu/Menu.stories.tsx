import type { Meta, StoryObj } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import { Menu } from './'

const meta = {
  component: Menu,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/0ar6alIEDe8iYCb8kU7Rxd/%5BDS%5D-Console-Mia-Platform?node-id=987%3A10396&mode=dev',
    },
  },
  args: {
    ...Menu.defaultProps,
  },
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    mode: 'inline',
    items: [
      { label: 'test', key: 'test', style: { background: 'white', boxShadow: 'box-shadow: 0px 1px 4px -1px rgba(0, 0, 0, 0.12)' } },
      {
        label: 'Test 2',
        type: 'group',
        key: 'test2',
        children: [
          { label: 'Test 1', key: 'test1' },
        ],
      },
      { type: 'divider' },
      { label: 'Test 3',
        type: 'group',
        children: [
          { label: 'Test 4', key: 'test4' },
        ],
      },
    ],
  },
}


// const items = [
//   <Item key="test" label="test" />,
//   <Category label='test 2'>
//     <Item key="test 1" label="test 1" />
//   </Category>,
//   <Divider />
//     <Group label='test 3'>
//       <Item key="test 4" label="test 4" />
//     </Group>
// ]
