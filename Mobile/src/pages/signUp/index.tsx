import React, { useState, useContext } from "react";
import { Container, Logo, Title, Form, Input, Button, Text } from './styles';
import { ActivityIndicator, Alert, TouchableOpacity, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts";

export default function SignUp(){

    const navigation = useNavigation();
    const { signUp, loadingAuth } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contato, setContato] = useState('');

    async function handleLogIn(){
        if(email === '' || password === '' || name === '' || contato ===''){
            Alert.alert("Preencha todos os campos!")
            return;
        }
        try{
            signUp({name, email, password, contato})
        }catch(err){
            console.log('Error: ', err)
        }
    }

    function handleSignIn(){
        navigation.navigate('SignIn' as never)
    }

    return(
        <Container>
            <StatusBar barStyle={'light-content'} backgroundColor={'#101026'} />
            <Logo>
                <Title>CANCUN</Title>
                <Title style={{color: '#2272f2'}}>BARBEARIA</Title>
            </Logo>
            <Form>
                <Text style={{alignSelf: "flex-start"}}>Nome</Text>
                <Input
                    placeholder="Digite seu nome"
                    placeholderTextColor={'#ddd'}
                    value={name}
                    onChangeText={text => setName(text)}
                />
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
                <Text style={{alignSelf: "flex-start"}}>Contato</Text>
                <Input
                    placeholder="Digite seu numero"
                    placeholderTextColor={'#ddd'}
                    keyboardType="numeric"
                    value={contato}
                    onChangeText={text => setContato(text)}
                />
                <Button onPress={handleLogIn}>
                    {loadingAuth ? (
                        <ActivityIndicator size={25} color={'#fff'}/>
                        ) : (
                        <Text>Entrar</Text>
                    )}
                </Button>
                <TouchableOpacity onPress={handleSignIn}>
                    <Text 
                    style={{
                        fontWeight: '400', 
                        fontSize: 16,
                        color: '#d0d0d0',
                        marginTop: 10
                    }}>
                        Possuo uma conta
                    </Text>
                </TouchableOpacity>
            </Form>
        </Container>
    )
}