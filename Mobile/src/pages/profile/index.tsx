import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../services/api";
import { format } from 'date-fns';
import { Keyboard, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { Container, AreaProfile, TextInput, TextView, AreaExit, Text, Title, View, ButtonEdit } from './styles';

import { AuthContext } from "../../contexts";

export default function Profile(){

    const { setUser, user, StorageUser } = useContext(AuthContext);

    const [phone, setPhone] = useState(user?.contato);
    const [forceUpdate, setForceUpdate] = useState(0); // forcando a re-renderizacao

    async function SignOut(){
        await AsyncStorage.clear()
        setUser(undefined)
    }

    async function handleDelet(){
        try{
            console.log(user?.id)
            await api.delete(`user?user_id=${user?.id}`,{
                headers: {
                    Authorization: `Bearer ${user?.token}`
                },
            })
            await AsyncStorage.clear()
            setUser(undefined)
        }catch(err){
            console.log(err)
        }
    }

    async function handleEdit(){
        try{
            if(phone === '' || phone === user?.contato){
                console.log('Digite algum numero diferente ao anterior')
                return;
            }
            const data = {
                contato: phone,
            }
            const response = await api.put(`/user/${user?.id}`, data, {
                headers: {
                    Authorization: `Bearer ${user?.token}`
                },            
            });
            if (response.status === 401) {
                console.error('Não autorizado - redirecionar para a página de login ou tratar de outra forma.');
            }
            setUser({
                ...user,
                id: user?.id || '',      
                name: user?.name || '',  
                email: user?.email || '',
                token: user?.token || '',
                contato: response.data.contato
            });            
            setPhone(response?.data.contato);
            setForceUpdate(forceUpdate + 1);
            Keyboard.dismiss()

            console.log(response.data)
        }catch(err){
            console.error('Erro ao editar o perfil:', err);        
        }
    }

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
        <StatusBar barStyle={'dark-content'} backgroundColor={'#f2f2f2'} />
        <Container>
            <Title>Seu Perfil</Title>
            <AreaProfile>
                <View>
                    <Text>Nome</Text>
                    <TextView>{user?.name}</TextView>
                </View>
                <View>
                    <Text>Email</Text>
                    <TextView>{user?.email}</TextView>
                </View>
                <View>
                    <Text>Contato</Text>
                    <TextInput 
                    placeholder={user?.contato}
                    value={phone}
                    onChangeText={text => setPhone(text)}
                    ></TextInput>
                </View>
                {phone !== user?.contato && (
                    <ButtonEdit onPress={handleEdit}>
                        <Text style={{textAlign: "center"}}>Salvar</Text>
                    </ButtonEdit>
                )}
            </AreaProfile>
            <AreaExit onPress={SignOut}>
                <Text style={{color: 'white', fontSize: 22}}>Sair da conta</Text>
            </AreaExit>
            <AreaExit style={{backgroundColor: '#b5b5b5', marginTop: -5}} onPress={handleDelet}>
                <Text style={{fontSize: 22}}>Excluir conta</Text>
            </AreaExit>
        </Container>
        </KeyboardAvoidingView>
    )
}