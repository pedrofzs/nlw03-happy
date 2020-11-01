import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import overlayImg from '../images/overlayImg.png';
import { useNavigation } from '@react-navigation/native';
import OrphanagesMap from './OrphanagesMap';

export default function Instructions() {
    const [show, setShow] = useState(true);
    const navigation = useNavigation();

    return (
            <>
                {show ? (
                        <View>
                            
                            <OrphanagesMap></OrphanagesMap>
                                <View style={styles.overlayContainer} onTouchEnd={() => { navigation.navigate("SelectMapPosition"); setShow(false)}}>
                                    <LinearGradient colors={['#2AB5D1', '#00C7C7']} start={{x: 0, y: 0}} style={{ width: Dimensions.get('screen').width, height: Dimensions.get('screen').height }}></LinearGradient>
                                    <Image style={styles.img} source={overlayImg}></Image>
                                    <View style={styles.overlayTextContainer}>
                                        <Text style={styles.overlayText}>Toque no mapa para adicionar um orfanato</Text>
                                    </View>
                                </View>                
                        </View> 
                        ) : (
                            <OrphanagesMap></OrphanagesMap>
                            )
                }
            </>
    )
}
    
const styles = StyleSheet.create({
    overlayContainer: {
        position: "relative",
        justifyContent: "center",
        alignItems: "center",

        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,

        opacity: 0.75,
    },

    img:{
        position: "absolute",
        width: 180,
        height: 162.76,
        top: 220,
        alignSelf: "center"
    },

    overlayTextContainer:{
        position: "absolute",

        width: 203,
        height: 246,

        top: 285,
        alignSelf: "center"
        
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
