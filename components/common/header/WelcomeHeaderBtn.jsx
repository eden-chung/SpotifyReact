import React from 'react'
import { TouchableOpacity, Image} from 'react-native'

import styles from './welcomeheader.style'

const WelcomeHeaderBtn = ({iconUrl, dimension, handlePress}) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image 
        source={iconUrl} 
        resizeMode="cover"
        style={styles.btnImg(dimension)}/>
    </TouchableOpacity>
  )
}

export default WelcomeHeaderBtn