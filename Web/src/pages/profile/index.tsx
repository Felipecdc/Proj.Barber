import styles from './styles.module.scss'
import { FiUser, FiUpload } from "react-icons/fi"
import { Header } from "../../components/header"
import { canSSRAuth } from "../../utils/canSSRAuth"
import Head from "next/head"
import avatarImg from '../../assets/avatar.png';
import { Title } from "../../components/Title"
import { AuthContext } from '../../contexts/AuthContext';
import { FormEvent, use, useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { api } from '../../services/apiClient'
import { toast } from 'react-toastify'

export default function Profile(){

    const { user, setUser, baseUrl, signOut } = useContext(AuthContext);
    const [contato, setContato] = useState(user?.contato || '')
    const [avatar, setAvatar] = useState(null)

    async function handleSubmit(event: FormEvent){
        event.preventDefault()

        const data = new FormData();

        if(contato !== user?.contato){
            data.append('contato', contato)
        }
        
        if(avatar !== null){
            data.append('file', avatar)
        }

        console.log(data)

        try{
            await api.put(`/user/${user?.id}`, data);
            const userRequest = await api.get('/me');
            setUser(userRequest.data)
            toast.success('Atualizado com sucesso!')
        }catch(err){
            console.log(err)
            toast.error('Algo deu errado!')
        }
        
    }

    return(
        <> 
            <Head>
                <title>Cancun - Seu Perfil</title>
            </Head>
            <div className={styles.container}>
                <Header/>
                <div className={styles.content}>
                    <Title title={"Meu Perfil"}>
                        <FiUser size={25}/>
                    </Title>
                    
                    <div className={styles.containerForm}>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <label className={styles.labelAvatar}>
                                <span>
                                    <FiUpload color='#fff' size={25}/>
                                </span>
                                <input type='file' accept='image/*' onChange={e => setAvatar(e.target.files[0])}/><br/>
                                {
                                    user?.avatar_url === null ?
                                    <Image
                                        src={avatarImg}
                                        alt='Foto do usuario'
                                        className={styles.avatar}
                                        width={250}
                                        height={250}
                                    /> :
                                    <Image 
                                        src={`${baseUrl}${user?.avatar_url}`} 
                                        alt='Foto do usuario'
                                        className={styles.avatar}
                                        width={250}
                                        height={250}
                                    /> 
                                }
                            </label>

                            <label>
                                Nome
                            </label>
                            <input type='text' value={user?.name} disabled={true}/>

                            <label>
                                Email
                            </label>
                            <input type='text' value={user?.email} disabled={true}/>

                            <label>
                                Contato
                            </label>
                            <input type='text' value={contato} onChange={e => setContato(e.target.value)}/>

                            <button type='submit'>Salvar</button>

                        </form>
                    </div>
                    <div className={styles.containerForm}>
                        <button className={styles.logOut} onClick={signOut}>
                            Sair
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})