import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import logo from '../images/logo.png';
import { useNavigation } from '@react-navigation/native';
import { Accuracy, getCurrentPositionAsync, requestPermissionsAsync, reverseGeocodeAsync } from 'expo-location';

export default function Splash() {
    const navigation = useNavigation();
    const [location, setLocation] = useState({ city: '', state: ''});

    useEffect(() => {
        async function loadCurrentPosition(){
            const { status } = await requestPermissionsAsync();
  
            if (status !== 'granted') {
              alert ("Precisamos de acesso à sua localização!");
            } else {
                const { coords } = await getCurrentPositionAsync({accuracy: Accuracy.BestForNavigation});
                const location = await reverseGeocodeAsync(coords);
                if (location[0].region && location[0].subregion){
                    setLocation({ city: location[0].subregion, state: location[0].region });
                }                
              }
          }
      loadCurrentPosition();  
    }, []);

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("OnboardingScreen");
        }, 5000);
        }
    )

    return (
        <View style={styles.splashContainer}>
            <LinearGradient colors={['#2AB5D1', '#00C7C7']} start={{x: 0, y: 0}} style={{ flex:1 }}></LinearGradient>
            <Image style={styles.logo} source={logo}></Image>
            <View style={styles.location}>
                <Text style={styles.locationState}>
                    {location.state}
                </Text>
                <Text style={styles.locationCity}>
                    {location.city}
                </Text>
            </View>
        </View>
    )
}
    
const styles = StyleSheet.create({
    splashContainer: {
        position: "relative",
        width: 375,
        height: 812,
    },

    logo:{
        position: "absolute",
        width: 180,
        height: 162.76,
        left: 90,
        top: 250
    },

    locationState: {
        fontSize: 17.5,
        lineHeight: 34,
        textAlign: "right",
        fontFamily: 'Nunito_700Bold',
        color: "#FFF"
    },

    locationCity: {
        fontSize: 17.5,
        lineHeight: 34,
        textAlign: "right",
        fontFamily: 'Nunito_600SemiBold',
        color: "#FFF"
    },

    location: {
        position: "absolute",

        top: 490,
        left: 123,

        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    
    }
})   
