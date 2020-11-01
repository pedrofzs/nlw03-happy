import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { OrphanageContext } from '../../components/Context';

export default function OrphanageData2() {
  const navigation = useNavigation();
  const [opacity, setOpacity] = useState(0.5);
  const context = useContext(OrphanageContext);
  const [yesButtonActive, setYesButtonActive] = useState(true);
  const [noButtonActive, setNoButtonActive] = useState(false);
  
  const [instructions, setInstructions] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [openOnWeekend, setOpenOnWeekend] = useState(true);

  function handleOpacity(){
      if (instructions !== '' && openingHours !== ''){
          setOpacity(1);
      } else {
          setOpacity(0.5);
      }
  }

  useEffect(() => {
      handleOpacity();
  }, [handleOpacity])


  async function handleCreateOrphanage(){
    if(opacity === 1){
        const data = new FormData();

        data.append('name', context.name);
        data.append('about', context.about);
        data.append('whatsappNumber', context.whatsappNumber);
        data.append('latitude', String(context.latitude));
        data.append('longitude', String(context.longitude));
        data.append('instructions', instructions);
        data.append('openingHours', openingHours);
        data.append('openOnWeekend', String(openOnWeekend));
        context.images.forEach((image, index) => {
         data.append('images', {
             type: "image/jpg",
             uri: image,
             name: `image_${index}.jpg`
         } as any);
        });

    await api.post("orphanages", data);

    navigation.navigate("OrphanageCreated");
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Visitação</Text>
      <Text style={styles.label}>Instruções</Text>
      <TextInput style={[styles.input, { height: 110 }]} multiline value={instructions} onChangeText={instructions => setInstructions(instructions)}></TextInput>
      <Text style={styles.label}>Atendimento</Text>
      <TextInput style={styles.input} value={openingHours} onChangeText={openingHours => setOpeningHours(openingHours)}></TextInput>
      {/* <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana</Text>
        <Switch thumbColor="#fff" trackColor={{ false: '#ccc', true: '#39CC83' }} value={openOnWeekend} onValueChange={setOpenOnWeekend}></Switch>
      </View> */}
      <Text style={styles.label}>Atende final de semana</Text>
      <View style={styles.buttonSelect}>
          <View style={yesButtonActive ? styles.yesButtonSelected : styles.yesButton} onTouchEnd={() => {setYesButtonActive(true); setNoButtonActive(false); setOpenOnWeekend(true)}}>    
            <Text style={yesButtonActive ? styles.yesButtonTextSelected : styles.yesButtonText}>Sim</Text>
          </View>
          <View style={noButtonActive ? styles.noButtonSelected : styles.noButton} onTouchEnd={() => {setNoButtonActive(true); setYesButtonActive(false); setOpenOnWeekend(false)}}>
            <Text style={noButtonActive ? styles.noButtonTextSelected : styles.noButtonText}>Não</Text>
          </View>          
      </View>
      <View style={{opacity}}>
        <RectButton style={styles.confirmButton} onPress={handleCreateOrphanage}>
            <Text style={styles.confirmButtonText}>Confirmar</Text>
        </RectButton>
       </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
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

  uploadedImagesContainer:{
    flexDirection: "row"
  },

  uploadedImage:{
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8
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

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  confirmButton: {
    backgroundColor: '#3CDC8C',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32
  },

  confirmButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },

  buttonSelect: {
    position: "relative",

    width: 327,
    height: 56,
    left: 0,
  },

  yesButton: {
    position: 'absolute',

    marginTop: 5,
    width: 164,
    height: 56,

    backgroundColor: "#FFFFFF",
    borderColor: "#DDE3F0",
    borderWidth: 1,
    borderStyle: "solid",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 20,

    justifyContent: 'center',
    alignItems: 'center'

  },

  yesButtonSelected: {
    position: 'absolute',

    marginTop: 5,
    width: 164,
    height: 56,

    backgroundColor: "#EDFFF6",
    borderColor: "#A1E9C5",
    borderWidth: 1,
    borderStyle: "solid",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 20,

    justifyContent: 'center',
    alignItems: 'center'
},

  yesButtonText: {
    position: 'absolute',

    width: 26,
    height: 20,
    left: 70,

    fontFamily: "Nunito_600SemiBold",
    fontSize: 15,
    lineHeight: 20,
    color: "#5C8599"
  },

  yesButtonTextSelected: {
    position: 'absolute',

    width: 26,
    height: 20,
    left: 70,

    fontFamily: "Nunito_600SemiBold",
    fontSize: 15,
    lineHeight: 20,
    color: "#39CC83"
  },

  noButton: {
    position: 'absolute',

    marginTop: 5,
    width: 164,
    height: 56,
    left: 163,

    backgroundColor: "#FFFFFF",
    borderColor: "#DDE3F0",
    borderWidth: 1,
    borderStyle: "solid",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,

    justifyContent: 'center',
    alignItems: 'center'
  },

  noButtonSelected: {
    position: 'absolute',

    marginTop: 5,
    width: 164,
    height: 56,
    left: 163,

    backgroundColor: "#FBF0F4",
    borderColor: "#ECB4B7",
    borderWidth: 1,
    borderStyle: "solid",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,

    justifyContent: 'center',
    alignItems: 'center'
  },

  noButtonText: {
    position: 'absolute',

    width: 28,
    height: 20,
    left: 70,

    fontFamily: "Nunito_600SemiBold",
    fontSize: 15,
    lineHeight: 20,
    color: "#5C8599",
  },

  noButtonTextSelected: {
    position: 'absolute',

    width: 28,
    height: 20,
    left: 70,

    fontFamily: "Nunito_600SemiBold",
    fontSize: 15,
    lineHeight: 20,
    color: "#FF669D"
  }

})