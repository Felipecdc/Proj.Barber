import { useContext, useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { FiUser, FiUsers, FiBarChart2, FiTool } from 'react-icons/fi';
import { useRouter } from 'next/router'; 

import { AuthContext } from '../../contexts/AuthContext';

import Image from 'next/image';
import avatarImg from '../../assets/avatar.png';
import Link from 'next/link';

export function Header(){

    const router = useRouter();

    const { user, signOut, baseUrl } = useContext(AuthContext);
    const [currentScreen, setCurrentScreen] = useState('');

    useEffect(() => {
        const currentScreen = router.pathname.replace('/', ''); 
        setCurrentScreen(currentScreen);
    }, []);

    return(
        <div className={styles.sidebar}>
            <div>
                <Image 
                    src={user?.avatar_url === null ? avatarImg : `${baseUrl}${user?.avatar_url}`} 
                    alt='Foto do usuario'
                    className={styles.avatar}
                    width={90}
                    height={90}
                />
            </div>
            <Link href={"/dashboard"} className={currentScreen === 'dashboard' ? styles.active : ''}>
                <FiBarChart2 color="#000" size={24} />
                Agenda
            </Link>
            <Link href={"/services"} className={currentScreen === 'services' ? styles.active : ''}>
                <FiTool color="#000" size={24} />
                Serviços
            </Link>
            <Link href={"/profile"} className={currentScreen === 'profile' ? styles.active : ''}>
                <FiUser color="#000" size={24} />
                Perfil
            </Link>
            <Link href={"/employees"} className={currentScreen === 'employees' ? styles.active : ''}>
                <FiUsers color="#000" size={24} />
                Funcionários
            </Link>
        </div>
    )
}