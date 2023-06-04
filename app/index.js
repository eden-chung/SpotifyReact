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

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer';



const Home = () => {
    const router = useRouter();
    const Stack = createNativeStackNavigator();
    const Drawer = createDrawerNavigator();

    const Sidebar = () => {
        // Add your sidebar content here
        return (
          <SafeAreaView>
            {/* Sidebar content */}
            <Text>Sidebar Content</Text>
          </SafeAreaView>
        );
    };

    const MainStack = () => {
        return (
          <Stack.Navigator independent={true}>
            <Stack.Screen name="WelcomePage" component={WelcomePage} />
            <Stack.Screen name="Artist" component={Artist} />
            <Stack.Screen name="Song" component={Song} />
            <Stack.Screen name="Playlist" component={Playlist} />
            <Stack.Screen name="GuessSong" component={GuessSong} />
          </Stack.Navigator>
        );
      };

    return(
    <NavigationContainer independent={true}>
      <Drawer.Navigator drawerContent={Sidebar}>
        <Drawer.Screen name="Main" component={MainStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};


export default Home;

