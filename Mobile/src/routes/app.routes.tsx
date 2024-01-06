import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from "../pages/home";
import Profile from "../pages/profile";

const AppTab = createBottomTabNavigator();

function AppRoutes(){
    return(
        <AppTab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size, focused }) => {
                let iconName: string = '';
        
                if(route.name === 'Agenda') {
                    iconName = focused ? 'home' : 'home-outline';
                }else if (route.name === 'Perfil') {
                    iconName = focused ? 'person' : 'person-outline';
                }

                const iconSize = size *1.3;
        
                return <Ionicons name={iconName as string} size={iconSize} color={color} />;    
            },
            tabBarStyle: {
                position: 'absolute',
                backgroundColor: '#101026',
                height: 70,
                paddingBottom: 10,
                paddingTop: 10,
            },
            tabBarActiveTintColor: '#fff',
            headerShown: false,
            tabBarHideOnKeyboard: true
        })}
        >   
            <AppTab.Screen
            name="Agenda"
            component={Home}
            options={{ tabBarLabel: () => null}}
            />
            <AppTab.Screen
            name="Perfil"
            component={Profile}
            options={{ tabBarLabel: () => null}}
            />
        </AppTab.Navigator>
    )
}

export default AppRoutes;