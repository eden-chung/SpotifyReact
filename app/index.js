import { Button, View, ScrollView, SafeAreaView, Text, Dimensions } from 'react-native';

import { encode } from 'base-64'

import { useState, useEffect } from 'react';
import { Stack, useNavigation, useRouter } from 'expo-router';

import { COLORS, icons, images, SIZES} from '../constants';
import { Nearbyjobs, Popularartists, WelcomeHeaderBtn, Welcome, DrawerButton} from '../components';

import styles from '../components/sidebar.style'

import WelcomePage from './screens/WelcomePage'
import Artist from './screens/Artist'
import Song from './screens/Song'
import Playlist from './screens/Playlist'
import GuessSong from './screens/GuessSong'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { acc } from 'react-native-reanimated';
import { NativeBaseProvider, Box } from 'native-base';

import { Audio } from 'expo-av';



const Home = () => {
    const CLIENT_ID = "516b7b9290614e308a2045dcadea221d"
    const CLIENT_SECRET = "4e2e0f5252f249e08701b12db400ce7a"

    const [accessToken, setAccessToken] = useState("")

    useEffect(() => {
        //const authHeader = 'Basic ' + encode(CLIENT_ID + ':' + CLIENT_SECRET);
        
        var authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                //'Authorization': authHeader
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }
      
        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(result => result.json())
            .then(data => setAccessToken(data.access_token))
    }, [])

    const router = useRouter();
    const Stack = createNativeStackNavigator();
    const Drawer = createDrawerNavigator();
    const navigation = useNavigation();

    const Sidebar = () => {
      const navigation = useNavigation();
        // Add your sidebar content here
        return (
            <SafeAreaView style={styles.background}>
                <Text>Sidebar Content</Text>
                <TouchableOpacity onPress={() => navigation.navigate("WelcomePage")}>
                    <Text style={styles.text}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Artist")}>
                    <Text style={styles.text}>Artist information</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Song")}>
                    <Text style={styles.text}>Song information</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Playlist")}>
                    <Text style={styles.text}>Playlist analyzer</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("GuessSong")}>
                    <Text style={styles.text}>Guess the song game</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    };
    console.log(accessToken)
    return(
      <NativeBaseProvider>
        <NavigationContainer independent={true}>
            <Drawer.Navigator drawerContent={Sidebar} screenOptions = {{drawerStyle: {width: Dimensions.get("screen").width * 0.5 }}}>
                <Drawer.Screen name="WelcomePage" component={WelcomePage} />
                <Drawer.Screen name="Artist" component={() => <Artist accessToken={accessToken} />}/>
                <Drawer.Screen name="Song" component={() => <Song accessToken={accessToken} />} />
                <Drawer.Screen name="Playlist" component={() => <Playlist accessToken={accessToken} />} />
                <Drawer.Screen name="GuessSong" component={() => <GuessSong accessToken={accessToken} />}/>
            </Drawer.Navigator>
        </NavigationContainer>
    </NativeBaseProvider>
    );
};


export default Home;

