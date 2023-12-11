import { createContext, ReactNode, useState, useEffect } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from "next/router";

import { toast } from "react-toastify";

import { api } from "../services/apiClient";

type AuthContextData = {
    user: UserProps;
    setUser: (user: UserProps) => void;
    isAuthenticated: boolean;
    signIn: ( credentials: SignInProps ) => Promise<void>;
    signOut: () => void;
    baseUrl: string
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    contato: string;
    avatar_url?: string;
}

type SignInProps = {
    email: string;
    password: string;
}
type AuthProviderProps = {
    children: ReactNode;
}


export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
    try{
        destroyCookie(undefined, "@barbearia.token");
        Router.push('/')
    }catch{
        console.log("Erro ao logar")
    }
}

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user;
    const baseUrl = "http://localhost:3333/files/"; 

    useEffect(() => {
        
        const { "@barbearia.token": token } = parseCookies()

        const fetch = async () => {
            try{
                if(token){
                    api.get('/me').then(response => {
                        const { id, name, email, avatar_url, contato } = response.data;
                    
                        setUser({
                            id,
                            name,
                            email,
                            avatar_url,
                            contato
                        })    
                    })
                    .catch(() => {
                        signOut();
                    })
                }
            }catch(err){
                console.log(err)
            }
        }

        fetch();


    }, [])

    async function signIn({email, password}: SignInProps){
        try{
            const respose = await api.post('/session', {
                email: email,       
                password: password
            })
            
            const { id, name, token, avatar_url, contato } = respose.data;
            
            setCookie(undefined, "@barbearia.token", token, {
                maxAge: 60 * 60 * 24 * 30, // 1 mes
                path: "/"
            })

            setUser({
                id,
                name,
                email,
                avatar_url,
                contato
            })

            api.defaults.headers["Authorization"] = `Bearer ${token}`

            toast.success("Logado com sucesso!")

            Router.push("/dashboard")

        }catch(err){
            toast.error("Erro ao cadastrar!")
            console.log(err)
        }
    };

    return(
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, signIn , signOut, baseUrl}}>
            {children}
        </AuthContext.Provider>
    )
}