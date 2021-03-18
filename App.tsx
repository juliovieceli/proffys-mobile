import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo'

import { Archivo_400Regular, Archivo_700Bold } from '@expo-google-fonts/archivo'
import { Poppins_400Regular, Poppins_600SemiBold, useFonts } from '@expo-google-fonts/poppins'

import AuthContext, { AuthProvider } from './src/Contexts/auth';
import Routes from './src/routes';

export default function App() {

  let [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  } else {

    return (
      <NavigationContainer>
        <AuthProvider >
          <Routes />
          <StatusBar style="light" />
        </AuthProvider>
      </NavigationContainer>
    );
  }

}

