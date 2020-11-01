import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import orphanageCreated from '../images/orphanageCreated.png';
import { useNavigation } from '@react-navigation/native';

export default function OrphanageCreated() {
    const navigation = useNavigation();

    return (
        <View style={styles.createSuccessContainer}>
            <Image style={styles.successImage} source={orphanageCreated}></Image>
            <Text style={styles.title}>Ebaaa!</Text>
            <Text style={styles.subTitle}>O cadastro deu certo e foi enviado ao administrador para ser aprovado. Agora é só esperar :)</Text>
            <TouchableOpacity style={styles.okButton} onPress={() => navigation.navigate("OrphanagesMap")}>
                <Text style={styles.okText}>Ok</Text>
            </TouchableOpacity>
        </View>
    )
}
    
const styles = StyleSheet.create({
    createSuccessContainer: {
        position: "relative",

        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,

        backgroundColor: "#39CC83",

        justifyContent: "center",
        alignItems: "center"
    },

    successImage:{
        position: "absolute",
        
        width: 250,
        height: 306,
        
        top: 121,
        alignSelf: "center"
    },

    title: {
        position: "absolute",

        width: 125,
        height: 45,

        top: 459,
        alignSelf: "center",

        fontSize: 40,
        lineHeight: 45,
        textAlign: "center",
        fontFamily: 'Nunito_800ExtraBold',
        color: "#FFFFFF"
    },

    subTitle: {
        position: "absolute",

        width: 320,
        height: 120,

        top: 522,
        alignSelf: "center",

        fontSize: 20,
        lineHeight: 30,
        textAlign: "center",
        fontFamily: 'Nunito_600SemiBold',
        color: "#FFFFFF"
    },

    okButton: {
        position: "absolute",

        width: 120,
        height: 56,

        top: 640,
        alignSelf: "center",

        backgroundColor: "#19C06D",
        borderRadius: 20,

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    okText: {
        position: "absolute",

        width: 21,
        height: 25,

        fontFamily: 'Nunito_600SemiBold',
        fontSize: 16,
        lineHeight: 25,
        color: "#FFFFFF"
    }
})   
