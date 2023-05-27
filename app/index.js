import { Button, View, ScrollView, SafeAreaView, Text } from 'react-native';

import { useState } from 'react';
import { Stack, useRouter } from 'expo-router';

import { COLORS, icons, images, SIZES} from '../constants';
import { Nearbyjobs, Popularartists, WelcomeHeaderBtn, Welcome, DrawerButton} from '../components';

import WelcomePage from './screens/WelcomePage'
import Artist from './screens/Artist'
import Song from './screens/Song'
import Playlist from './screens/Playlist'
import GuessSong from './screens/GuessSong'


//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//import AppNavigator from '../app/navigation/AppNavigator';


import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'



const Home = () => {
    const router = useRouter();
    const Stack = createNativeStackNavigator();

    return(
        <NavigationContainer independent={true}>
            <SafeAreaView style={{flex:1,backgroundColor: COLORS.blackBg}}>
                <Stack.Screen options = {{
                    title: 'Cool',
                    headerStyle: {backgroundColor: COLORS.blackBg},
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <WelcomeHeaderBtn iconUrl={icons.menu} dimension="60%" />
                    ),
                    headerRight: () => (
                        <WelcomeHeaderBtn iconUrl={images.profile} dimension="100%" />
                    ),
                    headerTitle: ""
                }}/>
                <Stack.Navigator>
                    <Stack.Screen name="WelcomePage" component={WelcomePage}></Stack.Screen>
                    <Stack.Screen name="Artist" component={Artist}></Stack.Screen>
                    <Stack.Screen name="Song" component={Song}></Stack.Screen>
                    <Stack.Screen name="Playlist" component={Playlist}></Stack.Screen>
                    <Stack.Screen name="GuessSong" component={GuessSong}></Stack.Screen>
                </Stack.Navigator>
            </SafeAreaView>
        </NavigationContainer>
    )
}


export default Home;

