import { Button, View, ScrollView, SafeAreaView, Text, TouchableOpacity } from 'react-native';

import { useState } from 'react';
import { Stack, useNavigation, useRouter } from 'expo-router';

import { COLORS, icons, images, SIZES} from '../../constants';
import { Nearbyjobs, Popularartists, WelcomeHeaderBtn, Welcome, DrawerButton} from '../../components';

import styles from '../../components/welcome.style'

const Sidebar = () => {
    return (
    <SafeAreaView>
      {/* Sidebar content */}
      <Text>Sidebar Content</Text>
    </SafeAreaView>
    )
};

const WelcomePage = () => {
    const navigation = useNavigation();

    return (
    <SafeAreaView style={{flex:1,backgroundColor: COLORS.blackBg}}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
            <View style={styles.container}>
                <Text style={styles.userName}>
                Welcome to your
                <Text style={styles.spotify}> Spotify </Text>
                helper
                </Text>
            </View>
            
            <View>
                <Text style={styles.welcomeMessage}>What would you like to do?</Text>
            </View>

            <View style={styles.buttonSheet}>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Artist')}>
                <Text style={styles.buttons}>Artist information</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Song')}>
                <Text style={styles.buttons}>Song information</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Playlist')}>
                <Text style={styles.buttons}>Playlist analyzer</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Song')}>
                <Text style={styles.buttons}>Guess the song game</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
            </View>
            </View>
        </ScrollView>
    </SafeAreaView>
    )

}

export default WelcomePage

{/*
<Welcome
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}>
            </Welcome>

For the custom header, but can't get the sidebar to work with it
<Stack.Screen options = {{
    title: 'Cool',
    headerStyle: {backgroundColor: COLORS.lightWhite},
    headerShadowVisible: false,
    headerLeft: () => (
        <WelcomeHeaderBtn iconUrl={icons.menu} dimension="60%" handlePress={pressButton}/>
    ),
    headerRight: () => (
        <WelcomeHeaderBtn iconUrl={images.profile} dimension="100%" handlePress={pressButton}/>
    ),
    headerTitle: ""
    }}/>
*/

}