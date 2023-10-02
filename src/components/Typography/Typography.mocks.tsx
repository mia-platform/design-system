import { Icon } from '../Icon'

export const customEllipsis = {
  rows: 1,
  suffix: ' END',
  expandable: true,
  symbol: 'Show more',
}

export const customCopyable = {
  text: 'Custom text to copy',
  icon: [
    <Icon
      color="magenta"
      key="FiCopy"
      name="FiCopy"
      size={16}
    />,
    <Icon
      color="magenta"
      key="FiCheck"
      name="FiCheck"
      size={16}
    />,
  ],
  tooltips: ['Copy to clipboard!', 'Copied to clipboard!'],
}
