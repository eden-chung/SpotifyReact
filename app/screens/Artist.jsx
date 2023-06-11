import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'

import { useState } from 'react';

//import styles from '../../components/artist.style.jsx'

import styles from '../../components/welcome.style'
import {COLORS, icons, SIZES} from '../../constants'
import { acc } from 'react-native-reanimated';

const Artist = ({ accessToken }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [artistInfo, setArtistInfo] = useState(null);

  async function search(search) {
    setSearchResults([])

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
        const artist1 = data.artists.items[0];
        if (artist1) {
          console.log(data.artists.items[0].followers.total);
          console.log(data.artists.items[0].name)
          fetchArtistInfo(artist1.href)
        }
      } else {
        console.log('Error:', response.status);
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
    data.artists.items[0].href

    async function fetchArtistInfo(artistHref) {
      console.log(data.artists.items[0].href)

      var searchParameters = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      }

      try {
        var response = await fetch(artistHref, searchParameters)
        if (response.status === 200) {
          var dataArtist = await response.json();
          artistName = dataArtist.name
          artistImageURL = dataArtist.images[0].url
          genre = dataArtist.genres
          popularity = dataArtist.popularity
          followers = dataArtist.followers.total
          console.log("test", artistName, artistImageURL, genre, popularity, followers)
          setArtistInfo({
            name: artistName,
            imageURL: artistImageURL,
            genre: genre,
            popularity: popularity,
            followers: followers
          });
        } else {
          console.log('Error:', response.status);
        }
      } catch (error) {
        console.log('Error:', error.message);
      }
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

      {/* Rendering the artist info */}
      {searchResults.map((artist) => (
      <Text key={artist.id}>{artist.name}</Text>
      ))}

      
      {artistInfo && (
      <View>
        <Text style={styles.artistInfo}>Artist Name: {artistInfo.name}</Text>
        <Image source={{uri: artistInfo.imageURL}} style={{ width: 200, height: 200 }} />
        <Text style={styles.artistInfo}>Genre: {artistInfo.genre}</Text>
        <Text style={styles.artistInfo}>Popularity: {artistInfo.popularity}</Text>
        <Text style={styles.artistInfo}>Followers: {artistInfo.followers}</Text>
      </View>
    )}
    </View>




 
  )
}

export default Artist
