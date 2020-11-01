import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
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
            <LinearGradient colors={['#2AB5D1', '#00C7C7']} style={styles.splashContainer}>
                <Image style={styles.logo} source={logo}></Image>
                <View style={styles.location}>
                    <Text style={styles.locationState}>
                        {location.state}
                    </Text>
                    <Text style={styles.locationCity}>
                        {location.city}
                    </Text>
                </View>
            </LinearGradient>
    )
}
    
const styles = StyleSheet.create({
    splashContainer: {
        position: 'relative',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,

        justifyContent: 'center',
        alignItems: 'center'
    },

    logo:{
        width: 180,
        height: 162.76,  
        alignSelf: 'center'
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
        alignSelf: 'center',

        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    
    }
})   
