import React, { useContext, useState } from "react";
import { Container, Logo, Title, Form, Input, Button, Text } from './styles';
import { ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts";

export default function SignIn(){

    const navigation = useNavigation();
    const { signIn, loadingAuth } = useContext(AuthContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogIn(){
        if(email === '' || password === ''){
            Alert.alert("Preencha todos os campos!")
            return;
        }
        try{
            signIn({email, password})
        }catch(err){
            console.log('Error: ', err)
        }    
    }

    function handleSignUp(){
        navigation.navigate('SignUp' as never)
    }

    return(
        <Container>
            <Logo>
                <Title>CANCUN</Title>
                <Title style={{color: '#2272f2'}}>BARBEARIA</Title>
            </Logo>
            <Form>
                <Text style={{alignSelf: "flex-start"}}>Email</Text>
                <Input
                    placeholder="Digite seu email"
                    placeholderTextColor={'#ddd'}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <Text style={{alignSelf: "flex-start"}}>Senha</Text>
                <Input
                    placeholder="Digite sua senha"
                    placeholderTextColor={'#ddd'}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <Button onPress={handleLogIn}>
                    {loadingAuth ? (
                        <ActivityIndicator size={25} color={'#fff'}/>
                        ) : (
                        <Text>Entrar</Text>
                    )}
                </Button>
                <TouchableOpacity onPress={handleSignUp}>
                    <Text 
                    style={{
                        fontWeight: '400', 
                        fontSize: 16,
                        color: '#d0d0d0',
                        marginTop: 10
                    }}>
                        Criar conta
                    </Text>
                </TouchableOpacity>
            </Form>
        </Container>
    )
}