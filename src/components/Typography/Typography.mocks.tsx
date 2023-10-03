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

/* Create an ad-hoc utils file in case it is used by components outside Typography */
export const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel dolor ac sem congue ornare rhoncus quis tortor.
Vivamus hendrerit sed nisl eget gravida. Nunc dolor elit, condimentum non ante vitae, ullamcorper dignissim dolor.
Quisque ornare interdum massa blandit accumsan. Morbi viverra, urna ut consequat maximus, risus eros molestie augue, at posuere lacus nunc id ex.
Aenean et ante augue. Donec vitae pretium tellus, mattis placerat nisl. Phasellus dolor urna, porttitor a tempus at, scelerisque id nisi.
In ac libero quis neque tempor iaculis sit amet non sapien. Aenean quis neque varius, efficitur erat et, faucibus tortor.
Etiam at mi lacinia, gravida diam ac, sodales elit. Maecenas vitae rutrum nisl.
Nunc pellentesque, arcu vitae bibendum rutrum, mi sapien aliquam ipsum, sit amet mollis quam orci quis est.
Curabitur sagittis mauris volutpat lorem elementum, nec porttitor eros commodo. Suspendisse lorem orci, commodo mollis quam eget, facilisis tincidunt mauris.
Ut in feugiat nunc, in eleifend ex.`
