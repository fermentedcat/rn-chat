import React from 'react'

import textColorByBg from '../utils/textColorByBg'

import theme from '../styles/theme'
import colors from '../styles/colors'

import { Image, Text, View, StyleSheet } from 'react-native'
import IconButton from './IconButton'

function Header({ title, logo, backNav, children: actions }) {
  return (
    <View style={styles().container}>
      {logo ? (
        <View style={styles().logoWrapper}>
          <Image
            source={require('../assets/snick-snack.png')}
            style={styles().logo}
          />
        </View>
      ) : backNav && <IconButton name="arrow-back" onPress={backNav}/>}
      <View style={styles(actions, logo).titleWrapper}>
        <Text numberOfLines={1} style={styles().heading}>{title || 'Snick Snack'}</Text>
      </View>
      {actions ? actions : <View style={styles(actions).placeholder} />}
    </View>
  )
}

const styles = (actions, logo) => StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 85,
  },
  titleWrapper: {
    flex: 2,
    flexGrow: logo || actions ? 2 : 3,
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: logo ? 'center' : 'flex-start',
    paddingHorizontal: 10,
  },
  heading: {
    color: textColorByBg(colors.secondaryMedium),
    fontSize: theme.FONT_SIZE_HEADING,
    fontWeight: theme.FONT_WEIGHT_BOLD,
    textAlign: 'center',
    flexShrink: 1,
  },
  logoWrapper: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  logo: {
    width: 65,
    height: 65,
  },
  placeholder: {
    height: 65,
    flex: !actions ? 1 : 0,
  },
})

export default Header
