import { Stack } from "expo-router";
import { useCallback} from 'react';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Layout = () => {
    const [fontsLoaded] = useFonts({
        Bold: require('../assets/fonts/Gotham-Bold.otf'),
        Medium: require('../assets/fonts/GothamMedium.ttf'),
        Regular: require('../assets/fonts/Gotham-Thin.otf'),
    })

    const onLayoutRootView = useCallback(async() => {
        if(fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded])

    if(!fontsLoaded) return null;
    return <Stack onLayout={onLayoutRootView}/>;
}


export default Layout;