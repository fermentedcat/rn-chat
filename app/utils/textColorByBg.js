import getColorBrightness from './getColorBrightness'
import colors from '../styles/colors'

export default (bg) => {
  const hsp = getColorBrightness(bg)
  return hsp > 200 ? colors.black : colors.white
}