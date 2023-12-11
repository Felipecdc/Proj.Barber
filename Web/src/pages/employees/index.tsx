import styles from './styles.module.scss'
import { FiUsers } from "react-icons/fi"
import { canSSRAuth } from "../../utils/canSSRAuth"
import { Title } from "../../components/Title"
import { Header } from "../../components/header"
import Head from "next/head"
import { FormEvent, useEffect, useState } from 'react'
import { api } from '../../services/apiClient'
import { toast } from 'react-toastify'

export default function Employees(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contato, setContato] = useState('');
    const [password, setPassword] = useState('');
    const [listEmployee, setListEmployee] = useState([])

    useEffect(() => {

        async function fetch(){
            const response = await api.get('/employee')
            setListEmployee(response.data.employee)
        }

        fetch()

    }, [])

    async function handleCreateEmployee(event: FormEvent){
        event.preventDefault()

        if(name === '' || email === '' || contato === '' || password === ''){
            toast.error('Preencha todos os campos!')
            return;
        }

        try{
            const response = await api.post('/employee', {
                name: name,
                email: email,
                password: password,
                contato: contato,
            })
            toast.success(`Cadastrado com sucesso - ${name}`)
            console.log(response.data)
        }catch(err){
            console.log(err)
        }
    }

    return(
        <>
            <Head>
                <title>Cancun - Seus Funcionários</title>
            </Head>
            <div className={styles.container}>
                <Header/>
                <div className={styles.content}>
                    <Title title={"Cadastrar Funcionários"}>
                        <FiUsers size={25}/>
                    </Title>
                    <div className={styles.containerEmployee}>
                        <form className={styles.createEmployee} onSubmit={handleCreateEmployee}>
                            <h2>Cadastrar novo Funcionários</h2>
                            <hr/>
                            <h3>Nome</h3>
                            <input type='text'
                            placeholder='Nome do Funcionários'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            />
                            <h3>Email</h3>
                            <input type='text'
                            placeholder='email@email.com'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            />
                            <h3>Contato</h3>
                            <input type='text'
                            placeholder='00000000000'
                            value={contato}
                            onChange={e => setContato(e.target.value)}
                            />
                            <h3>Senha</h3>
                            <input type='password'
                            placeholder='**********'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            />
                            <button>Cadastrar</button>
                        </form>
                        <div className={styles.listEmployee}>
                            <h2>Seus Funcionários</h2>
                            <hr/>
                            <div className={styles.listContainer}>
                            {listEmployee.map((v) => (
                                <div className={styles.info} key={v.id}>
                                    <span><strong>Nome: </strong>{v.name}</span>
                                    <span><strong>Email: </strong>{v.email}</span>
                                    <span><strong>Contato: </strong>{v.contato}</span>
                                    {/* <span><strong>Porcentagem: </strong>{v.percentage}%</span> */}
                                    <hr/>
                                </div>
                            ))}
                            </div>
                        </div>
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