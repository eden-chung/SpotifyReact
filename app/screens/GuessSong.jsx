import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';

import { useState } from 'react';

import {icons} from '../../constants';



const GuessSong = ({accessToken}) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [songDictionary, setSongDictionary] = useState([]);


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

                    if (preview != null) {
                        songNameToMp3[name] = preview;
                    }

                    console.log(songNameToMp3)
                    setSongDictionary(songNameToMp3)
                    
                }
                
            } else {
                console.log('Error:', response.status);
            }
        } catch (error) {
            console.log('Error:', error.message);
        }
    }

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
        </View>
    )
}

export default GuessSong;