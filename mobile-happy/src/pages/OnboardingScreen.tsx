import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Onboarding from 'react-native-onboarding-swiper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import OrphanagesMap from './OrphanagesMap';
import onboarding01 from '../images/onboarding-01.png';
import onboarding02 from '../images/onboarding-02.png';

export interface DotProps {
    selected: boolean;
    isLight: boolean;
}

export default function Onboardings() {
    const navigation = useNavigation();
    const [isFirstLaunch, setIsFirstLaunch] = useState(true);

/*     useEffect(() => {
        AsyncStorage.getItem('alreadyLaunched').then(value => {
            if (!value){
                AsyncStorage.setItem('alreadyLaunched', 'true');
                setIsFirstLaunch(true)
            } else {
                setIsFirstLaunch(false);
            }
        })
    }, []); */

    useEffect(() => {
        const asyncStorage = async () => {
            try {
                const check = await AsyncStorage.getItem('alreadyLaunched');
                setIsFirstLaunch(!(check === 'true'));
            } catch (e) {}
        }
        asyncStorage();
    }, [setIsFirstLaunch]);

    const Square = ({ ...props }) => {
        if (props.selected){
            return (
                <View style={{ width: 16, height: 4, marginHorizontal: 3, backgroundColor: "#FFD152", borderRadius: 4 }}></View>
            )
        } else {
            return (
                <View style={{ width: 8, height: 4, marginHorizontal: 3, backgroundColor: "#BECFD8", borderRadius: 4 }}></View>
            )
        }
    };

    const Next = ({ ...props }) => (
        <View style={styles.buttonContainer}>
            <TouchableOpacity { ...props }>
                <Feather name="arrow-right" size={25} color="#15B6D6"></Feather>
            </TouchableOpacity>
        </View>
    ); 

    const Done = ({ ...props }) => (
        <View style={styles.buttonContainer}>
            <TouchableOpacity { ...props }>
                <Feather name="arrow-right" size={25} color="#15B6D6"></Feather>
            </TouchableOpacity>
        </View>
    ); 

    if (!isFirstLaunch) {        
        return <OrphanagesMap></OrphanagesMap>;
    } else {        
        return (
                    <Onboarding containerStyles={{ marginTop: 30, justifyContent: "space-between"}} onDone={() => { AsyncStorage.setItem('alreadyLaunched', 'true'); navigation.navigate("Instructions") }} 
                        DotComponent={Square}
                        NextButtonComponent={Next}
                        DoneButtonComponent={Done}
                        showSkip = {false}
                        bottomBarColor = "#F2F3F5"
                        pages={[
                            {
                                backgroundColor: '#F2F3F5',
                                image: <Image source={onboarding01}></Image>,
                                title: <View style={styles.onboardingScreen1TitleContainer}>
                                            <Text style={styles.onboardingScreen1Title}>Leve felicidade para o mundo</Text>
                                       </View>,
                                subtitle: <View style={styles.onboardingScreen1SubtitleContainer}>
                                            <Text style={styles.onboardingScreen1Subtitle}>Visite orfanatos e mude o dia de muitas crianças.</Text>
                                          </View>
                            },
                            {
                                backgroundColor: '#F2F3F5',
                                image: <Image source={onboarding02}></Image>,
                                title: <View style={styles.onboardingScreen2TitleContainer}>
                                            <Text style={styles.onboardingScreen2Title}>Escolha um orfanato no mapa e faça uma visita</Text>
                                       </View>,
                                subtitle: ''
                            }
                        ]}>
                    </Onboarding> 
        )
    }
}
    
const styles = StyleSheet.create({
    onboardingContainer: {
        width: "100%",
        height: "100%",

        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-between",

        position: "relative"
    },

    onboardingMain: {
        position: "absolute",
        width: "100%",
        height: "100%",
        marginVertical: 0

    },

    onboardingScreen1TitleContainer: {
        width: 217,
        height: 192,
        top: "43.84%",
        left: 20,

        position: "absolute"
    },

    onboardingScreen1SubtitleContainer: {
        width: 234,
        height: 60,
        top: "71.65%",
        left: 20,

        position: "absolute"
    },
    
    onboardingScreen1Title: {
        
        left: "12.27%",
        right: "29.87%",

        fontFamily: "Nunito_800ExtraBold",
        color: "#0089A5",
        fontSize: 48,
        lineHeight: 49
    },

    onboardingScreen1Subtitle: {
        position: "absolute",
        left: "12.27%",

        fontFamily: "Nunito_600SemiBold",
        color: "#5C8599",
        fontSize: 20,
        lineHeight: 30,
    },

    onboardingScreen2TitleContainer: {
        width: 253,
        height: 108,
        top: 461,
        left: 70,

        position: "absolute"
    },

    onboardingScreen2Title: {
        fontFamily: "Nunito_800ExtraBold",
        fontSize: 30,
        lineHeight: 36,
        color: "#0089A5",

        textAlign: "right",
        
        position: "absolute"
    },

    buttonContainer: {
        padding: 15,
        backgroundColor: "#D1EDF2",
        borderColor: "#DDE3F0",
        borderRadius: 20,

        marginRight: 25,
        marginBottom: 25
    },

})   
