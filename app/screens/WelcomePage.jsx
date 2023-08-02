import { View, ScrollView, SafeAreaView, Text, TouchableOpacity } from 'react-native';

import { useNavigation } from 'expo-router';

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
        <SafeAreaView style={{flex:1,backgroundColor: "#121212"}}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <View style={{flexDirection: "row", width: "100%"}}>
                        <Text style={{
                            marginTop: 15,
                            fontFamily: "Medium",
                            fontSize: 20,
                            color: "white",
                            lineHeight: 35}}
                        >
                        Welcome to your
                        <Text style={{
                            fontFamily: "Medium",
                            fontSize: 20,
                            color: "#37c057",
                            lineHeight: 35,}}
                        > Spotify </Text>
                        helper
                        </Text>
                    </View>
                    <View>
                        <Text style={{
                            fontFamily: "Bold",
                            fontSize: 24,
                            color: "white",
                            marginTop: 2,
                            lineHeight: 30,
                            marginBottom: 30}}
                        >
                            What would you like to do?
                        </Text>
                    </View>
                    <View style={{
                        flex: 1,
                        color: "white",
                        flexDirection: 'column',
                        justifyContent: 'space-around'}}
                    >
                        <TouchableOpacity 
                            style={{
                                flex: 2,
                                backgroundColor: "#37c057",
                                marginRight: 12,
                                marginBottom: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 16,
                                height: "100%",
                                flexBasis: "45%",
                                justifyContent: "center"
                            }}
                            onPress={() => navigation.navigate('Artist')}
                        >
                            <Text style={{
                                fontFamily: "Medium",
                                fontSize: 20,
                                color: "white",
                                lineHeight: 35,
                                paddingTop: 20,
                                paddingBottom: 8}}
                            >
                                Artist information
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={{
                                flex: 2,
                                backgroundColor: "#37c057",
                                marginRight: 12,
                                marginBottom: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 16,
                                height: "100%",
                                flexBasis: "45%",
                                justifyContent: "center"
                            }}
                            onPress={() => navigation.navigate('Song')}
                        >
                            <Text style={{
                                fontFamily: "Medium",
                                fontSize: 20,
                                color: "white",
                                lineHeight: 35,
                                paddingTop: 20,
                                paddingBottom: 8}}
                            >
                                Song information
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={{
                                flex: 2,
                                backgroundColor: "#37c057",
                                marginRight: 12,
                                marginBottom: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 16,
                                height: "100%",
                                flexBasis: "45%",
                                justifyContent: "center"
                            }}
                            onPress={() => navigation.navigate('Playlist')}
                        >
                            <Text style={{
                                fontFamily: "Medium",
                                fontSize: 20,
                                color: "white",
                                lineHeight: 35,
                                paddingTop: 20,
                                paddingBottom: 8}}
                            >
                                Playlist analyzer
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={{
                                flex: 2,
                                backgroundColor: "#37c057",
                                marginRight: 12,
                                marginBottom: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 16,
                                height: "100%",
                                flexBasis: "45%",
                                justifyContent: "center"
                            }}
                            onPress={() => navigation.navigate('Song')}
                        >
                            <Text style={{
                                fontFamily: "Medium",
                                fontSize: 20,
                                color: "white",
                                lineHeight: 35,
                                paddingTop: 20,
                                paddingBottom: 8}}
                            >
                                Guess the song game
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default WelcomePage;

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