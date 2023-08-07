import { Indexes, Shadows } from './elevation'
import Palette from './palette'
import Shape from './shape'
import Spacing from './spacing'
import Transitions from './animation'
import Typography from './typography'


type Theme = {
  palette: Palette,
  shape: Shape,
  spacing: Spacing,
  typography: Typography,
  shadows?: Shadows,
  transitions?: Transitions,
  zIndex?: Indexes
}

export default Theme
