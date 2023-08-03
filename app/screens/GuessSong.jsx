import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';

import { useState, useEffect } from 'react';

import {icons} from '../../constants';

import { Audio } from 'expo-av';
import { Button, VStack } from 'native-base';



const GuessSong = ({accessToken}) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [songDictionary, setSongDictionary] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [dicIsEmpty, setIsEmpty] = useState(true);
    const [guess, setGuess] = useState('');
    const [guessTimer, setGuessTimer] = useState('');
    const [guessResult, setGuessResult] = useState(null);
    const [currentPlayingSong, setCurrentPlayingSong] = useState('');
 
    async function search(search) {
        setSearchResults([]);
        const songsPerPage = 100; // Change this value to the desired number of songs per page
    
        var searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        };
    
        try {
            var response = await fetch('https://api.spotify.com/v1/playlists/' + search + '/tracks?limit=' + songsPerPage, searchParameters);
            if (response.status === 200) {
                var data = await response.json();
                const totalSongs = data.total;
                const totalPages = Math.ceil(totalSongs / songsPerPage);
                
                const promises = Array.from({ length: totalPages }, (_, pageIndex) => {
                    const offset = pageIndex * songsPerPage;
                    return fetch('https://api.spotify.com/v1/playlists/' + search + '/tracks?limit=' + songsPerPage + '&offset=' + offset, searchParameters)
                    .then((response) => response.json());
                });
                
                const allResponses = await Promise.all(promises);
                const allSongs = allResponses.flatMap((response) => response.items);
                
                console.log("test")
                const songNameToMp3 = {};
                for (const item of allSongs) {
                    const name = item.track.name;
                    const preview = item.track.preview_url;

                    console.log('item is', item);

                    if (preview != null) {
                        songNameToMp3[name] = preview;
                    }

                    //console.log(songNameToMp3)
                    setSongDictionary(songNameToMp3)
                    console.log('dic', songDictionary)

                    if (Object.keys(songDictionary).length > 0) {
                        setIsEmpty(false);
                    }
                    console.log('diclength', Object.keys(songDictionary).length)
                }
                
            } else {
                console.log('Error:', response.status);
            }
        } catch (error) {
            console.log('Error:', error.message);
        }
    }

    
    const playMP3 = async (mp3Url, songName) => {
        try {
            const soundObject = new Audio.Sound();
            await soundObject.loadAsync({ uri: mp3Url });
            await soundObject.playAsync();
            soundObject.setOnPlaybackStatusUpdate((status) => {
                if (status.didJustFinish) {
                  setIsPlaying(false); // Set isPlaying to false when the audio finishes playing
                }
            });
            setIsPlaying(true);
            setCurrentPlayingSong(songName);
            setGuessResult(null);
        } catch (error) {
            console.log('Error playing audio:', error);
        }
    };

    const playRandomSong = () => {
        setIsGameStarted(true);
        const songNames = Object.keys(songDictionary);
        if (songNames.length > 0) {
            const randomSongIndex = Math.floor(Math.random() * songNames.length);
            const randomSongName = songNames[randomSongIndex];
            const mp3Url = songDictionary[randomSongName];
            if (mp3Url) {
                console.log("play");
                playMP3(mp3Url, randomSongName);
            } else {
                console.log('MP3 URL not found for this song.');
            }
        } else {
            console.log('No songs in the dictionary.');
        }
    };

    const checkUserGuess = (userGuess) => {
        if (currentPlayingSong && userGuess.toLowerCase() === currentPlayingSong.toLowerCase()) {
            setGuessResult('correct');
            console.log('Congratulations! You guessed the correct song!');
        } else {
            setGuessResult('incorrect');
            console.log('Try again. Your guess did not match the song.');
        }
    
        if (guessTimer) {
            clearTimeout(guessTimer);
        }
        setGuessTimer(
            setTimeout(() => {
                setGuessResult(null);
            }, 2000)
        );
      };
    

    useEffect(() => {
        console.log('dic', songDictionary);
        console.log('diclength', Object.keys(songDictionary).length);
    
        setIsEmpty(Object.keys(songDictionary).length === 0);
      }, [songDictionary]);
    
    

    return (
        <View style={{flex: 1, backgroundColor: "#121212"}}>
            <TouchableOpacity onPress={playRandomSong}>
                <Text style={{ color: 'white', fontSize: 20 }}>Play Example Song</Text>
            </TouchableOpacity>
            <View style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginTop: 20,
                height: 50}}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: "white",
                    marginRight: 12,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 16,
                    height: "100%"}}
                >
                    <TextInput 
                        value ={searchTerm}
                        placeholder="Enter your Spotify playlist ID to play the game"
                        placeholderTextColor="grey"
                        onChangeText={text => setSearchTerm(text)}
                    />
                </View>
                <TouchableOpacity style={{
                    width: 50,
                    height: "100%",
                    backgroundColor: "#37c057",
                    borderRadius: 16,
                    justifyContent: "center",
                    alignItems: "center",}}
                    onPress={() => search(searchTerm)}
                >
                    <Image
                        source={icons.search}
                        resizeMode="contain"
                        style={{
                            width: "50%",
                            height: "50%",
                            tintColor: "white",
                        }}
                    />
                </TouchableOpacity>
            </View>
            <Text style={{ color: 'white', fontSize: 20 }}>{Object.keys(songDictionary).length} length</Text>
            <Text style={{ color: 'white', fontSize: 20 }}>test</Text>
            {dicIsEmpty === false && (
                <View style={{ flex: 1, alignItems: 'center'}}>
                    <Button
                        onPress={playRandomSong}
                        style={{
                          width: 150,
                          backgroundColor: isGameStarted ? "#999999" : "#37c057",
                          marginTop: 50,
                        }}
                        disabled={isGameStarted}
                    >
                    {isGameStarted ? "Game in Progress" : "Start Game"}
                    </Button>

                    <Text style={{color: "white", marginTop:50, fontSize: 20}}>Guess the song:</Text>
                    <View style={{
                        backgroundColor: "white",
                        marginTop: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 16,
                        height: 45,
                        width: 200}}
                    >
                    <TextInput 
                        value ={guess}
                        placeholder="Your song guess"
                        placeholderTextColor="grey"
                        onChangeText={text => setGuess(text)}
                        onSubmitEditing={() => checkUserGuess(guess)}
                    />
                    </View>
                </View>
            )}
        </View>
    )
}

export default GuessSong;