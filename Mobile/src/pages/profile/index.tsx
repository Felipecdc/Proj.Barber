import React, { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Button } from 'react-native';

import { AuthContext } from "../../contexts";

export default function Profile(){

    const { setUser } = useContext(AuthContext);

    async function SignOut(){
        await AsyncStorage.clear()
        setUser(undefined)
    }

    return(
        <View>
            <Text>Profile</Text>
            <Button title="Logout" onPress={SignOut} />
        </View>
    )
}