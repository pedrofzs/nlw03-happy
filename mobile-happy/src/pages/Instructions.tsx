import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import overlayImg from '../images/overlayImg.png';
import { useNavigation } from '@react-navigation/native';
import OrphanagesMap from './OrphanagesMap';

export default function Instructions() {
    const navigation = useNavigation();

    return (
            <View>
                <OrphanagesMap></OrphanagesMap>
                <View style={styles.overlayContainer} onTouchEnd={() => navigation.navigate("OrphanagesMap")}>
                    <LinearGradient colors={['#2AB5D1', '#00C7C7']} start={{x: 0, y: 0}} style={{ flex:1 }}></LinearGradient>
                    <Image style={styles.img} source={overlayImg}></Image>
                    <View style={styles.overlayTextContainer}>
                        <Text style={styles.overlayText}>Toque no mapa para adicionar um orfanato</Text>
                    </View>
                </View>
            </View>
    )
}
    
const styles = StyleSheet.create({
    overlayContainer: {
        position: "relative",
        width: "100%",
        height: "100%",
        opacity: 0.75,
    },

    img:{
        position: "absolute",
        width: 180,
        height: 162.76,
        left: 90,
        top: 210
    },

    overlayTextContainer:{
        position: "absolute",

        width: 203,
        height: 246,

        left: 75,
        top: 285,
        
    },

    overlayText: {
        position: "absolute",

        width: 203,
        height: 102,

        top: 120,

        fontSize: 24,
        lineHeight: 34,
        textAlign: "center",
        fontFamily: 'Nunito_800ExtraBold',
        color: "#FFFFFF"
    
    }
})   
