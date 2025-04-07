import { ReactElement } from 'react'
import { Skeleton } from 'antd'

const styles = {
  skeleton: {
    padding: 8,
  },
}

const paragraph = {
  rows: 4,
  width: '100%',
}

export const Loader = (): ReactElement => {
  return (
    <Skeleton
      active
      paragraph={paragraph}
      style={styles.skeleton}
      title={false}
    />
  )
}
