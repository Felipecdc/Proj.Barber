import styles from './styles.module.scss'
import { FiUser, FiUpload } from "react-icons/fi"
import { Header } from "../../components/header"
import Head from "next/head"
import avatarImg from '../../assets/avatar.png';
import { Title } from "../../components/Title"
import { AuthContext } from '../../contexts/AuthContext';
import { useContext, useEffect } from 'react';
import Image from 'next/image';

export default function Profile(){

    const { user, baseUrl, signOut } = useContext(AuthContext);
    console.log(user)

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
                        <form className={styles.form}>
                            <label className={styles.labelAvatar}>
                                <span>
                                    <FiUpload color='#fff' size={25}/>
                                </span>
                                <input type='file' accept='image/*'/><br/>
                                {user && user?.avatar_url === 'null' ? (
                                    <Image 
                                    src={avatarImg} 
                                    alt='Foto do usuario'
                                    className={styles.avatar}
                                    width={250}
                                    height={250}
                                />
                                ) : (
                                    <Image 
                                        src={user?.avatar_url === 'null' ? avatarImg : `${baseUrl}${user?.avatar_url}`} 
                                        alt='Foto do usuario'
                                        className={styles.avatar}
                                        width={250}
                                        height={250}
                                    />                              
                                )}
                            </label>

                            <label>
                                Nome
                            </label>
                            <input type='text' placeholder={user?.name} />

                            <label>
                                Email
                            </label>
                            <input type='text' placeholder={user?.email} disabled={true}/>

                            <label>
                                Contato
                            </label>
                            <input type='text' placeholder={user?.contato}/>

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