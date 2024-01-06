import React, { ReactNode, createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api";
import { Keyboard } from "react-native";

type AuthContextData = {
    user: UserProps | undefined;
    setUser: (user: UserProps | undefined) => void;
    signUp: (user: SignUpProps) => Promise<void>;
    signIn: (user: SignInProps) => Promise<void>;
    // signOut: () => void;
    isAuthenticated: boolean;
    loadingAuth: boolean;
    loading: boolean;
    StorageUser: (user: UserProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    contato: string;
    token: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
    contato: string;
}

type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps){

    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user;
    const [loading, setLoading] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(false);

    useEffect(() => {
        async function LoadingStorage(){
            const storage = await AsyncStorage.getItem('@barber');

            if(storage){
                setUser(JSON.parse(storage));
                setLoading(false);
                return;
            }

            setLoading(false);
        }

        LoadingStorage();
    }, [])

    async function signUp({name, email, password, contato}: SignUpProps){
        setLoadingAuth(true)
        try {
            Keyboard.dismiss();
            const response = await api.post('/users', {
                name: name,
                email: email,
                password: password,
                contato: contato,
            });
            setUser(response.data)
            StorageUser(response.data)
            setLoadingAuth(false)
        } catch (error) {
            Keyboard.dismiss();
            console.error('Error logging in:', error);
            setLoadingAuth(false)
        }
    }
    
    async function signIn({email, password}: SignInProps){
        setLoadingAuth(true)
        try{
            Keyboard.dismiss();
            const response = await api.post('/session',{
                email: email,
                password: password,
            })
            setUser(response.data)
            StorageUser(response.data)
            setLoadingAuth(false)
        }catch(error){
            Keyboard.dismiss();
            console.error('Error logging in:', error);
            setLoadingAuth(false)
        }
    }

    async function StorageUser(data: UserProps){
        await AsyncStorage.setItem('@barber', JSON.stringify(data))
        console.log(AsyncStorage)
    }

    return(
        <AuthContext.Provider 
        value={{ 
            user, 
            signUp, 
            signIn,
            isAuthenticated,
            loadingAuth,
            loading,
            setUser,
            StorageUser,
        }}>
            {children}
        </AuthContext.Provider>
    )
}