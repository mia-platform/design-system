export const item = {
  key: 'item',
  label: 'Item',
  title: 'Item',
}

export const group = {
  key: 'group',
  label: 'Group',
  children: [
    {
      key: 'group item 1',
      label: 'Group Item 1',
      title: 'Group Item 1',
    },
    {
      key: 'group item 2',
      label: 'Group Item 2',
      title: 'Group Item 2',
    },
  ],
}

export const category = {
  key: 'category',
  label: 'Category',
  type: 'group',
  children: [
    {
      key: 'Category item 1',
      label: 'Category Item 1',
      title: 'Category Item 1',
    },
    {
      key: 'Category item 2',
      label: 'Category Item 2',
      title: 'Category Item 2',
    },
  ],
}

export const divider = {
  key: 'divider',
  type: 'divider',
  dashed: false,
}
