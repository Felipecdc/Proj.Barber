import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//icons

import SignIn from "../pages/signIn";
import SignUp from "../pages/signUp";

const AuthStack = createNativeStackNavigator();

function AuthRoutes(){
    return(
        <AuthStack.Navigator
        screenOptions={{
            headerShown: false,
        }}
        >
            <AuthStack.Screen 
            name="SignIn"
            component={SignIn}
            />
            <AuthStack.Screen
            name="SignUp"
            component={SignUp}
            />
        </AuthStack.Navigator>
    )
}

export default AuthRoutes;