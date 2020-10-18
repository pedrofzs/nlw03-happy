import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import mapMarker from '../images/map-marker.png';
import api from '../services/api';
import { Accuracy, getCurrentPositionAsync, requestPermissionsAsync } from 'expo-location';

interface Orphanage {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

export default function OrphanagesMap(){
    const navigation = useNavigation();
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);    
    const [userPosition, setUserPosition] = useState({ latitude: 0, longitude: 0});

    useFocusEffect(useCallback( () => { 
        async function loadCurrentPosition(){
            const { status } = await requestPermissionsAsync();
  
            if (status !== 'granted') {
              alert ("Precisamos de acesso à sua localização!");
            } else {
                const { coords } = await getCurrentPositionAsync({accuracy: Accuracy.BestForNavigation});
                setUserPosition({ latitude: coords.latitude, longitude: coords.longitude });
              }
        }
        loadCurrentPosition();

        api.get("/orphanages").then(response => {
            setOrphanages(response.data);
            })
        }, [])
    );

    function handleNavigateToOrphanage(id: number){
        navigation.navigate("Orphanage", { id });
    }

    function handleNavigateToCreateOrphanage(){
        navigation.navigate("SelectMapPosition");
    }

    return (
            <View style={styles.container}>
                {/* <MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={{latitude: -22.9249271, longitude: -43.2472064, latitudeDelta: 0.008, longitudeDelta: 0.008}}> */}
                <MapView style={styles.map} provider={PROVIDER_GOOGLE} region={{latitude: userPosition.latitude, longitude: userPosition.longitude, latitudeDelta: 0.008, longitudeDelta: 0.008}}>
                    {orphanages.map(orphanage => {
                        return (
                            <Marker key={orphanage.id} icon={mapMarker} calloutAnchor={{x: 2.85, y: 0.8}} coordinate={{latitude: orphanage.latitude, longitude: orphanage.longitude}}>
                            <Callout tooltip={true} onPress={() => handleNavigateToOrphanage(orphanage.id)}>
                                <View style={styles.calloutContainer}>
                                <Text style={styles.calloutText}>{orphanage.name}</Text>
                                </View>            
                            </Callout>
                            </Marker>
                        );
                      }) 
                    }
                </MapView>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        {orphanages.length} orfanato(s) encontrado(s)!
                    </Text>
                    <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
                    <Feather name="plus" size={20} color="#FFF"></Feather>
                    </RectButton>
                </View>
                </View>
            );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    map: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height  
    },

    calloutContainer: {
        width: 160,
        height: 46,
        paddingHorizontal: 16,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: 16,
        justifyContent: "center",
    },

    calloutText: {
        color: "#0089A5",
        fontSize: 14,
        fontFamily: "Nunito_700Bold"
    },

    footer: {
        position: "absolute",
        left: 24,
        right: 24,
        bottom: 32,

        backgroundColor: "#FFF",
        borderRadius: 20,
        height: 56,
        paddingLeft: 24,

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        elevation: 3

    },

    footerText: {
        color: "#8FA7B3",
        fontFamily: "Nunito_700Bold"
    },

    createOrphanageButton: {
        width: 55,
        height: 55,
        backgroundColor: "#15C3D6",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    }
});