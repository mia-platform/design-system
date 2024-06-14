// This is a file containing mock components and helpers
/* eslint-disable react/no-multi-comp */

import { ReactElement } from 'react'

import { Button } from '../Button'
import { Drawer } from './Drawer'
import { DrawerProps } from './Drawer.props'
import { useDrawer } from '../../hooks/useDrawer'

const drawerLipsum = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a semper diam, nec congue lectus. Mauris pellentesque convallis augue eu ornare. Sed pulvinar velit ut congue vulputate. Etiam elementum lacus vitae felis vulputate ultricies. Vivamus eu erat orci. Proin a accumsan nunc, eget rutrum arcu. Donec efficitur justo vel porta placerat. Nunc euismod at nisi vel interdum. Morbi id pellentesque quam. Donec eleifend nisi feugiat est rutrum dapibus quis at urna. Ut vehicula hendrerit neque, vel ultrices diam dignissim id. Aliquam erat volutpat. Sed porta iaculis dolor, ac egestas mi accumsan quis. Nam justo ex, facilisis in nunc id, suscipit aliquam arcu.

Nullam tempor nisi nulla, ac lacinia dolor porta in. Nam non velit enim. Nullam a orci id diam pretium sollicitudin. Nunc vitae mauris pretium, finibus orci non, varius diam. Donec sollicitudin, libero non blandit pellentesque, dolor neque elementum ante, in molestie massa ipsum sed odio. Morbi vestibulum pretium tempor. Suspendisse placerat faucibus velit, ac condimentum eros placerat sit amet. Etiam non finibus ipsum, vitae sagittis lorem. Curabitur convallis nisl sapien, quis placerat metus tempus ac. Maecenas molestie neque lorem, non ornare risus egestas ut.
`

export const DrawerLipsum = (): ReactElement => {
  return (
    <span>
      {drawerLipsum}
    </span>
  )
}

export const DrawerLipumTitle = (): ReactElement => {
  return <span>{'Drawer Lipsum'}</span>
}

export const DrawerLipsumFooter = ({ closeDrawer }: {closeDrawer: () => void}): ReactElement => {
  return (
    <div>
      <Button onClick={closeDrawer}>
        {'Close'}
      </Button>
    </div>
  )
}

export const WithOpenButton = (props: DrawerProps): ReactElement => {
  const { isVisible, openDrawer, closeDrawer } = useDrawer()
  return (
    <>
      <Button onClick={openDrawer}>Open Drawer</Button>
      <Drawer
        {...props}
        footer={<DrawerLipsumFooter closeDrawer={closeDrawer} />}
        isVisible={isVisible}
        onClose={closeDrawer}
      >
        <DrawerLipsum />
      </Drawer>
    </>
  )
}
