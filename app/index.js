import { Button, View, ScrollView, SafeAreaView, Text, Dimensions } from 'react-native';

import { useState } from 'react';
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



const Home = () => {
    const router = useRouter();
    const Stack = createNativeStackNavigator();
    const Drawer = createDrawerNavigator();
    const navigation = useNavigation();

    const Sidebar = () => {
      const navigation = useNavigation();
        // Add your sidebar content here
        return (
          <SafeAreaView style={styles.background}>
            {/* Sidebar content */}
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

    return(
    <NavigationContainer independent={true}>
      <Drawer.Navigator drawerContent={Sidebar} screenOptions = {{drawerStyle: {width: Dimensions.get("screen").width * 0.5 }}}>
        <Drawer.Screen name="WelcomePage" component={WelcomePage} />
        <Drawer.Screen name="Artist" component={Artist} />
        <Drawer.Screen name="Song" component={Song} />
        <Drawer.Screen name="Playlist" component={Playlist} />
        <Drawer.Screen name="GuessSong" component={GuessSong} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};


export default Home;

