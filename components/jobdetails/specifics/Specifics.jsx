import React from 'react'
import { View, Text } from 'react-native'

import styles from './specifics.style'

const Specifics = ({title, points}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}:</Text>

      <View>
        {points.map((item, index) => (
          //this whole part is added to a new array created by the map function
          //this key is used so that there is a unique identifier
          <View style={styles.pointWrapper} key={item + index}> 
              <Text style={styles.pointDot}/>
              <Text style={styles.pointText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export default Specifics