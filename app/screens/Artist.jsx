import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'

import { useState } from 'react';

//import styles from '../../components/artist.style.jsx'

import styles from '../../components/welcome.style'
import {COLORS, icons, SIZES} from '../../constants'
import { acc } from 'react-native-reanimated';

const Artist = ({ accessToken }) => {
  console.log("access:" + accessToken)
  const [searchTerm, setSearchTerm] = useState('');

  async function search(search) {

    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    try {
      var response = await fetch('https://api.spotify.com/v1/search?q=' + search + '&type=artist', searchParameters);
      if (response.status === 200) {
        var data = await response.json();
        console.log(data.artists.items[0].followers.total);
        console.log(data.artists.items[0].name)
      } else {
        console.log('Error:', response.status);
      }
    } catch (error) {
      console.log('Error:', error.message);
    }

  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.blackBg}}>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello!</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style = {styles.searchWrapper}>
          <TextInput 
          value ={searchTerm}
          placeholder="Enter an artist"
          placeholderTextColor="grey"
          onChangeText={text => setSearchTerm(text)}/>
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={() => search(searchTerm)}>
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
