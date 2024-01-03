import React, { useContext } from "react";
import { AuthContext } from "../contexts";
import { View, ActivityIndicator } from 'react-native';

import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";

function Routes(){

    const { isAuthenticated, loading } = useContext(AuthContext);

    if(loading){
        return(
            <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#101026'}}>
                <ActivityIndicator size={50} color="#ddd"/>
            </View>
        )
    }

    return(
        isAuthenticated ? <AppRoutes/> : <AuthRoutes/>
    )
}

export default Routes;