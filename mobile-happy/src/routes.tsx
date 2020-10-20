import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import Splash from './pages/Splash';
import SelectMapPosition from './pages/createOrphanage/SelectMapPosition';
import OrphanageData from './pages/createOrphanage/OrphanageData';
import Header from './components/Header';
import OnboardingScreen from './pages/OnboardingScreen';
import Instructions from './pages/Instructions';

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator initialRouteName="Splash" screenOptions={{ headerShown: false, cardStyle:{ backgroundColor: "#F2F3F5" } }}>
                <Screen name="OrphanagesMap" component={OrphanagesMap}></Screen>
                <Screen name="Splash" component={Splash}></Screen>
                <Screen name="Instructions" component={Instructions}></Screen>
                <Screen name="OnboardingScreen" component={OnboardingScreen}></Screen>
                <Screen name="Orphanage" component={Orphanage} options={{ headerShown: true, header: () => <Header showCancel={false} title="Orfanato"></Header>}}></Screen>
                <Screen name="SelectMapPosition" component={SelectMapPosition} options={{ headerShown: true, header: () => <Header title="Adicione um orfanato"></Header>}}></Screen>
                <Screen name="OrphanageData" component={OrphanageData} options={{ headerShown: true, header: () => <Header title="Adicione um orfanato"></Header>}}></Screen>
            </Navigator>
        </NavigationContainer>
    )
}