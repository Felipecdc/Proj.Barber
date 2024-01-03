import React from "react";
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from "./src/contexts";
import Routes from "./src/routes";

export default function App(){
  return(
    <NavigationContainer>
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </NavigationContainer>
  )
}