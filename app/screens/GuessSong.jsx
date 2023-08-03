import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
import { Button, VStack } from 'native-base';

import {icons} from '../../constants';





const GuessSong = ({accessToken}) => {

    const soundObjectRef = useRef(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [songDictionary, setSongDictionary] = useState([]);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [dicIsEmpty, setIsEmpty] = useState(true);
    const [guess, setGuess] = useState('');
    const [guessTimer, setGuessTimer] = useState('');
    const [guessResult, setGuessResult] = useState(null);
    const [currentPlayingSong, setCurrentPlayingSong] = useState('');
    const [showNextButton, setShowNextButton] = useState(false);
    const [timer, setTimer] = useState(0);
    const [startTimer, setStartTimer] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
 
    async function search(search) {
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

    const stopMusic = async () => {
        try {
            if (soundObjectRef.current) {
                await soundObjectRef.current.stopAsync();
                await soundObjectRef.current.unloadAsync();
            }
        } catch (error) {
            console.log('Error stopping audio:', error);
        }
    };
      

    
    const playMP3 = async (mp3Url, songName) => {
        try {
            if (soundObjectRef.current) {
                await soundObjectRef.current.unloadAsync();
            }
            const soundObject = new Audio.Sound();
            await soundObject.loadAsync({ uri: mp3Url });
            await soundObject.playAsync();
            soundObjectRef.current = soundObject;

            setCurrentPlayingSong(songName);
            setGuessResult(null);
            setStartTimer(true);
            setGuess("");

            setTimeout(() => {
                setGuessResult(`You could not guess it! This is the song: ${songName}`);
                setShowNextButton(true);
                setStartTimer(false);
            }, 30000);

            setTimeoutId(timeoutId);
        } catch (error) {
            console.log('Error playing audio:', error);
        }
    };

    const playRandomSong = () => {
        setTimer(0);
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
            setGuessResult('Correct!');
            setShowNextButton(true);
            stopMusic();
            setStartTimer(false)
        } else {
            setGuessResult('Incorrect. Try again');
            clearTimeout(guessTimer);
            setGuessTimer(
                setTimeout(() => {
                    setGuessResult(null);
                }, 1000)
            );
        }
        setGuess('');
    };

    const handleNextButtonClick = () => {
        if (soundObjectRef.current) {
            stopMusic();
        }

        setShowNextButton(false);
        setGuessResult(null);
        setTimer(0);
        playRandomSong();

        if (timeoutId) {
            clearTimeout(timeoutId);
          }
    };

    const handleEndGameButtonClick = () => {
        setIsGameStarted(false);
        setGuessResult(null);
        setTimer(0);
        setCurrentPlayingSong('');
        setGuess('');
        setShowNextButton(false);
        stopMusic();
    };
    
    useEffect(() => {
        setIsEmpty(Object.keys(songDictionary).length === 0);

        let interval;
        
        if (startTimer && isGameStarted) {
            interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
        }
        
        return () => {
            clearInterval(interval);
        };
    }, [songDictionary, startTimer]);
    

    return (
        <View style={{flex: 1, backgroundColor: "#121212"}}>
            <View style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginTop: 20,
                height: 50}}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: isGameStarted ? "gray.200" : "white",
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
                        editable={!isGameStarted}
                    />
                </View>
                <TouchableOpacity style={{
                    width: 50,
                    height: "100%",
                    backgroundColor: isGameStarted ? "#999999" : "#37c057",
                    borderRadius: 16,
                    justifyContent: "center",
                    alignItems: "center",}}
                    onPress={() => search(searchTerm)}
                    disabled={isGameStarted}
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
            {dicIsEmpty === false && (
                <View style={{ flex: 1, alignItems: "center"}}>
                    <Text style={{color: "white", marginTop:10}} >Loaded. There are {Object.keys(songDictionary).length} available songs in this playlist</Text>
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
                    <View>
                    {guessResult && (
                        <Text style={{ color: guessResult === "Correct!" ? "green" : "red", fontSize: 18, marginTop: 30 }}>
                            {guessResult} 
                            {guessResult === "Correct!" && timer ? ` You guessed it in ${timer} seconds` : null}
                        </Text>
                    )}
                    </View>
                    {showNextButton && (
                        <Button
                            onPress={handleNextButtonClick}
                            style={{
                                width: 150,
                                backgroundColor: "#37c057",
                                marginTop: 30,
                            }}
                        >
                            Next
                        </Button>
                    )}
                    <Button
                        onPress={handleEndGameButtonClick}
                        style={{
                            width: 150,
                            backgroundColor: isGameStarted === false ? "#999999" : "#37c057",
                            marginTop: 30,
                        }}
                    >
                        End game
                    </Button>
                </View>
            )}
        </View>
    )
}

export default GuessSong;