import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync, Accuracy } from 'expo-location';

import mapMarkerImg from '../../images/map-marker.png';

export default function SelectMapPosition() {
  const navigation = useNavigation();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0});
  const [userPosition, setUserPosition] = useState({ latitude: 0, longitude: 0});

  function handleNextStep() {
    navigation.navigate('OrphanageData', { position });
  }

  function handleSelectMapPosition(event: MapEvent){
      setPosition(event.nativeEvent.coordinate);
  }

  useEffect(() => {
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
  }, []);

  return (
    <View style={styles.container}>
      {/* <MapView initialRegion={{ latitude: -22.9249271, longitude: -43.2472064, latitudeDelta: 0.008, longitudeDelta: 0.008 }} style={styles.mapStyle} onPress={handleSelectMapPosition}> */}
      <MapView region={{ latitude: userPosition.latitude, longitude: userPosition.longitude, latitudeDelta: 0.008, longitudeDelta: 0.008 }} style={styles.mapStyle} onPress={handleSelectMapPosition}>
        {position.latitude !== 0 ? (
                                    <Marker icon={mapMarkerImg} coordinate={{ latitude: position.latitude, longitude: position.longitude }}></Marker>
                                   ) : (
                                       <View></View>
                                   )                                
        }
      </MapView>
      {position.latitude !== 0 ? (
                                    <RectButton style={styles.nextButton} onPress={handleNextStep}>
                                        <Text style={styles.nextButtonText}>Próximo</Text>
                                    </RectButton>
                                ) : (
                                    <View></View>
                                )
        }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  mapStyle: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})