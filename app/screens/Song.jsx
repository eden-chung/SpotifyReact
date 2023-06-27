import React from 'react'
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, FlatList, Button } from 'react-native'
import { Audio } from 'expo-av';

import { useState, useEffect } from 'react';

import styles from '../../components/artist.style.jsx'

//import styles from '../../components/welcome.style'
import {COLORS, icons, SIZES} from '../../constants'

const Song = ({ accessToken }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [songInfo, setSongInfo] = useState(null);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
      var response = await fetch('https://api.spotify.com/v1/search?q=' + search + '&type=track', searchParameters);
      if (response.status === 200) {
        var data = await response.json();
        const href = data.tracks.href
        if (href) {
          fetchSongInfo(href)
        }
      } else {
        console.log('Error:', response.status);
      }
    } catch (error) {
      console.log('Error:', error.message);
    }

    

    async function fetchSongInfo(songHref) {

      var searchParameters = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      }

      try {
        var response = await fetch(songHref, searchParameters)
        if (response.status === 200) {
          var dataSong = await response.json();

          songName = dataSong.tracks.items[0].name;
          console.log(songName)
          artistName = dataSong.tracks.items[0].album.artists[0].name;
          albumImageURL = dataSong.tracks.items[0].album.images[0].url;
          durationMS = dataSong.tracks.items[0].duration_ms;
          popularity = dataSong.tracks.items[0].popularity;
          songmp3 = dataSong.tracks.items[0].preview_url;
      
          setSongInfo({
            songName: songName,
            artistName: artistName,
            albumImageURL: albumImageURL,
            durationMS: durationMS,
            popularity: popularity,
            songmp3: songmp3,
          });
        } else {
          console.log('Error:', response.status);
        }
      } catch (error) {
        console.log('Error:', error.message);
      }
    }
    
  }
  

  useEffect(() => {
    // Load the audio file when the component mounts
    if (songInfo && songInfo.songmp3) {
      loadAudio();
    }
  
    // Clean up resources when the component unmounts
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [songInfo]);

  const loadAudio = async () => {
    try {
      // URL of the MP3 file
      const audioUrl = songInfo.songmp3;
      console.log("audio", audioUrl)

      // Create a new sound object
      //const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
      const { sound } = await Audio.Sound.createAsync({uri: audioUrl});

      // Set the sound object in the state
      setSound(sound);
    } catch (error) {
      console.log('Error loading audio:', error);
    }
  };

  const playAudio = async () => {
    try {
      if (sound) {
        // Play the audio
        //await sound.setPositionAsync(0);
        await sound.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Error playing audio:', error);
    }
  };

  const stopAudio = async () => {
    try {
      if (sound) {
        // Play the audio
        await sound.pauseAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      console.log('Error pausing audio:', error);
    }
  };

  


  return (
    <View style={{flex: 1, backgroundColor: COLORS.blackBg}}>

      <View style={styles.searchContainer}>
        <View style = {styles.searchWrapper}>
          <TextInput 
          value ={searchTerm}
          placeholder="Enter a song"
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
      
      {searchResults.map((song) => (
      <Text key={song.id}>{song.name}</Text>
      ))}

      {songInfo && (
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={true}>
          <Text style={styles.title}>{songInfo.songName}</Text>
          <Image source={{uri: songInfo.albumImageURL}} style={{ width: 200, height: 200 }} />
          <View style={styles.textWrapper}>
            <View style={styles.headerContainer}>
              <Text style={styles.header}>Song Information</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.artistInfo}>Artist: {songInfo.artistName}</Text>
              <Text style={styles.artistInfo}>Popularity: {songInfo.popularity}</Text>
              <Text style={styles.artistInfo}>Duration: {songInfo.durationMS}</Text>
            </View>
            <View>
            {!isPlaying && (
              <Button title="Play" onPress={playAudio} />
            )}
            {isPlaying && (
              <Button title="Stop" onPress={stopAudio} />
            )}
            </View>
          </View>
        </ScrollView>
      )}
    
    </View>
  )
}

export default Song
