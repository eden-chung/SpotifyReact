import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

import { useState } from 'react';

import {icons} from '../../constants';

import { Button, Box, AspectRatio, Center, Stack, HStack, Heading, VStack, Collapse, Flex } from "native-base";


const Playlist = ( {accessToken} ) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);


    async function search(search) {
        setSearchResults([])

        var searchParameters = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + accessToken
            }
        }

        console.log("searchparams", searchParameters);

        try {
            console.log("searchparams", searchParameters);
            var response = await fetch('https://api.spotify.com/v1/playlists/' + search + '/tracks', searchParameters);
            if (response.status === 200) {
                console.log("success");
                var data = await response.json();

                console.log("data is", data)
                //var data = await response.json();
                //const artist1 = data.artists.items[0];
                //const artistId = data.artists.items[0].id
                //if (artist1) {
                //  fetchArtistInfo(artist1.href)
                //  fetchAlbums(artistId)
                //}
            } else {
                console.log('Error:', response.status);
            }
        } catch (error) {
            console.log('Error:', error.message);
        }


        async function fetchPlaylist(artistHref) {
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
                    genre = dataArtist.genres[0]
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

        {/*
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
    */}

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
                        placeholder="Enter your Spotify playlist link"
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

export default Playlist;