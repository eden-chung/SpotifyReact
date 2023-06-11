import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'

//import styles from '../../components/artist.style.jsx'

import styles from '../../components/welcome.style'
import {COLORS, icons, SIZES} from '../../constants'

const Artist = ({info}) => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.blackBg}}>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello!</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style = {styles.searchWrapper}>
          <TextInput 
          placeholder="Enter an artist"
          placeholderTextColor="grey"/>
        </View>
        <TouchableOpacity style={styles.searchBtn}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
        
      </View>  
      <View style={styles.tabsContainer}>
        <FlatList 
          data={[1]}
          renderItem={({item}) => (
            <TouchableOpacity
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          contentContainerStyle={{columnGap: SIZES.small}}
          horizontal
        />
      </View>
    </View>

 
  )
}

export default Artist
