import {StatusBar} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import {useFonts, Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto';

import {Routes} from './src/routes';

import {THEME} from './src/theme';
import {Loading} from './src/components/Loading';

import {CartContextProvider} from './src/contexts/CartContext';

import OneSignal from 'react-native-onesignal';
import {tagUserInfoCreate} from "./src/notifications/notificationsTags";
import {useEffect} from "react";

OneSignal.setAppId("a8e0036c-4d82-4247-ad6f-944476a0ffcd");

OneSignal.promptForPushNotificationsWithUserResponse();

export default function App() {
    const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold});

    tagUserInfoCreate()

    useEffect(() => {
        OneSignal.setNotificationOpenedHandler((response) => {
            const {actionId} = response.action as any

            return console.log(actionId, '1 - ver todas, 2 - ver pedido')
        })
    }, [])

    return (
        <NativeBaseProvider theme={THEME}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <CartContextProvider>
                {fontsLoaded ? <Routes/> : <Loading/>}
            </CartContextProvider>



        </NativeBaseProvider>
    );
}