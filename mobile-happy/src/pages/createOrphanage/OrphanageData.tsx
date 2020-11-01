import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { TextInputMask } from 'react-native-masked-text'
import { OrphanageContext, OrphanageContextProvider } from '../../components/Context';
import {LinearGradient} from 'expo-linear-gradient';

interface OrphanageDataRouteParams{
  position: {
    latitude: number;
    longitude: number;
  }
}

export default function OrphanageData() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as OrphanageDataRouteParams;
  const context = useContext(OrphanageContext);
  const { latitude, longitude } = params.position;
  
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [opacity, setOpacity] = useState(0.5);

  async function handleNextStage(){
    if(opacity === 1){
      context.updateOrph(name, about, whatsappNumber, latitude, longitude, images); 
      navigation.navigate("OrphanageData2");
    }
  }
  
  async function handleSelectImages(){
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== "granted"){
      alert ("Precisamos de acesso à sua galeria");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaType: ImagePicker.MediaTypeOptions.Images
    });

    if (result.cancelled){
      return;
    }

    const { uri: imageUrl } = result;

    setImages([...images, imageUrl]);

  }

  function handleRemoveImage(selectedImage: string){
    const imagesAfterRemoved = images.filter((img, imgId) => imgId !== images.indexOf(selectedImage));
    setImages(imagesAfterRemoved);
  }

    function handleOpacity(){
      if (name !== '' && about !== '' && whatsappNumber !== ''){
          setOpacity(1);
      } else {
          setOpacity(0.5);
      }
  }

  useEffect(() => {
      handleOpacity();
  }, [handleOpacity])

  return (
    <OrphanageContextProvider>
      <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
        <Text style={styles.title}>Dados</Text>
        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} value={name} onChangeText={text => setName(text)}></TextInput>
        <Text style={styles.label}>Sobre</Text>
        <TextInput style={[styles.input, { height: 110 }]} multiline value={about} onChangeText={about => setAbout(about)}></TextInput>
        <Text style={styles.label}>Número de Whatsapp</Text>
        <TextInputMask style={styles.input} type={'custom'} options={{ maskType: 'BRL', mask: '(99) 9 9999-9999'}} value={whatsappNumber} onChangeText={whatsappNumber => setWhatsappNumber(whatsappNumber)}></TextInputMask>
        <Text style={styles.label}>Fotos</Text>
        <View style={styles.uploadedImagesContainer}>
          {images.map(img => {
              return (
                      <View key={img} style={styles.imageContainer}>
                        <View style={styles.imageRemove} onTouchEnd={() => handleRemoveImage(img)}>
                          <Feather name="x" size={20} color="#FF669D"></Feather>
                        </View>
                        <Image source={{uri: img }} style={styles.uploadedImage}></Image>
                      </View>
              )
          })}
        </View>
        <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
          <Feather name="plus" size={24} color="#15B6D6"></Feather>
        </TouchableOpacity>
        <View style={{opacity}}>
          <RectButton style={styles.nextButton} onPress={handleNextStage}>
            <Text style={styles.nextButtonText}>Próximo</Text>
          </RectButton>
        </View>
      </ScrollView>
    </OrphanageContextProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  uploadedImagesContainer: {
    flexDirection: "row",
    marginBottom: 10
  },

  uploadedImage:{
    width: 56,
    height: 56,
    borderRadius: 20,
    marginTop: 8,
    marginRight: 8,

    zIndex: 1
  },

  imageContainer:{
    position: "relative" 
  },

  imageRemove: {
    width: 30,
    height: 30,
    right: 8,
    top: 5,
    
    backgroundColor: '#FFFFFF',
    borderColor: '#D3E2E5',
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    
    justifyContent: "center",
    alignItems: "center",

    position: "absolute",

    zIndex: 2
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})