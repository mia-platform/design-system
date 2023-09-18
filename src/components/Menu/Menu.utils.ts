import { MenuProps } from './Menu'

function capitalizeGroupLabels(items: MenuProps['items'] = []): MenuProps['items'] {

  return items.map(item => {

    if (item?.type === 'group') {

      const transformedItem = {
        ...item,
        label: item?.label?.toUpperCase(),
        title: item?.title?.toUpperCase(),
      }

      if (item.children && Array.isArray(item.children)) {
        transformedItem.children = capitalizeGroupLabels(item.children)
      }

      return transformedItem
    }

    if (item.children && Array.isArray(item.children)) {

      return {
        ...item,
        children: capitalizeGroupLabels(item.children)
      }
    }

    return item
  })
}

export default capitalizeGroupLabels
