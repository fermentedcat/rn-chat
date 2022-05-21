import React, { Fragment } from 'react'

import colors from '../styles/colors'
import { subHeadingText } from '../styles/common'

import { Text, View, StyleSheet } from 'react-native'

function ProgressBar({ steps, currentStep }) {
  const progress = steps.map((step, index) => {
    return (
      <Fragment key={index}>
        {index > 0 && (
          <View style={[styles.line, currentStep < index && styles.nextLine]} />
        )}
        <View
          style={[
            styles.item,
            currentStep === index && styles.current,
            currentStep > index && styles.finished
          ]}
        >
          <Text style={styles.step}>{index + 1}</Text>
        </View>
      </Fragment>
    )
  })

  return <View style={styles.container}>{progress}</View>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 40,
  },
  item: {
    marginHorizontal: -1,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 4,
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: colors.secondaryLight,
    zIndex: 10,
  },
  finished: {
    backgroundColor: colors.info,
    borderColor: colors.info,
  },
  current: {
    backgroundColor: colors.white,
    borderColor: colors.grey,
  },
  step: {
    ...subHeadingText,
  },
  line: {
    flex: 1,
    height: 10,
    backgroundColor: colors.grey,
  },
  nextLine: {
    backgroundColor: colors.secondaryLight,

  },
})

export default ProgressBar
