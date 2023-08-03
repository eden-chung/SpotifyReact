import React from 'react';
import { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { Box, AspectRatio, Stack, Heading, VStack} from 'native-base';

import {COLORS, icons, SIZES} from '../../constants';

const Song = ({ accessToken }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [songInfo, setSongInfo] = useState(null);
    const [sound, setSound] = useState(null);

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
                    artistName = dataSong.tracks.items[0].album.artists[0].name;
                    albumName = dataSong.tracks.items[0].album.name;
                    albumImageURL = dataSong.tracks.items[0].album.images[0].url;
                    durationMS = dataSong.tracks.items[0].duration_ms;
                    popularity = dataSong.tracks.items[0].popularity;
                    songmp3 = dataSong.tracks.items[0].preview_url;

                    setSongInfo({
                        songName: songName,
                        artistName: artistName,
                        albumName: albumName,
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

    const convertTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
      
        return `${minutes}:${seconds.toString().padStart(2, '0')} mins`;
      };


    return (
        <View style={{flex: 1, backgroundColor: COLORS.blackBg}}>

            <View style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginTop: SIZES.large,
                height: 50}}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: COLORS.white,
                    marginRight: SIZES.small,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: SIZES.medium,
                    height: "100%"}}
                >
                    <TextInput 
                        value ={searchTerm}
                        placeholder="Enter a song"
                        placeholderTextColor="grey"
                        onChangeText={text => setSearchTerm(text)}
                    />
                </View>
                <TouchableOpacity style={{width: 50,
                    height: "100%",
                    backgroundColor: "#37c057",
                    borderRadius: SIZES.medium,
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
                            tintColor: COLORS.white,
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
                    contentContainerStyle={{columnGap: SIZES.small}}
                    horizontal
                />
            </View>

            {searchResults.map((song) => (
                <Text key={song.id}>{song.name}</Text>
            ))}

            {songInfo && (
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
                                    <Image source={{uri: songInfo.albumImageURL}} alt="image" />
                                </AspectRatio>
                            </Box>
                            <Stack p="4" space={3}>
                                <Stack space={2}>
                                    <Heading size="md" ml="-1">
                                        {songInfo.songName}
                                    </Heading>
                                    <Text 
                                        fontSize="xs" 
                                        _light={{color: "violet.500"}} 
                                        _dark={{color: "violet.400"}} 
                                        fontWeight="500" ml="-0.5" mt="-1"
                                    >
                                        From the album {songInfo.albumName}, by {songInfo.artistName}
                                    </Text>
                                </Stack>
                                <VStack>
                                    <Text fontWeight="400">
                                        Popularity: {songInfo.popularity}/100
                                    </Text>
                                    <Text fontWeight="400">
                                        Duration: {convertTime(songInfo.durationMS)}
                                    </Text>
                                </VStack>
                            </Stack>
                        </Box>
                    </Box>
                </ScrollView>
            )}
        </View>
    )
}

export default Song;
