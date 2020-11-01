import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'

export default function CancelOrphanageCreate() {
    const navigation = useNavigation();

    return (
            <View>
                <View style={styles.cancelCreateContainer}>
                        <View style={styles.rectangle}>
                            <Feather name="x" size={32} color="#FF669D"></Feather>
                        </View>
                        <Text style={styles.title}>Cancelar cadastro</Text>
                        <Text style={styles.subTitle}>Tem certeza que quer cancelar esse cadastro?</Text>
                        <TouchableOpacity style={styles.noButton} onPress={navigation.goBack}>
                            <Text style={styles.noText}>Não</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.yesButton} onPress={() => navigation.navigate("OrphanagesMap")}>
                            <Text style={styles.yesText}>Sim</Text>
                        </TouchableOpacity>
                </View>
            </View>
    )
}
    
const styles = StyleSheet.create({
    cancelCreateContainer: {
        position: "relative",

        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,

        backgroundColor: "#FF669D",

        justifyContent: "center",
        alignItems: "center"
    },

    rectangle: {
        position: "absolute",

        width: 64,
        height: 64,
        
        top: 220,
        alignSelf: "center",

        backgroundColor: "#FFFFFF",
        borderRadius: 16,

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    title: {
        position: "absolute",

        width: 269,
        height: 34,

        top: 320,
        alignSelf: "center",

        fontSize: 32,
        lineHeight: 34,
        textAlign: "center",
        fontFamily: 'Nunito_800ExtraBold',
        color: "#FFFFFF"
    },

    subTitle: {
        position: "absolute",

        width: 250,
        height: 100,

        top: 365,
        alignSelf: "center",

        fontSize: 20,
        lineHeight: 30,
        textAlign: "center",
        fontFamily: 'Nunito_600SemiBold',
        color: "#FFFFFF"
    },

    yesButton: {
        position: "absolute",

        width: 128,
        height: 56,
        left: 205,
        top: 470,
        backgroundColor: "#D6487B",
        borderRadius: 20,

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    yesText: {
        position: "absolute",

        width: 28,
        height: 25,

        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 15,
        lineHeight: 25,
        color: "#FFFFFF"
    },

    noButton: {
        position: "absolute",

        width: 128,
        height: 56,
        left: 70,
        top: 470,
        borderRadius: 20,
        borderColor: "#D6487B",
        borderStyle: "solid",
        borderWidth: 2,

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    noText: {
        position: "absolute",

        width: 30,
        height: 25,

        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 15,
        lineHeight: 25,
        color: "#FFFFFF"
    }
})   
