import darkenHex from '../utils/colors/darkenHex';
import lightenHex from '../utils/colors/lightenHex';
import colors from './colors';

export default {
  FONT_SIZE_SMALL: 12,
  FONT_SIZE_MEDIUM: 14,
  FONT_SIZE_LARGE: 16,
  FONT_SIZE_HEADING: 24,
  FONT_WEIGHT_LIGHT: '200',
  FONT_WEIGHT_MEDIUM: '400',
  FONT_WEIGHT_BOLD: '700',
  LETTER_SPACING_NARROW: 0.35,
  LETTER_SPACING_MEDIUM: 0.95,
  LETTER_SPACING_WIDE: 1.95,
  BACKGROUND_COLOR_LIGHT: colors.white,
  MODAL_OVERLAY: colors.greyTransparent,
  CONTAINER_PADDING: 20,
  TEXT_INPUT_PADDING: 10,
  DARKEN(color) {
    return darkenHex(color, 10)
  },
  LIGHTEN(color) {
    return lightenHex(color, 10)
  }
}