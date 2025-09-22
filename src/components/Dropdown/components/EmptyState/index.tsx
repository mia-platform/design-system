
import { ReactElement } from 'react'

import NoData from '../../assets/no-data.svg'

const styles = {
  container: {
    height: 136,
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

export const EmptyState = (): ReactElement => {
  return <div style={styles.container}>
    <NoData aria-label="no data" role="img" />
  </div>
}
