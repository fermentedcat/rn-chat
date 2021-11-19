import theme from './theme'
import colors from './colors'

export const pageWrapper = {
  flex: 1,
  backgroundColor: theme.BACKGROUND_COLOR_LIGHT,
}

export const headingText = {
  fontSize: theme.FONT_SIZE_HEADING,
  padding: 10,
  fontWeight: theme.FONT_WEIGHT_BOLD,
}

export const subHeadingText = {
  fontSize: theme.FONT_SIZE_MEDIUM,
  fontWeight: theme.FONT_WEIGHT_BOLD,
}

export const textInput = {
  padding: theme.TEXT_INPUT_PADDING,
  backgroundColor: theme.BACKGROUND_COLOR_LIGHT,
  fontSize: theme.FONT_SIZE_LARGE,
  borderWidth: 1,
  borderColor: colors.secondaryMedium,
  borderRadius: 100,
  marginVertical: 5,
  alignSelf: 'stretch',
  
}

export const input = {
  padding: 10,
}