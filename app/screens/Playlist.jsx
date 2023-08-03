import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useState } from 'react';
import { Button, Box, AspectRatio, Center, Stack, HStack, Heading, VStack, Collapse, Flex } from 'native-base';


import {icons} from '../../constants';



const Playlist = ( {accessToken} ) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [topArtists, setTopArtists] = useState(null);


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
                
                const artistFrequencyMap = {};
                for (const item of allSongs) {
                    const artist = item.track.artists[0].name;
                    if (artistFrequencyMap[artist]) {
                        artistFrequencyMap[artist]++;
                    } else {
                        artistFrequencyMap[artist] = 1;
                    }
                }
                
                const artistFrequencyArray = Object.entries(artistFrequencyMap).map(
                    ([artist, frequency]) => ({ artist, frequency })
                );
                artistFrequencyArray.sort((a, b) => b.frequency - a.frequency);
                    
                const top10Artists = artistFrequencyArray.slice(0, 10);
                    
                const promisesForImages = top10Artists.map((artistData) => fetchAlbumCover(artistData.artist));
                const artistImageURLs = await Promise.all(promisesForImages);
                    
                const topArtistsWithImages = top10Artists.map((artistData, index) => ({
                    ...artistData,
                    imageURL: artistImageURLs[index],
                }));
                
                setTopArtists(topArtistsWithImages);
            } else {
                console.log('Error:', response.status);
            }
        } catch (error) {
            console.log('Error:', error.message);
        }
    }

    async function fetchAlbumCover(artistName) {
        var searchParameters = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + accessToken
            }
        };

        try {
            var response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist`, searchParameters);
            if (response.status === 200) {
                var dataArtist = await response.json();
                const artist = dataArtist.artists.items.find((item) => item.name === artistName);
                const artistImageURL = artist ? (artist.images[0]?.url || null) : null;
                return artistImageURL;
            } else {
                console.log('Error:', response.status);
                return null;
            }
        } catch (error) {
            console.log('Error:', error.message);
            return null;
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
                        placeholder="Enter your Spotify playlist ID"
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

            {topArtists && (
                <ScrollView style={{ paddingTop: 50 }}>
                    <Box alignItems="center">
                        <Heading style={{color: "white"}}>Your top artists on this playlist</Heading>
                        <View 
                            style={{
                                width: 300,
                                overflow: "hidden",
                              }}
                        >
                            {topArtists.map((artistData, index) => (
                                <VStack mt={4} space={2}>
                                    <Box key={index} p={4} borderWidth={2} borderColor="gray.300" borderRadius="md" style={{backgroundColor:"white"}}>
                                        <Flex flexDirection="row">
                                            <Image source={{ uri: artistData.imageURL }} width={100} height={100}/>
                                            <VStack ml="5">
                                                <Text fontWeight="bold" fontSize="lg" style={{ flexWrap: 'wrap', maxWidth: 145 }}>{artistData.artist}</Text>
                                                <Text style={{ flexWrap: 'wrap', maxWidth: 145 }}>Number of tracks: {artistData.frequency}</Text>
                                            </VStack>
                                        </Flex>
                                    </Box>
                                </VStack>
                            ))}
                        </View>
                    </Box>
                </ScrollView>
            )}
        </View>
    )
}

export default Playlist;