import React from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated'

import { IndicatorProps } from './types'
import { isRTL } from '../helpers'

const Indicator: React.FC<IndicatorProps> = ({
  indexDecimal,
  itemsLayout,
  style,
}) => {


  const stylez = useAnimatedStyle(() => {
    const firstItemX = itemsLayout[0]?.x ?? 0

    const transform = [
      {
        translateX:
          itemsLayout.length > 1
            ? interpolate(
                indexDecimal.value,
                itemsLayout.map((_, i) => i),
                // when in RTL mode, the X value should be inverted
                itemsLayout.map((v) => (isRTL ? -1 * v.x : v.x))
              )
            : isRTL
              ? -1 * firstItemX
              : firstItemX,
      },
    ]

 
    return {
      transform,
    }
  }, [indexDecimal, itemsLayout])

 

  return <Animated.View style={[stylez, styles.indicator, style]} />
}

const styles = StyleSheet.create({
  indicator: {
    height: 2,
    backgroundColor: '#2196f3',
    position: 'absolute',
    bottom: 0,

  },
})

export { Indicator }
