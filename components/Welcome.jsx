import React from 'react'
import { useState} from 'react'
import { View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native'

import{ useRouter} from 'expo-router'

import styles from './welcome.style'
import{icons, SIZES} from '../constants'


import {useNavigation} from '@react-navigation/native';


const Welcome = () => {
  const router = useRouter();

  //this is array destructuring, activeJobType gets assigned the first return value of the function useState, setActiveJobType to the second return value
  //usestate returns an array with exactly two values
  // 1. the current state
  //2. the set function that udpates the state to a different value and trigger a re-render
  const [activeJobType, setActiveJobType] = useState('Full-time');

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>
          Welcome to your
          <Text style={styles.spotify}> Spotify </Text>
          helper
        </Text>
      </View>
      
      <View>
        <Text style={styles.welcomeMessage}>What would you like to do?</Text>
      </View>

      <View style={styles.buttonSheet}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttons}>Artist information</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttons}>Song information</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttons}>Playlist analyzer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttons}>Guess the song game</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>

{/*
        <View style = {styles.searchWrapper}>
          <TextInput 
          style={styles.searchInput}
          value ={searchTerm}
          onChangeText = {(text) => {setSearchTerm(text)}}
          placeholder="What are you looking for?"
          placeholderTextColor="grey"/>
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
          </TouchableOpacity>
*/}
        
{/*   
      </View>  
      <View style={styles.tabsContainer}>
        <FlatList 
          data={jobTypes}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress = {() => {
                setActiveJobType(item);
                router.push(`/search/${item}`)
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          contentContainerStyle={{columnGap: SIZES.small}}
          horizontal
        />
      
    */}
      </View>
    </View>
  )
}

export default Welcome