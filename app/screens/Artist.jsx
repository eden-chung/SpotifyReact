import React from 'react'
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'

import { useState } from 'react';

import styles from '../../components/artist.style.jsx'

//import styles from '../../components/welcome.style'
import {COLORS, icons, SIZES} from '../../constants'
import { acc } from 'react-native-reanimated';

const Artist = ({ accessToken }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [artistInfo, setArtistInfo] = useState(null);
  const [albumsInfo, setAlbumsInfo] = useState(null);

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
        const artistId = data.artists.items[0].id
        if (artist1) {
          fetchArtistInfo(artist1.href)
          fetchAlbums(artistId)
        }
      } else {
        console.log('Error:', response.status);
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
    

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

    async function fetchAlbums(artistId) {

      var searchParameters = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      }

      try {
        var response = await fetch('https://api.spotify.com/v1/artists/' + artistId + '/albums', searchParameters);
        
        if (response.status === 200) {
          var dataAlbums = await response.json();
          
          const albums = dataAlbums.items.map((album) => {
            console.log("image url", album.images[0].url)
            return {
              name: album.name,
              albumImageURL: album.images[0].url,
              albumReleaseDate: album.release_date,
              albumTotalTracks: album.total_tracks,
            };
          });
          setAlbumsInfo({
            albums
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

      
      {artistInfo && albumsInfo && (
        
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={true}>
          <Image source={{uri: artistInfo.imageURL}} style={{ width: 200, height: 200 }} />
          <View style={styles.textWrapper}>
            <View style={styles.headerContainer}>
              <Text style={styles.header}>Basic Artist Information</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.artistInfo}>Artist Name: {artistInfo.name}</Text>
              <Text style={styles.artistInfo}>Genre: {artistInfo.genre}</Text>
              <Text style={styles.artistInfo}>Popularity: {artistInfo.popularity}</Text>
              <Text style={styles.artistInfo}>Followers: {artistInfo.followers}</Text>
            </View>
          </View>
          <View style={styles.textWrapper}>
            <View style={styles.headerContainer}>
              <Text style={styles.header}>Albums Artist Information</Text>
            </View>
            <View style={styles.infoContainer}>
            {albumsInfo.albums && albumsInfo.albums.map((album, index) => (
              <View key={index}>
                <Image source={{uri: album.albumImageURL}} style={{ width: 200, height: 200 }} />
                <Text key={index} style={styles.artistInfo}>Album Name: {album.name}</Text>
              </View>
            ))}
              <Text style={styles.artistInfo}>Genre: {artistInfo.genre}</Text>
              <Text style={styles.artistInfo}>Popularity: {artistInfo.popularity}</Text>
              <Text style={styles.artistInfo}>Followers: {artistInfo.followers}</Text>
            </View>
          </View>
        </ScrollView>
    )}
    </View>




 
  )
}

export default Artist
