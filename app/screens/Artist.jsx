import React from 'react'
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'

import { useState } from 'react';

import {icons} from '../../constants';

import { Button, Box, AspectRatio, Center, Stack, HStack, Heading, VStack, Collapse, Flex } from "native-base";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
    const year = date.getFullYear();
    return `${day}${day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th'} ${month}, ${year}`;
};

const addCommasToNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
  

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

        console.log("searchparams", searchParameters);

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
                    console.log("artistImageURL")
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

    }
    
    const [showAlbums, setShowAlbums] = useState(false);

    const handleShowAlbums = () => {
        setShowAlbums(!showAlbums);
    };

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
                        placeholder="Enter an artist"
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
            <View>
                <FlatList 
                  data={[1]}
                  renderItem={({item}) => (
                      <TouchableOpacity>
                          <Text>{item}</Text>
                      </TouchableOpacity>
                  )}
                  keyExtractor={item => item}
                  contentContainerStyle={{columnGap: 12}}
                  horizontal
                />
            </View>


            {/* Rendering the artist info */}
            {searchResults.map((artist) => (
                <Text key={artist.id}>{artist.name}</Text>
            ))}


            {artistInfo && albumsInfo && (
                <ScrollView style={{ paddingTop: 50 }}>
                    <Box alignItems="center">
                        <Box 
                            maxW="80"
                            rounded="lg"
                            overflow="hidden"
                            borderColor="coolGray.200"
                            borderWidth="1"
                            backgroundColor="white"
                        >
                            <Box>
                                <AspectRatio w="100%" ratio={12 / 9}>
                                    <Image source={{uri: artistInfo.imageURL}} alt="image" />
                                </AspectRatio>
                            </Box>
                            <Stack p="4" space={3}>
                                <Stack space={2}>
                                    <Heading size="md" ml="-1">
                                        {artistInfo.name}
                                    </Heading>
                                    <Text 
                                        fontSize="xs" 
                                        _light={{color: "violet.500"}} 
                                        _dark={{color: "violet.400"}} 
                                        fontWeight="500" ml="-0.5" mt="-1"
                                    >
                                        {addCommasToNumber(artistInfo.followers)} followers
                                    </Text>
                                </Stack>
                                <VStack>
                                    <Text fontWeight="400">
                                        Genre: {artistInfo.genre}
                                    </Text>
                                    <Text fontWeight="400">
                                        Popularity: {artistInfo.popularity}/100
                                    </Text>
                                </VStack>
                                <Button onPress={handleShowAlbums} mt={4} variant="outline">
                                    {showAlbums ? 'Hide Albums' : 'Show Albums'}
                                </Button>
                                <Collapse isOpen={showAlbums}>
                                    <VStack mt={4} space={2}>
                                        {albumsInfo.albums && albumsInfo.albums.map((album, index) => (
                                            <Box key={index} p={4} borderWidth={2} borderColor="gray.300" borderRadius="md">
                                                <Flex flexDirection="row">
                                                    <Image source={{uri: album.albumImageURL}} width={100} height={100}/>
                                                    <VStack ml="5">
                                                        <Text fontWeight="bold" fontSize="lg" style={{ flexWrap: 'wrap', maxWidth: 145 }}>{album.name}</Text>
                                                        <Text style={{ flexWrap: 'wrap', maxWidth: 145 }}>Release Date: {formatDate(album.albumReleaseDate)}</Text>
                                                        <Text style={{ flexWrap: 'wrap', maxWidth: 145 }}>Number of tracks: {album.albumTotalTracks}</Text>
                                                    </VStack>
                                                </Flex>
                                            </Box>
                                        ))}
                                    </VStack>
                                </Collapse>
                            </Stack>
                        </Box>
                    </Box>
                </ScrollView>
            )}
        </View>

    )
}

export default Artist;
