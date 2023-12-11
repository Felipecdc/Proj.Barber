import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';
import { AuthTokenErros } from './errors/AuthTokenErros';
import { signOut } from '../contexts/AuthContext';

export function setupAPICliente(ctx = undefined ){
    let cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: "http://localhost:3333",
        headers: {
            Authorization: `Bearer ${cookies["@barbearia.token"]}`
        }
    })

    api.interceptors.response.use(response => {
        return response
    }, (error: AxiosError) => {
        if(error.response.status === 401){
            if(typeof window !== undefined){
                signOut();
            }else{
                return Promise.reject(new AuthTokenErros())
            }
        }

        return Promise.reject(error)
    })
    return api;
}