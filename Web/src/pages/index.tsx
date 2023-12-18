import { useContext, useState, FormEvent } from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.scss';

import LogoLogin from '../components/Logo/logo';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { canSSRGuest } from '../utils/canSSRGuest';

import { AuthContext } from '../contexts/AuthContext';

export default function Home() {

  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    if(email === '' || password === ''){
      toast.warn("Preencha todos os campos!")
      return;
    }

    setLoading(true) 
    let data = {
      email,
      password,
    }
    
    await signIn(data)
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Cancun - Login</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.areaLogo}>
          <LogoLogin />
        </div>
        <div className={styles.containerForm}>
          <form className={styles.form} onSubmit={handleLogin}>
            <h2 className={styles.title}>Digite seu E-mail</h2>
            <input 
            type='text' 
            placeholder='email@email.com' 
            value={email}
            onChange={text => setEmail(text.target.value)}
            />
            <h2 className={styles.title}>Digite sua senha</h2>
            <input 
            type='password' 
            placeholder='**********'
            value={password}
            onChange={text => setPassword(text.target.value)} 
            />
            <button className={styles.button} disabled={loading}>
              {loading ? <FaSpinner color='#fff' size={20} className={styles.spinner}/> : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})